import { useAppStore } from '@/state/store';
import { classifyFile, classifyText } from '@/gateways/classifier';
import { Send } from 'lucide-react';

export default function ClassifyButton() {
  const selected = useAppStore((state) => state.input_type);
  const userFile = useAppStore((state) => state.user_file);
  const userText = useAppStore((state) => state.user_text);

  const onClick = () => {
    switch (selected) {
      case 'text':
        return classifyText(userText);
      case 'file':
        if (userFile) return classifyFile(userFile);
        break;
    }
  }

  return (
    <button className='classify-button' onClick={onClick}>
      <Send className='icon' size={16}/>
      Submit Content
    </button>
  )
}
