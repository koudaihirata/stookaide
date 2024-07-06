import React from 'react';

type ProgressbarProps = {
  width: number;
  percent: number;
};

const Progressbar: React.FC<ProgressbarProps> = ({ width, percent }) => {
  const progressWidth = `${percent * 100}%`;

  return (
    <div style={{ width: `${width}%`, backgroundColor: '#e0e0df', borderRadius: '8px', overflow: 'hidden',marginTop:'10px'}}>
      <div style={{ width: progressWidth, backgroundColor: '#76c7c0', height: '20px' }} />
    </div>
  );
};

export default Progressbar;
