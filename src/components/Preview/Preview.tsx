import { FC, useMemo } from 'react';

import { SortableContext } from '@dnd-kit/sortable';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import { CustomFile } from 'types/CustomFile';

import { SortableItem } from './SortableItem';

type PreviewProps = {
  files: CustomFile[];
  onFileRemove?: (id: string) => void;
};

export const Preview: FC<PreviewProps> = ({ files, onFileRemove }) => {
  const fileIds = useMemo(() => files.map((file) => file.id), [files]);

  return (
    <SortableContext items={fileIds}>
      <div className="preview-container">
        {files.map((file) => (
          <SortableItem file={file} key={file.id} onFileRemove={onFileRemove} />
        ))}
      </div>
    </SortableContext>
  );
};
