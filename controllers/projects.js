const mongoose = require('mongoose');

const Project = require('../model/project');

exports.projects_get_all = (req, res, next) => {
	Project.find()
		// .select('product quantity _id')
		// .populate('product', 'name')
		.exec()
		.then( docs => {
			res.status(200).json({
				count: docs.length,
				projects: docs.map(doc => {
					return {
						id: doc._id,
						name: doc.name,
						description: doc.description,
						metres: doc.metres,
						projectImage: 'http://94.250.251.234:3000/' + doc.projectImage,
						request: {
							type: 'GET',
							url: 'http:/localhost:3000/projectss/' + doc._id
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

exports.projects_create_project = (req, res, next) => {
	const project = new Project({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		description: req.body.description,
		metres: req.body.metres,
		projectImage: req.file.path
	});
	project
		.save()
		.then( result => {
			console.log(result);
			res.status(201).json({
				message: 'Created project successfully',
				createdProject: {
					_id: result._id,
					name: result.name,
					description: result.description,
					metres: result.metres,
					request: {
						type: "POST",
						url: 'http://localhost:3000/projects/' + result.id
					}
				}
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
};

exports.projects_get_project = (req, res, next) => {
	const id = req.params.projectId;
	Project.findById(id)
		.exec()
		.then(doc => {
			console.log("From Database", doc);
			if (doc) {
				res.status(200).json({
					project: doc,
					request: {
						type: 'GET',
						url: 'http://localhost:3000/projects/'
					}
				});	
			} else {
				res.status(404).json({message: 'No valid entry found for provided ID'});
			}
			res.status(200).json(doc);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
};

exports.projects_delete_project = (req, res, next) => {
	const id = req.params.projectId;
	Project.remove({ _id: id })
		.exec()
		.then( result => {
			res.status(200).json({
				message: 'Project deleted!',
				request: {
					type: 'POST',
					url: 'http://localhost:3000/products',
					data: { name: 'String', price: 'Number' }
				}
			});
		})
		.catch( err => {
			console.log(err);
			res.status(500).json({
				error: err
			})
		});
};