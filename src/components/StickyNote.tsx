import svgPaths from "../imports/svg-0v38ne8dkp.ts";

interface StickyNoteProps {
  children: React.ReactNode;
  rotation?: number;
  color?: string;
}
function getSoftShadowColor(color: string): string {
  // Convert hex → RGB
  const hex = color.replace(/^#/, "");
  const bigint = parseInt(hex, 16);

  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  // Apply soft shadow transformations (less washed-out, more saturated)
  r *= 0.88;
  g *= 0.80;
  b *= 0.78;

  // Small saturation boost: slightly increase the strongest channel
  const max = Math.max(r, g, b);
  if (r === max) r *= 1.04;
  if (g === max) g *= 1.04;
  if (b === max) b *= 1.04;

  // Clamp values to 0–255
  r = Math.round(Math.min(255, Math.max(0, r)));
  g = Math.round(Math.min(255, Math.max(0, g)));
  b = Math.round(Math.min(255, Math.max(0, b)));

  return `${r},${g},${b}`;
}


export function StickyNote({ children, rotation = 0, color = "#ffff99" }: StickyNoteProps) {
  const shadowColor = getSoftShadowColor(color);

  return (
    <div
      className="relative p-2 min-w-[180px]"
      style={{
        backgroundColor: color,
        transform: `rotate(${rotation}deg)`,
        boxShadow: `0px 0px 6px 0px rgba(${shadowColor}, 0.5)`,
      }}
    >
      <div className="font-['Patrick_Hand',_cursive] text-[#816212] relative z-10">
        {children}
      </div>
    </div>
  );
}

