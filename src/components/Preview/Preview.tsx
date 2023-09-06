import { FC } from 'react';

type PreviewProps = {
  files: File[];
};

export const Preview: FC<PreviewProps> = ({ files }) => {
  return (
    <div className="preview-container">
      {files.length === 0 ? (
        <p className="no-file">No files to preview</p>
      ) : (
        <ul>
          {files.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
