import { useAppStore } from '@/state/store'
import { Upload, FileText } from 'lucide-react'

export default function InputType() {
  const selected = useAppStore((state) => state.input_type);
  const selectButton = useAppStore((state) => state.selectButton)

  return (
    <div id='input-type-div'>
      <button
        className={selected === 'file' ? 'file-type-button selected' : 'file-type-button'}
        id='file-button'
        onClick={() => selectButton('file')}
      >
        <Upload className='icon' size={16}/>
        File
      </button>

      <button
        className={selected === 'text' ? 'file-type-button selected' : 'file-type-button'}
        id='text-button'
        onClick={() => selectButton('text')}
      >
        <FileText className='icon' size={16}/>
        Text
      </button>
    </div>
  )
}
