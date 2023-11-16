/* eslint-disable react/prop-types */

export const Modal = ({ indicatorsPatient, setViewModal }) => {
  const { name, lastName, age, height, weight, diagnostic, symptoms } =
    indicatorsPatient;
  return (
    <>
      <div className=" w-[50%] mx-auto justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-sm bg-white/30">
        <div className="relative my-6 mx-auto max-w-3xl w-96">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-center p-5 border-b border-solid border-slate-200 rounded-t bg-white">
              <h3 className="text-2xl font-semibold capitalize font-PTSans bg-white">
                {name} {lastName}
              </h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto text-lg bg-white">
              <ul className=" bg-white">
                <li className="text-slate-500 font-PTSans my-1 text-center bg-white">
                  Edad: {age} años.
                </li>
                <li className="text-slate-500 font-PTSans my-1 text-center bg-white">
                  Peso: {weight} kg.
                </li>
                <li className="text-slate-500 font-PTSans my-1 text-center bg-white">
                  Altura: {height} cms.
                </li>
                <li className="text-slate-500 font-PTSans my-1 text-center bg-white">
                  IMC: {(weight / (height * height)).toFixed(2)} kg/m²
                </li>
                <li className="text-slate-500 font-PTSans my-1 text-center bg-white">
                  Sintomas:
                </li>
                {symptoms
                  .join(", ")
                  .split(",")
                  .map((symp, idx) => (
                    <li
                      className="text-slate-500 font-PTSans text-center bg-white"
                      key={idx}
                    >
                      {symp.trim()}.
                    </li>
                  ))}
                <li className="text-slate-500 font-PTSans my-1 text-center bg-white">
                  Diagnostico: {diagnostic}.
                </li>
              </ul>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b bg-white">
              <button
                className="bg-red-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 text-white"
                type="button"
                onClick={() => setViewModal(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
