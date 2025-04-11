"use client";
import { InputBlock } from "@/components/input-block";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/separato";
import { Button } from "@/components/button";
import Link from "next/link";

const formSchema = z.object({
  username: z.string().nonempty("Campo obrigatório").min(1, "Usuário inválido"),
  password: z.string().nonempty("Campo obrigatório").min(1, "Senha inválida"),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: FormSchema) {
    console.log(data);
  }

  return (
    <div className="h-screen flex items-center justify-center bg-background  ">
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
                {...register("username")}
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
                href={"#"}
                className="text-primary font-semibold text-sm opacity-80 hover:opacity-100 transition-opacity"
              >
                Esqueci minha senha
              </Link>
            </div>
            <InputBlock.FieldRoot>
              <InputBlock.Field
                id="password"
                {...register("password")}
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

          <Button type="submit" variant="primary">
            Login
          </Button>
        </form>

        <Separator />
        <Button variant="outline" asChild>
          <Link href="/register">Não possuo conta</Link>
        </Button>
      </div>
    </div>
  );
}
