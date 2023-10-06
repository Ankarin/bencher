'use server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = String(formData.get('email'))
  const supabase = createRouteHandlerClient({ cookies })

  const { error } = supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${requestUrl.origin}/api/auth/reset-callback`,
  })

  if (error) {
    console.log(error)
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=${error}`,
      301
    )
  }

  return NextResponse.redirect(`${requestUrl.origin}/signup?res=forgot`, 301)
}
