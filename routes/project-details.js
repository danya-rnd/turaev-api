const express = require('express');
const router = express.Router();

const ProjectDetailsController = require('../controllers/project-details');



router.get('/', ProjectDetailsController.detail_get_all);

router.post('/', ProjectDetailsController.details_create_detail);

router.get('/:projectDetailId', ProjectDetailsController.project_get_detail);

router.delete('/:projectDetailId', ProjectDetailsController.project_delete_detail);



module.exports = router;