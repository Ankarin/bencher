import { useContext, useState } from 'react'
import { Button } from '@/components/landing/Button'
import { ExistingDeveloper, FormSubmit } from '@/utils/types'
import { SelectDevContext } from '@/app/(apply)/(select-dev-and-apply)/Apply'

export default function SelectToApply({
  developer,
}: {
  developer: ExistingDeveloper
}) {
  const apply = useContext(SelectDevContext)
  const [used, setUsed] = useState(false)
  const selectToApply = (e: FormSubmit) => {
    e.preventDefault()
    setUsed(true)
    apply(developer)
  }

  return (
    <Button
      className='h-10'
      loading={false}
      disabled={used}
      variant='solid'
      color='blue'
      onClick={selectToApply}
    >
      Select
    </Button>
  )
}
