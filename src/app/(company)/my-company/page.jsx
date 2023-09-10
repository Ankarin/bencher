import NoCompany from './NoCompany'

import {getCompanyData} from 'src/utils/supabase'


export default async function MyCompany() {
    const companyData = await getCompanyData()
    return (<div className='p-10 max-w-6xl mx-auto'>
            {(companyData === 0) ? <NoCompany></NoCompany> : ''}
        </div>

    )


}
