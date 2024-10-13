import "./App.css";
import DataProvider from "./component/context/data_provider";
import Login from "./component/accounts/login";
import Home from "./component/home/home";
import { Header } from "./component/header/header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Header />
        <div className="App" style={{ marginTop: "64px" }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
