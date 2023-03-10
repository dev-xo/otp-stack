import type { DataFunctionArgs } from '@remix-run/node'
import type { UserSession } from '~/services/auth/session.server'

import { json, redirect } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { authenticator } from '~/services/auth/config.server'

type LoaderData = {
  user: UserSession
}

export async function loader({ request }: DataFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  // Redirect with the intent to setup user name.
  if (!user.name) return redirect('/register/name')

  return json<LoaderData>({ user })
}

export default function Account() {
  // Check bellow info about why we are force casting <LoaderData>
  // https://github.com/remix-run/remix/issues/3931
  const { user } = useLoaderData() as LoaderData

  // This is just for debugging purposes. (Feel free to remove it.)
  console.log(user)

  return (
    <div className="flex w-full flex-col items-center justify-start px-6 py-12 md:h-full">
      <div className="flex flex-col items-center">
        <h3 className="text-3xl font-bold text-gray-200">Dashboard</h3>
        <div className="my-1" />
        <p className="max-w-xs text-center font-semibold text-gray-400">
          Simple Dashboard example that includes User Info.
        </p>
      </div>
      <div className="my-6" />

      <div className="flex w-full max-w-2xl flex-col items-center md:flex-row md:justify-evenly">
        {/* User. */}
        <div className="my-8 flex h-full w-full flex-col items-center md:my-0">
          {/* Avatar. */}
          <img
            src={`https://ui-avatars.com/api/?&name=${
              user.name ?? 'Remix'
            }&background=random`}
            alt="Avatar"
            className="h-36 w-36 select-none rounded-full transition hover:scale-105 hover:brightness-110"
          />
          <div className="my-3" />

          {/* Info. */}
          <div className="flex flex-col items-center">
            <h5 className="flex flex-row items-center text-center text-2xl font-bold text-gray-200">
              {user.name ? user.name : user.email}
              <div className="mr-1" />
              <svg
                className="h-7 w-7 fill-sky-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path d="M19.965 8.521C19.988 8.347 20 8.173 20 8c0-2.379-2.143-4.288-4.521-3.965C14.786 2.802 13.466 2 12 2s-2.786.802-3.479 2.035C6.138 3.712 4 5.621 4 8c0 .173.012.347.035.521C2.802 9.215 2 10.535 2 12s.802 2.785 2.035 3.479A3.976 3.976 0 0 0 4 16c0 2.379 2.138 4.283 4.521 3.965C9.214 21.198 10.534 22 12 22s2.786-.802 3.479-2.035C17.857 20.283 20 18.379 20 16c0-.173-.012-.347-.035-.521C21.198 14.785 22 13.465 22 12s-.802-2.785-2.035-3.479zm-9.01 7.895-3.667-3.714 1.424-1.404 2.257 2.286 4.327-4.294 1.408 1.42-5.749 5.706z" />
              </svg>
            </h5>

            <span className="text-center text-lg font-semibold text-gray-400">
              My account
            </span>
          </div>
          <div className="my-3" />

          {/* Delete User Form Action. */}
          <Form method="post" action="/resources/user/delete">
            <button
              className="flex h-10 flex-row items-center rounded-xl border border-red-500 px-4 font-bold text-red-500 
              transition hover:scale-105 hover:brightness-200 active:opacity-80">
              Delete account
            </button>
          </Form>
        </div>
      </div>
    </div>
  )
}
