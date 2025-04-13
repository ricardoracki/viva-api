'use server'

import { db } from '@/database/client'
import { revalidatePath } from 'next/cache'

type Group = {
  name: string
  color: string
  permissions: string[]
}

export async function createGroup(data: Group) {
  const group = await db.groups.create({ data })

  revalidatePath('/groups')
  return group
}

export async function deleteGroup(id: string) {
  await db.groups.delete({ where: { id } })
  revalidatePath('/groups')
}
