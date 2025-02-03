const FileInput = ({ onChange }: { onChange: (file: File | null) => void }) => (
  <input
    type="file"
    accept=".zip"
    onChange={e => onChange(e.target.files?.[0] || null)}
    className="border p-2 rounded w-full max-w-md"
  />
);

export default FileInput;
