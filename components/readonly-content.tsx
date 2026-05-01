"use client";

import { $getRoot, $createParagraphNode, $createTextNode, EditorState, createEditor } from "lexical";
import { useEffect, useMemo, useState } from "react";
import { nodes } from "./blocks/editor-00/nodes";
import { Editor } from "./blocks/editor-00/editor";

type Props = { content: string; className?: string; rootClassname?: string; };

export default function ReadOnlyContent({ content, className = "", rootClassname = "" }: Props) {
  const editor = useMemo(
    () =>
      createEditor({
        editable: false,
        namespace: "Editor",
        nodes: nodes,
        onError: () => {},
      }),
    []
  );

  const [editorState, setEditorState] = useState<EditorState>();

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

    setEditorState(editor.getEditorState());

    return () => {
      editor.setRootElement(null);
    };
  }, [content, editor]);

  return editorState && <Editor rootClassname={rootClassname} className={className} editorState={editorState} editable={false} />
}
