"use server"

import { createHeadlessEditor } from "@lexical/headless";
import { JSDOM } from "jsdom"
import { $generateHtmlFromNodes } from "@lexical/html";

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
      nodes: [],
      onError: () => {},
    });

    editor.setEditorState(editor.parseEditorState(content));

    editor.update(() => {
      try {
        const cleanup = setupDom();
        const _html = $generateHtmlFromNodes(editor, null);
        cleanup();
        
        resolve(_html);
      } catch (e) {
        console.log(e);
      }
    });
  });

  return html;
}