import { createContext, useState } from "react";
import PropTypes from "prop-types";

// Crea el contexto
export const MyContext = createContext();
// Proveedor del contexto
export const MyContextProvider = ({ children }) => {
  MyContextProvider.propTypes = {
    children: PropTypes.any,
  };
  const [patients, setPatients] = useState([]);
  const [urgentPatientsIDs, setUrgentPatientsIDs] = useState([]);
  const [urgentsPatients, setUrgentsPatients] = useState([]);
  const [indicatorsPatient, setIndicatorsPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewModal, setViewModal] = useState(false);
  const [errorMsgBack, setErrorMsgBack] = useState("");
  const [errorMsgValidator, setErrorMsgValidator] = useState("");
  const [loadingRegisterPatient, setLoadingRegisterPatient] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(false);

  return (
    <MyContext.Provider
      value={{
        patients,
        setPatients,
        urgentPatientsIDs,
        setUrgentPatientsIDs,
        urgentsPatients,
        setUrgentsPatients,
        indicatorsPatient,
        setIndicatorsPatient,
        viewModal,
        setViewModal,
        errorMsgBack,
        setErrorMsgBack,
        errorMsgValidator,
        setErrorMsgValidator,
        loading,
        setLoading,
        loadingRegisterPatient,
        setLoadingRegisterPatient,
        loadingAuth,
        setLoadingAuth,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
