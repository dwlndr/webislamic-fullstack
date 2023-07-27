import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Sholat from "./components/Sholat";
import Alquran from "./components/Alquran";
import Akun from "./components/Akun";
import SingleSurat from "./components/SingleSurat";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/sholat" element={<Sholat/>}/>
        <Route path="/alquran" element={<Alquran/>}/>
        <Route path="/account" element={<Akun/>}/>
        <Route path="/surat/:idsurat" element={<SingleSurat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
