import { getDevs } from '@/utils/supabase';

export default async function Developers() {
  const developers = await getDevs();
  console.log(developers);

  return <div className={'mx-auto max-w-5xl px-2 md:px-5'}>asdasd</div>;

}
