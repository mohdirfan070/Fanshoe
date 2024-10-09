const multer = require('multer');
const path = require('path');


// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // cb(null, file.fieldname + '-' + Date.now()+ file.filename + path.extname(file.originalname));
        cb(null,file.originalname+Date.now()+path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

module.exports = upload;