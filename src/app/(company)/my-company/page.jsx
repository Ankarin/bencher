import NoCompany from './NoCompany'

// import {getCompanyData} from 'src/utils/supabase'
// import EditCompanyForm from "src/components/app/company/EditCompanyForm";


export default async function MyCompany() {
    // const companyData = await getCompanyData()
    const companyData = 0
    return (<div className='p-10 max-w-6xl mx-auto'>
            {(companyData === 0) ? <NoCompany></NoCompany> : ''}
        </div>

    )


}
