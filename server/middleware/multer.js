import multer from 'multer';

const storage = multer.memoryStorage(); // ✅ Sử dụng buffer
const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024, // Giới hạn 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Chỉ được phép tải lên tệp hình ảnh.'), false);
    }
  },
});

export default upload;
