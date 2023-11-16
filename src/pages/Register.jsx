import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../context/PatientContext";
import { Loader } from "../components/Loader";
import logo from "../assets/Logo kytos_page-0001.jpg";

export const Register = () => {
  const navigate = useNavigate();
  const [registerValues, setRegisterValues] = useState({
    name: "",
    lastName: "",
    license: "",
    password: "",
  });

  const {
    errorMsgBack,
    setErrorMsgBack,
    errorMsgValidator,
    setErrorMsgValidator,
    loadingAuth,
    setLoadingAuth,
  } = useContext(MyContext);

  useEffect(() => {
    setErrorMsgBack("");
    setErrorMsgValidator("");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterValues({ ...registerValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingAuth(true);
    setErrorMsgBack("");
    setErrorMsgValidator("");
    try {
      await axios.post("http://localhost:5055/auth/register", registerValues);
      setLoadingAuth(false);
      navigate("/");
    } catch (error) {
      setLoadingAuth(false);
      if (error.response.data.msg) {
        console.log(error.response.data.msg);
        setErrorMsgBack(error.response.data.msg);
      }
      if (error.response.data.errors[0].msg) {
        console.log(error.response.data.errors[0].msg);
        setErrorMsgValidator(error.response.data.errors[0].msg);
      }
      //console.log(error.response.data.msg);
    }
  };

  return (
    <div className="w-full h-screen m-auto bg-logo flex justify-center items-center p-10">
      <div className="flex-col md:flex-row w-full gap-10  flex justify-start items-center">
        <div className="w-1/2 flex justify-center items-center">
          <img
            src={logo}
            alt="Register Image"
            className="w-full rounded-3xl "
          />
        </div>
        <div className="w-1/2 h-full  font-PTSans">
          <h1 className="text-4xl text-center font-bold text-secondary">
            Registro
          </h1>
          <p className="text-lg text-center font-bold text-secondary mt-2">
            Sr. profesional, complete el formulario con sus datos para
            registrarse a la plataforma
          </p>

          <form
            className="w-2/3 m-auto flex flex-col justify-center items-center gap-5 mt-8"
            onSubmit={handleSubmit}
          >
            <input
              className="w-full rounded-lg h-11 bg-transparent border border-solid-white outline-none pl-3 font-PTSans text-secondary"
              type="text"
              name="name"
              value={registerValues.name}
              placeholder="Nombre"
              onChange={handleChange}
            />
            <input
              className="w-full rounded-lg h-11 bg-transparent border border-solid-white outline-none pl-3 font-PTSans text-secondary"
              type="text"
              name="lastName"
              value={registerValues.lastName}
              placeholder="Last name"
              onChange={handleChange}
            />
            <input
              className="w-full rounded-lg h-11 bg-transparent border border-solid-white outline-none pl-3 font-PTSans text-secondary"
              type="password"
              name="password"
              value={registerValues.password}
              placeholder="Password"
              onChange={handleChange}
            />
            <input
              className="w-full rounded-lg h-11 bg-transparent border border-solid-white outline-none pl-3 font-PTSans text-secondary"
              type="text"
              name="license"
              value={registerValues.license}
              placeholder="Matricula/DNI"
              onChange={handleChange}
            />
            {loadingAuth ? (
              <Loader />
            ) : (
              <>
                {errorMsgValidator && (
                  <p className="font-PTSans font-bold w-full bg-red-300 text-red-600 text-center">
                    {errorMsgValidator}
                  </p>
                )}
                {errorMsgBack && (
                  <p className="font-PTSans font-bold w-full bg-red-300 text-red-600 text-center">
                    {errorMsgBack}
                  </p>
                )}
              </>
            )}
            <button
              className="w-full rounded-lg h-11 bg-transparent border-2 border-secondary text-secondary shadow-lg hover:bg-secondary hover:border-white hover:text-primary hover:transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              type="submit"
              disabled={
                registerValues.name === "" ||
                registerValues.lastName === "" ||
                registerValues.license === "" ||
                registerValues.password === ""
              }
            >
              Register
            </button>
          </form>
          <p className="text-white text-center font-bold mt-2 text-sm">
            Si ya esta registrado ingrese{" "}
            <small className="font-PTSans text-white text-lg underline">
              <Link to={"/"}>aqui</Link>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};
