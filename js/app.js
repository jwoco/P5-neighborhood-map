// Model

//var map;
function initMap() {
	var westford = {lat: 42.579167, lng: -71.438333};
  var mapOptions = {
    center: westford,
    zoom: 17,
    //disableDefaultUI: true
  }
  var map = new google.maps.Map(document.getElementById('map-container'),mapOptions);


// created var mapoptions and moved map creation to var map, which allowed disableDefaultUI to work but broke custom marker


var contentString = '<p>' + 'Home of the Grey Ghosts' + '</p>';

var infowindow = new google.maps.InfoWindow({
  content: contentString
});

var marker = new google.maps.Marker({
    position: westford,
    map: map,
    title: 'Westford Center'
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

//  var panorama = new google.maps.StreetViewPanorama(
  //    document.getElementById('pano'), {
  //      position: westford,
  //      pov: {
  //        heading: 34,
  //        pitch: 10
  //      }
  //    });
  //map.setStreetView(panorama);
};

//ViewModel
// InfoWindow



function LocationsViewModel() {
 var self = this;

 //Hard-coded locatsions
var locations = [
  {
   name: "Westford Common",
   //marker:
   //content
   //lat and long
  },
  {
    name: "Parish Center for the Arts",
    //marker:
    //content:
    //lat and lang:
  },
  {
    name: "Fletcher Library",
    //marker:
    //content:
    //lat and long: 42.587874, -71.434396
  },
  {
    name: "Roudenbush Center",
  },
  {
    name: "Westford Knight",
    //marker:
    //content:
    //lat and long : 42.587874, -71.434396
  }

];
 self.location = ko.observableArray(locations);

  //infooWindow: function(item) {
  //  display.infoWindow(item.name.toLowerCase());
  //},

  //query:

  //search:

}

  ko.applyBindings(new LocationsViewModel());
//);



//Class to represent a place in the Places list
//function  currentPlace(name) {
 // var self = this;
 // self.name = name;
//}

// Overall ViewModel for the page with initial values

//Current Place data from the GoogleMaps API


//View - should include map render?
// search bar, List View, Map  using Knockout

