import { lazy, Suspense, useCallback, useState } from 'react';

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
import { Analytics } from '@vercel/analytics/react';

import { Dropzone } from 'components/Dropzone';

import { objectId } from 'helpers/function';

import { CustomFile, DownloadLink } from 'types';

import './App.css';

const measuringStrategy = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

const Preview = lazy(() => import('./components/Preview'));
const Action = lazy(() => import('./components/Action'));

function App() {
  const [files, setFiles] = useState<CustomFile[]>([]);
  const [downloadLink, setDownloadLink] = useState<DownloadLink | undefined>(
    undefined,
  );
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
    setDownloadLink(undefined);
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
    setDownloadLink(undefined);
  };

  return (
    <main className="pdf-merge">
      <h1 style={{ textAlign: 'center' }}>Merge PDF</h1>
      <Suspense fallback={<>Loading...</>}>
        {files.length === 0 && (
          <Dropzone
            onDrop={handleDragToDrop}
            accept={{ 'application/pdf': ['.pdf'] }}
          />
        )}
        {!!files.length && (
          <>
            <DndContext
              onDragEnd={handleRearrangeFiles}
              sensors={sensors}
              modifiers={[restrictToWindowEdges]}
              measuring={measuringStrategy}
            >
              <Preview files={files} onFileRemove={handleRemoveFile}>
                <Dropzone
                  withinFiles
                  accept={{ 'application/pdf': ['.pdf'] }}
                  onDrop={handleDragToDrop}
                />
              </Preview>
            </DndContext>
            <Action
              files={files}
              downloadLink={downloadLink}
              onSetDownloadLink={setDownloadLink}
            />
          </>
        )}
      </Suspense>
      <Analytics />
    </main>
  );
}

export default App;
