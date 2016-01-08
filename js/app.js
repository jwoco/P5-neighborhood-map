// Model - contains data used by the ViewModel to construct the location information and by the user interface to show map markers and Wikipedia content

 var locations = [
  {
   name: 'Tsongas Center',
   marker: ' ',
   wikiURL: 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=Tsongas%20Center&callback=wikiCallback',
   content: ' ',
   latlng: {lat: 42.6502938, lng: -71.3132567}
  },
  {
    name: 'Lowell National Historical Park',
    marker: ' ',
    wikiURL: 'http://en.wikipedia.org//w/api.php?action=opensearch&format=json&search=Lowell%20National%20Historical%20Park&callback=wikiCallback',
    content: ' ',
    latlng: {lat: 42.644667, lng: -71.310278}
  },
  {
    name: 'UMass Lowell',
    marker: ' ',
    wikiURL: 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=UMass%20Lowell&callback=wikiCallback',
    content: ' ',
    latlng: {lat: 42.642716, lng: -71.33453}
  },
  {
    name: 'Lowell Memorial Auditorium',
    marker: ' ',
    wikiURL: 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=Lowell%20Memorial%20Auditorium&callback=wikiCallback',
    content: ' ',
    latlng: {lat: 42.645102, lng: -71.304143 }
  },
  {
    name: 'American Textile History Museum',
    marker: ' '  ,
    wikiURL: 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=American%20Textile%20History%20Museum&callback=wikiCallback',
    content: ' ',
    latlng: {lat: 42.6419896, lng: -71.3170049}
  }
];

//Constructor function for Locations
var Location = function(data) {
  this.name = data.name;
  this.marker = data.marker;
  this.wikiURL = data.wikiURL;
  this.content = data.content;
  this.latlng = data.latlng;
}

//Create map of Lowell using Google Maps API
function initMap() {

  var lowell = {lat: 42.6419896, lng: -71.3170049};
  var mapOptions = {
    center: lowell,
    zoom: 14,
    disableDefaultUI: true
  }
  map = new google.maps.Map(document.getElementById('map-container'),mapOptions);

// Run viewModel here so that map is available to the viewModel
ko.applyBindings(new viewModel() );

}; //end of initMap

//if typeof(google) = null {
  //alert("Google Maps not available. Check Internet connection.")
//};

function viewModel() {
  var self = this;

  self.locationsList = ko.observableArray([]);

  //Define initial infowindow and set content for currentLocation
  var infowindow = new google.maps.InfoWindow(
  {
   content: 'initial content'
  });

function getContent(locationItem) {

  var contentString;

    $.ajax({
      url: locationItem.wikiURL,
      dataType: 'jsonp',
      success: function(data) {
        contentString = ('<div>' +  '<p>' + '<strong>' + data[0] + '</strong>' + '</p>'
          + '<p>' + data[2] + '</p>'
          + '</div>'
          );
        locationItem.content = contentString;
        return(contentString)
      },
      //Display error message if Wikipedia is unreachable
      error: function(data) {
          contentString = ('<div>' + '<p>' + 'Failed to get Wikipedia resource. Check your Internet connection.' + '</p>' + '</div>');
          locationItem.content = contentString;
          return(contentString)
      }
    });
}

  // Create the locations using the Location constructor and add to the locationsList array
  locations.forEach(function(locationItem) {

  //create a marker on the map for each location
    var markerOptions = {
      map: map,
      position: locationItem.latlng,
      animation: google.maps.Animation.DROP,
    };

  locationItem.marker = new google.maps.Marker(markerOptions);

  //Create wiki content for infowindow for each location
    var contentString = getContent(locationItem);
    locationItem.content = contentString;


//Add listener for marker and open infowindow with current location content
  locationItem.marker.addListener('click', (function(markerRef, contentString) {  //on click, open infoWindow
    return function() {
    infowindow.setContent(locationItem.content);
    infowindow.open(map, markerRef);
  }
  })(locationItem.marker,locationItem.content));

   //Call the Location contrsuctor and push locations to the array
   self.locationsList.push(new Location(locationItem) );
}); //end forEach

console.log(self.locationsList()[0]);

  //When a location in the list is clicked, activate the marker and open the infowindow
  self.setMarker = function(locationItem) {
    console.log('click works');
    console.log(locationItem);
    locationItem.marker.setAnimation(google.maps.Animation.DROP); //activate associated marker
    google.maps.event.trigger(locationItem.marker, 'click'); //open infowindow associated with marker
  }


  //Create a copy of the locations list to use to filter the list in response to search input
  self.filteredList = ko.observableArray([]);

  locations.forEach(function (locationItem) {
    self.filteredList.push(new Location(locationItem) );
  });


  //holds Search input
  self.query = ko.observable('');


// Use ko binding to user input in Search box (self.query) to filter the display of locations and markers.
// http://codepen.io/prather-mcs/pen/KpjbNN

  self.filteringFunction = function(locations)  {

    var searchInput = self.query().toLowerCase();
    self.filteredList.removeAll();

      self.locationsList().forEach(function(locations) {
        locations.marker.setVisible(false);

       if (locations.name.toLowerCase().indexOf(searchInput) !== -1)
          self.filteredList.push(locations);

        //credit: http://www.hostingadvice.com/how-to/javascript-remove-element-array/

      });

      //Make the text markers visible for selected locations
      self.filteredList().forEach(function(locations) {
          locations.marker.setVisible(true);
      });

  }; //end filtering function

}; //end of ViewModel







