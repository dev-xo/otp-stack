import { Link } from '@remix-run/react'

export default function Index() {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      {/* Main. */}
      <div className="relative flex flex-col items-center">
        {/* Logo. */}
        <div className="flex flex-col">
          <p className="flex flex-row items-center text-sm font-bold text-gray-400">
            INSERT CODE <span className="blinker ml-2" />
          </p>
          <div className="mb-2" />

          <img
            src="https://raw.githubusercontent.com/dev-xo/dev-xo/main/assets/images/email.png"
            alt=""
            className="absolute right-[28px] top-[-18px] z-10 h-20 w-20 rotate-[28deg] transform select-none transition hover:scale-110"
          />
          <div className="flex flex-row items-center">
            <input
              type="text"
              defaultValue="R"
              className="h-16 w-14 rounded-xl border border-gray-700 bg-transparent text-center text-4xl font-bold text-gray-200"
            />
            <div className="mx-1" />
            <input
              type="text"
              defaultValue="E"
              className="h-16 w-14 rounded-xl border border-gray-700 bg-transparent text-center text-4xl font-bold text-gray-200"
            />
            <div className="mx-1" />
            <input
              type="text"
              defaultValue="M"
              className="h-16 w-14 rounded-xl border border-gray-700 bg-transparent text-center text-4xl font-bold text-gray-200"
            />
            <div className="mx-1" />
            <input
              type="text"
              defaultValue="I"
              className="h-16 w-14 rounded-xl border border-gray-700 bg-transparent text-center text-4xl font-bold text-gray-200"
            />
            <div className="mx-1" />
            <input
              type="text"
              defaultValue="X"
              className="h-16 w-14 rounded-xl border border-gray-700 bg-transparent text-center text-4xl font-bold text-gray-200"
            />
          </div>
        </div>
        <div className="mb-6" />

        <div className="flex cursor-default flex-col items-center">
          <h1 className="text-center text-8xl font-bold text-gray-200">
            One Time
            <br />
            <span
              className="bg-gradient-to-b from-violet-200 to-violet-500 
							bg-clip-text text-transparent transition hover:brightness-125">
              Password
            </span>
          </h1>
        </div>
        <div className="mb-8" />

        <p className="max-w-sm text-center text-xl font-semibold text-gray-400">
          A One-Time Password Authentication Strategy for{' '}
          <a
            href="https://github.com/sergiodxa/remix-auth"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-100 underline decoration-gray-500 transition 
						hover:text-violet-200 hover:decoration-violet-200 active:opacity-80">
            Remix Auth.
          </a>
        </p>
        <div className="mb-6" />

        {/* Buttons. */}
        <div className="flex flex-row items-center">
          <a
            href="https://github.com/dev-xo/remix-auth-otp-stack"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 flex-row items-center rounded-xl border border-gray-600 px-6 text-base font-bold text-gray-200 
						transition hover:scale-105 hover:border-gray-200 hover:text-gray-100 active:opacity-80">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <div className="mx-1" />
            GitHub Documentation
          </a>
          <div className="mx-2" />

          <Link
            to="/login"
            prefetch="intent"
            className="flex h-12 flex-row items-center rounded-xl bg-violet-500 px-6 text-base font-bold 
						text-gray-100 transition hover:scale-105 hover:brightness-125 active:opacity-80">
            Log In
          </Link>
        </div>
      </div>
    </main>
  )
}
