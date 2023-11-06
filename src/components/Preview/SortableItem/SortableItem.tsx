import { CSSProperties, FC } from 'react';

import {
  AnimateLayoutChanges,
  defaultAnimateLayoutChanges,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { CustomFile } from 'types';

import { PDFItem } from './PDFItem';

type SortableItemProps = {
  file: CustomFile;
  onFileRemove?: (id: string) => void;
};

const customAnimateLayoutChanges: AnimateLayoutChanges = (args) => {
  if (args.isSorting || args.wasDragging) {
    return defaultAnimateLayoutChanges(args);
  }
  return true;
};

export const SortableItem: FC<SortableItemProps> = ({ file, onFileRemove }) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: file.id,
    animateLayoutChanges: customAnimateLayoutChanges,
    transition: {
      duration: 400,
      easing: 'ease',
    },
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
      onFileRemove={() => onFileRemove?.(file.id)}
      {...attributes}
      {...listeners}
    />
  );
};
