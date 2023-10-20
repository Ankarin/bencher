import { useContext } from 'react'
import { Button } from '@/components/landing/Button'
import { ExistingDeveloper, FormSubmit } from '@/utils/types'
import { SelectDevContext } from '@/app/(jobs)/(apply)/Apply'

export default function SelectToApply({
  developer,
}: {
  developer: ExistingDeveloper
}) {
  const apply = useContext(SelectDevContext)

  const selectToApply = (e: FormSubmit) => {
    e.preventDefault()
    apply(developer)
  }

  return (
    <Button
      className='h-10'
      loading={false}
      variant='solid'
      color='blue'
      onClick={selectToApply}
    >
      Select
    </Button>
  )
}
