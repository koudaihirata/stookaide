import { accentColor } from '@/style/color';
import React from 'react';

type ProgressbarProps = {
  width: number;
  percent: number;
};

const Progressbar: React.FC<ProgressbarProps> = ({ width, percent }) => {
  const progressWidth = `${percent * 100}%`;

  return (
    <div style={{ width: `${width}%`, backgroundColor: '#e0e0df', borderRadius: '8px', overflow: 'hidden',marginTop:'12px'}}>
      <div style={{ width: progressWidth, backgroundColor: accentColor, height: '16px' }} />
    </div>
  );
};

export default Progressbar;
