import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../public/chipleader-logo.svg'

export default async function Index() {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <Image src={logo} width={100} height={100} alt="Chipleader" />
      <h1 className="flex flex-row items-center justify-center gap-2 text-2xl font-bold mt-4">
        Chipleader
      </h1>
      <p>Faça seu login para começar.</p>

      <Link
        href="/login"
        className="w-full max-w-xs flex rounded-md no-underline mt-8 bg-btn-background hover:bg-btn-background-hover"
      >
        <Button className="w-full">Login</Button>
      </Link>
    </div>
  )
}
