// app/routes/login.tsx
import type { DataFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'

import { authenticator } from '~/services/auth.server'
import { getSession, commitSession } from '~/services/session.server'

export async function loader({ request }: DataFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    successRedirect: '/account',
  })

  /**
   * Gets the session and the required data from it.
   */
  const session = await getSession(request.headers.get('Cookie'))
  const hasSentEmail = session.has('auth:otp')

  const email = session.get('auth:email')
  const error = session.get(authenticator.sessionErrorKey)

  console.log(session.data)

  // We'll want to commit Session to clear any possible error message.
  return json(
    { user, hasSentEmail, email, error },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    },
  )
}

export async function action({ request }: DataFunctionArgs) {
  await authenticator.authenticate('OTP', request, {
    /**
     * Setting successRedirect is required.
     *
     * User is not authenticated yet.
     * The verify code step is required.
     *
     * Feel free to redirect to any other page like /verify-code.
     */
    successRedirect: '/login',

    /**
     * Setting failureRedirect is required.
     *
     * We'll want to display any possible error message.
     * Otherwise the ErrorBoundary will be triggered.
     */
    failureRedirect: '/login',
  })
}

export default function Login() {
  let { user, hasSentEmail, email, error } = useLoaderData<typeof loader>()

  return (
    <div className="flex h-screen max-w-xl flex-col items-center justify-center px-6">
      {/* Headers. */}
      <div className="flex w-full flex-col items-center">
        <img
          src="https://raw.githubusercontent.com/dev-xo/dev-xo/main/assets/images/email.png"
          alt=""
          className="z-10 h-28 w-28 transform select-none transition hover:scale-110"
        />

        <h5 className="text-center text-3xl font-bold text-gray-200">
          Welcome back
        </h5>
        <h5 className="max-w-sm text-center text-xl font-semibold text-gray-400">
          {hasSentEmail ? (
            <span className="text-green-500">Email has been successfully sent.</span>
          ) : (
            `Type bellow your email, and we'll send you a One Time Password code.`
          )}
        </h5>
      </div>
      <div className="mb-12" />

      {/* Displaying possible error messages */}
      {error && (
        <>
          <strong>Error: {error.message}</strong>
          <div className="mb-6" />
        </>
      )}

      {/* Displaying the form to send the email. */}
      {!user && !hasSentEmail && (
        <>
          <Form method="post" autoComplete="off" className="w-full">
            <fieldset>
              <label className="font-semibold text-gray-200">
                <div>Email</div>
                <div className="mb-1" />

                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  className="h-10 w-full border-b-2 border-gray-600 bg-transparent 
							    text-lg font-semibold text-gray-200 focus:border-violet-200"
                />
              </label>
            </fieldset>
            <div className="mb-2" />

            {/* Submit. */}
            <button
              type="submit"
              className="relative flex h-14 w-full flex-row items-center justify-center rounded-xl bg-violet-500
					    text-base font-bold text-white transition hover:scale-105 active:scale-100 active:brightness-90">
              <svg
                className="absolute left-6 h-6 w-6 fill-white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z" />
              </svg>

              <span>Send Code</span>
            </button>
          </Form>
        </>
      )}

      {/* Displaying the form to verify the code. */}
      {hasSentEmail && (
        <>
          <Form method="post" autoComplete="off" className="w-full">
            <fieldset>
              <label className="font-semibold text-gray-200">
                <div>Code</div>
                <div className="mb-1" />

                <input
                  type="text"
                  name="code"
                  placeholder="Paste here your code ..."
                  className="h-10 w-full border-b-2 border-gray-600 bg-transparent 
							    text-lg font-semibold text-gray-200 focus:border-violet-200"
                />
              </label>
            </fieldset>
            <div className="mb-2" />

            {/* Submit. */}
            <button
              type="submit"
              className="relative flex h-14 w-full flex-row items-center justify-center rounded-xl bg-violet-500
					    text-base font-bold text-white transition hover:scale-105 active:scale-100 active:brightness-90">
              <svg
                className="absolute left-6 h-6 w-6 fill-white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z" />
              </svg>

              <span>Continue</span>
            </button>
          </Form>
          <div className="mb-6" />

          {/* Displaying the form to request a new code. */}
          {/* Input should be hidden, the email is already in Session. */}
          <Form method="post" autoComplete="off">
            <input type="hidden" name="email" defaultValue={email} />
            <button
              type="submit"
              className="relative flex w-auto flex-row items-center justify-center rounded-xl text-base
					    font-bold text-violet-200 transition hover:scale-105 active:scale-100 active:brightness-90">
              <span>Request new Code</span>
            </button>
          </Form>
        </>
      )}
    </div>
  )
}
