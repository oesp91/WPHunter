interface ContrastBlockProps {
 children: React.ReactNode;
 maxHeight?: string;
 maxWidth?: string;
 className?: string;
}

const ContrastBlock = ({ 
 children, 
 maxHeight = "40rem",
 maxWidth = "full",
 className = "" 
}: ContrastBlockProps) => {
 return (
   <div 
     className={`
       overflow-x-auto 
       rounded-xl 
       py-4 
       bg-zinc-950
       ${className}
     `}
     style={{ 
       maxHeight,
       maxWidth: maxWidth === "full" ? "43%" : maxWidth
     }}
   >
     {children}
   </div>
 );
};

export default ContrastBlock;
