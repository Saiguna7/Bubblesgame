"use client";
import { useState, useEffect } from "react";

export default function Game() {
  const [score, setScore] = useState<number>(0);
  const [hitRn, setHitRn] = useState<number>(Math.floor(Math.random() * 10));
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [play, setPlay] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  const [bubbles, setBubbles] = useState<number[]>([]);

  useEffect(() => {
    if (play) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          const newTime = prevTimer - 1;
          if (newTime === 0) {
            clearInterval(interval);
            setGameOver(true);
            setHitRn(Math.floor(Math.random() * 10));
            setBubbles([]);
          }
          return newTime;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [play]);

  useEffect(() => {
    const newBubbles = [];
    for (let i = 0; i <= 101; i++) {
      const rn = Math.floor(Math.random() * 10);
      newBubbles.push(rn);
    }
    setBubbles(newBubbles);
  }, [gameOver]);

  const handleChange = (clickedNum:number) => {

    if (!gameOver && play) {
      if (clickedNum === hitRn) {
        setScore((prevScore) => prevScore + 10);
      } else {
        setScore((prevScore) => prevScore - 10);
      }
      setHitRn(Math.floor(Math.random() * 10));
      setBubbles((prevBubbles) =>
        prevBubbles.map(() => Math.floor(Math.random() * 10)),
      );
    }
  };

  const startGame = () => {
    setPlay(true);
    setScore(0);
    setGameOver(false);
    setTimer(60);
    setHitRn(Math.floor(Math.random() * 10));
  };

  return (
    <>
      <div className="w-[80%] h-[80%] bg-[#fff] rounded-[10px] overflow-hidden">
        <div className="bg-[rgb(72,104,72)] h-[100px] w-[100%] text-white flex  md:py-0 px-[1.5%] md:px-[30%] items-center justify-between ">
          <div className="flex md:gap-[20px] gap-[10px] items-center px-[5px]">
            <h4>Hit</h4>{" "}
            <div className="bg-[#fff] py-[10px] px-[10px] md:px-[20px] rounded-[5px] text-[rgb(18,119,57)] font-[600] text-[15px] md:text-[25px] sm:mr-[10px]">
              {hitRn}
            </div>
          </div>
          <div className="flex md:gap-[20px] gap-[10px] items-center px-[5px]">
            <h4>Timer</h4>{" "}
            <div className="bg-[#fff] py-[10px] px-[10px] md:px-[20px] rounded-[5px] text-[rgb(18,119,57)] font-[600] text-[15px] md:text-[25px] sm:mr-[10px]">
              {timer}
            </div>
          </div>
          <div className="flex md:gap-[20px] gap-[10px] items-center px-[5px] mr-20 md:mr-[200px]">
            <h4>Score</h4>{" "}
            <div className="bg-[#fff] py-[10px] px-[10px] md:px-[20px] rounded-[5px] text-[rgb(18,119,57)] font-[600] text-[15px] md:text-[25px] md:-mr-[20px] -mr-[70px]">
              {score}
            </div>
          </div>
          <button
  onClick={startGame}
  className="md:px-4 md:py-2 bg-white text-black rounded-md font-semibold font-500 hover:text-white hover:bg-zinc-800 "
>
  {play ? "Restart Game" : "Start Game"}
</button>
        </div>
        <div className="w-[100%] h-[calc(100%-100px)] p-[30px] flex flex-wrap gap-[10px] sm:px-8 md:p-[20px]">
          {bubbles.map((rn, i) => (
            <div
              key={i}
              
              onClick={() => handleChange(rn)}
              className={`w-[60px] h-[60px] rounded-full bg-[rgb(72,104,72)] text-[white] flex items-center justify-center font-[500] cursor-pointer hover:bg-[rgb(50,75,50)] ${
                gameOver ? "hidden" : ""
              }`}
            >
              {rn}
            </div>
          ))}
        </div>
        {gameOver && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Game Over</h2>
              <p className="mb-4">Your final score: {score}</p>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => {
                  window.location.reload();
                  setPlay(false);
                }}
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
