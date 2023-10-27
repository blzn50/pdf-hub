import { forwardRef } from 'react';

import { Document, Page } from 'react-pdf';

import Loading from 'assets/loading.svg';

type PDFItemProps = {
  file?: File;
  isDragging?: boolean;
  style?: React.CSSProperties;
};

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

export const PDFItem = forwardRef<HTMLDivElement, PDFItemProps>(
  ({ file, isDragging = false, ...props }, ref) => (
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
              <img src={Loading} alt="loading" />
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
      </div>
    </div>
  ),
);

PDFItem.displayName = 'PDFItem';
