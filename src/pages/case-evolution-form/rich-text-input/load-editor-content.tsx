import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

export function LoadEditorContent({ content }: { content: string }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!content) return;
    const json = typeof content === "string" ? JSON.parse(content) : content;
    const editorState = editor.parseEditorState(json);
    editor.setEditorState(editorState);
  }, [editor, content]);

  return null;
}
