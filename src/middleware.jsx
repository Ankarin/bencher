'use server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { getUserData } from 'src/utils/supabase';

// import { User } from 'src/utils/types';

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userData = await getUserData();

  if (
    (user && req.nextUrl.pathname === '/login') ||
    (user && req.nextUrl.pathname === '/register')
  ) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (!user && req.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (!userData.company_id && req.nextUrl.pathname === '/my-jobs' ||
    !userData.company_id && req.nextUrl.pathname === '/my-devs' ||
    !userData.company_id && req.nextUrl.pathname === '/add-job' ||
    !userData.company_id && req.nextUrl.pathname === '/add-dev') {
    return NextResponse.redirect(new URL('/my-company', req.url));
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
};
