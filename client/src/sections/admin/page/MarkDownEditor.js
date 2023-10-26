import React from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const MarkDownEditor = ({ value, ...props }) => {
  const mdParser = new MarkdownIt();

  return (
    <MdEditor
      canView={{
        menu: true,
        md: true,
        html: true,
        fullScreen: false,
        hideMenu: true
      }}
      style={{ height: '450px' }}
      value={value}
      renderHTML={(text) => mdParser.render(text)}
      {...props}
    />
  );
};

export default MarkDownEditor;
