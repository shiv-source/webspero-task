const aws = require('aws-sdk');
const multer = require('multer')
const multerS3 = require('multer-s3')
require("dotenv").config(); 
const moment = require("moment");


aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region : 'ap-south-1'
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {

    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
}


const upload = multer({
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    storage: multerS3({
      s3 : s3,
      bucket: 'web-sparrow-test',
      acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname });
      },
      key: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        let timeStamps = moment().format('YYYY-MM-DD-HH-mm:ss');
        cb(null, `${timeStamps}-${fileName}`);
      }
    })
});


module.exports = upload;