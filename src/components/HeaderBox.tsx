'use client';

import React from 'react';
import { format } from 'date-fns';

interface HeaderBoxProps {
  type?: 'title' | 'greeting';
  title?: string;
  subtext?: string;
  user?: string;
}

const HeaderBox: React.FC<HeaderBoxProps> = ({
  type = 'title',
  title,
  subtext,
  user
}) => {
  const getCurrentDate = () => {
    const today = new Date();
    return format(today, 'EEEE, MMMM d, yyyy');
  };

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white flex items-center gap-2">
        {title}
        {type === 'greeting' && (
          <span className="text-gradient animate-in fade-in slide-in-from-left-4 duration-1000">
            {user}
          </span>
        )}
      </h1>
      <p className="text-zinc-400 text-sm lg:text-base max-w-[500px] leading-relaxed">
        {subtext || (type === 'greeting' ? getCurrentDate() : '')}
      </p>
    </div>
  );
};

export default HeaderBox;
