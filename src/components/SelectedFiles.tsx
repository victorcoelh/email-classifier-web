import { useAppStore } from "@/state/store";
import { File } from 'lucide-react';
import './styles/SelectedFiles.css';

export default function SelectedFiles() {
  const appStatus = useAppStore((state) => state.appStatus);
  const isComplete = appStatus === 'complete';
  
  const text = isComplete ? "Select a file to see the Results:" : "Selected Files:"

  return (
    <>
      <h4>{text}</h4>
      <FileList highlightCurrent={isComplete}/>
    </>
    )
}

function FileList({ highlightCurrent }: { highlightCurrent: boolean }) {
  const currentFile = useAppStore((state) => state.currentFile);
  const userFiles = useAppStore((state) => state.userContent.userFiles);
  const setFile = useAppStore((state) => state.setCurrentFile);

  const mapFile = (file: File, index: number) => {
    return (
      <li
        key={index}
        className={currentFile === index && highlightCurrent ? "selected-file" : ""}
        onClick={() => setFile(index)}
      >
        <File className="icon" size={16} />
        {file.name}
        <p>{(file.size / 1024).toFixed(2)} KB</p>
      </li>
    )
  }
  return <ul>{userFiles.map(mapFile)}</ul>
}
