import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function PUT(request) {
  const body = await request.json();
  const supabase = createRouteHandlerClient({ cookies });
  const { data, error } = await supabase
    .from('companies')
    .insert({ name: body.name });
  if (error) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  } else {
    return NextResponse.json({ res: data });
  }
}
