import axios from 'axios';
import React,{useState} from 'react'
import { Form, Button } from 'react-bootstrap';

function Home() {
    const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', file);
    axios.post("http://localhost:5000/upload",formData).then(res=>console.log('File uploaded successfully:',res)).catch(err=>console.log('File upload failed:', err))
  };
  return (
    <>
      <div className="file-upload-container">
      <h2>File Upload</h2>
      <Form>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Select File</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <Button variant="primary" onClick={handleUpload}>
          Upload
        </Button>
      </Form>
    </div>
    </>
  )
}

export default Home
