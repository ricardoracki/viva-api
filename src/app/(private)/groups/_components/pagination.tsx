'use client'

import { Pagination } from '@/components/pagination'
import { useRouter } from 'next/navigation'

type PagesProps = {
  page: number
  numberOfPages: number
}

export const Pages = ({ numberOfPages, page }: PagesProps) => {
  const router = useRouter()
  return (
    <Pagination className="mt-4">
      <Pagination.Previous
        disabled={page === 1}
        onClick={() => router.replace(`?page=${page - 1}`)}
      />
      {Array.from({ length: numberOfPages }, (_, index) => index + 1).map(
        (index) => (
          <Pagination.Item
            onClick={() => router.replace(`?page=${index}`)}
            selected={index === page}
            key={`Pagination ${index}`}
            disabled={index === page}
          >
            {index}
          </Pagination.Item>
        )
      )}
      <Pagination.Next
        disabled={page === numberOfPages}
        onClick={() => router.replace(`?page=${page + 1}`)}
      />
    </Pagination>
  )
}
