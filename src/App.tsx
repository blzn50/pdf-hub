import { useState, useCallback } from 'react';

import { Dropzone } from 'components/Dropzone';
import { Preview } from 'components/Preview';
// import { Button } from 'components/tokens/Button';
import { pdfjs } from 'react-pdf';

import './App.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

function App() {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrag = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  return (
    <main className="pdf-merge">
      <h2 style={{ textAlign: 'center' }}>Merge PDF</h2>
      <Dropzone onDrop={handleDrag} accept={{ 'application/pdf': ['.pdf'] }} />
      <Preview files={files} />
      {/* <Button className="merge-btn">Add files to merge</Button> */}
    </main>
  );
}

export default App;
