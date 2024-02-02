import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { Form, Button } from 'react-bootstrap';

const Home=({token})=> {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [fileCode, setFileCode] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post("http://localhost:3001/upload", formData, {
        headers: {
          'Authorization': token,
          'Content-Type': 'multipart/form-data',
        },
      });
      setFileCode(response.data.fileCode);
      alert('File uploaded successfully.');
      getUserFiles();
    } catch (error) {
      console.error(error);
      alert('File upload failed.');
    }
  };
  const getUserFiles = async () => {
    try {
      const response = await axios.get("http://localhost:3001/files", {
        headers: {
          'Authorization': token,
        },
      });
      setFiles(response.data);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch user files.');
    }
  };
  const deleteFile = async (fileCode) => {
    try {
      await axios.delete(`http://localhost:3001/delete/${fileCode}`, {
        headers: {
          'Authorization': token,
        },
      });
      alert('File deleted successfully.');
      getUserFiles();
    } catch (error) {
      console.error(error);
      alert('Failed to delete file.');
    }
  };

  useEffect(() => {
    if (token) {
      getUserFiles();
    }
  }, []);
  

//     // const formData = new FormData();
//     // formData.append('file', file);
//     try {
//         const formData = new FormData();
//         formData.append('file', file);
//         const response = await axios.post("http://localhost:3001/upload", formData, {
//           headers: {
//             'Authorization': token,
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         setFileCode(response.data.fileCode);
//         alert('File uploaded successfully.');
//       } catch (error) {
//         console.error(error);
//         alert('File upload failed.');
//       }

//     // axios.post("http://localhost:5000/upload",formData).then(res=>console.log('File uploaded successfully:',res)).catch(err=>console.log('File upload failed:', err))
//   };
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
      {fileCode && <p>File Code: {fileCode}</p>}
      <h2>My Files</h2>
          <ul>
            {files.map((file) => (
              <li key={file._id}>
                {file.filename} - <button onClick={() => deleteFile(file.fileCode)}>Delete</button>
              </li>
            ))}
          </ul>
    </div>
    </>
  )
}

export default Home
