"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import { TiptapExtensions } from "../extensions";
import { TiptapEditorProps } from "./props";
import DEFAULT_EDITOR_CONTENT from "./default-content";
import { useState } from "react";
import { EditorBubbleMenu } from "./components";

export default function Editor() {
  const [saveStatus, setSaveStatus] = useState("Saved");
  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    content: DEFAULT_EDITOR_CONTENT,
  });
  return (
    <div
      onClick={() => {
        editor?.chain().focus().run();
      }}
      className="relative min-h-[500px] w-full max-w-screen-lg border-stone-200 p-12 px-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg"
    >
      <div className="absolute right-5 top-5 mb-5 rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400">
        {saveStatus}
      </div>
      {editor && <EditorBubbleMenu editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}
