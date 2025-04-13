import { HTMLAttributes, Ref, TdHTMLAttributes, forwardRef } from 'react'

import { cn } from '@/utils/cn'

const Table = forwardRef(
  (
    { className, ...props }: HTMLAttributes<HTMLTableElement>,
    ref: Ref<HTMLTableElement>
  ) => (
    <table
      ref={ref}
      className={cn('caption-bottom overflow-auto relative w-full', className)}
      {...props}
    />
  )
)
const TableHeader = forwardRef(
  (
    { className, ...props }: HTMLAttributes<HTMLTableSectionElement>,
    ref: Ref<HTMLTableSectionElement>
  ) => (
    <thead
      ref={ref}
      className={cn('[&_tr]:pointer-events-none', className)}
      {...props}
    />
  )
)

const TableBody = forwardRef(
  (
    { className, ...props }: HTMLAttributes<HTMLTableSectionElement>,
    ref: Ref<HTMLTableSectionElement>
  ) => (
    <tbody
      ref={ref}
      className={cn('[&_tr]:last:border-0', className)}
      {...props}
    />
  )
)

const TableFooter = forwardRef(
  (
    { className, ...props }: HTMLAttributes<HTMLTableSectionElement>,
    ref: Ref<HTMLTableSectionElement>
  ) => (
    <tfoot
      ref={ref}
      className={cn(
        '[&_tr]:border-0 [&_tr]:bg-zinc-800 [&_tr]:text-xs font-medium [&_tr]:pointer-events-none',
        className
      )}
      {...props}
    />
  )
)

const TableRow = forwardRef(
  (
    { className, ...props }: HTMLAttributes<HTMLTableRowElement>,
    ref: Ref<HTMLTableRowElement>
  ) => (
    <tr
      ref={ref}
      className={cn(
        'hover:bg-zinc-700 transition-colors border-b border-gray-700',
        className
      )}
      {...props}
    />
  )
)

const TableHead = forwardRef(
  (
    { className, ...props }: HTMLAttributes<HTMLTableCellElement>,
    ref: Ref<HTMLTableCellElement>
  ) => (
    <th
      ref={ref}
      className={cn(
        'text-text font-medium text-gray-300 align-middle h-10 text-start ',
        className
      )}
      {...props}
    />
  )
)

const TableCell = forwardRef(
  (
    { className, ...props }: TdHTMLAttributes<HTMLTableCellElement>,
    ref: Ref<HTMLTableCellElement>
  ) => (
    <td ref={ref} className={cn('text-text py-3 px-2', className)} {...props} />
  )
)

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
}
