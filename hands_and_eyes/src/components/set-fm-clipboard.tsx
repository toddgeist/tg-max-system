"use client";

import { fmFetch } from "@proofgeist/fm-webviewer-fetch";
import { rebuildTheme } from "@src/utils/rebuild-theme";

export function SetFMClipboardButton() {
  return (
    <button
      onClick={async () => {
        const xml = await rebuildTheme("Mantine");
        const r = await fmFetch("setFMClipboard", { xml, type: "themes" });
      }}
    >
      set theme
    </button>
  );
}
