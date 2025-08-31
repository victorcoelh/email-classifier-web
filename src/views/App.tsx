import "./App.css";
import ClassifyButton from "../components/ClassifyButton";
import InputType from "../components/InputType";
import UserContent from "../components/UserContent";
import ResultPage from "../views/ResultPage";
import { useAppStore } from "@/state/store";

export default function App() {
  return (
    <>
      <main>
        <PageSelector />
      </main>
      <Footer />
    </>
  );
}

function PageSelector() {
  const appStatus = useAppStore((state) => state.appStatus);

  if (appStatus === "complete") {
    return <ResultPage />;
  } else {
    return <DefaultPage />;
  }
}

function DefaultPage() {
  return (
    <>
      <h1>E-mail Classification Service</h1>
      <p>Upload a file(s) containing the e-mail(s), or copy the text below</p>
      <InputType />
      <UserContent />
      <ClassifyButton />
    </>
  );
}

function Footer() {
  return (
    <footer>
      <p>
        2025 - Created with care by <a href="https://github.com/victorcoelh">Victor Coelho</a> :)
      </p>
    </footer>
  );
}
