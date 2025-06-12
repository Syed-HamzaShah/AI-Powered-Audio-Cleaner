
import React from 'react';

interface AdPlacementProps {
  id: string;
  size: 'banner' | 'rectangle' | 'sidebar' | 'mobile-banner';
  className?: string;
}

export const AdPlacement: React.FC<AdPlacementProps> = ({ id, size, className = '' }) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'banner':
        return 'h-24 md:h-32'; // 728x90 or 970x250
      case 'rectangle':
        return 'h-64 w-80'; // 300x250
      case 'sidebar':
        return 'h-96 w-40'; // 160x600
      case 'mobile-banner':
        return 'h-16 md:h-20'; // 320x50 or 320x100
      default:
        return 'h-24';
    }
  };

  return (
    <div 
      id={`ad-${id}`}
      className={`
        bg-slate-800/50 border-2 border-dashed border-slate-600 rounded-lg
        flex items-center justify-center text-slate-400 text-sm
        ${getSizeClasses()} ${className}
      `}
    >
      <div className="text-center">
        <div className="font-medium">Ad Space</div>
        <div className="text-xs opacity-75">{size}</div>
      </div>
    </div>
  );
};
