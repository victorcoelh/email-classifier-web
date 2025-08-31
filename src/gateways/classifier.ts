import type { AxiosResponse } from "axios";
import type { EmailResult } from "@/state/store";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8001";

type ServerResponse = Promise<AxiosResponse<Array<EmailResult>>>

export function classifyFiles(content: Array<File>): ServerResponse {
  const form_data = new FormData();
  content.forEach(file => form_data.append("emails", file))

  return axios.post("email/classify-files", form_data);
}

export function classifyText(content: string): ServerResponse {
  return axios.post("email/classify", { email: content });
}
