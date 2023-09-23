import { create } from 'zustand';

const zust = create((set) => ({
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