import { useEffect, useState } from "react";
import cocoon from "../assets/logos/cocoon.svg";

export default function Navbar() {
  const [logoOpacity, setLogoOpacity] = useState(1);

  function handleClick({}) {
    const section = document.querySelector(`#splash`);
    section?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const opacity = 1 - scrollY / windowHeight;
      setLogoOpacity(Math.max(opacity, 0));
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="fixed top-0 left-0 z-50 w-full">
        <div
          className="flex flex-row cursor-pointer px-4 py-4 items-center"
          //style={{ opacity: logoOpacity }}
          onClick={handleClick}
        >
          <img className="object-cover w-8 rotate-12" src={cocoon} />
          <h1 className="text-white text-xl">Cocoon</h1>
        </div>
      </div>
    </div>
  );
}
