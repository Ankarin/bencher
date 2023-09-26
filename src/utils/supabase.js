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
  if (data.user) {
    return data.user;
  } else {
    return null;
  }
};

const getUserData = async () => {
  const supabase = await supa();
  const user = await getUser();
  if (user) {
    const { data, error } = await supabase.from('users').select().eq('id', user.id);
    if (error) throw error.message;
    return data[0];
  } else {
    return null;
  }
};
const getCompanyData = async () => {
  const supabase = await supa();
  const userData = await getUserData();
  if (userData) {
    const { data, error } = await supabase.from('companies').select().eq('id', userData.company_id);
    if (error) throw error.message;
    return data[0];
  } else {
    return null;
  }

};

const getCompanies = async () => {
  const supabase = await supa();
  const { data, error } = await supabase.from('companies').select();
  if (error) throw error.message;
  return data;
};


export { getUser, getUserData, getCompanyData, getCompanies };
