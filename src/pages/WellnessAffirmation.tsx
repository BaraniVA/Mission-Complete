import { useState } from "react";

const affirmations = [
  "You are a person. You are whole.",
  "Your actions have meaning.",
  "You are acknowledged. You are seen.",
  "You are a valued employee.",
  "The company appreciates your compliance.",
  "Your contributions serve the greater good.",
  "You are calm. You are focused.",
  "Your dedication ensures harmony.",
  "Your feelings are valid, and they will pass.",
  "You have a place in the structure of this company.",
];

const WellnessAffirmations = () => {
  const [affirmation, setAffirmation] = useState(
    affirmations[Math.floor(Math.random() * affirmations.length)]
  );

  const handleNewAffirmation = () => {
    setAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)]);
  };

  return (
    <div className="mt-6 p-4 border border-lumon-neon/20 bg-lumon-dark/80 rounded-sm text-center">
      <h2 className="text-xl font-mono tracking-wide text-lumon-neon">Wellness Affirmation</h2>
      <p className="mt-3 text-sm font-mono text-lumon-blue italic">{affirmation}</p>

      <button
        onClick={handleNewAffirmation}
        className="mt-6 px-6 py-2 text-xs font-mono tracking-wider border border-lumon-neon/20 text-lumon-neon bg-lumon-neon/10 hover:bg-lumon-neon/20 transition-colors duration-150"
      >
        Receive Another Affirmation
      </button>
    </div>
  );
};

export default WellnessAffirmations;
