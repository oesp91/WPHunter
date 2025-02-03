import { useState } from 'react';
import FileInput from "@components/FileInput"
import Button from "@components/Button"
import Spinner from "@components/Spinner"

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      const response = await fetch('http://localhost:8000/api/analysis/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log("Upload success:", data);
      // 분석 시작 후 처리
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col items-center gap-7">
        <FileInput onChange={setFile} />
        <Button
          color={file ? "yellow" : "zinc"}
          disabled={!file || uploading}
          onClick={handleUpload}
        >
        { uploading ? (
          <span className="flex items-center gap-2">
            <Spinner />
            Analyzing...
          </span>
        ) : (
          "Start Analysis"
        )}
        </Button>
      </div>
    </div>
  );
};

export default FileUpload;
