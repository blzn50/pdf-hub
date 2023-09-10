import { FC } from 'react';

import { Document, Page } from 'react-pdf';

import type { PDFDocumentProxy } from 'pdfjs-dist';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

type PreviewProps = {
  files: File[];
};

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

export const Preview: FC<PreviewProps> = ({ files }) => {
  console.log({ files });
  return (
    <div className="preview-container">
      {files.map((file, i) => (
        <div key={i} className="document-container">
          <Document
            file={file}
            options={options}
            loading={<div className="react-pdf__Page">Loading PDF...</div>}
          >
            <Page
              pageIndex={0}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            ></Page>
            <p className="document-label">{file.name}</p>
          </Document>
        </div>
      ))}
    </div>
  );
};
