import React, { useState, useEffect, useRef } from 'react';
import { Heart, Fish, X } from 'lucide-react';

// Auth Page
const AuthPage = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === '1617') {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="page auth-page">
      <div className="floating-hearts">
        {[...Array(15)].map((_, i) => (
          <Heart 
            key={i} 
            className="floating-heart" 
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      <div className="auth-container">
        <h1 className="auth-title">💕</h1>
        <p className="auth-subtitle">Enter the secret code</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`auth-input ${error ? 'shake' : ''}`}
            placeholder="••••"
            maxLength="4"
            autoFocus
          />
          <p className="auth-hint">Hint: the best 2 days of our lives</p>
          <button type="submit" className="auth-button">
            Enter
          </button>
        </form>
        {error && <p className="auth-error">Wrong code! Try again 💔</p>}
      </div>
    </div>
  );
};

// Valentine Proposal Page
const ProposalPage = ({ onNext }) => {
  const [showCrying, setShowCrying] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);

  const handleNo = () => {
    setShowCrying(true);
    setNoClickCount(prev => prev + 1);
  };

  const handleYes = () => {
    onNext();
  };

  return (
    <div className="page proposal-page">
      <div className="proposal-container">
        <h1 className="proposal-title">Rimmu, will you be my Valentine? 💝</h1>
        
        <div className="gif-container">
          {!showCrying ? (
            <img 
              src="/proposal.gif" 
              alt="Proposal" 
              className="proposal-gif"
            />
          ) : (
            <img 
              src="/crying.gif" 
              alt="Crying" 
              className="proposal-gif"
            />
          )}
        </div>

        {showCrying && (
          <p className="please-text">
            {'Please '.repeat(Math.min(noClickCount, 5))}🥺
          </p>
        )}

        <div className="button-container">
          <button onClick={handleYes} className="yes-button">
            Yes! 💕
          </button>
          <button onClick={handleNo} className="no-button">
            No 💔
          </button>
        </div>
      </div>
    </div>
  );
};

// Game Intro Page
const GameIntroPage = ({ onNext }) => {
  return (
    <div className="page game-intro-page">
      <div className="intro-container">
        <h1 className="intro-title">But first... let's play a game! 🎮</h1>
        <p className="intro-text">
          Help the tribal man catch 3 fish for his beloved! 🐟
        </p>
        <button onClick={onNext} className="start-game-button">
          Start Game
        </button>
      </div>
    </div>
  );
};

