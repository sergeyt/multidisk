import { AxiosResponse } from "axios";

function isOK(status: number) {
  return status >= 200 && status < 300;
}

export function checkResponseOK(resp: AxiosResponse) {
  if (!isOK(resp.status)) {
    throw new Error(JSON.stringify(resp.data));
  }
}
