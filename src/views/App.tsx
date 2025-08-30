import './App.css'
import ClassifyButton from './ClassifyButton'
import InputType from './InputType'
import UserContent from './UserContent'

export default function App() {
  return <>
    <Main />
    <Footer />
  </>
}

function Main() {
  return (
    <main>
      <h1>E-mail Classification Service</h1>
      <p>Upload a file(s) containing the e-mail(s), or copy the text below</p>
      <InputType />
      <UserContent />
      <ClassifyButton />
    </main>
  )
}

function Footer() {
  return (
    <footer>
      <p>2025 - Created with care by <a href="https://github.com/victorcoelh">Victor Coelho</a> :)</p>
    </footer>
  )
}
