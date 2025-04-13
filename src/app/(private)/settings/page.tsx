import { SignoutButton } from './_components/signout'
import { getServerAuthSession } from '@/backend/auth'

export default async function Groups() {
  const session = await getServerAuthSession()

  return (
    <div className="flex h-full overflow-auto flex-col p-6 pb-40  [&::-webkit-scrollbar]:hidden">
      <h1 className="font-bold text-xl text-text">
        Nome{' '}
        <pre className="text-red-700 bg-red-300/10 w-fit p-1 rounded ">
          {session?.user?.name}
        </pre>
      </h1>
      <SignoutButton />
    </div>
  )
}
