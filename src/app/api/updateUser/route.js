import {NextResponse} from "next/server";
import {createRouteHandlerClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

export async function PATCH(request) {
    const body = await request.json()
    try {
        const supabase = createRouteHandlerClient({cookies})
        const {data: {user}} = await supabase.auth.getUser()
        const {data} = await supabase
            .from('users')
            .update(body).eq('id', user.id)
        return NextResponse.json({res: data}, {status: 200})
    } catch (e) {
        NextResponse.json({error: e}, {status: 500})
    }


}
