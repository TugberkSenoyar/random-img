const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 80;

// Serve static files from the public directory
app.use(express.static('public'));

app.get('/', (req, res) => {
  const imagesFolder = path.join(__dirname, 'public', 'images');
  
  // Read the images directory
  fs.readdir(imagesFolder, (err, files) => {
    if (err) {
      console.error('Could not list the directory.', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Filter out only image files
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
    
    // Choose a random image
    const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
    
    // Send the random image as the response
    res.sendFile(path.join(imagesFolder, randomImage));
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
