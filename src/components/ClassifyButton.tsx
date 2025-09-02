import { useAppStore } from "@/state/store";
import { classifyFiles, classifyText } from "@/gateways/classifier";
import { Send } from "lucide-react";
import "./styles/ClassifyButton.css";
import toast from "react-hot-toast";

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
    <button className="classify-button color-foreground" disabled>
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
        const errorMessage = error?.message || "Something went wrong";

        toast.error(errorMessage, {
          position: "bottom-center",
          duration: 4000,
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });

        setStatus("idle");
      });
  };

  return (
    <button className="classify-button" onClick={onClick}>
      <Send className="icon" size={16} />
      Submit Content
    </button>
  );
}
