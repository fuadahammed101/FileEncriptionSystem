import React, { useState } from 'react';
import './styles.css';

function FileEncryption() {
  const [fileContent, setFileContent] = useState('');
  const [key, setKey] = useState('');
  const [encryptedContent, setEncryptedContent] = useState('');
  const [decryptedContent, setDecryptedContent] = useState('');
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setFileContent(e.target.result);
      setIsEncrypted(false); 
      setSuccessMessage('');
      setErrorMessage(''); 
    };
    reader.readAsText(file);
  };

  const encrypt = () => {
    const encrypted = fileContent.split('').map(char => String.fromCharCode(char.charCodeAt(0) + parseInt(key))).join('');
    setEncryptedContent(encrypted);
    setIsEncrypted(true);
    setKey(''); 
    setSuccessMessage(''); 
    setErrorMessage(''); 
    downloadEncryptedFile(encrypted);
  };

  const downloadEncryptedFile = (content) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'encrypted_file.txt';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const decrypt = () => {
    const decrypted = encryptedContent.split('').map(char => String.fromCharCode(char.charCodeAt(0) - parseInt(key))).join('');
    setDecryptedContent(decrypted);
    if (decrypted === fileContent) {
      setSuccessMessage('Decryption Successful!');
      setErrorMessage('');
      downloadDecryptedFile(decrypted);
    } else {
      setErrorMessage('Invalid Key or File Content!');
      setSuccessMessage('');
    }
  };

  const downloadDecryptedFile = (content) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'decrypted_file.txt';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleUploadEncryptedFile = (e) => {
    const uploadedFile = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setEncryptedContent(e.target.result);
      setIsEncrypted(true);
      setKey(''); 
      setSuccessMessage(''); 
      setErrorMessage(''); 
    };
    reader.readAsText(uploadedFile);
  };

  return (
    <div className="container">
      <h2>File Encryption/Decryption</h2>
      {!isEncrypted ? (
        <div>
          <label>
            Select a text file:
            <input type="file" onChange={handleFileChange} />
          </label>
          <br />
          <label>
            Key:
            <input type="number" value={key} onChange={(e) => setKey(e.target.value)} />
          </label>
          <br />
          <button onClick={encrypt}>Encrypt</button>
        </div>
      ) : (
        <div>
          <label>
            Upload an encrypted file:
            <input type="file" onChange={handleUploadEncryptedFile} />
          </label>
          <br />
          <label>
            Decrypt Key:
            <input type="number" value={key} onChange={(e) => setKey(e.target.value)} />
          </label>
          <br />
          <button onClick={decrypt}>Decrypt</button>
        </div>
      )}
      <br />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {isEncrypted ? (
        <div>
          <h3>Encrypted Content:</h3>
          <textarea value={encryptedContent} rows="10" cols="50" readOnly />
          <br />
          <h3>Decrypted Content:</h3>
          <textarea value={decryptedContent} rows="10" cols="50" readOnly />
        </div>
      ) : null}
    </div>
  );
}

export default FileEncryption;
