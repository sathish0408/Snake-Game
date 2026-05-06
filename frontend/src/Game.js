import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const gridSize = 20;
const initialSnake = [[8, 8]];
const initialFood = [5, 5];

function Game() {
  const navigate = useNavigate();

  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(initialFood);
  const [direction, setDirection] = useState([0, 1]);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case "ArrowUp":
          setDirection([-1, 0]);
          break;
        case "ArrowDown":
          setDirection([1, 0]);
          break;
        case "ArrowLeft":
          setDirection([0, -1]);
          break;
        case "ArrowRight":
          setDirection([0, 1]);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const interval = setInterval(moveSnake, 200);

    return () => clearInterval(interval);
  });

  function moveSnake() {
    const newSnake = [...snake];
    const head = [...newSnake[newSnake.length - 1]];

    head[0] += direction[0];
    head[1] += direction[1];

    // Wall collision
    if (
      head[0] < 0 ||
      head[0] >= gridSize ||
      head[1] < 0 ||
      head[1] >= gridSize
    ) {
      setGameOver(true);
      return;
    }

    newSnake.push(head);

    // Food collision
    if (head[0] === food[0] && head[1] === food[1]) {
      setFood([
        Math.floor(Math.random() * gridSize),
        Math.floor(Math.random() * gridSize),
      ]);
    } else {
      newSnake.shift();
    }

    setSnake(newSnake);
  }

  function startGame() {
    setGameStarted(true);
  }

  function restartGame() {
    setSnake(initialSnake);
    setFood(initialFood);
    setDirection([0, 1]);
    setGameOver(false);
    setGameStarted(true);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">

      <h1 className="text-4xl font-bold mb-6">
        Snake Game 🐍
      </h1>

      {!gameStarted ? (
        <button
          onClick={startGame}
          className="bg-green-500 px-8 py-4 rounded-lg text-xl hover:bg-green-600"
        >
          Start Game
        </button>
      ) : (
        <>
          <div
            className="grid bg-gray-800"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, 20px)`
            }}
          >
            {Array.from({ length: gridSize * gridSize }).map((_, index) => {
              const x = Math.floor(index / gridSize);
              const y = index % gridSize;

              const isSnake = snake.some(
                ([sx, sy]) => sx === x && sy === y
              );

              const isFood = food[0] === x && food[1] === y;

              return (
                <div
                  key={index}
                  className={`w-5 h-5 border border-gray-700
                    ${isSnake ? "bg-green-500" : ""}
                    ${isFood ? "bg-red-500" : ""}
                  `}
                />
              );
            })}
          </div>

          {gameOver && (
            <div className="mt-6 text-center">
              <p className="text-2xl text-red-500 mb-4">
                Game Over 💀
              </p>

              <button
                onClick={restartGame}
                className="bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600"
              >
                Restart
              </button>
            </div>
          )}
        </>
      )}

      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 px-6 py-3 rounded-lg hover:bg-red-600"
      >
        Logout
      </button>

    </div>
  );
}

export default Game;