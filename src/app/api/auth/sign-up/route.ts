import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))
  const supabase = createRouteHandlerClient({ cookies })
  const first_name = String(formData.get('firstName'))
  const last_name = String(formData.get('lastName'))
  const user_type = String(formData.get('type'))

  const type =
    user_type === 'I want to find developers.'
      ? 'basic'
      : user_type === 'I want to find and offer developers.'
      ? 'provider'
      : 'basic'

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name,
        last_name,
        type,
        email,
      },
      emailRedirectTo: `${requestUrl.origin}/api/auth/callback`,
    },
  })

  if (error) {
    return NextResponse.redirect(`${requestUrl.origin}/signup?res=error`, 301)
  }

  if (data.user?.identities?.length === 0) {
    return NextResponse.redirect(`${requestUrl.origin}/signup?res=exists`, 301)
  }

  return NextResponse.redirect(`${requestUrl.origin}/signup?res=confirm`, 301)
}
