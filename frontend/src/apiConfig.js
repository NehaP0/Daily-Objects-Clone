let url = process.env.REACT_APP_BASE_URL || "http://localhost:8076";
if (!url.startsWith("http://") && !url.startsWith("https://")) {
  url = `http://localhost:${url}`;
}
export const BASE_URL = url;
