import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const req = await request.json()

  const { error } = await supabase.from('applies').insert(req)
  if (error) return NextResponse.json({ error: error }, { status: 500 })
  else {
    return NextResponse.json({ message: 'success' }, { status: 200 })
  }
}
