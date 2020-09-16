import multer from 'multer';
import { extname } from 'path';
import { v4 } from 'uuid';

const storage = multer.diskStorage({
  destination: 'src/controllers/public/images',
  filename: (req, file, cb) => {
    cb(null, v4() + extname(file.originalname));
  },
});

export default multer({ storage });
