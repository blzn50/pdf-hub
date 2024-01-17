import path from 'node:path';

import { act, fireEvent, render, screen } from '@testing-library/react';
import { ensureDir, readFile } from 'fs-extra';

import { Action, ActionProps } from '.';

const initialProps: ActionProps = {
  files: [],
  onSetDownloadLink: vi.fn(),
};

const FIXTURES_DIR = path.join(__dirname, 'fixtures');
const TEMP_DIR = path.join(__dirname, 'tmp');

// https://stackoverflow.com/questions/8609289/convert-a-binary-nodejs-buffer-to-javascript-arraybuffer/31394257#31394257
async function readFileAsync(fileName: string) {
  const buffer = await readFile(path.join(FIXTURES_DIR, fileName));
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength,
  );
}

describe('Action component', () => {
  beforeAll(async () => {
    await ensureDir(TEMP_DIR);
  });

  test.skip('should render action buttons', () => {
    render(<Action {...initialProps} />);
    expect(screen.getByText(/process files/i)).toBeInTheDocument();
    expect(screen.getByText(/download/i)).toBeInTheDocument();
  });

  test.skip("should do nothing on clicking 'process files' button when there is no file", () => {
    // const mockFn = vi.fn().mockImplementation(initialProps.onSetDownloadLink);

    render(<Action {...initialProps} />);

    const processBtn = screen.getByText(/process files/i);
    act(() => {
      fireEvent.click(processBtn);
    });
    expect(initialProps.onSetDownloadLink).not.toHaveBeenCalled();
  });

  test("should process files on clicking 'process files' button", async () => {
    const file = await readFileAsync('test.pdf');
    render(
      <Action
        {...initialProps}
        files={[
          {
            file: new File([file], 'test.pdf', { type: 'application/pdf' }),
            id: '123',
            uploadDate: Date.now(),
          },
        ]}
      />,
    );

    const processBtn = screen.getByText(/process files/i);
    act(() => {
      fireEvent.click(processBtn);
    });
    expect(initialProps.onSetDownloadLink).toHaveBeenCalled();
  });
});
