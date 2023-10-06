import { Developer } from '@/utils/types';
import DevCard from '@/app/(developers)/DevCard';

export default function DevList({ developers, isMine = false }: { developers: Developer[], isMine?: boolean }) {
  return <div className='mx-auto grid gap-3  max-w-3xl md:my-10 my-5  '>
    {developers.map((dev) => (<DevCard key={dev.id} isMine={isMine} developer={dev}></DevCard>))}
  </div>;
}
