import { Developer } from '@/utils/types';
import DevCard from '@/components/cards/DevCard';

export default function DevList({ developers }: { developers: Developer[] }) {
  return <div className='mx-auto grid gap-3  max-w-3xl md:my-10 my-5  '>
    {developers.map((dev) => (<DevCard key={dev.id} developer={dev}></DevCard>))}
  </div>;
}
