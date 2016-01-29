/* GET 'home' page */
module.exports.homelist=function(req,res){
	res.render('locations-list', {
		title: 'Loc8r - find a place to work with wifi',
		pageHeader:{
			title: 'Loc8r',
			strapline: 'Find places to work with wifi near you!'
		},
		sidebar: "Looking for wifi and a seat? \
		Loc8r helps you find places to work when out and about. \
		Perhaps with coffee, cake and a pint? \
		let Loc8r help you find the place you're looking for.",
		locations:[{
			name: 'Richie coffee',
			address: '125 High Street, Reading, RG6 1PS',
			rating: 3,
			facilities: ['Hot drinks', 'Food','Premium wifi'],
			distance: '100m'
		},{
			name: 'Richie bar',
			address: '125 High Street, Reading, RG6 1PS',
			rating: 3,
			facilities: ['Cool drinks', 'Food', 'Premium wifi'],
			distance: '200m',
		},{
			name: 'Richie grill',
			address: '125 High Street, Reading, RG6 1PS',
			rating: 3,
			facilities: ['Food', 'Premium wifi'],
			distance: '250m',
		}]
	});
};



/* GET 'Location info' page */

module.exports.locationInfo=function(req,res){
	res.render('location-info', {
		title: 'Richie coffee',
		pageHeader: {title: 'Richie coffee'},
		sidebar: {
			context: 'is on Loc8r because it has accessible wifi and space to sit \
			down with your laptop and get some work done.',
			callToAction: 'If you\'ve been and you like it - or if you don\'t - \
			please leave a review to help others just like you.'
		},
		location: {
			name: 'Richie coffee',
			address: '125 High Street, Reading, RG6 1PS',
			rating: 3,
			facilities: ['Hot drinks', 'Food','Premium wifi'],
			coords: {lat: 43.4708763, lng: -80.53947370000003},
			openingTimes: [{
				days: 'Monday-Friday',
				opening: '7:00am',
				closing: '7:00pm',
				closed: false
			},{
				days: 'Saturday',
				opening: '8:00am',
				closing: '5:00pm',
				closed: false
			},{
				days: 'Sunday',
				closed: true
			}],
			reviews: [{
				author: 'Richie',
				rating: 5,
				timestamp: '28 January 2016',
				reviewText: 'What a great place. I can\'t say enough good things about it.'
			},{
				author: 'Wei',
				rating: 3,
				timestamp: '28 January 2016',
				reviewText: 'Food is fine. I hope it can be more spicy.'
			}]
		}
	});
};

/*GET 'Add review' page */
module.exports.addReview=function(req,res){
	res.render('location-review-form',{
		title: 'Review Richie coffee on Loc8r',
		pageHeader: {title: 'Review Richie Coffee'}
	});
};