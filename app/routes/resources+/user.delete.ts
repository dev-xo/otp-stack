import type { DataFunctionArgs } from '@remix-run/node'

import { json, redirect } from '@remix-run/node'
import { authenticator } from '~/services/auth/config.server'
import { getSession, destroySession } from '~/services/auth/session.server'

import { deleteUserById } from '~/models/user/delete-user'

export async function loader({ request }: DataFunctionArgs) {
  await authenticator.isAuthenticated(request, { failureRedirect: '/login' })
  return redirect('/account')
}

export async function action({ request }: DataFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  // Delete user from database.
  await deleteUserById(user.id)

  // Destroy session.
  let session = await getSession(request.headers.get('Cookie'))

  return redirect('/', {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  })
}
