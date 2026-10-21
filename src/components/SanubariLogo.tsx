import React from 'react';

interface SanubariLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'mark' | 'horizontal';
  theme?: 'dark' | 'light';
}

/**
 * Sanubari Roastery Official Brand Mark & Mascot (Owl Emblem)
 * Directly extracted from the official brand asset:
 * /assets/aistudio/STICKER_PACK_FONT_FIKS_bb43410e.png
 */
export const SanubariLogoMark: React.FC<{ size?: 'sm' | 'md' | 'lg' | 'xl'; className?: string }> = ({
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  };

  return (
    <div
      className={`relative rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-transparent ${sizeMap[size]} ${className}`}
      aria-label="Sanubari Mascot Emblem"
    >
      <img
        src="/assets/aistudio/STICKER_PACK_FONT_FIKS_bb43410e.png"
        alt="Sanubari Owl Mascot"
        className="absolute left-[-6%] top-1/2 -translate-y-1/2 h-[180%] max-w-none object-cover pointer-events-none select-none"
      />
    </div>
  );
};

/**
 * Sanubari Roastery Official Brand Logo
 * Features the signature owl mascot on the left and SANUBARI ROASTERY bold typography.
 * Directly references /assets/aistudio/STICKER_PACK_FONT_FIKS_bb43410e.png
 */
export const SanubariLogo: React.FC<SanubariLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'horizontal',
  theme = 'light',
}) => {
  if (variant === 'mark') {
    return <SanubariLogoMark size={size} className={className} />;
  }

  // Sizing tuned for header and footer layouts
  // The PNG image is 2:1 aspect ratio with transparent top/bottom padding
  const heightClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-9 sm:h-10 md:h-11',
    lg: 'h-11 sm:h-12 md:h-14',
    xl: 'h-14 sm:h-16 md:h-20',
  };

  const isDark = theme === 'dark';

  return (
    <div className={`flex items-center select-none ${className}`}>
      {isDark ? (
        <div className="inline-flex items-center px-2 py-0.5 rounded-lg bg-white/95 shadow-xs transition-all hover:bg-white">
          <img
            src="/assets/aistudio/STICKER_PACK_FONT_FIKS_bb43410e.png"
            alt="Sanubari Roastery"
            className={`${heightClasses[size]} w-auto object-contain shrink-0`}
          />
        </div>
      ) : (
        <img
          src="/assets/aistudio/STICKER_PACK_FONT_FIKS_bb43410e.png"
          alt="Sanubari Roastery"
          style={{ width: '100px' }}
          className="w-[100px] h-auto object-contain shrink-0 transition-transform duration-200 group-hover:scale-[1.02]"
        />
      )}
    </div>
  );
};
