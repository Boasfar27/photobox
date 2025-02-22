import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1>Selamat Datang browww!</h1>
      <p>
        Anda memiliki waktu <strong>3 detik</strong> untuk setiap jepretan – tidak ada pengulangan! <br />
        Photobooth ini akan mengambil <strong>4 foto</strong> berturut-turut, jadi tunjukkan pose terbaikmu dan bersenang-senanglah!
      </p>
      <p>
        Setelah sesi selesai, <span style={{ color: "#FF1493" }}>unduh</span> foto digitalmu dan bagikan keseruannya!
      </p>
      <button
        onClick={() => navigate("/photobooth")}
        style={{
          background: "linear-gradient(45deg, #FF1493, #FF69B4)",
          color: "white",
          fontWeight: "bold",
          fontSize: "1.2rem",
          padding: "15px 40px",
          border: "none",
          borderRadius: "30px",
          boxShadow: "0 4px 15px rgba(255, 20, 147, 0.3)",
          transition: "all 0.3s ease"
        }}
        onMouseOver={(e) => {
          e.target.style.background = "linear-gradient(45deg, #FF69B4, #FFB6C1)";
          e.target.style.transform = "translateY(-3px)";
          e.target.style.boxShadow = "0 6px 20px rgba(255, 20, 147, 0.5)";
        }}
        onMouseOut={(e) => {
          e.target.style.background = "linear-gradient(45deg, #FF1493, #FF69B4)";
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "0 4px 15px rgba(255, 20, 147, 0.3)";
        }}
      >
        MULAI
      </button>
    </div>
  );
};

export default Welcome;
