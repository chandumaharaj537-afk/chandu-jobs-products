interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export function Logo({
  size = "md",
  showText = true,
  className = "",
}: LogoProps) {
  const iconSize = size === "sm" ? 20 : size === "md" ? 28 : 40;
  const textClass =
    size === "sm" ? "text-base" : size === "md" ? "text-xl" : "text-3xl";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* SVG Mark — dual amber/emerald icon */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Background rounded square */}
        <rect
          width="32"
          height="32"
          rx="7"
          fill="currentColor"
          className="text-card"
        />

        {/* Briefcase (jobs) — amber */}
        <path
          d="M5 14a2 2 0 0 1 2-2h6V9.5A1.5 1.5 0 0 1 14.5 8h3A1.5 1.5 0 0 1 19 9.5V12h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6Z"
          fill="#f59e0b"
          opacity="0.9"
        />
        <rect
          x="13.5"
          y="9.5"
          width="5"
          height="2.5"
          rx="0.5"
          fill="#92400e"
          opacity="0.6"
        />

        {/* Shopping tag (products) — emerald */}
        <path
          d="M19 17.5l5.5 5.5a1.5 1.5 0 0 1-2.12 2.12L16.86 19.5M20 14l-6-1-1-6 6 1 1 6Z"
          stroke="#10b981"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="20" cy="13" r="1" fill="#10b981" opacity="0.8" />
      </svg>

      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className={`font-display font-bold tracking-tight text-foreground ${textClass}`}
          >
            Chandu
          </span>
          {size !== "sm" && (
            <span className="text-[10px] font-body font-medium tracking-widest uppercase mt-0.5">
              <span className="text-amber-500">Jobs</span>
              <span className="text-muted-foreground"> & </span>
              <span className="text-emerald-500">Products</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
