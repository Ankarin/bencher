import { Developer } from '@/utils/types'
import DevList from '@/app/(developers)/DevList'
import { zust } from '@/store'

export default function ApplyList() {
  const developers: Developer[] = zust((state) => state.myDevelopers)

  return (
    <div className={'mx-auto -mt-2 px-2 sm:-mt-5'}>
      <DevList
        isMine={true}
        developers={developers.filter((item) => item.public)}
      ></DevList>
    </div>
  )
}
