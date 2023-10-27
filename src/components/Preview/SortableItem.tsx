import { CSSProperties, FC } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { CustomFile } from 'types/CustomFile';

import { PDFItem } from './PDFItem';

type SortableItemProps = {
  file: CustomFile;
};

export const SortableItem: FC<SortableItemProps> = ({ file }) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: file.id,
  });

  const animation: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : undefined,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <PDFItem
      ref={setNodeRef}
      style={animation}
      file={file.file}
      isDragging={isDragging}
      {...attributes}
      {...listeners}
    />
  );
};
