const Container = ({ title, children }) => {
  return (
    <div className="mx-auto max-w-6xl">
      {title && <h1 className="text-2xl font-semibold text-left my-8">{title}</h1>}
      {children}
    </div>
  );
};

export default Container;
