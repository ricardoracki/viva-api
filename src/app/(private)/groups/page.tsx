import { CreateGroupModal } from './_components/create-group-modal'
import { GroupsTable } from './_components/groups-table'
import { Pages } from './_components/pagination'
import { db } from '@/database/client'

export default async function Groups({
  searchParams,
}: {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const query = await searchParams

  const page = query?.page ? Number(query?.page) : 1
  const perPage = query?.perPage ? Number(query?.perPage) : 10

  const [groups, count] = await Promise.all([
    await db.groups.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: {
        permissions: 'asc',
      },
    }),
    await db.groups.count(),
  ])

  const numberOfPage = Math.ceil(count / perPage)

  return (
    <div className="flex h-screen overflow-auto flex-col p-6 pb-40 [&::-webkit-scrollbar]:hidden">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl text-text">Grupos e permissões</h1>
        <CreateGroupModal />
      </div>
      <section>
        <GroupsTable groups={groups} totalGroups={count} />
        <Pages numberOfPages={numberOfPage} page={page} />
      </section>
    </div>
  )
}
