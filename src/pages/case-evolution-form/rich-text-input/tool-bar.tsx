import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  $createParagraphNode,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode } from "@lexical/rich-text";
import { useCallback, type ReactNode } from "react";
import "./rich-text-input.css";
import { Button, Flex, Select, Space } from "antd";
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
} from "@ant-design/icons";

export function ToolBar() {
  const [editor] = useLexicalComposerContext();

  const formatHeading = useCallback(
    (tag: "paragraph" | "h1" | "h2" | "h3") => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          if (tag === "paragraph") {
            $setBlocksType(selection, () => $createParagraphNode());
            return;
          }
          $setBlocksType(selection, () => $createHeadingNode(tag));
        }
      });
    },
    [editor]
  );

  const handleActiveButton = useCallback(
    (style: "bold" | "italic" | "underline") => {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, style);

      const button = document.getElementById(`button_${style}`);
      if (button) button.classList.toggle("toolbar-button-active");
    },
    [editor]
  );

  const buttons: {
    label: ReactNode;
    style: "bold" | "italic" | "underline";
  }[] = [
    { label: <BoldOutlined />, style: "bold" },
    { label: <ItalicOutlined />, style: "italic" },
    { label: <UnderlineOutlined />, style: "underline" },
  ];

  return (
    <Flex className="editor-toolbar" align="center" gap="middle">
      <Select
        defaultValue="paragraph"
        style={{ width: 120 }}
        onChange={formatHeading}
        options={[
          { value: "paragraph", label: "Normal" },
          { value: "h1", label: "Heading 1" },
          { value: "h2", label: "Heading 2" },
          { value: "h3", label: "Heading 3" },
        ]}
      />
      <Space>
        {buttons.map((item, index) => (
          <Button
            htmlType="button"
            key={`${item.label}_${index}`}
            id={`button_${item.style}`}
            onClick={() => handleActiveButton(item.style)}
            type={"text"}
          >
            {item.label}
          </Button>
        ))}
      </Space>
    </Flex>
  );
}
