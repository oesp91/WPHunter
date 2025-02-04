import { useState, useEffect } from 'react';
import Container from "@components/Container";
import LoginModal from "@components/LoginModal";

const useTypeWriter = (text, speed = 50) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    if (!text || index >= text.length) {
      setIsTypingComplete(true);
      return;
    }

    const typing = setTimeout(() => {
      setDisplayText((prev) => prev + text.charAt(index));
      setIndex((prev) => prev + 1);
    }, speed);

    return () => clearTimeout(typing);
  }, [text, index, speed]);

  return { displayText, isTypingComplete };
};

const getInitialGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 17) return "Good afternoon";
  if (hour >= 17 && hour < 19) return "Good evening";
  return "Happy late night";
};

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [greeting] = useState(getInitialGreeting);
  const { displayText, isTypingComplete } = useTypeWriter(`${greeting}, Juwon`, 70);

  return (
    <Container>
      <div className="py-20 flex flex-col-reverse gap-10 md:flex-row md:gap-20">
        <div className="flex-col antialiased">
          <div className="pb-6 text-4xl font-bold font-serif flex items-center">
            {displayText}
            <span
              className={`ml-1 inline-block w-[3px] h-8 bg-white ${
                isTypingComplete ? 'animate-[blink_1s_infinite]' : 'opacity-0'
              }`}
            ></span>
          </div>
          <div className="max-w-2xl text-md leading-relaxed">
            WPHunter is your secret weapon for WordPress plugin/theme analysis. Beat other hackers to the punch and discover critical vulnerabilities first. Load your target, let our engine work, and claim your bounty. The hunt begins now.
          </div>
        </div>
        <img src="logo.png" className="size-24 md:size-36 mx-auto" />
      </div>
      <div className="">
        <button onClick={() => setShowLogin(true)}>Login</button>
        <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      </div>
    </Container>
  );
};

export default Home;
