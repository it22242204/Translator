import Translator from './Translator/Translator';
import './App.css';
import { useEffect, useState } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import TasksList from './components/TasksList';
// import { configureStore } from '@reduxjs/toolkit';
// import tasksReducer from './slices/tasksSlice';


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
  try {
    const response = await fetch('/api/translate_text', { // Ensure this matches your Flask route
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Image translation failed');
    }

    const data = await response.json();
    setTranslatedText(data.translated_text); // Set the translated text
  } catch (error) {
    console.error(error);
    setTranslatedText('Image translation failed.');
  }
};

  return (
    <div className="App">
      <Header/>
      <Translator />

      {/* Image input form */}
      <div className="image-uploader-container">
      <h2>Translate Image</h2>

      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageChange} accept="image/*"  />
        <button type="submit"className="btn btn-upload">Translate Image</button>
      </form>

      {/* Display the translated text */}
      <p className="text-box output-box">
      <p>{translated_text}</p>
      
      </p>
    </div>
    <Footer/>
    </div>
  );
}

export default App;
