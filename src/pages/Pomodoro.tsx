import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Pomodoro = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const personalTime = location.state?.personalTime || 5; // Default to 5 minutes if none provided
  const [timeLeft, setTimeLeft] = useState(personalTime * 60); // Convert to seconds

  useEffect(() => {
    if (timeLeft <= 0) {
      navigate("/rewards"); // Redirect when time runs out
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="h-screen bg-lumon-dark flex flex-col items-center justify-center text-lumon-neon">
      <div className="p-8 bg-lumon-dark/80 border border-lumon-neon/10 shadow-lg text-center">
        <h1 className="text-2xl font-mono tracking-wide">Break Room Monitoring</h1>
        <p className="mt-4 text-sm font-mono text-lumon-blue">
          Your break session is being monitored. Remain compliant.
        </p>

        {/* Digital Countdown Timer */}
        <div className="mt-6 font-mono text-3xl tracking-widest text-lumon-neon/90 animate-pulse">
          {formatTime(timeLeft)}
        </div>

        <button
          onClick={() => navigate("/rewards")}
          className="mt-6 px-6 py-2 text-xs font-mono tracking-wider border border-lumon-neon/20 text-lumon-neon bg-lumon-neon/10 hover:bg-lumon-neon/20 transition-colors duration-150"
        >
          End Break
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;
