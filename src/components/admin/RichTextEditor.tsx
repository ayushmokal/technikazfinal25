import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useEffect, useRef } from 'react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function RichTextEditor({ content = '', onChange }: RichTextEditorProps) {
  const editorRef = useRef<any>(null);

  useEffect(() => {
    // Ensure content is synced when changed externally
    if (editorRef.current && content !== editorRef.current.getData()) {
      editorRef.current.setData(content);
    }
  }, [content]);

  const handleReady = (editor: any) => {
    editorRef.current = editor;
    // Initialize with content if available
    if (content) {
      editor.setData(content);
    }
  };

  const handleEditorChange = (_event: any, editor: any) => {
    try {
      const data = editor.getData() || '';
      onChange(data);
    } catch (error) {
      console.error('CKEditor error:', error);
      onChange('');
    }
  };

  return (
    <div className="border rounded-md min-h-[400px]">
      <CKEditor
        editor={ClassicEditor}
        data={content || ''}
        onReady={handleReady}
        onChange={handleEditorChange}
        config={{
          toolbar: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'outdent',
            'indent',
            '|',
            'imageUpload',
            'blockQuote',
            'insertTable',
            'mediaEmbed',
            'undo',
            'redo'
          ],
          mediaEmbed: {
            previewsInData: true
          }
        }}
      />
    </div>
  );
}