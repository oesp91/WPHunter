import { tv } from "tailwind-variants"

const button = tv({
  base: "relative inline-flex items-center justify-center rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2",
  variants: {
    color: {
      zinc: "text-white bg-zinc-600 hover:bg-zinc-500",
      zinc2: "text-white border border-white/15 bg-zinc-900 hover:bg-zinc-800",
      white: "text-black bg-zinc-50 hover:bg-zinc-100",
      yellow: "text-black bg-amber-400 hover:bg-amber-300",
    },
    size: {
      small: "text-sm px-3 py-1",
      medium: "text-base/6 px-4 py-2",
      large: "text-lg px-6 py-3",
    },
    disabled: {
      true: "opacity-50 cursor-not-allowed",
      false: ""
    },
  },
  defaultVariants: {
    color: "zinc",
    size: "medium",
    disabled: false,
  },
});

const Button = ({ color, size, disabled, onClick, children}) => {
  return (
    <button className={button({ color, size, disabled })} disabled={disabled} onClick={onClick}>
    {children}
    </button>
  );
};

export default Button;
