import type { User } from '@prisma/client'
import { createCookieSessionStorage } from '@remix-run/node'

export type UserSession = User & {}

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '_session',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [process.env.SESSION_SECRET || 'STRONG_SECRET'],
    secure: process.env.NODE_ENV === 'production',
  },
})

export const { getSession, commitSession, destroySession } = sessionStorage
