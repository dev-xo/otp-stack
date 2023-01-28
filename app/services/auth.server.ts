import type { User } from '@prisma/client'

import { Authenticator } from 'remix-auth'
import { OTPStrategy } from 'remix-auth-otp'
import { sessionStorage } from './session.server'

import { sendEmail } from './send-email.server'
import { db } from '~/db'

/**
 * Inits Authenticator.
 */
export let authenticator = new Authenticator<User>(sessionStorage, {
  throwOnError: true,
})

/**
 * One Time Password - Strategy.
 */
authenticator.use(
  new OTPStrategy(
    {
      secret: process.env.ENCRYPTION_SECRET || 'STRONG_SECRET',
      /**
       * Stores encrypted OTP code in database.
       * It should return a Promise<void>.
       */
      storeCode: async (code) => {
        await db.otp.create({
          data: {
            code: code,
            active: true,
          },
        })
      },

      /**
       * Sends the OTP code to the user.
       * It should return a Promise<void>.
       */
      sendCode: async ({ email, code, magicLink, user, form, request }) => {
        const sender = { name: 'Remix Auth', email: 'localhost@example.com' }
        const to = [{ email }]
        const subject = `Here's your OTP Code.`
        const htmlContent = `
          <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html>
            <head>
              <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
            </head>
            <body>
              <h1>Code: ${code}</h1>
              ${
                magicLink &&
                `<p>Alternatively, you can click the Magic Link: ${magicLink}</p>`
              }
            </body>
          </html>
          `

        // Calls the provider sender email function.
        await sendEmail({ sender, to, subject, htmlContent })
      },

      /**
       * Validates the OTP code.
       * It should return a Promise<{ code: string, active: boolean, attempts: number }>.
       */
      validateCode: async (code) => {
        const otp = await db.otp.findUnique({
          where: {
            code: code,
          },
        })
        if (!otp) throw new Error('OTP code not found.')

        // This will be used by the internal Strategy
        // methods to validate the code.
        return {
          code: otp.code,
          active: otp.active,
          attempts: otp.attempts,
        }
      },

      /**
       * Invalidates the OTP code.
       * It should return a Promise<void>.
       */
      invalidateCode: async (code, active, attempts) => {
        await db.otp.update({
          where: {
            code: code,
          },
          // This will be used by the internal Strategy
          // methods to invalidate / update the code.
          data: {
            active: active,
            attempts: attempts,
          },
        })
      },
    },
    async ({ email, code, form }) => {
      // Gets user from database.
      // This is the right place to create a new user (if not exists).
      const user = await db.user.findFirst({
        where: {
          email: email,
        },
      })

      if (!user) {
        const newUser = await db.user.create({
          data: {
            email: email,
          },
        })
        if (!newUser) throw new Error('Unable to create new user.')

        return newUser
      }

      // Returns the user.
      return user
    },
  ),
)
