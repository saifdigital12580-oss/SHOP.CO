import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { AnimatePresence, motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const LoginCelebration = ({ username, onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);

      setTimeout(() => {
        onClose();
      }, 500);

    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <>
          <Confetti
            recycle={false}
            numberOfPieces={350}
          />

          <motion.div
            style={overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >

            <motion.div
              style={card}
              initial={{ scale: 0.4, y: 80 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 180,
              }}
            >

              <div style={iconCircle}>
                <FaCheckCircle size={70} color="#22c55e" />
              </div>

              <h1 style={title}>
                Your Login
              </h1>

              <h1 style={green}>
                Process Completed!
              </h1>

              <p style={welcome}>
                Welcome Back
              </p>

              <h2 style={name}>
                {username}
              </h2>

              <p style={text}>
                Enjoy Shopping with
                <b> SHOP.CO</b>
              </p>

              <button style={btn}>
                🎉 Start Shopping
              </button>

            </motion.div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,.65)",
  backdropFilter: "blur(6px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999999,
};

const card = {
  width: "460px",
  maxWidth: "90%",
  background: "#fff",
  borderRadius: "25px",
  padding: "45px",
  textAlign: "center",
  boxShadow: "0 25px 70px rgba(0,0,0,.35)",
};

const iconCircle = {
  width: "110px",
  height: "110px",
  margin: "auto",
  borderRadius: "50%",
  background: "#ecfdf3",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const title = {
  marginTop: "25px",
  marginBottom: "5px",
  fontSize: "40px",
};

const green = {
  color: "#16a34a",
  fontSize: "38px",
};

const welcome = {
  marginTop: "20px",
  color: "#666",
  fontSize: "20px",
};

const name = {
  marginTop: "8px",
  color: "#111",
};

const text = {
  color: "#666",
  marginTop: "15px",
  fontSize: "18px",
};

const btn = {
  marginTop: "30px",
  width: "100%",
  padding: "16px",
  border: "none",
  borderRadius: "12px",
  background: "#111",
  color: "#fff",
  fontSize: "18px",
  cursor: "pointer",
};

export default LoginCelebration;