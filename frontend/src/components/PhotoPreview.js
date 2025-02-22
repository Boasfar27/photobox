import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const frames = {
  none: {
    draw: (ctx, x, y, width, height) => { }, // Empty function for no frame
  },
  pastel: {
    draw: (ctx, x, y, width, height) => {
      const drawSticker = (x, y, type) => {
        switch (type) {
          case 'star':
            ctx.fillStyle = "#FFD700";
            ctx.beginPath();
            ctx.arc(x, y, 12, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 'heart':
            ctx.fillStyle = "#cc8084";
            ctx.beginPath();
            const heartSize = 22;
            ctx.moveTo(x, y + heartSize / 4);
            ctx.bezierCurveTo(x, y, x - heartSize / 2, y, x - heartSize / 2, y + heartSize / 4);
            ctx.bezierCurveTo(x - heartSize / 2, y + heartSize / 2, x, y + heartSize * 0.75, x, y + heartSize);
            ctx.bezierCurveTo(x, y + heartSize * 0.75, x + heartSize / 2, y + heartSize / 2, x + heartSize / 2, y + heartSize / 4);
            ctx.bezierCurveTo(x + heartSize / 2, y, x, y, x, y + heartSize / 4);
            ctx.fill();
            break;
          case 'flower':
            ctx.fillStyle = "#FF9BE4";
            for (let i = 0; i < 5; i++) {
              ctx.beginPath();
              const angle = (i * 2 * Math.PI) / 5;
              ctx.ellipse(
                x + Math.cos(angle) * 10,
                y + Math.sin(angle) * 10,
                8, 8, 0, 0, 2 * Math.PI
              );
              ctx.fill();
            }
            // Center of flower
            ctx.fillStyle = "#FFE4E1";
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, 2 * Math.PI);
            ctx.fill();
            break;
          case 'bow':
            ctx.fillStyle = "#f9cee7";
            // Left loop
            ctx.beginPath();
            ctx.ellipse(x - 10, y, 10, 6, Math.PI / 4, 0, 2 * Math.PI);
            ctx.fill();
            // Right loop
            ctx.beginPath();
            ctx.ellipse(x + 10, y, 10, 6, -Math.PI / 4, 0, 2 * Math.PI);
            ctx.fill();
            // Center knot
            ctx.fillStyle = "#e68bbe";
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
            break;
        }
      };

      // Top left corner
      drawSticker(x + 11, y + 5, 'bow');
      drawSticker(x - 18, y + 95, 'heart');

      // Top right corner
      drawSticker(x + width - 160, y + 10, 'star');
      drawSticker(x + width - 1, y + 50, 'heart');

      // Bottom left corner
      drawSticker(x + 120, y + height - 20, 'heart');
      drawSticker(x + 20, y + height - 20, 'star');

      // Bottom right corner
      drawSticker(x + width - 125, y + height - 5, 'bow');
      drawSticker(x + width - 10, y + height - 45, 'heart');
    }
  },


  cute: {
    draw: (ctx, x, y, width, height) => {
      // Fungsi untuk menggambar mahkota
      const drawCrown = (centerX, centerY, size) => {
        ctx.fillStyle = "#FFD700"; // Warna emas
        ctx.beginPath();

        // Bagian dasar mahkota
        ctx.moveTo(centerX - size, centerY);
        ctx.lineTo(centerX - size * 0.8, centerY - size * 1.2);
        ctx.lineTo(centerX - size * 0.4, centerY - size * 0.8);
        ctx.lineTo(centerX, centerY - size * 1.5);
        ctx.lineTo(centerX + size * 0.4, centerY - size * 0.8);
        ctx.lineTo(centerX + size * 0.8, centerY - size * 1.2);
        ctx.lineTo(centerX + size, centerY);
        ctx.closePath();
        ctx.fill();

        // Hiasan permata mahkota
        const gemColors = ["#FF69B4", "#FF1493", "#FFB6C1"];
        [-0.6, 0, 0.6].forEach((offset, i) => {
          ctx.beginPath();
          ctx.fillStyle = gemColors[i];
          ctx.arc(centerX + offset * size, centerY - size * 0.9, size * 0.15, 0, Math.PI * 2);
          ctx.fill();
        });
      };

      // Fungsi untuk menggambar balon
      const drawBalloon = (centerX, centerY, size, color) => {
        // Balon
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(centerX, centerY, size, 0, Math.PI * 2);
        ctx.fill();

        // Highlight pada balon
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.beginPath();
        ctx.arc(centerX - size * 0.3, centerY - size * 0.3, size * 0.2, 0, Math.PI * 2);
        ctx.fill();

        // Tali balon
        ctx.beginPath();
        ctx.strokeStyle = "#FF69B4";
        ctx.lineWidth = 2;
        ctx.moveTo(centerX, centerY + size);
        ctx.quadraticCurveTo(
          centerX + size * 0.2,
          centerY + size * 1.5,
          centerX - size * 0.1,
          centerY + size * 2
        );
        ctx.stroke();
      };

      // Menggambar dekorasi di sekitar frame
      // Mahkota di sudut atas
      drawCrown(x + 150, y + 30, 25);
      drawCrown(x + width - 150, y + 30, 25);

      // Balon di berbagai sudut
      const balloonColors = [
        "#FF69B4", // Pink
        "#FF1493", // Deep Pink
        "#FFB6C1", // Light Pink
        "#FF69B4"  // Pink
      ];

      // Balon di sudut
      drawBalloon(x + 50, y + 50, 20, balloonColors[0]);
      drawBalloon(x + width - 50, y + 50, 25, balloonColors[1]);
      drawBalloon(x + 50, y + height - 50, 25, balloonColors[2]);
      drawBalloon(x + width - 50, y + height - 50, 20, balloonColors[3]);

      // Balon tambahan di tengah sisi
      drawBalloon(x + width / 2, y + 30, 22, balloonColors[1]);
      drawBalloon(x + width / 2, y + height - 30, 22, balloonColors[2]);

      // Mahkota di sudut bawah
      drawCrown(x + 150, y + height - 20, 20);
      drawCrown(x + width - 150, y + height - 20, 20);
    }
  },

  indonesia: {
    draw: (ctx, x, y, width, height) => {
      // Fungsi untuk menggambar bendera Indonesia
      const drawFlag = (centerX, centerY, flagWidth) => {
        const flagHeight = flagWidth * 0.67;

        // Bagian merah
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(centerX, centerY, flagWidth, flagHeight / 2);

        // Bagian putih
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(centerX, centerY + flagHeight / 2, flagWidth, flagHeight / 2);

        // Tiang bendera
        ctx.fillStyle = "#8B4513";
        ctx.fillRect(centerX - 5, centerY - 5, 5, flagHeight + 10);
      };

      // Fungsi untuk menggambar Garuda
      // const drawGaruda = (centerX, centerY, size) => {
      //   ctx.fillStyle = "#FFD700";
      //   ctx.beginPath();
      //   ctx.arc(centerX, centerY, size, 0, Math.PI * 2);
      //   ctx.fill();

      //   // Detail Garuda (simplified)
      //   ctx.strokeStyle = "#000000";
      //   ctx.lineWidth = 2;
      //   ctx.beginPath();
      //   ctx.moveTo(centerX - size / 2, centerY);
      //   ctx.quadraticCurveTo(centerX, centerY - size / 2, centerX + size / 2, centerY);
      //   ctx.quadraticCurveTo(centerX, centerY + size / 2, centerX - size / 2, centerY);
      //   ctx.stroke();
      // };

      // Menggambar dekorasi bendera dan Garuda
      drawFlag(x + 10, y + 10, 60);
      drawFlag(x + width - 70, y + 10, 60);
      // drawGaruda(x + width / 2, y + 30, 25);
      drawFlag(x + 10, y + height - 70, 60);
      drawFlag(x + width - 70, y + height - 70, 60);
    }
  },

  loveIOS: {
    draw: (ctx, x, y, width, height) => {
      // Fungsi untuk menggambar hati iOS style
      const drawIOSHeart = (centerX, centerY, size, color) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY + size * 0.3);
        ctx.bezierCurveTo(
          centerX, centerY,
          centerX - size, centerY,
          centerX - size, centerY + size * 0.3
        );
        ctx.bezierCurveTo(
          centerX - size, centerY + size * 0.6,
          centerX - size * 0.5, centerY + size,
          centerX, centerY + size * 1.2
        );
        ctx.bezierCurveTo(
          centerX + size * 0.5, centerY + size,
          centerX + size, centerY + size * 0.6,
          centerX + size, centerY + size * 0.3
        );
        ctx.bezierCurveTo(
          centerX + size, centerY,
          centerX, centerY,
          centerX, centerY + size * 0.3
        );
        ctx.fill();

        // Menambahkan efek gradient
        const gradient = ctx.createRadialGradient(
          centerX, centerY, size * 0.1,
          centerX, centerY, size
        );
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.2)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.fill();
      };

      // Fungsi untuk menggambar emoji iOS style
      const drawIOSEmoji = (centerX, centerY, size, type) => {
        ctx.fillStyle = "#FFE15D";
        ctx.beginPath();
        ctx.arc(centerX, centerY, size, 0, Math.PI * 2);
        ctx.fill();

        // Menambahkan detail berdasarkan tipe emoji
        switch (type) {
          case 'smile':
            ctx.beginPath();
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 2;
            ctx.arc(centerX, centerY, size * 0.6, 0, Math.PI, false);
            ctx.stroke();
            // Mata
            ctx.fillStyle = "#000";
            ctx.beginPath();
            ctx.arc(centerX - size * 0.3, centerY - size * 0.2, size * 0.1, 0, Math.PI * 2);
            ctx.arc(centerX + size * 0.3, centerY - size * 0.2, size * 0.1, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 'love':
            // Mata love
            drawIOSHeart(centerX - size * 0.3, centerY - size * 0.2, size * 0.2, "#FF1493");
            drawIOSHeart(centerX + size * 0.3, centerY - size * 0.2, size * 0.2, "#FF1493");
            // Mulut
            ctx.beginPath();
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 2;
            ctx.arc(centerX, centerY + size * 0.2, size * 0.3, 0, Math.PI, false);
            ctx.stroke();
            break;
        }
      };

      // Menggambar dekorasi
      const heartColors = ["#FF1493", "#FF69B4", "#FFB6C1", "#FF0000"];

      // Hearts di sudut
      drawIOSHeart(x + 30, y + 30, 20, heartColors[0]);
      drawIOSHeart(x + width - 30, y + 30, 20, heartColors[1]);
      drawIOSHeart(x + 30, y + height - 30, 20, heartColors[2]);
      drawIOSHeart(x + width - 30, y + height - 30, 20, heartColors[3]);

      // Emoji di tengah sisi
      drawIOSEmoji(x + width / 2, y + 30, 25, 'love');
      drawIOSEmoji(x + width / 2, y + height - 30, 25, 'smile');

      // Hearts tambahan
      drawIOSHeart(x + width / 4, y + height / 2, 15, heartColors[0]);
      drawIOSHeart(x + width * 3 / 4, y + height / 2, 15, heartColors[2]);
    }
  }
};

