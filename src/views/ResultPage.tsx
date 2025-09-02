import SelectedFiles from "@/components/SelectedFiles";
import { useAppStore } from "@/state/store";
import { ArrowLeft, CircleAlert, CircleCheckBig } from "lucide-react";
import "./ResultPage.css";

export default function ResultPage() {
  const currentFile = useAppStore((state) => state.currentFile);
  const selected = useAppStore((state) => state.inputType);
  const { classification, confidence, suggested_answer } = useAppStore(
    (state) => state.analysisResult[currentFile]
  );

  return (
    <>
      <h1>Analysis Results</h1>
      <p>Processing complete</p>
      {selected === "file" && <SelectedFiles />}
      <div className="left-content">
        <ClassificationResult label={classification} />
        <ConfidenceLevel confidence={confidence} />
        <SuggestedAnswer answer={suggested_answer} />
        <UploadAnother />
      </div>
    </>
  );
}

function ClassificationResult({ label }: { label: string }) {
  const icon = label === "Productive"
    ? <CircleCheckBig className="icon color-primary" />
    : <CircleAlert className="icon red" />;

  return (
    <>
      <div className="classification-result">
        {icon}
        <div className="classification-text">
          <h3>Classification</h3>
          <p>{label}</p>
        </div>
      </div>
    </>
  );
}

function ConfidenceLevel({ confidence }: { confidence: number }) {
  return (
    <>
      <h3 className="inline">Confidence Level</h3>
      <h3 className="inline" id="confidence-level">
        {confidence * 100}%
      </h3>
      <progress value={confidence} className="block" />
    </>
  );
}

function SuggestedAnswer({ answer }: { answer: string }) {
  return (
    <>
      <h3>Suggested Answer</h3>
      <div className="answer-div rounded default-border">
        <p className="color-foreground">{answer}</p>
      </div>
    </>
  );
}

function UploadAnother() {
  const setAppStatus = useAppStore((state) => state.setStatus);

  const onClick = () => {
    setAppStatus("idle");
  };

  return (
    <button className="classify-button" id="upload-another" onClick={onClick}>
      <ArrowLeft size={16} className="icon" />
      Upload Another
    </button>
  );
}
