import DevForm from '@/app/(developers)/DevForm';
import { getCompanyData, getDev } from '@/utils/supabase';


export default async function EditDev({ params }) {
  let dev = await getDev(params.slug);
  const myCompany = await getCompanyData();
  if (dev && dev.company !== myCompany.id) {
    dev = null;
  }


  return (
    <div className={'mx-auto max-w-5xl p-5'}>
      {dev ? <DevForm isNew={false} dev={dev}></DevForm> : <p>Developer not found</p>}
    </div>
  );
}
