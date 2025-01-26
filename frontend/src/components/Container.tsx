import Divider from "@components/Divider.tsx"

const Container = ({ title, children }) => {
  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-bold text-left my-8">{title}</h1>
      <Divider soft />
      <h2>d</h2>
      <Divider />
      {children}
    </div>
  );
};

export default Container;
