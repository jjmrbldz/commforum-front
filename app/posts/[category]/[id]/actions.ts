"use server"

import { createHeadlessEditor } from "@lexical/headless";
import { JSDOM } from "jsdom"
import { $generateHtmlFromNodes } from "@lexical/html";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ParagraphNode, TextNode } from "lexical";
import { ListItemNode, ListNode } from "@lexical/list";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ImageNode } from "@/components/editor/nodes/headless/image-node";
import { YouTubeNode } from "@/components/editor/nodes/headless/youtube-node";

function setupDom() {
  const dom = new JSDOM();

  const _window = global.window;
  const _document = global.document;

  // @ts-expect-error
  global.window = dom.window;
  global.document = dom.window.document;

  return () => {
    global.window = _window;
    global.document = _document;
  };
}

export async function getHtml(content: string) {
  const html: string = await new Promise(resolve => {
    const editor = createHeadlessEditor({
      namespace: 'Editor',
      nodes: [
        HeadingNode, 
        ParagraphNode, 
        TextNode, 
        QuoteNode, 
        ListNode,
        ListItemNode,
        LinkNode,
        AutoLinkNode,
        ImageNode,
        YouTubeNode
      ],
      onError: (err) => {console.error("Headless Editor Error:", err)},
    });    
    editor.setEditorState(editor.parseEditorState(content));

    editor.update(() => {
      try {
        const cleanup = setupDom();
        const _html = $generateHtmlFromNodes(editor, null);
        cleanup();
        
        resolve(_html);
      } catch (e) {
        console.error("Headless Editor Error:", e)
      }
    });
  });

  return html;
}