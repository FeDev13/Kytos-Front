import { Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { UrgentPatients } from "./pages/UrgentPatients";
import { RegisterNewPatients } from "./pages/RegisterNewPatients";
import { useCookies } from "react-cookie";
import { MyContextProvider } from "./context/PatientContext";

function App() {
  const [cookies] = useCookies(["access_token"]);
  const isAuthenticated = cookies.access_token;

  return (
    <MyContextProvider>
      <div className="w-full h-screen m-auto bg-logo">
        <Routes>
          {!isAuthenticated && (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/*" element={<Navigate to="/" replace={true} />} />
            </>
          )}
          {isAuthenticated && (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/urgentPatients" element={<UrgentPatients />} />
              <Route
                path="/registerNewPatient"
                element={<RegisterNewPatients />}
              />
              <Route path="/update/:id" element={<RegisterNewPatients />} />
              <Route
                path="/*"
                element={<Navigate to="/home" replace={true} />}
              />
            </>
          )}
        </Routes>
      </div>
    </MyContextProvider>
  );
}

export default App;
