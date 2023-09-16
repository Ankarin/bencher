'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const supa = async () => {
  'use server';
  return createServerComponentClient({ cookies });
};


const getUser = async () => {
  'use server';
  const supabase = await supa();
  const { data } = await supabase.auth.getUser();
  return data.user;
};

const getUserData = async (uid) => {
  'use server';
  const supabase = await supa();

  const { data } = await supabase.from('users').select().eq('id', uid);
  return data[0];
};
const getCompanyData = async (company_id) => {
  'use server';
  const supabase = await supa();
  const res = await supabase.from('companies').select().eq('id', company_id);
  return res.data[0];
};

const getCompanies = async () => {

  'use server';
  const supabase = await supa();
  const res = await supabase.from('companies').select();
  return res.data;
};


export { getUser, getUserData, getCompanyData, getCompanies };
