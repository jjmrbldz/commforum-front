"use client";

import { cn } from "@/lib/utils";
import { $getRoot, $createParagraphNode, $createTextNode, EditorState, createEditor, ParagraphNode, TextNode } from "lexical";
import { useEffect, useMemo, useState } from "react";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";

type Props = { content: string; className?: string };

export default function ContentPlainText({ content, className = "" }: Props) {
  const editor = useMemo(
    () =>
      createEditor({
        namespace: "Editor",
        nodes: [HeadingNode, ParagraphNode, TextNode, QuoteNode],
        onError: () => {},
      }),
    []
  );

  const [text, setText] = useState("");

  useEffect(() => {
    let parsed: EditorState | null = null;

    try {
      parsed = editor.parseEditorState(content);
    } catch {
      parsed = null;
    }

    if (parsed) {
      const isEmpty = parsed.read(() => $getRoot().getChildrenSize() === 0);

      if (isEmpty) {
        editor.update(() => {
          const root = $getRoot();
          const p = $createParagraphNode();
          root.append(p);
        });
      } else {
        editor.setEditorState(parsed);
      }
    } else {
      editor.update(() => {
        const root = $getRoot();
        root.clear();
        const p = $createParagraphNode();
        p.append($createTextNode(""));
        root.append(p);
      });
    }

    const txt = editor.read(() => $getRoot().getTextContent());
    setText(txt);

    return () => {
      editor.setRootElement(null);
    };
  }, [content, editor]);

  return (
    <div className={cn("text-ellipsis text-nowrap max-w-[260px] overflow-hidden", className)}>
      {text.trim().slice(0, 160)}
    </div>
  );
}
