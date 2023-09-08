import { forwardRef, DragEvent } from 'react';

import { DragDrop, DragDropProps } from 'components/tokens/DragDrop';

type PreviewProps = {
  files: File[];
  onRemoveFile?: (fileName: string, fileIndex: number) => void;
  onDragFileStart: (e: DragEvent, fileIndex: number) => void;
  onDragEnd: (e: DragEvent) => void;
} & Omit<DragDropProps, 'label' | 'type'>;

export const Preview = forwardRef<HTMLInputElement, PreviewProps>(
  (
    {
      files,
      onChange,
      onDrop,
      onDragEnter,
      onDragOver,
      onRemoveFile,
      onDragFileStart,
      onDragEnd,
    },
    ref,
  ) => {
    return files.length === 0 ? (
      <div className="empty-preview-container">
        <DragDrop
          ref={ref}
          onChange={onChange}
          onDragEnter={onDragEnter}
          onDragOver={onDragOver}
          onDrop={onDrop}
          type="inline"
          label="Drop files here or click to browse them."
        />
      </div>
    ) : (
      <div className="preview-container">
        <ul onDragOver={onDragOver}>
          {files.map((file, fileIndex) => (
            <li
              key={file.name + fileIndex}
              draggable
              onDragStart={(e) => onDragFileStart(e, fileIndex)}
              onDragEnd={onDragEnd}
            >
              <span>{file.name}</span>
              <button onClick={() => onRemoveFile?.(file.name, fileIndex)}>
                &#x274C;
              </button>
            </li>
          ))}
        </ul>
        <div className="add-btn-container">
          <DragDrop
            ref={ref}
            onChange={onChange}
            onDragEnter={onDragEnter}
            onDragOver={onDragOver}
            onDrop={onDrop}
            type="round"
            label="Add document"
          />
        </div>
      </div>
    );
  },
);

Preview.displayName = 'Preview';
