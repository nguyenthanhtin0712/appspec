import React from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const MarkDownEditor = ({ value, ...props }) => {
  const mdParser = new MarkdownIt();

  const onImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/upload-image', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        // Upload successful, return the image URL
        return data.image_path;
      } else {
        // Handle upload failure
        throw new Error(data.error || 'Image upload failed.');
      }
    } catch (error) {
      // Handle network errors or other upload issues
      console.error(error);
      throw new Error('Image upload failed.');
    }
  };

  return (
    <MdEditor
      canView={{
        menu: true,
        md: true,
        html: true,
        fullScreen: false,
        hideMenu: true
      }}
      onImageUpload={onImageUpload}
      style={{ height: '450px' }}
      value={value}
      renderHTML={(text) => mdParser.render(text)}
      {...props}
    />
  );
};

export default MarkDownEditor;
