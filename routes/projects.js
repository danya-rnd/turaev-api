const express = require('express');
const router = express.Router();
const multer = require('multer');

const ProjectsController = require('../controllers/projects');

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

router.get('/:projectId', ProjectsController.projects_get_project);

router.get('/', ProjectsController.projects_get_all);

router.post('/', upload.single('projectImage'), ProjectsController.projects_create_project);

router.delete('/:projectId', ProjectsController.projects_delete_project);

module.exports = router;