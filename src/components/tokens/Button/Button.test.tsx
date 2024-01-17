import { render, screen } from '@testing-library/react';

import { Button } from '.';

describe('Button token', () => {
  test('should render', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText(/Click me/i)).toBeInTheDocument();
  });
});
