import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import "./rich-text-input.css";
import { ToolBar } from "./tool-bar";
import { useCallback, useEffect, type Dispatch } from "react";

import type { EditorState } from "lexical";
import { LoadEditorContent } from "./load-editor-content";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

export default function RichTextInput({
  setValue,
  content,
}: {
  setValue: Dispatch<string>;
  content: string | undefined;
}) {
  const initialConfig = {
    namespace: "RichTextInput",
    theme: {
      paragraph: "editor-paragraph",
      text: {
        bold: "editor-bold",
        italic: "editor-italic",
        underline: "editor-underline",
      },
    },
    onError: () => null,
    nodes: [HeadingNode, QuoteNode],
  };

  useEffect(() => {
    const editorInput = document.getElementById("editor");
    if (editorInput) editorInput.focus();
  }, []);

  const handleChange = useCallback((editorState: EditorState) => {
    const rawJSON = editorState.toJSON();
    const jsonString = JSON.stringify(rawJSON);
    setValue(jsonString);
  }, []);

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <ToolBar />
      <RichTextPlugin
        contentEditable={
          <ContentEditable id="editor" className="editor-container" />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <OnChangePlugin onChange={handleChange} />
      {content && <LoadEditorContent content={content} />}
    </LexicalComposer>
  );
}
