import { NavLink } from "react-router-dom";
import logo from "../assets/Logo kytos_page-0001.jpg";
import {
  BsFillPersonLinesFill,
  BsFillPersonBadgeFill,
  BsFillPersonPlusFill,
} from "react-icons/bs";

export const Sidebar = () => {
  return (
    <div className="bg-logo h-[60%] md:min-h-screen md:h-auto text-secondary font-PTSans w-[100%] md:w-[30%]">
      <div className=" w-full px-8 font-PTSans text-center">
        <img
          src={logo}
          alt="logo CIS kinesiologia"
          className=" rounded-lg w-[70%] mx-auto"
        />
        <h1 className="tracking-wide text-2xl my-9 font-bold">Menu</h1>
        <hr />
        <ul className="text-start text-xl">
          <NavLink to="/home">
            <li className="my-5 flex justify-start items-center w-full hover:text-green-600">
              {" "}
              <span className="flex items-center">
                <BsFillPersonLinesFill className="w-8 h-w-8" />
              </span>
              <p className="pl-2">Pacientes</p>
            </li>
          </NavLink>
          <hr />
          <NavLink to="/urgentPatients">
            <li className="my-5 flex justify-start items-center hover:text-green-600">
              {" "}
              <span className="flex items-center">
                <BsFillPersonBadgeFill className="w-8 h-w-8" />
              </span>
              <p className="pl-2">Pacientes urgentes</p>
            </li>
          </NavLink>
          <hr />
          <NavLink
            to="/registerNewPatient"
            className={({ isActive }) =>
              isActive ? "text-green-400" : "text-secondary"
            }
          >
            <li className="my-5 flex justify-start items-center hover:text-green-600">
              {" "}
              <span className="flex items-center">
                <BsFillPersonPlusFill className="w-8 h-w-8" />
              </span>
              <p className="pl-2">Agregar paciente</p>
            </li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};
