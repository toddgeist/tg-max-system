"use client";

import { getFMClipboard } from "@src/utils/fm-clipboard";
import { saveThemeClip } from "@src/utils/save-clip";

export function CopyFMClipboardButton() {
  return (
    <button
      onClick={async () => {
        const r = await getFMClipboard();
        const d = await saveThemeClip(r.xml, "Mantine");
      }}
    >
      get theme
    </button>
  );
}
