import MineApplies from '@/app/(apply)/my-applies/MineApplies'

export default async function MyApplies() {
  return (
    <main className={'mx-auto max-w-3xl px-5'}>
      <div className='mt-2 md:flex md:items-center md:justify-between'>
        <div className='min-w-0 flex-1'>
          <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>
            Jobs you applied to:
          </h2>
        </div>
      </div>
      <MineApplies></MineApplies>
    </main>
  )
}
