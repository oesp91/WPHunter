const Divider = ({ soft=false }) => {
  return (
    <hr className={`w-full border-t ${soft ? 'border-white/5 light:border-zinc-950/5' : 'border-white/10 light:border-zinc-950/10'}`}/>
  );
};

export default Divider;
