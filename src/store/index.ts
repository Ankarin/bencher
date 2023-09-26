import { create } from 'zustand';

import { User, Developer, Company } from '@/utils/types';

interface ZustState {
  user: null | User; // Define the type for UserData
  setUser: (_user: User) => void;
  resetUser: () => void;

  myCompany: null | Company; // Define the type for CompanyData
  setCompany: (_company: null | Company) => void;
  resetCompany: () => void;

  myDevelopers: Developer[]; // Define the type for DeveloperData
  setMyDevelopers: (_developer: Developer[]) => void;
  resetMyDevelopers: () => void;
}


const zust = create<ZustState>((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  resetUser: () => set({ user: null }),

  myCompany: null,
  setCompany: (companyData) => set({ myCompany: companyData }),
  resetCompany: () => set({ myCompany: null }),

  myDevelopers: [],
  setMyDevelopers: (developers) => set({ myDevelopers: developers }),
  resetMyDevelopers: () => set({ myDevelopers: [] }),
}));

export { zust };
