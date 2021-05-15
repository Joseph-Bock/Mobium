const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const dataValidator = require('../middlewares/dataValidation');
const adminRoutes = require('../middlewares/adminRoutes');
const controller = require('../controllers/productsController');


//Multer Config

const multerDiskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        let folder = path.join(__dirname, '../../public/img/productImages');
        callback(null, folder);
    },
    
    filename: (req, file, callback) => {
        let imageName = Date.now() + path.extname(file.originalname);
        callback(null, imageName);
    }
})

const uploadFile = multer({ storage : multerDiskStorage });


//Setting Routes

router.get('/', controller.list);
router.get('/:id', controller.get);
router.post('/', adminRoutes, uploadFile.single('image'), dataValidator.Product, controller.create);
router.put('/:id', adminRoutes, uploadFile.single('image'), dataValidator.Product, controller.update);
router.delete('/:id', adminRoutes, controller.delete);

module.exports = router;