// /* eslint-disable react/prop-types */

// export const CardPatient = ({
//   el,
//   savedUrgentPatient,
//   deletePatient,
//   removeFromUrgent,
//   isUrgent,
//   isUrgentFn,
// }) => {
//   return (
//     <div
//       className={`w-full m-auto flex flex-col justify-center items-center p-2 ${
//         isUrgent
//           ? 'bg-gradient-to-br from-yellow-400 to-yellow-700'
//           : 'bg-gradient-to-br from-slate-400 to-gray-700'
//       } rounded-md font-PTSans text-center text-lg text-[#F1F5F9] gap-2 shadow-md shadow-slate-800`}
//     >
//       <div className="w-40 h-40 rounded-full">
//         <img
//           className="rounded-full shadow-sm shadow-slate-800"
//           src={el.image.url}
//           alt="Paciente Avatar"
//         />
//       </div>
//       <p className="capitalize">
//         {el.name} - {el.lastName}
//       </p>
//       {isUrgent ? (
//         <>
//           <div className="w-3/4 m-auto gap-2 font-semibold">
//             <button className="w-full px-2 rounded-md border border-slate-100 bg-blue-700 hover:bg-blue-500 hover:text-white hover:transition-all">
//               See details
//             </button>
//           </div>
//           <div className="w-3/4 m-auto gap-2 font-semibold">
//             <button
//               className="w-full px-2 rounded-md border border-slate-400 bg-yellow-600 hover:bg-yellow-400 hover:text-white hover:transition-all"
//               onClick={() => removeFromUrgent(el)}
//             >
//               Is not urgent
//             </button>
//           </div>
//         </>
//       ) : (
//         <>
//           <div className="w-3/4 m-auto gap-2 font-semibold">
//             <button className="w-full px-2 rounded-md border border-slate-100 bg-blue-700 hover:bg-blue-500 hover:text-white hover:transition-all">
//               See
//             </button>
//           </div>
//           <div className="w-3/4 m-auto gap-2 font-semibold">
//             <button
//               className="w-full px-2 rounded-md border border-slate-400 bg-yellow-600 hover:bg-yellow-400 hover:text-white hover:transition-all"
//               onClick={() => savedUrgentPatient(el._id)}
//               disabled={isUrgentFn(el._id)}
//             >
//               {isUrgentFn(el._id) ? 'Added to Urgent' : 'Add'}
//             </button>
//           </div>
//           <div className="w-3/4 m-auto gap-2 font-semibold">
//             <button
//               className="w-full px-2 rounded-md border border-slate-400 bg-red-700 hover:bg-red-500 hover:text-white hover:transition-all"
//               onClick={() => deletePatient(el)}
//             >
//               Delete
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };
