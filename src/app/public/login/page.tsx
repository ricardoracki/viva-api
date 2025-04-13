'use client'

import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { InputBlock } from '@/components/input-block'
import Link from 'next/link'
import { Separator } from '@/components/separator'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  username: z.string().nonempty('Campo obrigatório').min(1, 'Usuário inválido'),
  password: z.string().nonempty('Campo obrigatório').min(1, 'Senha inválida'),
})

type FormSchema = z.infer<typeof formSchema>

export default function Login() {
  const [loading, setLoading] = useState(false)
  const { show: showToast } = useToast()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })
  const router = useRouter()

  async function onSubmit(data: FormSchema) {
    try {
      setLoading(true)
      const res = await signIn('credentials', { ...data, redirect: false })
      if (res?.ok) {
        router.replace('/dashboard')
      } else {
        showToast({ text: 'Usuário ou senha incorretos', variant: 'error' })
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container center>
      <div className="p-8 rounded shadow-md max-w-96 w-full bg-zinc-800 backdrop-blur-3xl border border-zinc-800/30">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold mb-6 text-center text-zinc-50">
            Acesse sua conta
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
            <div className="flex items-center justify-between">
              <InputBlock.Label htmlFor="password">Senha</InputBlock.Label>
              <Link
                href={'#'}
                className="text-primary font-semibold text-sm opacity-80 hover:opacity-100 transition-opacity"
              >
                Esqueci minha senha
              </Link>
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

          <Button type="submit" variant="primary" loading={loading}>
            Login
          </Button>
        </form>

        <Separator />
        <Button variant="outline" asChild>
          <Link href="/public/register">Não possuo conta</Link>
        </Button>
      </div>
    </Container>
  )
}
