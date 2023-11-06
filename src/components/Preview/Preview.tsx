import { FC, ReactNode, useMemo } from 'react';

import { SortableContext } from '@dnd-kit/sortable';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import { CustomFile } from 'types';

import { SortableItem } from './SortableItem';

import './Preview.css';

type PreviewProps = {
  files: CustomFile[];
  onFileRemove?: (id: string) => void;
  children?: ReactNode;
};

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

export const Preview: FC<PreviewProps> = ({
  files,
  children,
  onFileRemove,
}) => {
  const fileIds = useMemo(() => files.map((file) => file.id), [files]);

  return (
    <section className="files-manipulation__container">
      <SortableContext items={fileIds}>
        <div className="preview-container">
          {files.map((file) => (
            <SortableItem
              file={file}
              key={file.id}
              onFileRemove={onFileRemove}
            />
          ))}
          {children}
        </div>
      </SortableContext>
    </section>
  );
};

export default Preview;
