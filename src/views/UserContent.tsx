import { useAppStore } from '@/state/store'
import { Upload } from 'lucide-react'

export default function UserContent() {
  const selected = useAppStore((state) => state.input_type);

  switch (selected) {
    case 'file':
      return <FileContent />
    case 'text':
      return <TextContent />
  }
}

function FileContent() {
  const userFile = useAppStore((state) => state.user_file);
  const updateFile = useAppStore((state) => state.updateFile);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    updateFile(file);
  };

  const file_name = userFile ? userFile.name : 'Click to select a file'

  const file_size = userFile
    ? `${(userFile.size/1024).toFixed(2)} KB`
    : 'The file must be in .txt or .pdf format'

  return (
    <>
      <input id='file-upload' hidden={true} type='file' onChange={onFileChange}></input>
      <label htmlFor='file-upload'>
        <div>
          <Upload className='icon' size={64}/>
          <h3>{file_name}</h3>
          <p>{file_size}</p>
        </div>
      </label>
    </>
  )
}

function TextContent() {
  const userText = useAppStore((state) => state.user_text);
  const updateText = useAppStore((state) => state.updateText);
  
  const onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateText(event.target.value);
  };

  return <textarea
    name='email'
    onChange={onTextChange}
    value={userText}
    placeholder='Enter your text here...'>
  </textarea>
}
