import { CSSProperties, FC, useRef, useState } from 'react';

import { animated, to, useSpring } from '@react-spring/web';
import { useDrag, useDrop } from 'react-dnd';
import { Document, Page } from 'react-pdf';

import { CustomFile } from 'types/CustomFile';
import { ItemTypes } from 'types/ItemTypes';

type PDFItemProps = {
  file: CustomFile;
  fileIndex: number;
  style?: CSSProperties;
  rearrangeFiles: (dragIndex: number, hoverIndex: number) => void;
  onAnimation?: (x: number, y: number) => void;
};

type Item = {
  id: string;
  fileIndex: number;
  getBoundingClientRect: () => DOMRect;
};

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

export const PDFItem: FC<PDFItemProps> = ({
  file,
  fileIndex,
  style,
  rearrangeFiles,
  onAnimation,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  // const [xy, setXY] = useState([0, 0]);

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.PDF,
    hover: (item: Item, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.fileIndex;
      const hoverIndex = fileIndex;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoveredItemRect = ref.current.getBoundingClientRect();
      const hoverMiddleX = (hoveredItemRect.right - hoveredItemRect.left) / 2;
      const hoverMiddleY = (hoveredItemRect.bottom - hoveredItemRect.top) / 2;

      // moving item
      const draggedItemRect = item.getBoundingClientRect();

      // determine mouse position
      const clientOffset = monitor.getClientOffset();

      // get pixels to top
      const hoverClientY = clientOffset.y - hoveredItemRect.top;

      // get pixels to left
      const hoverClientX = clientOffset.x - hoveredItemRect.left;

      // only perform dragging when the mouse has crossed half of the item's height/width

      // check if dragging left/right
      const isDragRight = dragIndex === hoverIndex - 1;
      const isDragLeft = dragIndex === hoverIndex + 1;

      // check if dragging top/bottom
      const isDragUp = draggedItemRect.top > hoveredItemRect.top;
      const isDragDown = draggedItemRect.bottom < hoveredItemRect.bottom;

      if (
        isDragRight &&
        dragIndex < hoverIndex &&
        hoverClientX < hoverMiddleX
      ) {
        return;
      }

      if (isDragLeft && dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }

      if (isDragUp && dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      if (isDragDown && dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      rearrangeFiles(dragIndex, hoverIndex);
      item.fileIndex = hoverIndex;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.PDF,
      item: {
        id: file.id,
        fileIndex,
        getBoundingClientRect: () => ref.current?.getBoundingClientRect() ?? {},
      },
      beginDrag: () => {},
      end: (draggedItem, monitor) => {
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          rearrangeFiles(draggedItem.fileIndex, fileIndex);
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [file.id, fileIndex, rearrangeFiles],
  );

  drag(drop(ref));
  return (
    <animated.div
      className={`document-container ${isDragging ? 'dragging-active' : ''} ${
        isOver ? 'dragging-over' : ''
      }`}
      style={{
        // transform: `translate3d(${xy[0]}px, ${xy[1]}px, 0)`,
        ...style,
      }}
      ref={ref}
    >
      <Document
        file={file.file}
        options={options}
        // loading={<div className="react-pdf__Page">Loading PDF...</div>}
      >
        <Page
          pageIndex={0}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        ></Page>
        <p className="document-label">{file.file.name}</p>
      </Document>
    </animated.div>
  );
};
