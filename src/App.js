import Translator from './Translator/Translator';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [translated_text, setTranslatedText] = useState('');
  const [image, setImage] = useState(null); // Store the selected image

  // Handle image file selection
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  // Handle form submission to send the image to the Flask backend
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!image) {
      alert('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image); // Append the selected image

    // Make the POST request to Flask API
    const response = await fetch('/api/ml', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    setTranslatedText(data.translated_text); // Set the translated text
  };

  return (
    <div className="App">
      <Translator />

    </div>
  );
}

export default App;
