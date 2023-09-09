import {NextResponse} from "next/server";
import {createRouteHandlerClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

export async function GET(request) {
    switch (request.method) {
        case 'GET' :
            return await getUserData();
            break;
        case 'PATCH' :
            return await patchUserData(request.json());
            break;
        default:
            break
    }


}


const getUserData = async () => {
    try {
        const supabase = createRouteHandlerClient({cookies})
        const {data: {user}} = await supabase.auth.getUser()
        const {data} = await supabase
            .from('users')
            .select().eq('id', user.id)
        return NextResponse.json({res: data}, {status: 200})
    } catch (e) {
        NextResponse.json({error: e}, {status: 500})
    }
}

const patchUserData = async (body) => {
    try {
        console.log(body)
        const supabase = createRouteHandlerClient({cookies})
        const {data: {user}} = await supabase.auth.getUser()
        // const {data} = await supabase
        //     .from('users')
        //     .update(body).eq('id', user.id)
        return NextResponse.json({res: body}, {status: 200})
    } catch (e) {
        NextResponse.json({error: e}, {status: 500})
    }
}
