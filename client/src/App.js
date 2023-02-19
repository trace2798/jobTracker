import { Register, Landing, Error, ProtectedRoute } from './pages'
import { Routes, Route,Link } from "react-router-dom";

function App() {
  return (
    <>
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/register">Register</Link>
        <Link to="/landing">Home</Link>
      </nav>
      <Routes>
        <Route path="/" element={<div>Dashboard</div>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error/>} />
      </Routes>
    </>
  );
}

export default App;
