import { forwardRef } from 'react';

import { Document, Page } from 'react-pdf';

import loading from 'assets/loading.svg';
import remove from 'assets/remove.svg';

type PDFItemProps = {
  file?: File;
  isDragging?: boolean;
  style?: React.CSSProperties;
  onFileRemove?: React.MouseEventHandler;
};

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

export const PDFItem = forwardRef<HTMLDivElement, PDFItemProps>(
  ({ file, isDragging = false, onFileRemove, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`document-container ${isDragging ? 'is-dragging' : ''}`}
        {...props}
      >
        <div className={`${isDragging ? 'drag-overlay' : ''}`}>
          <Document
            file={file}
            options={options}
            loading={
              <div className="">
                <img src={loading} alt="loading" />
              </div>
            }
          >
            <Page
              pageIndex={0}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            ></Page>
            <p className="document-label">{file?.name}</p>
          </Document>
          <div className="actions-container">
            <button onClick={onFileRemove}>
              <img src={remove} alt="remove file" />
            </button>
          </div>
        </div>
      </div>
    );
  },
);

PDFItem.displayName = 'PDFItem';
