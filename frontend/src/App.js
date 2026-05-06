import { useState, useEffect } from "react";
import Game from "./Game";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  );
}

/* ---------- LOGIN ---------- */
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("https://snake-game-tk4r.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/game");
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-80 border border-white/30">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Login
        </h2>
  
        <input
          className="w-full p-3 rounded-lg mb-4 outline-none"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
  
        <input
          className="w-full p-3 rounded-lg mb-4 outline-none"
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
  
        <button
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          onClick={handleLogin}
        >
          Login
        </button>
  
        <p
          className="text-center text-white mt-4 cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Register
        </p>
      </div>
    </div>
  );
}

/* ---------- REGISTER ---------- */
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {

    // Email validation
    if (!email.includes("@")) {
      alert("Email must contain @");
      return;
    }
  
    // Password validation
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{4,}$/;
  
    if (!passwordRegex.test(password)) {
      alert(
        "Password must be at least 4 characters and include letters, numbers, and special characters"
      );
      return;
    }
  
    try {
      const res = await fetch("https://snake-game-tk4r.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        alert(data.message);
        return;
      }
  
      alert(data.message);
      navigate("/");
  
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
      <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-80 border border-white/30">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Register
        </h2>
  
        <input
          className="w-full p-3 rounded-lg mb-4 outline-none"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
  
        <input
          className="w-full p-3 rounded-lg mb-4 outline-none"
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
  
        <button
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          onClick={handleRegister}
        >
          Register
        </button>
  
        <p
          className="text-center text-white mt-4 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Login
        </p>
      </div>
    </div>
  );
}

/* ---------- DASHBOARD ---------- */
function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl text-center w-96">
        <h1 className="text-4xl font-bold mb-6">
          Welcome Gamer 🎮
        </h1>
  
        <p className="mb-6 text-gray-300">
          Successfully Logged In
        </p>
  
        <button
          className="bg-red-500 px-6 py-3 rounded-lg hover:bg-red-600 transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default App;