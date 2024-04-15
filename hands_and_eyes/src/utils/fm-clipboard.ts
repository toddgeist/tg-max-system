import { fmFetch } from "@proofgeist/fm-webviewer-fetch";

type FMClipboard = {
  xml: string;
  type: string;
};

export async function getFMClipboard() {
  const result = await fmFetch<FMClipboard>("getFMClipboard", {});
  return result;
}
