import { useAppStore } from "@/state/store";
import { Upload } from "lucide-react";
import SelectedFiles from "./SelectedFiles";
import './styles/UserContent.css';

export default function UserContent() {
  const selected = useAppStore((state) => state.inputType);

  switch (selected) {
    case "file":
      return <FileContent />;
    case "text":
      return <TextContent />;
  }
}

function FileContent() {
  const { userFiles } = useAppStore((state) => state.userContent);
  const updateFile = useAppStore((state) => state.updateFiles);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files!);
    updateFile(files);
  };

  const total_size = userFiles.reduce((acc, file) => acc + file.size, 0) / 1024

  const file_count = userFiles
    ? `${userFiles.length} files selected`
    : "Click to select a file(s)";

  const size_text = userFiles
    ? `${(total_size).toFixed(2)} KB`
    : "The file must be in .txt or .pdf format";

  return (
    <>
      <input id="file-upload" hidden={true} type="file" onChange={onFileChange} multiple></input>
      <label htmlFor="file-upload">
        <div>
          <Upload className="icon" size={64} />
          <h3>{file_count}</h3>
          <p>{size_text}</p>
        </div>
      </label>
      <SelectedFiles />
    </>
  );
}

function TextContent() {
  const { userText } = useAppStore((state) => state.userContent);
  const updateText = useAppStore((state) => state.updateText);

  const onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateText(event.target.value);
  };

  return (
    <textarea
      name="email"
      onChange={onTextChange}
      value={userText}
      placeholder="Enter your text here..."
    ></textarea>
  );
}
