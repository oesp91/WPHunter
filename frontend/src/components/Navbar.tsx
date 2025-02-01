import { useEffect } from 'react';
import { NavLink } from "react-router-dom";

const NavbarItem = ({ to, children }) => (
  <span className="relative">
    <NavLink 
      to={to} 
      className={({ isActive }) => `
        relative flex min-w-0 items-center gap-3 rounded-lg p-2 text-left text-sm/6 font-medium hover:bg-zinc-900
        ${isActive ? 'active' : ''}
      `}
    >
      {children}
    </NavLink>
  </span>
);

const NavbarBrand = () => (
  <span className="max-lg:hidden relative">
    <button type="button" className="relative flex items-center">
      <img src="/logo.png" className="h-7 w-7 mr-2"/>
      <span className="flex items-center font-serif font-bold antialiased">WPHunter</span>
    </button>
  </span>
);

const NavbarDivider = () => (
  <div aria-hidden="true" className="max-lg:hidden h-6 w-px bg-white/10 mx-4"></div>
);

const AnimatedUnderline = () => (
  <div className="absolute -bottom-2.5 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out w-[calc(var(--navbar-width,_0px))] left-[var(--navbar-left,_0px)]" />
);

const NavbarLinks = () => (
  <div className="max-lg:hidden flex items-center gap-5 font-medium antialiased relative nav-container">
    <NavbarItem to="/">Home</NavbarItem>
    <NavbarItem to="/analysis">Menual Analysis</NavbarItem>
    <NavbarItem to="/scanner">Auto Scanner</NavbarItem>
    <AnimatedUnderline />
  </div>
);

const Navbar = () => {
  useEffect(() => {
    const updateBar = () => {
      const activeLink = document.querySelector('.active');
      const navContainer = document.querySelector('.nav-container');
      
      if (activeLink && navContainer) {
        const navRect = navContainer.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();
        const relativeLeft = linkRect.left - navRect.left;
        
        document.documentElement.style.setProperty('--navbar-width', `${linkRect.width}px`);
        document.documentElement.style.setProperty('--navbar-left', `${relativeLeft}px`);
      }
    };

    updateBar();
    window.addEventListener('resize', updateBar);
    const interval = setInterval(updateBar, 100);
    
    return () => {
      window.removeEventListener('resize', updateBar);
      clearInterval(interval);
    };
  }, []);

  return (
    <header className="flex items-center px-4">
      <title>WPHunter</title>
      <nav className="flex flex-1 items-center py-2 bg-zinc-950 text-white">
        <NavbarBrand />
        <NavbarDivider />
        <NavbarLinks />
      </nav>
    </header>
  );
};

export default Navbar;
