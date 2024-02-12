"use client"

import React, { useState } from 'react';
import styles from "./page.module.css";
import Image from 'next/image'; // Import the Image component


export default function Home() {
    const [gifSrc, setGifSrc] = useState('/giphy/giphy_1.gif');
    const [noGifIndex, setNoGifIndex] = useState(0);
    const [showCelebration, setShowCelebration] = useState(false);
    const [title, setTitle] = useState('');
    const [noPressCount, setNoPressCount] = useState(0);
    const [noButtonOpacity, setNoButtonOpacity] = useState(1);
    const [showButtons, setShowButtons] = useState(true); // New state to control button container visibility
    const [showTitle, setShowTitle] = useState(true); // New state to control title visibility

    // Titles for "No" button
    const noTitles = [
      "Точно нет?😔",
      "Может, всё-таки да?😊",
      "Подумай ещё разок!😢",
      "Я буду ждать твоего да!😌",
      "Ты уверена?😣",
      "Дай шанс мне!😇",
      "Ну пожалуйста, сладость!🙏",
      "Не отказывай мне...😖",
      "Ты разбиваешь мне сердце🥺",
      "Ты меня не любишь?😭",
      "Я буду плакать😢",
      "Не поступай со мной так😞",
      "Я буду любить тебя❤️",
    ];

    const noGifs = Array.from({ length: 12 }, (_, i) => `/giphy/giphy_no_${i + 1}.gif`);

    const changeToYesGif = () => {
      setGifSrc('/giphy/giphy_yes.gif');
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 5000); // Hide after 5 seconds
      setTitle('kus kus kus ❤️❤️❤️'); // Celebration title
      setShowButtons(false); // Hide button container
      setShowTitle(false); // Hide main title
    };

    const changeToNoGif = () => {
      setNoPressCount(prevCount => prevCount + 1);
      setNoButtonOpacity(prevOpacity => Math.max(prevOpacity - 0.1, 0));
      setNoGifIndex(prevIndex => {
        const newIndex = (prevIndex + 1) % noGifs.length;
        setGifSrc(noGifs[newIndex]);
        setTitle(noTitles[newIndex % noTitles.length]);
        return newIndex;
      });
    };

    const yesButtonScale = 1 + noPressCount * 0.1;
    const yesButtonStyle = {
      transform: `scale(${yesButtonScale})`,
      transition: 'transform 0.3s ease-in-out',
      color: noPressCount > 0 ? 'white' : '',
    };

    const noButtonStyle = {
      opacity: noButtonOpacity,
      transition: 'opacity 0.3s ease-in-out',
    };

    return (
      <main className={styles.main}>
      {showCelebration && <div className={styles.celebration}>Ти ж моє сонечко ❤️❤️❤️</div>}

      <div className={styles.giphys}>
          <Image 
            src={gifSrc} 
            alt="gif" 
            className={styles.gif}
            width={500}
            height={300}
          />
      </div>

      {showTitle && <h1 className={styles.title}>Ты будешь моей Валентинкой ? ❤️🥰</h1>}

      <h1 className={styles.titles}>{title}</h1>

      {showButtons && (
        <div className={styles.buttons_container}>
            <button
                className={styles.yes_btn}
                style={yesButtonStyle}
                onClick={changeToYesGif}>
                Да!💕
            </button>
            <button 
                className={styles.no_btn} 
                style={noButtonStyle} 
                onClick={changeToNoGif}
                disabled={noButtonOpacity === 0}> 
                Нет😢
            </button>
        </div>
      )}
    </main>
  );
}
