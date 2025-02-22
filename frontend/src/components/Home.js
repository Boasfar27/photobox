import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="background-gradient h-screen flex  flex-col justify-center items-center text-center">
      <div className="home-container">
        <h1 className="text-5xl font-bold text-pink-600 mb-4">Boasfar</h1>
        <p className="text-lg text-gray-700 mb-6">
          Selamat datang di boasfar photobox Ini adalah photobooth pribadi Anda di rumah.
        </p>

        <img src="/photobooth-strip.png" alt="photobooth strip" className="photobooth-strip" />

        <button onClick={() => navigate("/welcome")} className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition"
        >Mulai browww</button>

        <footer className="mt-8 text-sm">
          <span style={{ color: "#FF1493", fontWeight: "500" }}>dibuat oleh </span>
          <a
            href="https://boasfar.my.id/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#FF1493",
              textDecoration: "none",
              fontWeight: "bold",
              padding: "4px 12px",
              borderRadius: "15px",
              background: "rgba(255, 20, 147, 0.1)",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => {
              e.target.style.background = "rgba(255, 20, 147, 0.2)";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "rgba(255, 20, 147, 0.1)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Boasfar
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Home;
