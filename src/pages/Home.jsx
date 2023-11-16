import { Sidebar } from "../components/Sidebar";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Topbar } from "../components/Topbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../components/Loader";
import { Modal } from "../components/Modal";
import { useCookies } from "react-cookie";
import { MyContext } from "../context/PatientContext";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const professionalID = window.localStorage.getItem("professionalID");
  const [cookies] = useCookies(["access_token"]);
  const {
    patients,
    setPatients,
    urgentPatientsIDs,
    setUrgentPatientsIDs,
    urgentsPatients,
    setUrgentsPatients,
    indicatorsPatient,
    setIndicatorsPatient,
    loading,
    setLoading,
    viewModal,
    setViewModal,
  } = useContext(MyContext);

  const navigate = useNavigate();
  //const [patients, setPatients] = useState([]);
  //const [urgentPatientsIDs, setUrgentPatientsIDs] = useState([]);
  // const [urgentsPatients, setUrgentsPatients] = useState([]);
  // const [indicatorsPatient, setIndicatorsPatient] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [viewModal, setViewModal] = useState(false);

  const getPatientsForThisProfessional = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5055/patients/homePatients?professionalID=${professionalID}`
      );
      setPatients(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUrgentsPatientsIDs = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5055/patients/urgentPatientsIDs?professionalID=${professionalID}`
      );
      setUrgentPatientsIDs(res.data.urgentPatients);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPatientsForThisProfessional();
    getUrgentsPatientsIDs();
    setLoading(false);
  }, []);

  // console.log({patients});
  // console.log({urgentPatientsIDs});

  const savedUrgentPatient = async (patientID) => {
    try {
      const res = await axios.put(
        "http://localhost:5055/patients/urgentPatients",
        {
          professionalID,
          patientID,
        },
        { headers: { authorization: cookies.access_token } }
      );
      await getUrgentsPatientsIDs();
      setUrgentsPatients([...urgentsPatients, res.data]);
      toast.success("The patient was added as urgent!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deletePatient = async (el) => {
    const { _id, name, lastName } = el;
    const formatedName = name.charAt(0).toUpperCase() + name.slice(1);
    const formatedLastName =
      lastName.charAt(0).toUpperCase() + lastName.slice(1);
    const patientID = _id;
    let isDelete = window.confirm(
      `Are you sure to delete the patient: ${formatedName} - ${formatedLastName}?`
    );
    if (isDelete) {
      try {
        await axios.delete(
          `http://localhost:5055/patients/deletePatient/${professionalID}/${patientID}`
        );
        await getPatientsForThisProfessional();
        toast.success("Deleted patient", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const seeIndicatorsPatient = (el) => {
    console.log(el);
    setIndicatorsPatient(el);
    setViewModal(true);
  };

  return (
    <div className="w-full m-auto overflow-y-hidden">
      <Topbar />
      <div className="w-screen font-PTSans md:flex ">
        <Sidebar />
        {loading ? (
          <div className="w-full h-screen m-auto flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {/*!!!!!!!!!! {patients.length === 0 ? 'Aun no tienes pacientes' : null} */}

            <div className="p-4 flex-col lg:grid grid-cols-3 gap-4 w-full m-auto overflow-y-auto bg-logo">
              <h1 className="w-3/4 m-auto my-5 px-4 font-PTSans font-bold text-3xl text-white">
                Pacientes
              </h1>
              {viewModal && (
                <Modal
                  indicatorsPatient={indicatorsPatient}
                  setViewModal={setViewModal}
                />
              )}
              {patients.map((el) => (
                <div
                  key={el._id}
                  className={`w-[90%] my-10 flex flex-col justify-center items-center p-2 rounded-md font-PTSans text-center text-lg text-secondary gap-2 shadow-md shadow-slate-400 ${
                    urgentPatientsIDs.includes(el._id)
                      ? "bg-gradient-to-br from-[#a04070] to-[#700038]"
                      : "bg-white"
                  }`}
                >
                  <div className="w-28 h-w-28 rounded-full">
                    <img
                      className="rounded-full shadow-sm shadow-secondary"
                      src={el.image.url}
                      alt="Paciente Avatar"
                    />
                  </div>
                  <p className="capitalize  bg-transparent text-black font-semibold">
                    {el.name} {el.lastName}
                  </p>
                  <div className="w-3/4 m-auto gap-2 font-semibold bg-transparent">
                    <button
                      className="w-[50%] p-2 rounded-lg bg-blue-700 hover:bg-blue-500 hover:text-secondary hover:transition-all"
                      onClick={() => seeIndicatorsPatient(el)}
                    >
                      Ver informacion
                    </button>
                  </div>
                  <div className="w-3/4 m-auto gap-2 font-semibold bg-transparent">
                    <button
                      className="w-[50%] p-2 rounded-lg bg-gray-400 hover:bg-gray-200 hover:text-black hover:transition-all"
                      onClick={() => navigate(`/update/${el._id}`)}
                    >
                      Editar informacion
                    </button>
                  </div>
                  <div className="w-3/4 m-auto gap-2 font-semibold bg-transparent">
                    <button
                      className="w-[50%] p-2 rounded-lg bg-yellow-600 hover:bg-yellow-400 hover:text-secondary hover:transition-all disabled:cursor-not-allowed disabled:opacity-40 disabled:bg-secondary disabled:text-slate-800 disabled:border border-b-secondary"
                      onClick={() => savedUrgentPatient(el._id)}
                      disabled={urgentPatientsIDs.includes(el._id)}
                    >
                      {urgentPatientsIDs.includes(el._id)
                        ? "Urgente!"
                        : "Establecer como urgente"}
                    </button>
                  </div>
                  <div className="w-3/4 m-auto gap-2 font-semibold bg-transparent">
                    <button
                      className="w-[50%] p-2 rounded-lg bg-red-700 hover:bg-red-500 hover:text-secondary hover:transition-all"
                      onClick={() => deletePatient(el)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        <ToastContainer autoClose={2500} />
      </div>
    </div>
  );
};
