import multer from 'multer';

const upload = multer({
    limits: {
      fileSize: 5 * 1024 * 1024, // Giới hạn kích thước tệp (5MB)
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true); // Chấp nhận tệp
      } else {
        cb(new Error('Chỉ được phép tải lên tệp hình ảnh.'), false);
      }
    },
  });

export default upload;