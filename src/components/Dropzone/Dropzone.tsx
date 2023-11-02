import { FC } from 'react';

import { Accept, DropEvent, FileRejection, useDropzone } from 'react-dropzone';

import plus from 'assets/plus.svg';

type DropzoneProps = {
  accept?: Accept;
  withinFiles?: boolean;
  onDrop?: <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent,
  ) => void;
};

export const Dropzone: FC<DropzoneProps> = ({
  accept,
  withinFiles = false,
  onDrop,
}) => {
  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      accept,
    });
  const status = isDragAccept ? 'accept' : isDragReject ? 'reject' : '';

  return withinFiles ? (
    <div className="dropzone-button">
      <label id="dropzone-label" htmlFor="add-file" {...getRootProps()}>
        <div>
          <img src={plus} alt="add document" />
          <span>Add document</span>
        </div>
      </label>
      <input id="add-file" {...getInputProps()} />
    </div>
  ) : (
    <div
      className={getClassName('dropzone-container', status)}
      {...getRootProps()}
    >
      <input className="dropzone-input" {...getInputProps()} />
      <div className="text-center">
        {isDragAccept ? (
          <p className="dropzone-content">Drop the file(s) here...</p>
        ) : isDragReject ? (
          <p className="dropzone-content">Cannot drop the file(s) here...</p>
        ) : (
          <p className="dropzone-content">
            Drag and drop files here, or click to select files (pdfs only)
          </p>
        )}
      </div>
    </div>
  );
};

// fix styling
const getClassName = (className: string, status?: string) => {
  if (!status) return className;
  return `${className} ${className}-${status}`;
};
