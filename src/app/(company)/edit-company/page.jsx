import EditCompanyForm from './EditCompanyForm'
import{getCompanyData, getUser, getUserData} from "src/utils/supabase";


export default async function MyCompany() {
const user = await getUser()
const userData = await getUserData(user.id)
    const companyData = userData.company_id ? await getCompanyData(userData.company_id) : 0
    return (<div className='p-10 max-w-6xl mx-auto'>
            <EditCompanyForm company={companyData} user={user}></EditCompanyForm>
        </div>
    )


}
