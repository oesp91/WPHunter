const Container = ({ title, children }) => {
  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-bold text-left my-8">{title}</h1>
      {children}
    </div>
  );
};

export default Container;
