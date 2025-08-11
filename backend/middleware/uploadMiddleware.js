import multer from "multer";
import cloudinary from "./Cloudinary.js";
import {CloudinaryStorage} from 'multer-storage-cloudinary'

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'blog_image',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp']
    }
})

const upload = multer({storage})
export default upload