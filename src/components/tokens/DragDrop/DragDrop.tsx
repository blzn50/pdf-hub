import { CSSProperties, DragEvent, ReactNode, forwardRef } from 'react';

export type DragDropProps = {
  style?: CSSProperties;
  type?: 'round' | 'inline';
  label?: ReactNode;
  onChange: () => void;
  onDrop: (e: DragEvent) => void;
  onDragEnter: (e: DragEvent) => void;
  onDragOver: (e: DragEvent) => void;
};

export const DragDrop = forwardRef<HTMLInputElement, DragDropProps>(
  (
    { type = 'inline', label, onDrop, onDragEnter, onDragOver, ...props },
    ref,
  ) => {
    return (
      <div className={`drag-drop ${type}`}>
        <label
          htmlFor="pdf_uploads"
          onDragEnter={onDragEnter}
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          {label}
        </label>
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

DragDrop.displayName = 'DragDrop';
