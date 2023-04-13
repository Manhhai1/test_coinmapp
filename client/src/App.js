import logo from './logo.svg';
import './App.css';
import Login from "./account/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./pages/User";
import Admin from "./pages/Admin";
import ManageUsers from "./pages/ManageUsers";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}>
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/account">
          <Route path="user" element={<User />} />
          <Route path="admin" element={<Admin />} />
        </Route>
        <Route path="/admin">
          <Route path="manage-user" element={<ManageUsers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
