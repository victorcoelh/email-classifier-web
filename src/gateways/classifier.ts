import axios from 'axios';

type Payload = FormData | { text: string }

export function classifyFile(content: File) {
  let form_data = new FormData();
  form_data.append('email', content);

  sendRequestToPythonBackend('email/classify-file', form_data)
}

export function classifyText(content: string) {
  sendRequestToPythonBackend('email/classify', { text: content })
}

function sendRequestToPythonBackend(endpoint: string, payload: Payload) {
  axios.post(`http://localhost:8001/${endpoint}`, payload)
    .then(response => console.log(response.data))
    .catch(error => console.error(error))
}
