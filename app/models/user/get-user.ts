import type { User } from '@prisma/client'
import { db } from '~/utils/db'

export async function getUserById(id: User['id']) {
  return db.user.findUnique({
    where: { id },
  })
}

export async function getUserByEmail(email: User['email']) {
  return db.user.findUnique({
    where: { email },
  })
}