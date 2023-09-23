'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabase = createClientComponentClient();


const updateUserData = async (params) => {
  const { data, error } = await supabase.from('users').update(params).eq('id', params.id);
  if (error) {
    return error;
  } else {
    return data;
  }
};
const updateCompany = async (params) => {

  await supabase.from('companies').update(params).eq('id', params.id);
};
const createCompany = async (params) => {
  const { data: { user } } = await supabase.auth.getUser();
  params.admin = user.id;
  const res = await supabase.from('companies').insert(params).select();
  await supabase.from('users').update({ company_id: res.data[0].id }).eq('id', user.id);
  return res;
};


const getCompanyData = async (company_id) => {
  const res = await supabase.from('companies').select().eq('id', company_id);
  return res.data[0];
};

export { updateUserData, updateCompany, createCompany, getCompanyData };
