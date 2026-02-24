// Editor.tsx
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Editor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Type here...</p>",
  });

  return (
    <div>
      <h3>Rich Text Editor</h3>

      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
