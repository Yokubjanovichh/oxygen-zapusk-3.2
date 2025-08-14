import React, { useEffect, useState } from "react";
import Loader from "../components/loader";
import camIcon from "../assets/icons/cam-icon.svg";
import lastPageStepImg from "../assets/icons/lastStepIcon.svg";
import tgChannel from "../assets/icons/tgChannel.svg";
import lastPageText from "../assets/img/lastPageText.webp";
import dateOfConversation from "../assets/img/date.webp";
import styles from "./last.module.css";

export default function LastPage() {
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    const imageList = [lastPageText, dateOfConversation, tgChannel];

    let loadedCount = 0;
    imageList.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === imageList.length) {
          setPageLoaded(true);
        }
      };
    });
  }, []);

  if (!pageLoaded) return <Loader />;

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.wrapper}>
        <div className={styles.navbarHeader}>
          <img src={camIcon} alt="camIcon" />
          <p>Online • 20:00 • 22-Avgust</p>
        </div>
        <img
          className={styles.stepImg}
          src={lastPageStepImg}
          alt="lastPageStepImg"
        />
        <img
          className={styles.lastPageText}
          src={lastPageText}
          alt="lastPageText"
        />

        <div className={styles.lastButtons}>
          <button
            className={styles.tgChannel}
            onClick={() => {
              if (typeof fbq !== "undefined") {
                fbq("trackCustom", "JoinTelegramChannelClicked", {
                  buttonText: "Telegram kanalga o'tish",
                  page: window.location.pathname,
                });
              }
              window.location.href = "https://t.me/+elILXAMRNTAxOGQy";
            }}
          >
            <img src={tgChannel} alt="tgChannel" />
          </button>

          <div className={styles.descMain}>
            <div className={styles.descChild}>
              <p>
                Onlayn taqdimotda qatnashish uchun Telegram kanalimizga obuna
                bo'ling!
              </p>
            </div>
          </div>
          <p className={styles.lastPromo}>
            Chegirma narxlar faqat online taqdimotda qatnashganlarga beriladi!
          </p>
          <img
            className={styles.dateOfConversation}
            src={dateOfConversation}
            alt="dateOfConversation"
          />
          <p className={styles.footerDesc}>
            22-Avgust, soat kechki 20:00 da Telegram kanalda jonli efir,
            qarindoshlaringizam qatnashyapti, qolib ketmang
          </p>
        </div>
      </div>
    </div>
  );
}
