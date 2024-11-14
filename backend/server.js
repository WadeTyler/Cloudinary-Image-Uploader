
const express = require('express');
const app = express();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const storage = multer.memoryStorage();
const upload = multer({ storage });

cloudinary.config({
    cloud_name: "cloud_name",
    api_key: "api_key",
    api_secret: "api_secret"
});

app.post('/upload', upload.single('imgFile'), async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({ message: "No file upload" });
        }

        const result = await cloudinary.uploader.upload_stream(
            { resource_type: 'image' },
            (error, result) => {
                if (error) throw error;
                res.status(200).json({ message: "File uploaded successfully", result });
            }
        ).end(req.file.buffer);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
})


app.listen(3000, () => {
    console.log(`Listening on port 3000`);
})