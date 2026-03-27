import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import "./Navbar.css";

gsap.registerPlugin(useGSAP, ScrambleTextPlugin);

const Navbar = () => {
  const container = useRef();
  const logoRef = useRef();
  const btnRef = useRef(null);

  const itemsRef = useRef([]);
  itemsRef.current = [];

  const addToRefs = (el) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  const handleBtnMove = (e) => {
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btnRef.current, {
      x: x * 0.3,
      y: y * 0.3,
      scale: 1.05,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  const handleBtnLeave = () => {
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "elastic.out(1, 0.3)",
    });
  };

  const handleItemMove = (el, e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(el, {
      x: x * 0.15,
      y: y * 0.15,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleItemLeave = (el) => {
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  useGSAP(
    () => {
      gsap.to(logoRef.current, {
        duration: 2,
        scrambleText: {
          text: "Tushar K.",
          chars:
            "@#$%^&*()_+-=~`|\\:;\"'<>,.?/ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
          revealDelay: 0.3,
          speed: 0.4,
        },
      });
    },
    { scope: container }
  );

  return (
    <nav ref={container} className="navbar font-pixy">
      <ul>
        <li
          ref={addToRefs}
          onMouseMove={(e) => handleItemMove(itemsRef.current[0], e)}
          onMouseLeave={() => handleItemLeave(itemsRef.current[0])}
        >
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
        </li>

        <li
          ref={addToRefs}
          onMouseMove={(e) => handleItemMove(itemsRef.current[1], e)}
          onMouseLeave={() => handleItemLeave(itemsRef.current[1])}
        >
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
            About
          </NavLink>
        </li>

        <a
          href="/"
          ref={logoRef}
          className="logo"
          onMouseEnter={() => {
            gsap.to(logoRef.current, {
              duration: 2,
              scrambleText: {
                text: "Tushar K.",
                chars:
                  "@#$%^&*()_+-=~`|\\:;\"'<>,.?/ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                revealDelay: 0.3,
                speed: 0.4,
              },
            });
          }}
        >
          Tushar K.
        </a>

        <li
          ref={addToRefs}
          onMouseMove={(e) => handleItemMove(itemsRef.current[2], e)}
          onMouseLeave={() => handleItemLeave(itemsRef.current[2])}
        >
          <NavLink to="/package" className={({ isActive }) => (isActive ? "active" : "")}>
            Package
          </NavLink>
        </li>
      </ul>

      <button
        ref={btnRef}
        onMouseMove={handleBtnMove}
        onMouseLeave={handleBtnLeave}
        className="btn"
      >
        <span>Connect!</span>
      </button>
    </nav>
  );
};

export default Navbar;