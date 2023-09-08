import EditCompanyForm from '@/components/app/company/EditCompanyForm'

import {getCompanyData} from '@/utils/supabase'
export default async function MyCompany() {
const companyData = getCompanyData()
    return (
<EditCompanyForm company={companyData}></EditCompanyForm>
    )
}
