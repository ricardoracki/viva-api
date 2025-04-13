import { Container } from '@/components/container'
import { Nav } from './_components/nav'
import { PropsWithChildren } from 'react'
import { TopBar } from './_components/top-bar'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Container className="overflow-hidden flex flex-col">
      <TopBar />
      <div className="flex flex-row flex-1 overflow-hidden">
        <Nav />
        <section className="flex-1">{children}</section>
      </div>
    </Container>
  )
}
