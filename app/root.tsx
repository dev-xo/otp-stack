import type { LinksFunction, MetaFunction } from '@remix-run/node'

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

import TailwindCSS from './styles/tailwind.css'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: TailwindCSS }]
}

export const meta: MetaFunction = () => {
  return {
    viewport: 'width=device-width, initial-scale=1',
    charset: 'utf-8',
    title: 'Remix Otp Stack',
    description: `A One-Time Password authentication Strategy based on Remix Auth.`,
    keywords:
      'remix, remix-stack, remix-auth, typescript, sqlite, prisma, tailwindcss, fly.io',
    'og:title': 'Remix Otp Stack',
    'og:type': 'website',
    'og:url': 'https://remix-otp-stack.fly.dev',
    'og:image':
      'https://raw.githubusercontent.com/dev-xo/dev-xo/main/remix-auth-otp/assets/images/Thumbnail.png',
    'og:card': 'summary_large_image',
    'og:creator': '@DanielKanem',
    'og:site': 'https://remix-otp-stack.fly.dev',
    'og:description': `A One-Time Password authentication Strategy based on Remix Auth.`,
    'twitter:image':
      'https://raw.githubusercontent.com/dev-xo/dev-xo/main/remix-auth-otp/assets/images/Thumbnail.png',
    'twitter:card': 'summary_large_image',
    'twitter:creator': '@DanielKanem',
    'twitter:title': 'Remix Otp Stack ',
    'twitter:description': `A One-Time Password authentication Strategy based on Remix Auth.`,
  }
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />

        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}
