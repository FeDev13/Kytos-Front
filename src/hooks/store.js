import {create} from 'zustand';

export const useStore = create((set) => ({
  patients: [],
  setPatients: (newPatient) => set({patients: newPatient}),
  urgentPatientsList: [],
  setUrgentPatientsList: (newUrgentPatient) =>
    set({urgentPatients: newUrgentPatient}),
  individualUrgentPatients: [],
  setIndividualUrgentPatients: (newUrgentPatient) =>
    set({individualUrgentPatients: newUrgentPatient}),
  // isUrgent: false,
  // setIsUrgent: (value) => set(() => ({isUrgent: value})),
}));
