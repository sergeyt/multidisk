import { AxiosResponse } from "axios";

function isOK(status: number) {
  return status >= 200 && status < 300;
}

export function checkResponseOK(resp: AxiosResponse) {
  if (!isOK(resp.status)) {
    throw new Error(JSON.stringify(resp.data));
  }
}

export function trimPrefix(s: string, prefix: string) {
  return s.startsWith(prefix) ? s.slice(prefix.length) : s;
}

// https://blog.logrocket.com/programmatic-file-downloads-in-the-browser-9a5186298d5c/
export function downloadBlob(blob, filename) {
  // Create an object URL for the blob object
  const url = URL.createObjectURL(blob);

  // Create a new anchor element
  const a = document.createElement("a");

  // Set the href and download attributes for the anchor element
  // You can optionally set other attributes like `title`, etc
  // Especially, if the anchor element will be attached to the DOM
  a.href = url;
  a.download = filename || "download";

  // Click handler that releases the object URL after the element has been clicked
  // This is required for one-off downloads of the blob content
  const clickHandler = () => {
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.removeEventListener("click", clickHandler);
    }, 150);
  };

  // Add the click event listener on the anchor element
  // Comment out this line if you don't want a one-off download of the blob content
  a.addEventListener("click", clickHandler, false);

  // Programmatically trigger a click on the anchor element
  // Useful if you want the download to happen automatically
  // Without attaching the anchor element to the DOM
  // Comment out this line if you don't want an automatic download of the blob content
  a.click();
}
