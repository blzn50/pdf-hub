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
import { pdfjs } from 'react-pdf';

import { Dropzone } from 'components/Dropzone';
import { Preview } from 'components/Preview';

import { objectId } from 'helpers/function';

import { CustomFile } from 'types/CustomFile';
// import { Button } from 'components/tokens/Button';

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
  };

  return (
    <main className="pdf-merge">
      <h2 style={{ textAlign: 'center' }}>Merge PDF</h2>
      <Dropzone
        onDrop={handleDragToDrop}
        accept={{ 'application/pdf': ['.pdf'] }}
      />

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
      {/* <Button className="merge-btn">Add files to merge</Button> */}
    </main>
  );
}

export default App;
