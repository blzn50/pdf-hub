import { useState, useRef, DragEvent } from 'react';

import { Preview } from 'components/Preview';
import { Button } from 'components/tokens/Button';
import { DragDrop } from 'components/tokens/DragDrop';

import './App.css';

function App() {
  const filesRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  const handleFilesChange = () => {
    const tempFiles = filesRef.current?.files;

    if (!(!tempFiles || tempFiles?.length === 0)) {
      const tempFilesArray: File[] = [];
      for (const file of tempFiles) {
        tempFilesArray.push(file);
      }
      setFiles((oldFiles) => oldFiles.concat(tempFilesArray));
    }
  };

  const handleDragEnter = (e: DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleDragOver = (e: DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleDragDrop = (e: DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const droppedFiles = e.dataTransfer?.files;
    if (droppedFiles && droppedFiles?.length > 0) {
      const tempDroppedFilesArray: File[] = [];
      for (const file of droppedFiles) {
        tempDroppedFilesArray.push(file);
      }
      setFiles((oldFiles) => oldFiles.concat(tempDroppedFilesArray));
    }
  };

  const handleDragFileStart = (e: DragEvent, fileIndex: number) => {
    const fileName = e.currentTarget.textContent?.slice(0, -1);
    e.currentTarget.classList.add('dragging');
    // e.dataTransfer.dropEffect = 'move';
    // e.dataTransfer.setData('application/x.name', fileName!);
    // e.dataTransfer.setData('application/x.index', fileIndex.toString());
  };

  const handleDragEnd = (e: DragEvent) => {
    e.currentTarget.classList.remove('dragging');
  };

  const handleFileArrangeDragover = (e: DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const draggedItem = document.querySelector('.dragging');
    const afterElement = getDragAfterElement(draggedItem, e.clientY);

    if (afterElement === null) {
    }
    // const fileName = e.dataTransfer.getData('application/x.name')
    // const fileIndex = e.dataTransfer.getData('application/x.index')

    // const draggedFile = files.find((file, indexToFind) => file.name === fileName && Number(indexToFind) === fileIndex)
  };

  return (
    <div className="pdf-merge">
      <Preview
        files={files}
        ref={filesRef}
        onChange={handleFilesChange}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDrop={handleDragDrop}
        onDragFileStart={handleDragFileStart}
        onDragEnd={handleDragEnd}
      />
      {/* <DragDrop ref={filesRef} onChange={handleFilesChange} label="Add file" /> */}
      {/* <Button className="merge-btn">Add files to merge</Button> */}
    </div>
  );
}

export default App;
