import { Card } from "antd";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./markdown.css";

export function MarkdownPreview({ markdown }: { markdown: string }) {
  return (
    <Card
      className="markdown-preview"
      style={{
        background: "#f9f9f9",
      }}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </Card>
  );
}