// Fishing Game
const FishingGame = ({ onSuccess }) => {
  const [caughtFish, setCaughtFish] = useState(0);
  const [fish, setFish] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [manPosition, setManPosition] = useState(50);
  const gameRef = useRef(null);
  const [isMoving, setIsMoving] = useState({ left: false, right: false });

  useEffect(() => {
    // Spawn fish periodically
    const spawnInterval = setInterval(() => {
      const newFish = {
        id: Date.now(),
        x: Math.random() * 80 + 10,
        y: -5,
        speed: 1 + Math.random() * 2
      };
      setFish(prev => [...prev, newFish]);
    }, 1500);

    return () => clearInterval(spawnInterval);
  }, []);

  useEffect(() => {
    // Move fish down
    const moveInterval = setInterval(() => {
      setFish(prev => {
        const updated = prev.map(f => ({
          ...f,
          y: f.y + f.speed
        })).filter(f => f.y < 100);
        
        return updated;
      });
    }, 50);

    return () => clearInterval(moveInterval);
  }, []);

  useEffect(() => {
    // Move man
    const moveInterval = setInterval(() => {
      setManPosition(prev => {
        let newPos = prev;
        if (isMoving.left) newPos = Math.max(5, prev - 2);
        if (isMoving.right) newPos = Math.min(95, prev + 2);
        return newPos;
      });
    }, 30);

    return () => clearInterval(moveInterval);
  }, [isMoving]);

  useEffect(() => {
    // Check collisions
    fish.forEach(f => {
      if (Math.abs(f.x - manPosition) < 8 && f.y > 80 && f.y < 90) {
        catchFish(f.id);
      }
    });
  }, [fish, manPosition]);

  const catchFish = (fishId) => {
    setFish(prev => prev.filter(f => f.id !== fishId));
    setCaughtFish(prev => {
      const newCount = prev + 1;
      if (newCount >= 3) {
        setGameOver(true);
        setTimeout(() => onSuccess(), 1500);
      }
      return newCount;
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') setIsMoving(prev => ({ ...prev, left: true }));
    if (e.key === 'ArrowRight') setIsMoving(prev => ({ ...prev, right: true }));
  };

  const handleKeyUp = (e) => {
    if (e.key === 'ArrowLeft') setIsMoving(prev => ({ ...prev, left: false }));
    if (e.key === 'ArrowRight') setIsMoving(prev => ({ ...prev, right: false }));
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className="page game-page" ref={gameRef}>
      <div className="game-container">
        <div className="game-header">
          <h2>Catch 3 Fish! 🎣</h2>
          <div className="fish-counter">
            {[...Array(3)].map((_, i) => (
              <Fish 
                key={i} 
                className={`fish-icon ${i < caughtFish ? 'caught' : ''}`}
              />
            ))}
          </div>
        </div>

        <div className="game-area">
          {fish.map(f => (
            <Fish
              key={f.id}
              className="falling-fish"
              style={{
                left: `${f.x}%`,
                top: `${f.y}%`,
              }}
            />
          ))}

          <div 
            className="tribal-man"
            style={{ left: `${manPosition}%` }}
          >
            🧑‍🌾
          </div>
        </div>

        <div className="game-controls">
          <button 
            className="control-btn"
            onTouchStart={() => setIsMoving(prev => ({ ...prev, left: true }))}
            onTouchEnd={() => setIsMoving(prev => ({ ...prev, left: false }))}
            onMouseDown={() => setIsMoving(prev => ({ ...prev, left: true }))}
            onMouseUp={() => setIsMoving(prev => ({ ...prev, left: false }))}
          >
            ← Left
          </button>
          <button 
            className="control-btn"
            onTouchStart={() => setIsMoving(prev => ({ ...prev, right: true }))}
            onTouchEnd={() => setIsMoving(prev => ({ ...prev, right: false }))}
            onMouseDown={() => setIsMoving(prev => ({ ...prev, right: true }))}
            onMouseUp={() => setIsMoving(prev => ({ ...prev, right: false }))}
          >
            Right →
          </button>
        </div>

        {gameOver && (
          <div className="game-success">
            <h2>Success! 🎉</h2>
            <p>You caught all the fish!</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Gift Page
const GiftPage = ({ onNext }) => {
  return (
    <div className="page gift-page">
      <div className="gift-container">
        <h1 className="gift-title">A gift for you! 💝</h1>
        <div className="gift-scene">
          <div className="tribal-man-static">🧑‍🌾</div>
          <div className="gift-fish">🐟🐟🐟</div>
          <div className="bengali-girl">👰‍♀️</div>
        </div>
        <p className="gift-text">
          The tribal man presents his catch to the beautiful Bengali girl 🥰
        </p>
        <button onClick={onNext} className="continue-button">
          Continue
        </button>
      </div>
    </div>
  );
};

// Time Together Counter
const TimeTogether = ({ onNext }) => {
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const startDate = new Date('2024-09-17T01:00:00');
    
    const updateTime = () => {
      const now = new Date();
      const diff = now - startDate;
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeElapsed({ days, hours, minutes, seconds });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page time-page">
      <div className="floating-hearts">
        {[...Array(20)].map((_, i) => (
          <Heart 
            key={i} 
            className="floating-heart" 
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      <div className="time-container">
        <h1 className="time-title">We have been together since...</h1>
        <p className="time-subtitle">September 17, 2024 at 1:00 AM</p>
        
        <div className="time-display">
          <div className="time-block">
            <span className="time-number">{timeElapsed.days}</span>
            <span className="time-label">Days</span>
          </div>
          <div className="time-separator">:</div>
          <div className="time-block">
            <span className="time-number">{String(timeElapsed.hours).padStart(2, '0')}</span>
            <span className="time-label">Hours</span>
          </div>
          <div className="time-separator">:</div>
          <div className="time-block">
            <span className="time-number">{String(timeElapsed.minutes).padStart(2, '0')}</span>
            <span className="time-label">Minutes</span>
          </div>
          <div className="time-separator">:</div>
          <div className="time-block">
            <span className="time-number">{String(timeElapsed.seconds).padStart(2, '0')}</span>
            <span className="time-label">Seconds</span>
          </div>
        </div>

        <button onClick={onNext} className="continue-button">
          Continue
        </button>
      </div>
    </div>
  );
};

// Custom Message Page
const MessagePage = ({ onNext }) => {
  return (
    <div className="page message-page">
      <div className="floating-hearts">
        {[...Array(25)].map((_, i) => (
          <Heart 
            key={i} 
            className="floating-heart" 
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      <div className="message-container">
        <div className="message-content">
          {/* YOU WILL EDIT THIS SECTION IN VS CODE */}
          <h1>Thank you for coming in my life Rimmu</h1>
          <p>You are so fucking cute and that's not even the best thing about you. You have always been by my side and helped me with everything. I am the man I am because of you and I hope we will celebrate every valentines day together forever. I fuck up sometimes but you have always been understanding, I am trying to be a better version of myself for you. I hope you feel safe and happy with me because I feel that way with you always. I am so lucky to have a princess like you in my life. I love you everyday but today we celebrate our love. I love you so so so so much 😘😘😘😘 &#60;3</p>
          <p>~with love bubu</p>
          {/* END OF EDITABLE SECTION */}
        </div>
        <button onClick={onNext} className="continue-button">
          Continue
        </button>
      </div>
    </div>
  );
};

// Final Page
const FinalPage = () => {
  return (
    <div className="page final-page">
      <div className="balloons">
        {[...Array(15)].map((_, i) => {
          const randomLeft = Math.random() * 90 + 5; // Random position 5-95%
          const randomDelay = Math.random() * 4; // Random delay 0-4s
          const randomDuration = 6 + Math.random() * 4; // Random speed 6-10s
          const randomDrift = (Math.random() - 0.5) * 100; // Random horizontal drift
          
          return (
            <div 
              key={i} 
              className="balloon"
              style={{
                left: `${randomLeft}%`,
                animationDelay: `${randomDelay}s`,
                animationDuration: `${randomDuration}s`,
                '--drift': `${randomDrift}px`
              }}
            >
              🎈
            </div>
          );
        })}
      </div>
      
      <div className="final-container">
        <h1 className="final-title">Happy Valentine's Day</h1>
        <h2 className="final-subtitle">Meri Pyari Rimmu 💕</h2>
        
        <div className="photo-frame">
          {/* YOU WILL ADD YOUR PHOTO HERE IN VS CODE */}
          <img 
            src="/couple-photo.jpg" 
            alt="Us Together" 
            className="couple-photo"
          />
          <div className="heart-decorations">
            <Heart className="heart-deco heart-1" />
            <Heart className="heart-deco heart-2" />
            <Heart className="heart-deco heart-3" />
            <Heart className="heart-deco heart-4" />
          </div>
        </div>

        <p className="final-message">
          Forever and always 💖
        </p>
      </div>
    </div>
  );
};

// Main App
export default function ValentinesApp() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const pages = [
    <AuthPage onSuccess={() => setIsAuthenticated(true)} />,
    <ProposalPage onNext={() => setCurrentPage(2)} />,
    <GameIntroPage onNext={() => setCurrentPage(3)} />,
    <FishingGame onSuccess={() => setCurrentPage(4)} />,
    <GiftPage onNext={() => setCurrentPage(5)} />,
    <TimeTogether onNext={() => setCurrentPage(6)} />,
    <MessagePage onNext={() => setCurrentPage(7)} />,
    <FinalPage />
  ];

  useEffect(() => {
    if (isAuthenticated && currentPage === 0) {
      setCurrentPage(1);
    }
  }, [isAuthenticated]);

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Georgia', 'Playfair Display', serif;
          overflow-x: hidden;
          background: linear-gradient(135deg, #ffeef8 0%, #ffe4f3 50%, #ffd4ec 100%);
          min-height: 100vh;
        }

        .page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        /* Floating Hearts Animation */
        .floating-hearts {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }

        .floating-heart {
          position: absolute;
          color: #ff69b4;
          opacity: 0.3;
          animation: float-up linear infinite;
        }

        @keyframes float-up {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        /* Auth Page */
        .auth-page {
          background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #ffeef8 100%);
        }

        .auth-container {
          background: white;
          padding: 50px 40px;
          border-radius: 30px;
          box-shadow: 0 20px 60px rgba(255, 105, 180, 0.3);
          text-align: center;
          max-width: 400px;
          width: 100%;
          animation: slideDown 0.6s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .auth-title {
          font-size: 80px;
          margin-bottom: 20px;
          animation: heartBeat 1.5s ease-in-out infinite;
        }

        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .auth-subtitle {
          font-size: 24px;
          color: #d63384;
          margin-bottom: 30px;
          font-style: italic;
        }

        .auth-input {
          width: 100%;
          padding: 15px;
          font-size: 32px;
          text-align: center;
          border: 3px solid #ff69b4;
          border-radius: 15px;
          margin-bottom: 15px;
          letter-spacing: 10px;
          transition: all 0.3s;
        }

        .auth-input:focus {
          outline: none;
          border-color: #d63384;
          box-shadow: 0 0 20px rgba(255, 105, 180, 0.3);
        }

        .auth-input.shake {
          animation: shake 0.5s;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }

        .auth-hint {
          font-size: 14px;
          color: #888;
          margin-bottom: 20px;
          font-style: italic;
        }

        .auth-button {
          width: 100%;
          padding: 15px;
          font-size: 20px;
          background: linear-gradient(135deg, #ff69b4, #d63384);
          color: white;
          border: none;
          border-radius: 15px;
          cursor: pointer;
          font-weight: bold;
          transition: transform 0.2s;
        }

        .auth-button:hover {
          transform: scale(1.05);
        }

        .auth-error {
          color: #dc3545;
          margin-top: 15px;
          font-size: 16px;
        }

        /* Proposal Page */
        .proposal-page {
          background: linear-gradient(135deg, #ffd4ec 0%, #ffeef8 100%);
        }

        .proposal-container {
          text-align: center;
          animation: fadeIn 0.8s;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .proposal-title {
          font-size: 42px;
          color: #d63384;
          margin-bottom: 40px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
          animation: bounceIn 1s;
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .gif-container {
          margin: 40px 0;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
        }

        .proposal-gif {
          width: 100%;
          height: auto;
          display: block;
        }

        .please-text {
          font-size: 28px;
          color: #d63384;
          margin: 20px 0;
          animation: pulse 1s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        .button-container {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-top: 40px;
        }

        .yes-button, .no-button {
          padding: 20px 50px;
          font-size: 24px;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.3s;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .yes-button {
          background: linear-gradient(135deg, #ff69b4, #d63384);
          color: white;
        }

        .yes-button:hover {
          transform: scale(1.1) rotate(5deg);
        }

        .no-button {
          background: #f0f0f0;
          color: #666;
        }

        .no-button:hover {
          transform: scale(0.95);
        }

        /* Game Pages */
        .game-intro-page {
          background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
        }

        .intro-container {
          text-align: center;
          background: white;
          padding: 60px 40px;
          border-radius: 30px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        }

        .intro-title {
          font-size: 36px;
          color: #2c7da0;
          margin-bottom: 20px;
        }

        .intro-text {
          font-size: 20px;
          color: #666;
          margin-bottom: 40px;
        }

        .start-game-button {
          padding: 20px 60px;
          font-size: 24px;
          background: linear-gradient(135deg, #2c7da0, #014f86);
          color: white;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          font-weight: bold;
          transition: transform 0.3s;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }

        .start-game-button:hover {
          transform: scale(1.1);
        }

        /* Game Page */
        .game-page {
          background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%);
        }

        .game-container {
          width: 100%;
          max-width: 600px;
        }

        .game-header {
          text-align: center;
          margin-bottom: 20px;
          background: white;
          padding: 20px;
          border-radius: 20px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .game-header h2 {
          color: #014f86;
          margin-bottom: 15px;
        }

        .fish-counter {
          display: flex;
          gap: 15px;
          justify-content: center;
        }

        .fish-icon {
          width: 40px;
          height: 40px;
          color: #ccc;
          transition: all 0.3s;
        }

        .fish-icon.caught {
          color: #ffd700;
          transform: scale(1.2);
        }

        .game-area {
          position: relative;
          width: 100%;
          height: 400px;
          background: linear-gradient(to bottom, #89f7fe 0%, #1e3a8a 100%);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .falling-fish {
          position: absolute;
          width: 30px;
          height: 30px;
          color: #ff6b6b;
          transition: none;
        }

        .tribal-man {
          position: absolute;
          bottom: 20px;
          transform: translateX(-50%);
          font-size: 50px;
          transition: left 0.1s linear;
        }

        .game-controls {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-top: 20px;
        }

        .control-btn {
          padding: 15px 40px;
          font-size: 20px;
          background: white;
          color: #014f86;
          border: 3px solid #014f86;
          border-radius: 15px;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.2s;
          user-select: none;
        }

        .control-btn:active {
          background: #014f86;
          color: white;
          transform: scale(0.95);
        }

        .game-success {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 40px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          animation: bounceIn 0.6s;
        }

        .game-success h2 {
          color: #2c7da0;
          margin-bottom: 10px;
        }

        /* Gift Page */
        .gift-page {
          background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%);
        }

        .gift-container {
          text-align: center;
          background: white;
          padding: 60px 40px;
          border-radius: 30px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        }

        .gift-title {
          font-size: 42px;
          color: #e17055;
          margin-bottom: 40px;
        }

        .gift-scene {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 30px;
          margin: 40px 0;
          font-size: 60px;
        }

        .gift-fish {
          animation: bounce 1s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .gift-text {
          font-size: 20px;
          color: #666;
          margin-bottom: 30px;
        }

        .continue-button {
          padding: 20px 60px;
          font-size: 24px;
          background: linear-gradient(135deg, #e17055, #d63031);
          color: white;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          font-weight: bold;
          transition: transform 0.3s;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }

        .continue-button:hover {
          transform: scale(1.05);
        }

        /* Time Page */
        .time-page {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .time-container {
          text-align: center;
          color: white;
        }

        .time-title {
          font-size: 48px;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          animation: fadeIn 1s;
        }

        .time-subtitle {
          font-size: 24px;
          margin-bottom: 50px;
          opacity: 0.9;
        }

        .time-display {
          display: flex;
          gap: 10px;
          justify-content: center;
          align-items: center;
          margin-bottom: 50px;
          flex-wrap: wrap;
        }

        .time-block {
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(10px);
          padding: 30px 20px;
          border-radius: 20px;
          min-width: 100px;
          animation: fadeInUp 1s;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .time-number {
          display: block;
          font-size: 48px;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .time-label {
          display: block;
          font-size: 16px;
          opacity: 0.8;
        }

        .time-separator {
          font-size: 48px;
          font-weight: bold;
          opacity: 0.6;
        }

        /* Message Page */
        .message-page {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }

        .message-container {
          max-width: 700px;
          text-align: center;
        }

        .message-content {
          background: rgba(255,255,255,0.95);
          padding: 60px 40px;
          border-radius: 30px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          margin-bottom: 30px;
          animation: fadeIn 1s;
        }

        .message-content h1 {
          font-size: 42px;
          color: #d63384;
          margin-bottom: 30px;
        }

        .message-content p {
          font-size: 22px;
          color: #333;
          line-height: 1.8;
          margin-bottom: 20px;
        }

        /* Final Page */
        .final-page {
          background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
        }

        .balloons {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }

        .balloon {
          position: absolute;
          bottom: -100px;
          font-size: 40px;
          animation: rise-balloon 8s ease-in infinite;
        }

        @keyframes rise-balloon {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-120vh);
            opacity: 0;
          }
        }

        .final-container {
          text-align: center;
          max-width: 600px;
        }

        .final-title {
          font-size: 56px;
          color: white;
          text-shadow: 3px 3px 6px rgba(0,0,0,0.3);
          margin-bottom: 20px;
          animation: fadeIn 1s;
        }

        .final-subtitle {
          font-size: 36px;
          color: #fff;
          margin-bottom: 50px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          animation: fadeIn 1.5s;
        }

        .photo-frame {
          position: relative;
          background: white;
          padding: 20px;
          border-radius: 30px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          margin-bottom: 30px;
          animation: fadeInUp 2s;
        }

        .couple-photo {
          width: 100%;
          border-radius: 20px;
          display: block;
        }

        .heart-decorations {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .heart-deco {
          position: absolute;
          color: #ff69b4;
          width: 40px;
          height: 40px;
          animation: heartFloat 3s ease-in-out infinite;
        }

        .heart-1 { top: -20px; left: -20px; animation-delay: 0s; }
        .heart-2 { top: -20px; right: -20px; animation-delay: 0.5s; }
        .heart-3 { bottom: -20px; left: -20px; animation-delay: 1s; }
        .heart-4 { bottom: -20px; right: -20px; animation-delay: 1.5s; }

        @keyframes heartFloat {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.2) rotate(10deg); }
        }

        .final-message {
          font-size: 28px;
          color: white;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          font-style: italic;
          animation: fadeIn 2.5s;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .proposal-title {
            font-size: 32px;
          }

          .time-block {
            padding: 20px 15px;
            min-width: 70px;
          }

          .time-number {
            font-size: 36px;
          }

          .time-separator {
            font-size: 36px;
          }

          .final-title {
            font-size: 42px;
          }

          .final-subtitle {
            font-size: 28px;
          }

          .button-container {
            flex-direction: column;
          }

          .yes-button, .no-button {
            width: 100%;
          }
        }
      `}</style>
      <div className="valentines-app">
        {pages[currentPage]}
      </div>
    </>
  );
}
