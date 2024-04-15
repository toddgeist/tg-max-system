import { CopyFMClipboardButton } from "@src/components/copy-fm-clipboard";
import { SetFMClipboardButton } from "@src/components/set-fm-clipboard";

export default function Home() {
  return (
    <main>
      <CopyFMClipboardButton />
      <SetFMClipboardButton />
    </main>
  );
}
