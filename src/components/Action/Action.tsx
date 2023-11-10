import { FC, useCallback } from 'react';

import { PDFDocument } from 'pdf-lib';

import { Button } from 'components/tokens/Button';

import { useStore } from 'stores';

import { CustomFile, DownloadLink } from 'types';

import './Action.css';

type ActionProps = {
  files: CustomFile[];
  downloadLink?: DownloadLink;
  onSetDownloadLink: (data: DownloadLink | undefined) => void;
};

export const Action: FC<ActionProps> = ({
  files,
  downloadLink,
  onSetDownloadLink,
}) => {
  const updateProgress = useStore((state) => state.updateProgress);

  const saveMergedPdf = useCallback(
    (mergedFile: Uint8Array, filename: string) => {
      const link = URL.createObjectURL(
        new Blob([mergedFile], { type: 'application/pdf' }),
      );
      return { download: filename, href: link };
    },
    [],
  );

  const processPdfMerge = useCallback(async () => {
    // clear the download button if files are already processed
    onSetDownloadLink(undefined);

    const mergePdf = await PDFDocument.create();
    let totalFilesByte = 0;
    let totalProcessedByte = 0;

    // convert files to arraybuffer
    const arrayBufferList = files.map(async ({ file }) => {
      totalFilesByte += file.size;
      return await file.arrayBuffer();
    });

    console.log({ totalFilesByte });

    // copy all the pages and add to merge file
    for (let index = 0; index < arrayBufferList.length; index++) {
      const element = await arrayBufferList[index];
      const pdfToMerge = await PDFDocument.load(element);

      const copiedPages = await mergePdf.copyPages(
        pdfToMerge,
        pdfToMerge.getPageIndices(),
      );

      for (let index = 0; index < copiedPages.length; index++) {
        const page = copiedPages[index];
        mergePdf.addPage(page);
      }

      totalProcessedByte += element.byteLength;
      updateProgress(totalProcessedByte / totalFilesByte);
    }

    const mergedPdf = await mergePdf.save();
    const saveInfo = saveMergedPdf(mergedPdf, 'merged-document.pdf');

    onSetDownloadLink(saveInfo);
  }, [files, onSetDownloadLink, saveMergedPdf, updateProgress]);

  return (
    <section className="handle-btns">
      <Button
        className="btn merge-btn"
        /**
         * This can also be fixed adding rule in `.eslintrc` file
         *
         * ```
         * {
         *  "@typescript-eslint/no-misused-promises": [
         *    "error",
         *    {
         *      "checksVoidReturn": false
         *   }
         *  ]
         * }
         * ```
         *
         * Link: https://typescript-eslint.io/rules/no-misused-promises/
         */
        onClick={() => {
          void (async () => await processPdfMerge())();
        }}
      >
        Process files
      </Button>
      <a
        type="button"
        className={`btn download-btn ${
          !downloadLink?.href ? 'disabled-btn' : ''
        }`}
        {...downloadLink}
      >
        Download
      </a>
    </section>
  );
};

export default Action;
