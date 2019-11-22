const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './uploads/');
	},
	filename: function(req, file, cb) {
		cb(null, new Date().toISOString() + file.originalname);
	}
});

const fileFilter = (req, file, cb) => {
	//reject a file
	if ( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const upload = multer ({ 
	storage: storage, 
	limits: {
 		fileSize: 1024 * 1024 * 5 
 	},
 	fileFilter: fileFilter
});

const ProjectDetailsController = require('../controllers/project-details');

router.get('/', ProjectDetailsController.detail_get_all);

router.post('/', upload.any('projectImages'), ProjectDetailsController.details_create_detail);

router.get('/:projectDetailId', ProjectDetailsController.project_get_detail);

router.delete('/:projectDetailId', ProjectDetailsController.project_delete_detail);



module.exports = router;