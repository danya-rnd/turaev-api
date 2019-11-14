const mongoose = require('mongoose');

const ProjectDetail = require('../model/project-detail');
const Project = require('../model/project');

exports.detail_get_all = (req, res, next) => {
	ProjectDetail.find()
		.exec()
		.then( docs => {
			res.status(200).json({
				count: docs.length,
				projectDetails: docs.map(doc => {
					return {
						_id: doc.project,
						square: doc.square,
						floar: doc.floar,
						firstFloar: doc.firstFloar,
						secondFloar: doc.secondFloar,
						terassa: doc.terassa,
						bedroom: doc.bedroom,
						garage: doc.garage,
						request: {
							type: 'GET',
							url: 'http:/localhost:3000/project-details/' + doc._id
						}
					}
				})
			});
		})
		.catch( err => {
			res.status(500).json({
				error: err
			});
		});
};

exports.details_create_detail = (req, res, next) => {
	Project.findById(req.body.projectId)
		.then( project => {
			if ( !project ) {
				return res.status(404).json({
					message: 'Project not found'
				})
			}
			const projectDetail = new ProjectDetail({
				_id: req.body.projectId,
				square: req.body.square,
				floar: req.body.floar,
				firstFloar: req.body.firstFloar,
				secondFloar: req.body.secondFloar,
				terassa: req.body.terassa,
				bedroom: req.body.bedroom,
				garage: req.body.garage,
			});
			return projectDetail.save()
		})
		.then( result => {
			console.log(result);
			res.status(201).json({
				message: 'Project stored',
				createdProject: {
					_id: result.project,
					square: result.square,
					floar: result.floar,
					firstFloar: result.firstFloar,
					SecondFloar: result.SecondFloar,
					terassa: result.terassa,
					bedroom: result.bedroom,
					garage: result.garage,
				},
				request: {
					type: 'GET',
					url: 'http:/localhost:3000/project-details/' + result._id
				}
			});
		})
		.catch( err => {
			res.status(500).json({
				error: err
			});
		});
};

exports.project_get_detail = (req, res, next) => {
	ProjectDetail.findById(req.params.projectDetailId)
		.then(projectDetail => {
			if ( !projectDetail ) {
				return res.status(404).json({
					message: 'Project not found'
				});
			}
			res.status(200).json({
				projectDetail: projectDetail,
				request: {
					type: 'GET',
					url: 'http://localhost:3000/project-details'
				}
			});
		})
		.catch( err => {
			res.status(500).json({
				error: err
			});
		})
};

exports.project_delete_detail = (req, res, next) => {
	ProjectDetail.remove({_id: req.params.projectDetailId})
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'Details deleted',
				request: {
					type: 'POST',
					url: 'http://localhost:3000/project-details',
					body: {
						productId: 'ID',
						quantity: 'Number'
					}
				}
			});
		})
		.catch()
};