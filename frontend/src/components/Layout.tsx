import Navbar from "Navbar.tsx"

const Layout = ({ children }) => {
  return (
    <div className="relative isolate flex min-h-svh w-full flex-col bg-zinc-950">
      <Navbar />
      <main className="flex flex-1 flex-col pb-2 lg:px-2 bg-zinc-950">
        <div className="grow p-6 lg:rounded-lg lg:bg-zinc-900 lg:p-10 lg:ring-1 lg:shadow-xs lg:ring-white/10 light:lg:bg-white light:ring-zinc-950/5 text-white">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
