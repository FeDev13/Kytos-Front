import { useEffect, useContext, useState } from "react";
import { MyContext } from "../context/PatientContext";
import axios from "axios";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../components/Loader";
import { Modal } from "../components/Modal";

export const UrgentPatients = () => {
  const [loading, setLoading] = useState(true);
  const professionalID = window.localStorage.getItem("professionalID");
  const {
    urgentsPatients,
    setUrgentsPatients,
    indicatorsPatient,
    setIndicatorsPatient,
    viewModal,
    setViewModal,
  } = useContext(MyContext);

  const getEntireUrgentsPatients = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5055/patients/entireUrgentPatients?professionalID=${professionalID}`
      );
      setUrgentsPatients(res.data.urgentPatients);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    //setLoading(true);
    getEntireUrgentsPatients();
    //setLoading(false);
  }, []);

  console.log({ urgentsPatients });

  const seeIndicatorsPatient = (el) => {
    console.log(el);
    setIndicatorsPatient(el);
    setViewModal(true);
  };

  const removeFromUrgent = async (el) => {
    const { _id, name, lastName } = el;
    console.log(_id);
    const formatedName = name.charAt(0).toUpperCase() + name.slice(1);
    const formatedLastName =
      lastName.charAt(0).toUpperCase() + lastName.slice(1);
    const patientID = _id;
    let isDelete = window.confirm(
      `Remove ${formatedName}  ${formatedLastName} from Urgent patients?`
    );

    if (isDelete) {
      try {
        await axios.delete(
          `http://localhost:5055/patients/deleteUrgentPatient/${professionalID}/${patientID}`
        );
        await getEntireUrgentsPatients();
        toast.success("Paciente removido de Urgentes!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full m-auto bg-secondary flex overflow-y-hidden">
      <Sidebar />
      <div className="w-screen h-screen font-PTSans overflow-y-auto">
        <Topbar />
        <h1 className="w-3/4 m-auto my-5 px-4 font-PTSans font-bold text-3xl text-white ">
          Pacientes urgentes
        </h1>
        {loading ? (
          <div className="w-full h-screen m-auto flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div className=" p-4 grid grid-cols-3 gap-4 w-3/4 m-auto">
            {viewModal && (
              <Modal
                indicatorsPatient={indicatorsPatient}
                setViewModal={setViewModal}
              />
            )}
            {urgentsPatients.map((el) => (
              <div
                key={el._id}
                className="w-full m-auto flex flex-col justify-center items-center p-2 bg-gradient-to-br from-[#a04070] to-[#700038] rounded-md font-PTSans text-center text-lg text-secondary gap-2 shadow-md shadow-slate-400"
              >
                <div className="w-28 h-28 rounded-full">
                  <img
                    className="rounded-full shadow-sm shadow-secondary"
                    src={el.image.url}
                    alt="Paciente Avatar"
                  />
                </div>
                <p className="capitalize text-secondary bg-transparent">
                  {el.name} {el.lastName}
                </p>
                <div className="w-3/4 m-auto gap-2 font-semibold">
                  <button
                    className="w-full px-2 rounded-md border border-secondary bg-blue-700 hover:bg-blue-500 hover:text-secondary hover:transition-all"
                    onClick={() => seeIndicatorsPatient(el)}
                  >
                    Indicadores
                  </button>
                </div>
                <div className="w-3/4 m-auto gap-2 font-semibold">
                  <button
                    className="w-full px-2 rounded-md border border-secondary bg-yellow-600 hover:bg-yellow-400 hover:text-white hover:transition-all"
                    onClick={() => removeFromUrgent(el)}
                  >
                    No es urgente
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <ToastContainer autoClose={2500} />
      </div>
    </div>
  );
};
