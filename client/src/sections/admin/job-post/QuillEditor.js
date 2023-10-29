import styled from '@emotion/styled';
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditorWrapper = styled('div')(({ error }) => ({
  '.ql-toolbar.ql-snow + .ql-container.ql-snow': {
    border: `1px solid ${error ? '#dc2626' : '#e2e8f0'}`,
    borderRadius: '0.5rem'
  },
  '.ql-toolbar.ql-snow': {
    fontFamily: 'inherit',
    borderTopLeftRadius: '0.5rem',
    borderTopRightRadius: '0.5rem',
    backgroundColor: '#fff',
    border: 'none',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    position: 'sticky',
    top: 0,
    zIndex: 1,
    marginLeft: '1px',
    marginRight: '1px'
  },
  '.ql-container': {
    color: '#2d3748',
    fontFamily: 'inherit',
    fontSize: 'inherit'
  },
  '.ql-container.ql-snow': {
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    borderColor: '#e2e8f0',
    marginTop: '-41px'
  },
  '.ql-editor': {
    paddingTop: '64px',
    minHeight: '260px',
    maxHeight: '440px'
  },
  '.ql-editor.ql-blank::before': {
    color: '#a0aec0',
    fontStyle: 'normal'
  },
  '.ql-editor p, .ql-editor ul, .ql-editor ol, .ql-snow .ql-editor pre': {
    marginBottom: '1em'
  },
  '.ql-editor strong': {
    fontWeight: 700
  },
  '.ql-editor ol, .ql-editor ul': {
    paddingLeft: 0
  },
  '.ql-editor li': {
    marginBottom: '0.25em'
  },

  '.ql-snow .ql-editor pre': {
    display: 'block',
    borderRadius: '0.5rem',
    padding: '1rem',
    fontSize: '1rem'
  },
  '.ql-snow .ql-editor img': {
    width: '50%',
    borderRadius: '0.5rem'
  },
  '.ql-editor iframe': {
    width: '100%',
    maxWidth: '100%',
    height: '400px'
  }
}));

const QuillEditor = ({ value, onChange, error, onBlur }) => {
  let modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean']
    ]
  };

  let formats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'align'];
  return (
    <EditorWrapper error={error}>
      <ReactQuill theme="snow" modules={modules} formats={formats} value={value} onChange={onChange} onBlur={onBlur} />
    </EditorWrapper>
  );
};

export default QuillEditor;
