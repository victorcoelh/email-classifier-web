import { useAppStore } from "@/state/store";
import { classifyFiles, classifyText } from "@/gateways/classifier";
import { Send } from "lucide-react";
import "./styles/ClassifyButton.css";

export default function ClassifyButton() {
  const appStatus = useAppStore((state) => state.appStatus);

  if (appStatus === 'processing') {
    return <LoadingButton />
  } else {
    return <IdleButton />
  }
}

function LoadingButton() {
  return (
    <button className="classify-button" disabled>
      <div className="loader icon"></div>
      Processing...
    </button>
  )
}

function IdleButton() {
  const selected = useAppStore((state) => state.inputType);
  const { userFiles, userText } = useAppStore((state) => state.userContent);
  const setStatus = useAppStore((state) => state.setStatus);
  const setResult = useAppStore((state) => state.setResult);
  const setCurrentFile = useAppStore((state) => state.setCurrentFile);

  const onClick = () => {
    setStatus("processing");

    const promise = selected === "text" ? classifyText(userText) : classifyFiles(userFiles);

    promise
      .then((response) => {
        setResult(response.data);
        setCurrentFile(0);
        setStatus("complete");
      })
      .catch((error) => {
        console.log(error);
        setStatus("failed");
      });
  };

  return (
    <button className="classify-button" onClick={onClick}>
      <Send className="icon" size={16} />
      Submit Content
    </button>
  );
}
