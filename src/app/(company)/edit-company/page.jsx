import EditCompanyForm from 'src/components/app/company/EditCompanyForm'


export default async function MyCompany() {
    const companyData = 0

    return (<div className='p-10 max-w-6xl mx-auto'>
            <EditCompanyForm company={companyData}></EditCompanyForm>
        </div>

    )


}
