import { render, screen } from '@testing-library/react';

import { ProgressBar } from '.';

describe('ProgressBar token', () => {
  test('should render', () => {
    render(<ProgressBar percent={0} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '0',
    );
  });

  test('should show correct default aria-value*', () => {
    render(<ProgressBar percent={10} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuemax',
      '100',
    );
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuemin',
      '0',
    );
  });

  test('should show correct aria-valuenow', () => {
    render(<ProgressBar percent={45} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '45',
    );
  });
});
