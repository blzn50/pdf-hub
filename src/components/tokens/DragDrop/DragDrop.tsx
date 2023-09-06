import { CSSProperties, forwardRef } from 'react';

type DragDropProps = {
  style?: CSSProperties;
  onChange?: () => void;
};

export const DragDrop = forwardRef<HTMLInputElement, DragDropProps>(
  ({ ...props }, ref) => {
    return (
      <div className="drag-drop">
        <label htmlFor="pdf_uploads">Choose files to merge (pdf format)</label>
        <input
          id="pdf_uploads"
          type="file"
          multiple
          accept=".pdf"
          {...props}
          ref={ref}
        />
      </div>
    );
  },
);
