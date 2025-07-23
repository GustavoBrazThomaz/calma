import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TreeView } from "@lexical/react/LexicalTreeView";

export function DebugLexical() {
  const [editor] = useLexicalComposerContext();
  return <TreeView editor={editor} />;
}
