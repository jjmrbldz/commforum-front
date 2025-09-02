import {createHeadlessEditor} from '@lexical/headless';
import { nodes } from '@/components/blocks/editor-00/nodes';
import { editorTheme } from '@/components/editor/themes/editor-theme';
import { JSDOM } from "jsdom"
import { $generateHtmlFromNodes } from '@lexical/html';
import DOMPurify from 'dompurify';

type SerializableEditorState = string | object;

const config = {
  namespace: "HTML",
  theme: editorTheme,
  onError: (error: Error) => {
    console.error(error)
  },
}

export async function lexicalJSONToHTML(serialized: SerializableEditorState) {
  const editor = createHeadlessEditor({...config, nodes})

  const json = typeof serialized === 'string' ? serialized : JSON.stringify(serialized);
  const editorState = editor.parseEditorState(json);
  editor.setEditorState(editorState);

  // In SSR/Node, supply a Document (JSDOM) for DOM export.
  let documentForExport: Document | undefined = undefined;
  if (typeof window === 'undefined') {
    const { JSDOM } = await import('jsdom');
    documentForExport = new JSDOM('').window.document;
  }

  return await new Promise<string>((resolve) => {
    editor.update(() => {
      const html = $generateHtmlFromNodes(
        editor,
        // @ts-ignore
        documentForExport ? { document: documentForExport } : undefined
      );
      resolve(html);
    });
  });
}

export async function renderPostHtml(serialized: string) {
  const html = await lexicalJSONToHTML(serialized);
  // Always sanitize before injecting into the page
  return DOMPurify.sanitize(html);
}