$(document).ready(function(){
	const afri = {
		lat: 3.3192925,
		lng: 4.4218547,
	};
	const ng = {
		lat: 9.0546462,
		lng: 7.2539279,
	};

var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: afri,
		mapTypeId: 'roadmap'
	});


// Add organizations markers to map
let markers = [];

function putMarkers(arr){
	arr.forEach(function(organization){
		if(organization.status === "accepted"){
			let title = organization.name;
      let country = organization.country;
			let position = {
				lat: organization.location.coordinates[1],
				lng: organization.location.coordinates[0],
			};
			var pin = new google.maps.Marker({ position, map, title });
			markers.push(pin)
		}
	});
}

putMarkers(allOrganizations);

function creatList (arr, key, property) {
	return arr.filter(function(obj){
		return (obj[key]) === property;
	});
}
function creatListWith2Keys (arr, key1, key2, property) {
	return arr.filter(function(obj){
		return (obj[key1][key2]) === property;
	});
}

// Sets the map on all markers in the array.
// Removes the markers from the map, but keeps them in the array.
		function clearMarkers() {
			for (var i = 0; i < markers.length; i++) {
				markers[i].setMap(null);
			}
		}

		// Deletes all markers in the array by removing references to them.
		function deleteMarkers() {
			clearMarkers();
			markers = [];
		}

$('#filter1').change( function () {
	clearMarkers();
	console.log("change was called");
	let incubators = creatList(allOrganizations, "category", "incubator");
	let startups =creatList(allOrganizations, "category", "startup");


	$("#filter1 option:selected" ).each(function() {
		console.log($( this ).text());
		switch($( this ).text()) {
				case 'incubator':
					putMarkers(incubators);
					break;
				case 'startup':
					putMarkers(startups);
					break;
			}
		});
})
$('#searchname').change( function () {
	console.log("change was called");
	let organizations = creatList(allOrganizations, "name", $(this).val());


	$("#searchname").keyup(function() {
      clearMarkers();
      putMarkers(organizations);
		});
});

$('#searchcountry').change( function () {
	let organizations = creatListWith2Keys(allOrganizations,"address","country", $(this).val());
console.log($(this).val());
	$("#searchcountry").keyup(function() {
      clearMarkers();
      putMarkers(organizations);
		});
})


});