const PhotoPreview = ({ capturedImages }) => {
  const stripCanvasRef = useRef(null);
  const navigate = useNavigate();
  const [stripColor, setStripColor] = useState("white");
  const [selectedFrame, setSelectedFrame] = useState("none");



  const generatePhotoStrip = useCallback(() => {
    const canvas = stripCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");


    const imgWidth = 400;
    const imgHeight = 300;
    const borderSize = 40;
    const photoSpacing = 20;
    const textHeight = 50;
    const totalHeight = (imgHeight * 4) + (photoSpacing * 3) + (borderSize * 2) + textHeight;

    canvas.width = imgWidth + borderSize * 2;
    canvas.height = totalHeight;

    ctx.fillStyle = stripColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let imagesLoaded = 0;
    capturedImages.forEach((image, index) => {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        const yOffset = borderSize + (imgHeight + photoSpacing) * index;

        const imageRatio = img.width / img.height;
        const targetRatio = imgWidth / imgHeight;

        let sourceWidth = img.width;
        let sourceHeight = img.height;
        let sourceX = 0;
        let sourceY = 0;

        if (imageRatio > targetRatio) {
          sourceWidth = sourceHeight * targetRatio;
          sourceX = (img.width - sourceWidth) / 2;
        } else {
          sourceHeight = sourceWidth / targetRatio;
          sourceY = (img.height - sourceHeight) / 2;
        }

        ctx.drawImage(
          img,
          sourceX, sourceY, sourceWidth, sourceHeight,
          borderSize, yOffset, imgWidth, imgHeight
        );

        if (frames[selectedFrame] && typeof frames[selectedFrame].draw === 'function') {
          frames[selectedFrame].draw(
            ctx,
            borderSize,
            yOffset,
            imgWidth,
            imgHeight
          );
        }

        imagesLoaded++;

        if (imagesLoaded === capturedImages.length) {
          const now = new Date();
          const timestamp = now.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          }) + '  ' +
            now.toLocaleTimeString('id-ID', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            });

          // Menggambar timestamp
          ctx.fillStyle = "#FF1493"; // Deep Pink
          ctx.font = "bold 20px Arial";
          ctx.textAlign = "center";
          ctx.fillText(
            "Boasfar Photobox  " + timestamp,
            canvas.width / 2,
            totalHeight - borderSize * 1.5
          );

          // Menggambar watermark di bawah timestamp
          ctx.fillStyle = "rgba(255, 20, 147, 0.7)";
          ctx.font = "12px Arial";
          ctx.textAlign = "center";
          ctx.fillText(
            "© 2025 Boasfar",
            canvas.width / 2, // Posisi horizontal di tengah
            totalHeight - borderSize * 0.8 // Posisi vertical di bawah timestamp
          );
        }
      };
    });
  }, [capturedImages, stripColor, selectedFrame]);

  useEffect(() => {
    if (capturedImages.length === 4) {
      setTimeout(() => {
        generatePhotoStrip();
      }, 100);
    }
  }, [capturedImages, stripColor, selectedFrame, generatePhotoStrip]);

  const downloadPhotoStrip = () => {
    const link = document.createElement("a");
    link.download = "photostrip.png";
    link.href = stripCanvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="photo-preview">
      <h2 style={{
        color: "#FF1493",
        fontSize: "2rem",
        marginBottom: "1.5rem",
        textShadow: "2px 2px 4px rgba(255, 20, 147, 0.2)"
      }}>
        Pratinjau Foto
      </h2>

      <div className="color-options">
        <button onClick={() => setStripColor("white")}>Putih</button>
        <button onClick={() => setStripColor("#fceee9")}>Merah Muda</button>
        <button onClick={() => setStripColor("#dde6d5")}>Hijau</button>
        <button onClick={() => setStripColor("#adc3e5")}>Biru</button>
        <button onClick={() => setStripColor("#FFF2CC")}>Kuning</button>
        <button onClick={() => setStripColor("#dbcfff")}>Ungu</button>
      </div>

      <div className="frame-options">
        <button onClick={() => setSelectedFrame("pastel")}>Stiker Girly</button>
        <button onClick={() => setSelectedFrame("cute")}>Stiker Lucu</button>
        <button onClick={() => setSelectedFrame("indonesia")}>Bendera Indonesia</button>
        <button onClick={() => setSelectedFrame("loveIOS")}>Love iOS</button>
      </div>

      <canvas ref={stripCanvasRef} className="photo-strip" />

      <div className="strip-buttons">
        <button
          onClick={downloadPhotoStrip}
          style={{
            background: "linear-gradient(45deg, #FF1493, #FF69B4)",
            padding: "12px 25px",
            margin: "10px",
            border: "none",
            borderRadius: "25px",
            color: "white",
            fontWeight: "bold",
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
          📥 Unduh Foto
        </button>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "linear-gradient(45deg, #FF1493, #FF69B4)",
            padding: "12px 25px",
            margin: "10px",
            border: "none",
            borderRadius: "25px",
            color: "white",
            fontWeight: "bold",
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
          🔄 Ambil Foto Baru
        </button>
      </div>
    </div>
  );
};

export default PhotoPreview;