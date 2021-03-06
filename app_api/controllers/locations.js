var mongoose = require('mongoose');
var Loc = mongoose.model('Location');
var sendJSONresponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

module.exports.locationsCreate=function(req,res){
	Loc.create({
		name: req.body.name,
		address: req.body.address,
		facilities: req.body.facilities.split(","),
		coords: [parseFloat(req.body.lng),parseFloat(req.body.lat)],
		openingTimes:[{
			days:req.body.days1,
			opening: req.body.opening1,
			closing: req.body.closing1,
			closed: req.body.closed1,
		},{
			days: req.body.days2,
			opening: req.body.opening2,
			closing: req.body.closing2,
			closed: req.body.closed2,
		}]

	},function(err,location){
		if(err){
			sendJSONresponse(res, 400, err);

		}
		else {
			sendJSONresponse(res, 201, location);
		}

	});
};


module.exports.locationsReadOne = function(req, res) {
  console.log('Finding location details', req.params);
  if (req.params && req.params.locationid) {
    Loc
      .findById(req.params.locationid)
      .exec(function(err, location) {
        if (!location) {
          sendJSONresponse(res, 404, {
            "message": "locationid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 400, err);
          return;
        }
        console.log(location);
        sendJSONresponse(res, 200, location);
      });
  } else {
    console.log('No locationid specified');
    sendJSONresponse(res, 404, {
      "message": "No locationid in request"
    });
  }
};

var theEarth = (function(){
	var earthRadius = 6371;
	var getDistanceFromRads = function(rads){
		return parseFloat(rads * earthRadius);
	};
	var gerRadsFromDistance = function(distance){
		return parseFloat(distance / earthRadius);
	};
	return{
		getDistanceFromRads: getDistanceFromRads,
		gerRadsFromDistance: gerRadsFromDistance

	};
})();

module.exports.locationsListByDistance = function(req, res){
	var lng = parseFloat(req.query.lng);
	var lat = parseFloat(req.query.lat);
	var point = {
		type: "Point",
		coordinates: [lng,lat]
	};
	var geoOptions = {
		spherical: true,
		maxDistance: theEarth.gerRadsFromDistance(200),
		num: 10

	};
	if (!lng||!lat){
		sendJSONresponse(res, 404, {
			"message": "lng and lat query parameters are required"
		});
		return;
	}
	Loc.geoNear(point, geoOptions, function(err, results, stats){
		var locations=[];
		if (err){
			sendJSONresponse(res,404,err);
		}
		else{
			results.forEach(function(doc){
			locations.push({
				distance: theEarth.getDistanceFromRads(doc.dis),
				name: doc.obj.name,
				address: doc.obj.address,
				rating: doc.obj.rating,
				facilities: doc.obj.facilities,
				_id: doc.obj._id

			});//push
		});//foreach
		sendJSONresponse(res, 200, locations);
		}
	});//geoNear
};//module

module.exports.locationsUpdateOne=function(req, res){
	if (!req.params.locationid){
		sendJSONresponse(res, 404, {"message": "Not found, locationid is required"});
		return;
	}
	Loc.findById(req.params.locationid).select('-review -rating').exec(
		function(err, location){
			if(!location){
				sendJSONresponse(res, 404, {"message": "location is not found"});
				return;

			}
			
			else if (err){
				sendJSONresponse(res, 400, err);
				return;
			}
			location.name = req.body.name;
			location.address = req.body.address;
			if (req.body.facilities){
				location.facilities=req.body.facilities.split(",");
			}
			/*else{
				location.facilities=req.body.facilities.split(",");
			}*/
			//location.facilities=req.body.facilities.split(",");
			location.coords=[parseFloat(req.body.lng), parseFloat(req.body.lat)];
			location.openingTimes= [{
				days: req.body.days1,
				opening: req.body.opening1,
				closing: req.body.closing1,
				closed: req.body.closed1,
			},{
				days: req.body.days2,
				opening: req.body.opening2,
				closing: req.body.closing2,
				closed: req.body.closed2,				
			}];
			location.save(function(err, location){
				if (err){
					sendJSONresponse(res, 404,err);
				}
				else{
					sendJSONresponse(res, 200, location);
				}
			});
		});
};

module.exports.locationsDeleteOne = function(req, res){
	var locationid = req.params.locationid;
	if (locationid) {
		Loc.findByIdAndRemove(locationid).exec(function(err, location){
			if (err){
				sendJSONresponse(res, 404, err);
				return;
			}
			sendJSONresponse(res, 204, null);
		});
	}
	else {
		sendJSONresponse(res, 404, {"message": "No locationid"});
	}
};