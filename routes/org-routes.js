const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Organization = require('../models/organization');

const { ensureLoggedIn } = require('../middlewares/auth');


router.get('/', (req,res,next) => {
	 Organization.find({} , (err, organizations) => {
	 if (err) {return next(err)}
	 res.render('organizations/index', {
		 organizations: organizations
	 });
 });
});

router.get('/new', ensureLoggedIn, (req, res, next) => {
	res.render('organizations/new', {
		errorMessage: req.flash('error'),
	});
});

router.post('/new', ensureLoggedIn, (req, res, next) => {
	 // Get Params from POST
	let location = {
		type: 'Point',
		coordinates: [req.body.longitude, req.body.latitude]
	};

	const organization = new Organization({
		name: req.body.name,
		description: req.body.description,
		contacts: {
			email: req.body.email,
			phone: req.body.phone,
		},
		address: {
			zip: req.body.zip,
			country: req.body.country,
			city: req.body.city,
			street: req.body.street,
		},
		category: req.body.category,
		ownerId: req.user._id,
		location: location,
	});

	organization.save(err => {
		if (err) return next(err);
		res.redirect('/');
	});
});

//TODO checkAdmin

router.get('/admin-requests', ensureLoggedIn, (req,res,next) => {
	 Organization.find({} , (err, organizations) => {
	 if (err) {return next(err)}
	 res.render('organizations/admin-requests', {
		 organizations: organizations
	 });
 });
});

router.post('/admin-requests/:id', ensureLoggedIn, (req,res,next) => {
	Organization.findByIdAndUpdate(req.params.id, {status: req.body.status},(err,response)  => {
		res.redirect("organizations/admin-requests");
	})
})

router.get('/:id/edit', (req, res, next) => {
  const productId = req.params.id;

  Organization.findById(organizationId, (err, organization) => {
    if (err) { return next(err); }
    res.render('/edit', { organization: organization });
  });
});




module.exports = router;
