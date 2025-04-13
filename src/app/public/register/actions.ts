'use server'

import bcrypt from 'bcryptjs'
import { db } from '@/database/client'

type RegisterUserParams = {
  username: string
  password: string
  email: string
}

export async function registerUser({ password, ...data }: RegisterUserParams) {
  const salt = await bcrypt.genSalt(10)
  const pass = await bcrypt.hash(password, salt)

  return db.users.create({
    data: { ...data, password: pass, name: data.username },
  })
}
