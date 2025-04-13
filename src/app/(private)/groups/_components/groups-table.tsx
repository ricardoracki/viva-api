'use client'

import { Edit, EyeIcon, Trash } from 'lucide-react'
import { Modal, ModalBody, ModalTrigger } from '@/components/modal'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/table'
import { useRef, useState } from 'react'

import { Button } from '@/components/button'
import Link from 'next/link'
import { PermissionsDescriptions } from '@/permissions'
import { deleteGroup } from '../actions'
import { useToast } from '@/hooks/use-toast'

type Group = {
  id: string
  name: string
  permissions: string[]
}

type GroupsTableProps = {
  groups: Group[]
  totalGroups: number
}

export const GroupsTable = ({ groups, totalGroups }: GroupsTableProps) => {
  const [target, setTarget] = useState<null | string>(null)
  const modalRef = useRef<any>(null)
  const { show: showToast } = useToast()

  async function handleDelete() {
    try {
      await deleteGroup(target as string)
      showToast({
        variant: 'success',
        text: 'Grupo excluído com sucesso',
        time: 120000,
      })
    } catch (e) {
      console.log(e)
      showToast({
        variant: 'error',
        text: 'Ocorreu um erro inesperado',
      })
    }
  }

  return (
    <>
      <Modal ref={modalRef}>
        <ModalBody
          title={'Deseja realmente excluir este grupo?'}
          hideCloseButton
          className="gap-2 flex "
        >
          <ModalTrigger variant="outline">Cancelar</ModalTrigger>
          <ModalTrigger
            variant="danger"
            className="gap-2"
            onClick={handleDelete}
          >
            <Trash size={18} />
            Sim
          </ModalTrigger>
        </ModalBody>
      </Modal>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Grupo</TableHead>
            <TableHead>Permissões</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groups.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <p className="text-sm overflow-ellipsis line-clamp-2">
                  {item.permissions
                    .map(
                      (a) =>
                        PermissionsDescriptions[
                          a as keyof typeof PermissionsDescriptions
                        ]
                    )
                    .join(', ')}
                </p>
              </TableCell>
              <TableCell className="flex gap-2">
                <Button
                  size="icon-sm"
                  variant="outline"
                  title="Ver membros"
                  asChild
                >
                  <Link href={`/users?group=${item.id}`}>
                    <EyeIcon size={16} />
                  </Link>
                </Button>
                <Button size="icon-sm" variant="warning" title="Editar grupo">
                  <Edit size={16} />
                </Button>
                <Button
                  size="icon-sm"
                  variant="danger"
                  title="Excluir grupo"
                  onClick={() => {
                    setTarget(item.id)
                    modalRef.current?.open()
                  }}
                >
                  <Trash size={18} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="text-center">
              Exibindo {groups.length} grupos de {totalGroups}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  )
}
