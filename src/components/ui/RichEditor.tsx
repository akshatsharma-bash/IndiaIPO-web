import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface RichEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichEditor: React.FC<RichEditorProps> = ({
  value,
  onChange,
  placeholder
}) => {
  return (
    <Editor
      apiKey="u76ju277guyoq9r8f4u8mpl7cl7zfwsvdq5cvtf11c8toz4w"
      value={value}
      onEditorChange={(content) => onChange(content)}
      init={{
        height: 500,
        menubar: true,

        plugins: [
          'advlist',
          'autolink',
          'lists',
          'link',
          'image',
          'charmap',
          'preview',
          'anchor',
          'searchreplace',
          'visualblocks',
          'code',
          'fullscreen',
          'insertdatetime',
          'media',
          'table',
          'help',
          'wordcount'
        ],

        toolbar:
          'undo redo | blocks | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media table | removeformat | code fullscreen | help',

        placeholder: placeholder || 'Write content here...'
      }}
    />
  );
};

export default RichEditor;