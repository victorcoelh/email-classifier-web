import { useAppStore } from "@/state/store";
import { Upload, FileText } from "lucide-react";
import "./styles/InputType.css";

export default function InputType() {
  const selected = useAppStore((state) => state.inputType);
  const selectButton = useAppStore((state) => state.selectButton);

  return (
    <div className="rounded" id="input-type-div">
      <button
        className={selected === "file"
          ? "bg-primary rounded"
          : "color-muted rounded"
        }
        id="file-button"
        onClick={() => selectButton("file")}
      >
        <Upload className="icon" size={16} />
        File
      </button>

      <button
        className={selected === "text"
          ? "bg-primary rounded"
          : "color-muted rounded"
        }
        id="text-button"
        onClick={() => selectButton("text")}
      >
        <FileText className="icon" size={16} />
        Text
      </button>
    </div>
  );
}
