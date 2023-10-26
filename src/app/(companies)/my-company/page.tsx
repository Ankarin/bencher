'use client'
import NoCompany from '@/app/(companies)/NoCompany'
import CompanyCard from '@/app/(companies)/CompanyCard'
import NotVerified from '@/app/(companies)/NotVerified'
import MyCompanyHeader from '@/app/(companies)/MyCompanyHeader'
import React from 'react'
import { Company, User } from '@/utils/types'
import { zust } from '@/store'

// export const revalidate = 60
export default function MyCompany() {
  const userData: User | null = zust((state) => state.user)
  const company: Company | null = zust((state) => state.myCompany)
  return (
    <div>
      {company && userData && !company.verified ? (
        <NotVerified></NotVerified>
      ) : (
        ''
      )}
      <div className='mx-auto mx-auto max-w-3xl px-5'>
        {!company && userData ? (
          <NoCompany></NoCompany>
        ) : (
          <div>
            {company && userData ? (
              <>
                <MyCompanyHeader verified={company.verified}></MyCompanyHeader>
                <CompanyCard company={company} isMine={true}></CompanyCard>{' '}
              </>
            ) : (
              ''
            )}
          </div>
        )}
      </div>
    </div>
  )
}
