import "./App.css";
import DataProvider from "./component/context/data_provider";
import Login from "./component/accounts/login";
import Home from "./component/home/home";
import { Header } from "./component/header/header";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useState } from "react";

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};

function App() {
  const [isAuthenticated, setUserAuthenticated] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
        <div className="App" style={{ marginTop: "64px" }}>
          <Routes>
            <Route
              path="/login"
              element={<Login setUserAuthenticated={setUserAuthenticated} />}
            />

            <Route
              path="/"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
