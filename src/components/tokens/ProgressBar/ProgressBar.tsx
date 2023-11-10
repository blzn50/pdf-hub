import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

import './ProgressBar.css';

type ProgressBarProps = {
  /**
   * @property {number} percent - integer between 0 and 100
   */
  percent: number;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const ProgressBar: FC<ProgressBarProps> = ({ percent, ...props }) => {
  return (
    <div
      className="progress-outer"
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      {...props}
    >
      <div className="progress-inner" style={{ width: `${percent}%` }}></div>
    </div>
  );
};
