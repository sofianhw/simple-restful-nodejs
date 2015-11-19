// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/test'); // connect to our database
var Hewan     = require('./app/models/hewan');

// create our router
var router = express.Router();

router.use(function(req, res, next) {
	console.log('Something is happening.');
	next();
});

router.get('/api', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// on routes that end in /hewans
router.route('/hewans')
	.post(function(req, res) {	
		var hewan = new Hewan();
		hewan.name = req.body.name;
		hewan.save(function(err) {
			if (err)
				res.send(err);
			res.json({ message: 'Hewan created!' });
		});
	})
	.get(function(req, res) {
		Hewan.find(function(err, hewans) {
			if (err)
				res.send(err);
			res.json(hewans);
		});
	});

// on routes that end in /hewans/:hewan_id
router.route('/hewans/:hewan_id')
	// get the hewan with that id
	.get(function(req, res) {
		Hewan.findById(req.params.hewan_id, function(err, hewan) {
			if (err)
				res.send(err);
			res.json(hewan);
		});
	})
	// update the hewan with this id
	.put(function(req, res) {
		Hewan.findById(req.params.hewan_id, function(err, hewan) {
			if (err)
				res.send(err);
			hewan.name = req.body.name;
			hewan.save(function(err) {
				if (err)
					res.send(err);
				res.json({ message: 'Hewan updated!' });
			});

		});
	})
	// delete the hewan with this id
	.delete(function(req, res) {
		Hewan.remove({
			_id: req.params.hewan_id
		}, function(err, hewan) {
			if (err)
				res.send(err);
			res.json({ message: 'Successfully deleted' });
		});
	});

// REGISTER OUR ROUTES 
app.use('/api', router);

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);
