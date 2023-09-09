// 'use server'
// import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
// import {cookies} from 'next/headers'
//
// const getSupabase = async () => {
//     return createServerComponentClient({cookies});
// }
// const supabase = await getSupabase()
//
// const getUser = async () => {
//     const {data, error} = await supabase.auth.getUser()
//     if (error) {
//         console.log(error)
//     } else {
//         return data.user
//     }
// }
// const getUserData = async () => {
//     const user = await getUser()
//

//
// }
//
// const getCompanyData = async () => {
//     const userData = await getUserData()
//     if (userData.company_id) {
//         const {data, error} = await supabase
//             .from('companies')
//             .select().eq('id', userData.company_id)
//         if (error) {
//             console.log(error)
//         } else {
//             return data
//         }
//     } else {
//         return 0
//     }
//
// }
//
//
// export {getUser, getUserData, getCompanyData}
