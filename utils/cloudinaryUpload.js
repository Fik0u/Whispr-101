const cloudinary = require('./cloudinary'); 


const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'whispr-pics',
            allowed_formats: ['jpg', 'png', 'jpeg'], 
        });

        return result.secure_url; 
    } catch (error) {
        console.log('Cloudinary upload error:', error);
        throw new Error('Failed to upload image to Cloudinary');
    }
};

module.exports = uploadToCloudinary;
