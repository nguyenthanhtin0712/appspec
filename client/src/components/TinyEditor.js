import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from '@mui/material';
import axios from 'axios';

const TinyEditor = () => {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      <Editor
        apiKey="7jt9lqzenvytr2hmoh516yble1qq1rtq3u0xwj7383vw5sa2"
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          plugins: 'image',
          toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | image',
          // without images_upload_url set, Upload tab won't show up
          images_upload_url: 'http://127.0.0.1:8000/uploadImage',

          // override default upload handler to simulate successful upload
          images_upload_handler: image_upload_handler_callback
        }}
      />
      <Button onClick={log}>Submit</Button>
    </>
  );
};

const image_upload_handler_callback = (blobInfo, progress) =>
  new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', blobInfo.blob(), blobInfo.filename());

    axios
      .post('http://127.0.0.1:8000/uploadImage', formData, {
        onUploadProgress: (e) => {
          progress((e.loaded / e.total) * 100);
        }
      })
      .then((response) => {
        resolve(response.data.location);
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          reject({ message: 'HTTP Error: ' + error.response.status, remove: true });
        } else {
          reject('HTTP Error: ' + error.message);
        }
      });
  });

export default TinyEditor;
