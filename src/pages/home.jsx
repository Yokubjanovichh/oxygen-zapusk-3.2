import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PatternFormat } from "react-number-format";
import camIcon from "../assets/icons/cam-icon.svg";
import modalStep from "../assets/icons/modalStep.svg";
import giftIcon from "../assets/icons/gift.svg";
import styles from "./home.module.css";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const totalTime = 30;

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const cleanedNumber = number.replace(/\D/g, "");

    navigate("/last");
    setNumber("");
    setName("");
    setIsLoading(false);

    const url =
      "https://script.google.com/macros/s/AKfycbxdwyW5ZCzqTEvjmbqSEl0KZkWNSAeN0N2dtWac8UZML1f0XJeDtQqOnuw7H3VwlwEC/exec";

    const formData = new URLSearchParams();
    formData.append("Name", name);
    formData.append("Email", cleanedNumber);

    navigator.sendBeacon(url, formData);
  };

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (sec) => {
    const minutes = String(Math.floor(sec / 60)).padStart(2, "0");
    const seconds = String(sec % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const progressWidth = Math.max((timeLeft / totalTime) * 179, 50);

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.wrapper}>
        <div className={styles.navbar}>
          <div className={styles.navbarHeader}>
            <img src={camIcon} alt="camIcon" />
            <p>Online • 20:00 • 22-Avgust</p>
          </div>
          <h3 className={styles.title1}>BOSHLANG‘ich to‘LOVSIZ</h3>
          <h1 className={styles.title2}>60 OYGA FOIZLARSIZ</h1>
          <h2 className={styles.title3}>
            bO‘LIB To‘LASH EVAZIGa XONADONLIk Bo‘LING
          </h2>
          <button
            onClick={() => {
              setIsModalOpen(true);

              if (typeof fbq !== "undefined") {
                fbq("trackCustom", "OpenModalButtonClicked", {
                  buttonText: "Taqdimotda qatnashish",
                  page: window.location.pathname,
                });
              }
            }}
            className={styles.navbarButton}
          >
            Taqdimotda qatnashish
          </button>
          <p className={styles.navbarDesc}>
            22-avgust, soat 20:00 da Telegram kanalda jonli efir, qolib ketmang
          </p>
        </div>
        <div className={styles.footer}>
          <p>
            Eng asosiysi, chegirma narxlar faqat online taqdimotda
            qatnashganlarga beriladi!
          </p>

          <div className={styles.timer}>
            <div
              className={styles.interval}
              style={{
                width: `${progressWidth}px`,
                transition: "width 1s linear",
              }}
            ></div>
            <p className={styles.time}>{formatTime(timeLeft)}</p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={modalStep} alt="modalStep" className={styles.modalStep} />
            <p className={styles.information}>ma'lumotlaringizni qoldiring!</p>
            <div className={styles.form}>
              <div className={styles.inputs}>
                <input
                  type="text"
                  placeholder="Ismingiz"
                  name="name"
                  value={name || ""}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <PatternFormat
                  format="+998 ## ### ## ##"
                  allowEmptyFormatting
                  name="number"
                  mask=" "
                  value={number || ""}
                  onChange={(e) => setNumber(e.target.value)}
                  required
                  className={styles.contactInputPhone}
                  autoComplete="off"
                  placeholder="Telefon raqamingiz"
                />
              </div>
              <div className={styles.submit}>
                <button
                  className={number && name ? styles.activeButton : ""}
                  disabled={!number || !name || isLoading}
                  onClick={handleSubmit}
                >
                  Davom etish
                </button>
                {isLoading && <div className={styles.loader}></div>}
              </div>
              <div className={styles.gift}>
                <img src={giftIcon} alt="giftIcon" />
                <p>Uy yutib olish imkoniyati</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
