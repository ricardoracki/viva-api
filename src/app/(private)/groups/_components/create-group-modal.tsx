'use client'

import { Modal, ModalBody, ModalTrigger } from '@/components/modal'
import { PERMISSIONS, PermissionsDescriptions } from '@/permissions'
import { useRef, useState } from 'react'

import { Button } from '@/components/button'
import { Checkbox } from '@/components/checkbox'
import { InputBlock } from '@/components/input-block'
import { Plus } from 'lucide-react'
import { createGroup } from '../actions'
import { useForm } from 'react-hook-form'
import { useToast } from '@/hooks/use-toast'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  name: z.string().nonempty('Campo obrigatório').min(3, 'Mínimo 3 caracteres'),
  color: z.string(),
})

type FormSchema = z.infer<typeof formSchema>

export const CreateGroupModal = () => {
  const [loading, setLoading] = useState(false)
  const [permissions, setPermissions] = useState<string[]>([])
  const modalRef = useRef<any>(null)
  const { show: showToast } = useToast()

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<FormSchema>({ resolver: zodResolver(formSchema) })

  async function onSubmit(data: FormSchema) {
    try {
      setLoading(true)
      await createGroup({ ...data, permissions })
      showToast({ variant: 'success', text: 'Grupo criado com sucesso' })
      modalRef.current?.close() // fecha modal de criação
      control._reset() // reinicia o formulário
      setPermissions([]) // Limpa lista de permissões
    } catch (e: any) {
      console.error(e)
      if (e.message.includes('Unique')) {
        control.setError('name', { message: 'Este grupo já existe' })
        return showToast({ variant: 'error', text: 'Este grupo já existe' })
      }
      showToast({ variant: 'error', text: 'Ocorreu um erro inesperado' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal ref={modalRef}>
      <ModalTrigger variant="primary" className="w-fit min-w-34 gap-2 ">
        <Plus />
        Criar Grupo
      </ModalTrigger>
      <ModalBody title="Criar grupo">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputBlock>
            <InputBlock.Label>Nome</InputBlock.Label>
            <InputBlock.FieldRoot>
              <InputBlock.Field {...register('name')} />
            </InputBlock.FieldRoot>
            {errors.name && (
              <InputBlock.ErrorMessage>
                {errors.name.message}
              </InputBlock.ErrorMessage>
            )}
          </InputBlock>
          <InputBlock>
            <InputBlock.Label>Cor</InputBlock.Label>
            <InputBlock.FieldRoot>
              <InputBlock.Field type="color" {...register('color')} />
            </InputBlock.FieldRoot>
          </InputBlock>
          <div className="gap-3 flex flex-col mb-3">
            {PERMISSIONS.map((a) => (
              <Checkbox
                key={a}
                label={PermissionsDescriptions[a]}
                inputProps={{
                  onChange: (e) => {
                    if (e.target.checked) {
                      setPermissions((prev) => [...prev, a])
                    } else {
                      setPermissions((prev) => prev.filter((b) => b !== a))
                    }
                  },
                  checked: permissions.includes(a),
                }}
              />
            ))}
          </div>
          <Button variant="primary" type="submit" loading={loading}>
            Salvar
          </Button>
        </form>
      </ModalBody>
    </Modal>
  )
}
