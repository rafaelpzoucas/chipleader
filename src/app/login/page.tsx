'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/utils/supabase/client'
import { ArrowLeft, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import googleLogo from '../../../public/google-logo.svg'

export default function Login({
  searchParams,
}: {
  searchParams: { message: string; invite: string; buyin: string }
}) {
  const supabase = createClient()

  async function signInWithMagicLink(formData: FormData) {
    const origin = location.origin
    const email = formData.get('email') as string

    const redirectURL =
      searchParams.invite && searchParams.buyin
        ? `${origin}/auth/callback?invite=${searchParams.invite}&buyin=${searchParams.buyin}`
        : `${origin}/auth/callback`

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectURL,
      },
    })

    if (error) {
      return redirect('/login?message=error')
    }

    return redirect('/login?message=confirm')
  }

  async function signInWithGoogle() {
    const redirectURL =
      searchParams.invite && searchParams.buyin
        ? `${origin}/auth/callback?invite=${searchParams.invite}&buyin=${searchParams.buyin}`
        : `${origin}/auth/callback`

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectURL,
      },
    })

    if (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen p-8">
      <div className="w-full max-w-sm">
        {searchParams?.message === 'confirm' ? (
          <div className="flex flex-col gap-2 w-full">
            <Link href="/login">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
              </Button>
            </Link>
            <Alert>
              <Mail className="h-4 w-4" />
              <AlertTitle>Verifique o seu e-mail</AlertTitle>
              <AlertDescription>
                Clique no link que enviamos para se autenticar.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full">
            <Button variant="outline" onClick={signInWithGoogle}>
              <Image
                src={googleLogo}
                width={20}
                height={20}
                alt="G"
                className="mr-2"
              />
              Continuar com o Google
            </Button>
            <hr />
            <form
              className="flex flex-col gap-6 w-full justify-center text-foreground"
              action={signInWithMagicLink}
            >
              <div className="space-y-1">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  name="email"
                  placeholder="exemplo@exemplo.com"
                  required
                />
                {searchParams?.message === 'error' && (
                  <p className="text-xs text-destructive">
                    Não foi possível autenticar o usuário.
                  </p>
                )}
              </div>
              <Button type="submit">Confirmar e-mail</Button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
