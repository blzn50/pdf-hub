import { useState, useRef } from 'react';

import { Preview } from 'components/Preview';
import { Button } from 'components/tokens/Button';
import { DragDrop } from 'components/tokens/DragDrop';

import './App.css';

function App() {
  const filesRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  const handleFilesChange = () => {
    const tempFiles = filesRef.current?.files;

    if (!tempFiles || tempFiles?.length === 0) {
      setFiles([]);
    } else {
      const tempFilesArray = [];
      for (const file of tempFiles) {
        tempFilesArray.push(file);
      }
      setFiles(tempFilesArray);
    }
  };

  return (
    <div className="pdf-merge">
      <Preview files={files} />
      <DragDrop ref={filesRef} onChange={handleFilesChange} />
      <Button className="merge-btn">Add files to merge</Button>
    </div>
  );
}

export default App;
