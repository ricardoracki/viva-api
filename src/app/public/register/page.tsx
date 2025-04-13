'use client'

import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { InputBlock } from '@/components/input-block'
import Link from 'next/link'
import { Separator } from '@/components/separator'
import { registerUser } from './actions'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z
  .object({
    username: z
      .string()
      .nonempty('Campo obrigatório')
      .min(1, 'Usuário inválido'),
    password: z.string().nonempty('Campo obrigatório').min(1, 'Senha inválida'),
    email: z.string().email('E-mail inválido'),
    repeatPassword: z
      .string()
      .nonempty('Campo obrigatório')
      .min(1, 'Senha inválida'),
  })
  .refine((data) => data.password === data.repeatPassword, {
    path: ['repeatPassword'],
    message: 'As senhas não conferem',
  })

type FormSchema = z.infer<typeof formSchema>

export default function Register() {
  const [loading, setLoading] = useState(false)
  const { show: showToast } = useToast()
  const router = useRouter()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit({ repeatPassword, ...data }: FormSchema) {
    try {
      setLoading(true)
      await registerUser(data)
      showToast({ text: 'Conta criada com sucesso', variant: 'success' })
      router.push('/login')
    } catch (error: any) {
      console.log(error)
      if (error?.message?.includes('Unique')) {
        return showToast({ text: 'Este usuário ja existe', variant: 'error' })
      }

      showToast({ text: 'Ocorreu um erro inesperado', variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container center>
      <div className="p-8 rounded shadow-md max-w-96 w-full bg-zinc-800 backdrop-blur-3xl border border-zinc-800/30">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold mb-6 text-center text-zinc-50">
            Criar conta
          </h2>
          <InputBlock>
            <InputBlock.Label htmlFor="user">Usuário</InputBlock.Label>
            <InputBlock.FieldRoot>
              <InputBlock.Field
                id="user"
                placeholder="Seu nome de usuário"
                autoComplete="false"
                autoFocus
                autoCapitalize="false"
                {...register('username')}
              />
            </InputBlock.FieldRoot>
            {errors.username && (
              <InputBlock.ErrorMessage>
                {errors.username?.message}
              </InputBlock.ErrorMessage>
            )}
          </InputBlock>
          <InputBlock>
            <InputBlock.Label htmlFor="email">E-mail</InputBlock.Label>
            <InputBlock.FieldRoot>
              <InputBlock.Field
                id="email"
                placeholder="E-mail"
                type="email"
                autoCorrect="false"
                {...register('email')}
              />
            </InputBlock.FieldRoot>
            {errors.email && (
              <InputBlock.ErrorMessage>
                {errors.email?.message}
              </InputBlock.ErrorMessage>
            )}
          </InputBlock>
          <InputBlock>
            <div className="flex items-center justify-between">
              <InputBlock.Label htmlFor="password">Senha</InputBlock.Label>
            </div>
            <InputBlock.FieldRoot>
              <InputBlock.Field
                id="password"
                {...register('password')}
                type="password"
                placeholder="Sua senha"
              />
            </InputBlock.FieldRoot>
            {errors.password && (
              <InputBlock.ErrorMessage>
                {errors.password?.message}
              </InputBlock.ErrorMessage>
            )}
          </InputBlock>
          <InputBlock>
            <div className="flex items-center justify-between">
              <InputBlock.Label htmlFor="password">
                Repita a Senha
              </InputBlock.Label>
            </div>
            <InputBlock.FieldRoot>
              <InputBlock.Field
                id="password"
                {...register('repeatPassword')}
                type="password"
                placeholder="Repita sua senha"
              />
            </InputBlock.FieldRoot>
            {errors.repeatPassword && (
              <InputBlock.ErrorMessage>
                {errors.repeatPassword?.message}
              </InputBlock.ErrorMessage>
            )}
          </InputBlock>

          <Button type="submit" variant="primary" loading={loading}>
            Criar Conta
          </Button>
        </form>

        <Separator />
        <Button variant="outline" asChild>
          <Link href="/public/login">Já possuo conta</Link>
        </Button>
      </div>
    </Container>
  )
}
