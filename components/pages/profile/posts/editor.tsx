"use client"

import { useState } from "react"
import { EditorState, SerializedEditorState } from "lexical"
import { Editor } from "@/components/blocks/editor-00/editor"

// const initialValue = {
//   root: {
//     children: [
//       {
//         children: [
//           {
//             detail: 0,
//             format: 0,
//             mode: "normal",
//             style: "",
//             text: "Hello World 🚀",
//             type: "text",
//             version: 1,
//           },
//         ],
//         direction: "ltr",
//         format: "",
//         indent: 0,
//         type: "paragraph",
//         version: 1,
//       },
//     ],
//     direction: "ltr",
//     format: "",
//     indent: 0,
//     type: "root",
//     version: 1,
//   },
// } as unknown as SerializedEditorState

interface Prop {
  onChange?: (value: EditorState) => void
}

export default function PostEditor({ onChange }: Prop) {
  const [editorState, setEditorState] =
    useState<SerializedEditorState>()

  return (
    <div>
      <Editor
        editorSerializedState={editorState}
        onSerializedChange={(value) => setEditorState(value)}
        onChange={onChange}
      />
    </div>
  )
}