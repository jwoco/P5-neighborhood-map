// Model - contains data used by the ViewModel and user interface

 var locations = [
  {
   name: 'Tsongas Center',
   marker: ' ',
   wikiURL: 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=Tsongas%20Center&callback=wikiCallback',
   content: ' ',
   latlng: {lat: 42.639444, lng: -71.314722}
  },
  {
    name: 'Pawtucket Canal',
    marker: ' ',
    wikiURL: 'http://en.wikipedia.org//w/api.php?action=opensearch&format=json&search=Pawtucket%20Canal&callback=wikiCallback',
    content: ' ',
    latlng: {lat: 42.644167, lng: -71.305833}
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
    latlng: {lat: 42.645068, lng: -71.304172 }
  },
  {
    name: 'Westford Knight',
    marker: ' '  ,
    wikiURL: 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=Westford%20Knight&callback=wikiCallback',
    content: ' ',
    latlng: {lat: 42.587874, lng: -71.434396}
  }
];

var Location = function(data) {
  this.name = data.name;
  this.marker = data.marker;
  this.wikiURL = data.wikiURL;
  this.content = data.content;
  this.latlng = data.latlng;
}

//Create map of Lowell using Google Maps API

function initMap() {

  var lowell = {lat: 42.639444, lng: -71.314722};
  var mapOptions = {
    center: lowell,
    zoom: 14,
    disableDefaultUI: true
  }
  map = new google.maps.Map(document.getElementById('map-container'),mapOptions);


  // Run viewModel here so that map is available to the viewModel
ko.applyBindings(new viewModel() );

}; //end of initMap

function viewModel() {
  var self = this;


  //self.locationsList = ko.observableArray(locations.slice(0));
  self.locationsList = ko.observableArray([]);
  self.filteredList = ko.observableArray();
  //self.markersList = ko.observableArray(locations.marker);
  //self.markersArray = ko.observableArray(markersArray);

  //Define initial infowindow and set content for currentLocation
  var infowindow = new google.maps.InfoWindow(
  {
   content: 'initial content'
  });



function getContent(locationItem) {

    $.ajax({
      url: locationItem.wikiURL,
      dataType: 'jsonp',
      success: function(data) {
        var contentString = ('<div>' +  '<p>' + data[0] + '</p>'
          + '<p>' + data[2] + '</p>'
          + '</div>'
          );
        locationItem.content = contentString;
        return(contentString);
      }
    });

}


  // Create the locations using the Location constructor and add to the locationsList array
  locations.forEach(function(locationItem) {
    self.locationsList.push(new Location(locationItem) );
  });

  //create a marker on the map for each location
  self.locationsList().forEach(function(locationItem) {
    var markerOptions = {
      map: map,
      position: locationItem.latlng,
      animation: google.maps.Animation.DROP,
    };

  locationItem.marker = new google.maps.Marker(markerOptions);
  }); //end forEach

  //Create wiki content for infowindow for each location
  self.locationsList().forEach(function(locationItem) {
    //getContent(locationItem);
    var contentString = getContent(locationItem);
    locationItem.content = contentString;
    //infowindow.setContent(locationItem.content);
    //console.log(contentString);
    //console.log(locationItem.content);
  });


//Add listener for marker and open infowindow with current location content
self.locationsList().forEach(function(locationItem) {
  locationItem.marker.addListener('click', (function(markerRef, contentString) {  //on click, open infoWindow
    return function() {
    //var contentString = this.content;
    infowindow.setContent(locationItem.content);
    //locationItem.marker.setAnimation(google.maps.Animation.DROP); //activate associated marker
    infowindow.open(map, markerRef);
  }
  })(locationItem.marker,locationItem.content));
}); //end forEach

console.log(self.locationsList()[0]);

  //When a location in the list is clicked, activate the marker and open the infowindow
  self.setMarker = function(locationItem) {
    console.log('click works');
    console.log(locationItem);
    locationItem.marker.setAnimation(google.maps.Animation.DROP); //activate associated marker
    //infowindow.setContent(locations.content); //infowindow, map not available in local scope?
    google.maps.event.trigger(locationItem.marker, 'click'); //open infowindow associated with marker
    //var infowindow = new google.maps.InfoWindow({
    //});
    //infowindow.open(map,locations.marker);
  }

  //holds Search input
  self.query = ko.observable('');

  //Create a copy of the locations list to use to filter the list in response to search input
  self.filteredList = ko.observableArray();

  locations.forEach(function (locations) {
      self.filteredList.push(locations);
  });


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


      self.filteredList().forEach(function(locations) {
          //add the location to visible locationsList
          //self.locationsList.push(locations);
          //Make the locations marker visible
          locations.marker.setVisible(true);
      });

  };


}; //end of ViewModel
// Run it
//ko.applyBindings(new viewModel() );






