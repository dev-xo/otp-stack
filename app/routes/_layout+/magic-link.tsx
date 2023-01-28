import type { DataFunctionArgs } from '@remix-run/node'
import { authenticator } from '~/services/auth.server'

export async function loader({ request }: DataFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    successRedirect: '/account',
  })

  if (!user) {
    await authenticator.authenticate('OTP', request, {
      successRedirect: '/account',
      failureRedirect: '/login',
    })
  }
}
