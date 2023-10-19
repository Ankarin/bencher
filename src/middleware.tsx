'use server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse, NextRequest } from 'next/server'

import { User } from 'src/utils/types'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const getUserData = async (): Promise<User | null> => {
    if (user) {
      const { data, error } = await supabase
        .from('users')
        .select()
        .eq('id', user.id)
      if (error) throw error.message
      return data[0]
    } else return null
  }

  const userData = await getUserData()
  if (
    (user && req.nextUrl.pathname === '/login') ||
    (user && req.nextUrl.pathname === '/register')
  ) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  if (!user && req.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (
    (!userData?.company_id && req.nextUrl.pathname === '/my-jobs') ||
    (!userData?.company_id && req.nextUrl.pathname === '/my-devs') ||
    (!userData?.company_id && req.nextUrl.pathname === '/add-job') ||
    (!userData?.company_id && req.nextUrl.pathname === '/add-dev')
  ) {
    return NextResponse.redirect(new URL('/my-company', req.url))
  }
}

export const config = {
  matcher: [
    '/',
    '/my-company',
    '/edit-company',
    '/my-devs',
    '/add-dev',
    '/my-jobs',
    '/add-job',
    '/job/:id*',
    '/edit-dev/:id*',
  ],
}
