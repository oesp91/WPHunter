  const NavBar = () => {
    return (
      <header className="flex items-center px-4">
        <nav className="flex flex-1 items-center gap-4 py-2.5 bg-zinc-950 text-white">
          <span className="max-lg:hidden relative">
            <button type="button" className="relative flex items-center">
              <img src="/logo.png" className="h-7 w-7 mr-2"/>
              <span className="flex items-center font-mono font-bold antialiased">WPHunter</span>
            </button>
          </span>
          <div aria-hidden="true" className="max-lg:hidden h-6 w-px bg-white/10"></div>
          <div className="max-lg:hidden flex items-center gap-3 text-sm/6 font-medium antialiased">
            <span className="relative">
              <span className="absolute inset-x-2 -bottom-2.5 h-0.5 rounded-full bg-white"></span>
              <a href="#" className="hover:bg-zinc-900">Home</a>
            </span>
            <span className="relative"><a href="#" className="hover:bg-zinc-900">Menual Analysis</a></span>
            <span className="relative"><a href="#" className="hover:bg-zinc-900">Auto Scanner</a></span>
          </div>
        </nav>
      </header>
  )
}

export default NavBar;
