"use client"

import { nodes } from "@/components/blocks/editor-00/nodes";
import { editorTheme } from "@/components/editor/themes/editor-theme";
import { sanitizeHTML } from "@/lib/utils";
import { createHeadlessEditor } from "@lexical/headless";
import { $generateHtmlFromNodes } from "@lexical/html";
import { useMemo } from "react";

const config = {
  namespace: "HTML",
  theme: editorTheme,
  nodes,
  onError: (error: Error) => {
    console.error(error)
  },
}

export default function useLexicalHTML(serialize: string) {
  return useMemo(() => {
    const editor = createHeadlessEditor(config);
    const state = editor.parseEditorState(serialize);
    editor.setEditorState(state);
    let html = "";
    editor.update(() => {
      html = $generateHtmlFromNodes(editor);
    }, { discrete: true });
    return sanitizeHTML(html);
  }, [serialize]);
}