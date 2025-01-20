import { useState } from 'react';

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
      // 분석 시작 후 처리
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col items-center gap-4">
        <input
          type="file"
          accept=".zip"
          onChange={e => setFile(e.target.files?.[0] || null)}
          className="border p-2 rounded"
        />
        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          {uploading ? 'Uploading...' : 'Analyze Plugin'}
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
