import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const signInURL = new URL('/login', req.url)
  const dashboardURL = new URL('/dashboard', req.url)

  if (!session) {
    if (req.nextUrl.pathname === '/login') {
      return res
    }

    return NextResponse.redirect(signInURL)
  }

  if (req.nextUrl.pathname === '/login') {
    return NextResponse.redirect(dashboardURL)
  }
}

export const config = {
  matcher: ['/login', '/dashboard/:path*', '/game/:path*'],
}
