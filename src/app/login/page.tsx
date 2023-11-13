'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/utils/supabase/client'
import { ArrowLeft, Mail } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  async function signInWithMagicLink(formData: FormData) {
    const supabase = createClient()

    const origin = location.origin
    const email = formData.get('email') as string

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      return redirect('/login?message=Não foi possível autenticar o usuário.')
    }

    return redirect(
      '/login?message=Clique no link que enviamos para se autenticar.',
    )
  }

  async function signInWithGoogle() {
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })

    if (error) throw error
  }

  return (
    <div className="flex items-center justify-center h-screen p-8">
      {searchParams?.message ? (
        <div className="flex flex-col gap-2 w-full">
          <Link href="/login">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
            </Button>
          </Link>
          <Alert>
            <Mail className="h-4 w-4" />
            <AlertTitle>Verifique o seu e-mail</AlertTitle>
            <AlertDescription>{searchParams.message}</AlertDescription>
          </Alert>
        </div>
      ) : (
        <div className="flex flex-col gap-4 w-full">
          <Button variant="outline" onClick={signInWithGoogle}>
            Continuar com o Google
          </Button>
          <hr />
          <form
            className="flex flex-col gap-6 w-full justify-center text-foreground"
            action={signInWithMagicLink}
          >
            <div className="space-y-1">
              <Label htmlFor="email">E-mail</Label>
              <Input name="email" placeholder="exemplo@exemplo.com" required />
            </div>
            <Button type="submit">Confirmar e-mail</Button>
          </form>
        </div>
      )}
    </div>
  )
}
