"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TiptapExtensions } from "../extensions";
import { TiptapEditorProps } from "./props";
import DEFAULT_EDITOR_CONTENT from "./default-content";

export default function Editor() {
  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    content: DEFAULT_EDITOR_CONTENT,
  });
  return (
    <div className="relative min-h-[500px] w-full max-w-screen-lg border-stone-200 p-12 px-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg">
      <EditorContent editor={editor} />
    </div>
  );
}
