import type { AxiosResponse } from "axios";
import type { EmailResult } from "@/state/store";
import axios from "axios";

type ServerResponse = Promise<AxiosResponse<Array<EmailResult>>>

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "x-api-key": import.meta.env.VITE_API_KEY }
})

export function classifyFiles(content: Array<File>): ServerResponse {
  const form_data = new FormData();
  content.forEach(file => form_data.append("emails", file))

  return api.post("email/classify-files", form_data);
}

export function classifyText(content: string): ServerResponse {
  return api.post("email/classify", { email: content });
}
