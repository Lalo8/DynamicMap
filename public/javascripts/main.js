$(document).ready(function(){
  const afri = {
    lat: 3.3192925,
    lng: 4.4218547,
  };
  const ng = {
    lat: 9.0546462,
    lng: 7.2539279,
  };

const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: afri,
    mapTypeId: 'roadmap'
  });

  var marker = new google.maps.Marker({
           position: afri,
           map: map
         });

         function addMarker(location, map) {
           // Add the marker at the clicked location, and add the next-available label
           // from the array of alphabetical characters.
           var marker = new google.maps.Marker({
             position: location,
             map: map
           });
         }
         $('#Nigeriabutton').on('click', function() {
             addMarker(ng, map);
           });




// Add organizations markers to map
  let markers = [];
  allOrganizations.forEach(function(organization){
    let title = organization.name
    let position = {
      lat: organization.location.coordinates[1],
      lng: organization.location.coordinates[0]
    };
    var pin = new google.maps.Marker({ position, map, title  });
    markers.push(pin)
  });


});
