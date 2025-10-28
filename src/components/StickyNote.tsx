import svgPaths from "../imports/svg-0v38ne8dkp.ts";

interface StickyNoteProps {
  children: React.ReactNode;
  rotation?: number;
  color?: string;
}

export function StickyNote({ children, rotation = 0, color = "#ffff99" }: StickyNoteProps) {
  return (
    <div
      className="relative p-6 shadow-[0px_0px_10px_0px_rgba(255,204,102,0.5)] min-w-[180px]"
      style={{
        backgroundColor: color,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <div
        className="absolute bottom-[-15px] right-[-15px] pointer-events-none"
        style={{
          width: "100px",
          height: "50px",
          transform: "rotate(-45deg)",
        }}
      >
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 128 58">
          <path d={svgPaths.p2f8095f0} fill={color === "#ffff99" ? "#FFCC66" : "#FFB3BA"} />
        </svg>
      </div>
      <div className="font-['Patrick_Hand',_cursive] text-[#816212] relative z-10">
        {children}
      </div>
    </div>
  );
}
