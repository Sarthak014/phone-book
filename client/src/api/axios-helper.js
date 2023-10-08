import axios from "axios";

function newAbortSignal(timeoutMs) {
  const abortController = new AbortController();

  setTimeout(() => abortController.abort(), timeoutMs || 0);

  return abortController.signal;
}

const API = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 4000,
  headers: { signal: newAbortSignal(4000) },
});

export default API;

