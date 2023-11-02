import { useCallback, useState } from 'react';

import {
  DndContext,
  DragEndEvent,
  MeasuringStrategy,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { arrayMove } from '@dnd-kit/sortable';
import { PDFDocument } from 'pdf-lib';
import { pdfjs } from 'react-pdf';

import { Dropzone } from 'components/Dropzone';
import { Preview } from 'components/Preview';
import { Button } from 'components/tokens/Button';

import { objectId } from 'helpers/function';

import { CustomFile, DownloadLink } from 'types';

import './App.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const measuringStrategy = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

function App() {
  const [files, setFiles] = useState<CustomFile[]>([]);
  const [downloadLink, setDownloadLink] = useState<DownloadLink | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  const handleDragToDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [
      ...prevFiles,
      ...acceptedFiles.map<CustomFile>((file) => ({
        file: file,
        uploadDate: Date.now(),
        id: objectId(),
      })),
    ]);
    setDownloadLink(null);
  }, []);

  const handleRearrangeFiles = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (over && active.id !== over.id) {
        const oldIndex = files.findIndex((file) => file.id === active.id);
        const newIndex = files.findIndex((file) => file.id === over.id);
        setFiles((oldFiles) => {
          return arrayMove(oldFiles, oldIndex, newIndex);
        });
      }
    },
    [files],
  );

  const handleRemoveFile = (idToRemove: string) => {
    setFiles((oldFiles) => oldFiles.filter((file) => file.id !== idToRemove));
    setDownloadLink(null);
  };

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
    const mergePdf = await PDFDocument.create();

    // convert files to arraybuffer
    const arrayBufferList = files.map(
      async (file) => await file.file.arrayBuffer(),
    );

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
    }

    const mergedPdf = await mergePdf.save();
    const saveInfo = saveMergedPdf(mergedPdf, 'merged-document.pdf');

    setDownloadLink(saveInfo);
  }, [files, saveMergedPdf]);

  return (
    <main className="pdf-merge">
      <h2 style={{ textAlign: 'center' }}>Merge PDF</h2>
      <Dropzone
        onDrop={handleDragToDrop}
        accept={{ 'application/pdf': ['.pdf'] }}
      />
      {!!files.length && (
        <>
          <section className="files-manipulation__container">
            <DndContext
              onDragEnd={handleRearrangeFiles}
              sensors={sensors}
              modifiers={[restrictToWindowEdges]}
              measuring={measuringStrategy}
            >
              <Preview files={files} onFileRemove={handleRemoveFile} />
            </DndContext>
          </section>

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
        </>
      )}
    </main>
  );
}

export default App;
