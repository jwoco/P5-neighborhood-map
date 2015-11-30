// Model - contains data used by the ViewModel and user interface

var locations = [
  {
   name: "Lowell, MA",
   marker: " ",
   content: "test 1",
   latlng: {lat: 42.639444, lng: -71.314722}
  },
  {
    name: "Pawtucket Canal",
    marker: " ",
    content: "test 2",
    latlng: {lat: 42.644167, lng: -71.305833}
  },
  {
    name: "UMass Lowell",
    marker: " ",
    content: 'http://en.wikipedia.org/w/api.php?action=opensearch&search=UMass,Lowell&format=json&callback=wikiCallback',
    latlng: {lat: 42.642716, lng: -71.33453}
  },
  {
    name: "Roudenbush Center",
  },
  {
    name: "Westford Knight",
    //marker:
    //content:
    //latlng : 42.587874, -71.434396
  }
];

//var markersArray = [];

//var location = function(data) {
//  this.name = ko.observable(data.name);
//};
console.log(locations[2].content);

//Create map of Lowell using Google Maps API

	var lowell = {lat: 42.639444, lng: -71.314722};
  var mapOptions = {
    center: lowell,
    zoom: 14,
    disableDefaultUI: true
  }
  self.map = new google.maps.Map(document.getElementById('map-container'),mapOptions);


// created var mapoptions and moved map creation to var map, which allowed disableDefaultUI to work but broke custom marker


//Create the InfoWindow and Marker

//var contentString = '<p>' + 'Home of the Grey Ghosts' + '</p>';

// Using jQuery
//$.ajax( {
//    url: 'https://en.wikipedia.org/w/api.php',
    //data: queryData,
//    dataType: 'json',
//    type: 'POST',
//    headers: { 'Api-User-Agent': 'MapMashup/1.0 joconnorje@gmail.com' },
//    done: function(data) {
//       var contentString = '<p>' + data + '</p>'
//    }
//} );

// Search and Get articles using Wikipedia API
//    var wikiURL = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + locations[2].name + '&format=json&callback=wikiCallback';
//    console.log(wikiURL);

//Use timeout (can clear timeout below to stand in for error handling. jsonp does not have built-in error handling.)

   // var wikiRequestTimeout = setTimeout(function() {
   //     var wikiElem = "failed to get Wikipedia resources";
   // }, 8000);

//ViewModel contains functions that work with the data (locations) and the user interface (html).
// The ViewModel has fucntions that operate on the user interface by using the KnockOut (wwww.knockoutjs.com) framework.

function viewModel() {
  var self = this;

    //For each location, get content from Wikipedia API. Content will be displayed in Google Maps infowindow, when a lcoation marker is clicked.
    $.ajax({
        //url: locations[2].wikiURL;
        url: locations[2].content,
        dataType: "jsonp",
        headers: { 'Api-User-Agent': 'MapMashup/1.0 joconnorje@gmail.com' },
     //   method: "POST",
        //url: "http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&callback=wikiCallback",
        //data: { location: city }
      })
      .done(function(data) {
            //article = locations[2].content;

            console.log(data);
      });

     //    var article = response;
           // for (var i = articleList.length - 1; i >= 0; i--) {
           //     articleString = articleList[i];
           //     var url = 'http://en.wikipedia.org/wiki' + articleString;


        //clearTimeout(wikiRequestTimeout);
    //    }
    //});


    //return false;
    //};

// Get info from Wikipedia
//$.getJSON('https://en.wikipedia.org/w/api.php?callback=?', function(results) {
      //    myCallback(results, infowindow);
//});


//Put wikipedia info in infoWindow
//function myCallback (article, infowindow) {
    //handle my data in here
//};




//var currentLocation = locations[2]; // test; don't need these 2 lines
//console.log(currentLocation);

//Define initial infowindow and set content for currentLocation
  var infowindow = new google.maps.InfoWindow(
  {
   content: 'initial infowindow content'
  });
  //};


// For each location, create a marker
//var markersArray = [];

locations.forEach(function(locations) {
  //create a marker on the map
 marker = new google.maps.Marker({
    position: locations.latlng,
    map: map,
    content: locations.content,
    animation: google.maps.Animation.DROP,
  });
//});
 //create an infowindow to open when marker is clicked
 //marker.infowindow = new google.maps.InfoWindow(
 //{
  //content: 'initial infowindow content'
 //});

//for (var i =0; i < locations.length; i++) {
//  var marker = new google.maps.Marker({
//    position: locations[i].latlng,
//    map: map,
//    animation: google.maps.Animation.DROP,
//  });
//  locations[i].marker = marker; //Add marker to locations data in Model

//Get content for current location from data model
  //var content = locations[i].content;

//Needs to be in forEach

//Add listener for marker and open infowindow with current location content
  marker.addListener('click', (function(markerRef, contentString) {  //on click, open infoWindow
    return function() {
    infowindow.setContent(contentString);
    infowindow.open(map, markerRef);
  }
  })(marker,locations.content));
  //var currentMarker = markersArray[2];
}); //end forEach

//var currentMarker = markersArray[2];
console.log(locations[2].marker);
//console.log(locations[1].content);


  self.locationsList = ko.observableArray(locations);
  //self.locationsList = ko.observableArray(locations.slice(0) );
  //self.markersArray = ko.observableArray(markersArray);


  self.setMarker = function(locations) {
    console.log('click works');
    //map.setCenter(new google.maps.LatLng(locations.latlng ) );
    //map.setCenter(marker.getPosition());
    marker.setAnimation(google.maps.Animation.DROP); //activate associated marker
    //this.infowindow.setContent(locations.content); //infowindow, map not available in local scope?
    google.maps.event.trigger(marker, 'click'); //open infowindow associated with marker
    //var infowindow = new google.maps.InfoWindow({
    //});
    //infowindow.open(map,locations.marker);
  }
  //this.locationsList = ko.observableArray(locations.slice(1) );  //would need to get marker into locations list from markersArray

 // initialLocations.forEach(function(locationItem) {
  //  self.locationsList.push(new location(locationItem) );


 // this.currentLocation = ko.observable(this.locationsList()[0] );


 // Create list of locations



  //infoWindow: function(item) {                   infoWindow object should be in Model
  //  display.infoWindow(item.name.toLowerCase());
  //},

  //query:

  //to read or write and observables value, you call it as a function
  //get current observable array (locationsList), then hide/show locations based on search value
  // var currentLocs = this.locationsList();
  //

  //self.searchLoc = function(location) {
   // viewModel.locationsList([]);
   // for(var x in locationsList()) {
   //   if (locationsList[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0)
   //     viewModel.locationsList.push(locationsList[x]);

   //   console.log(locationsList);

   // }
  //}

  self.query = ko.observable('');

  self.search = ko.computed(function(){
    return ko.utils.arrayFilter(self.locationsList(), function(locations){
      return locations.name.toLowerCase().indexOf(self.query().toLowerCase()) >= 0;
    });
  });

//};

//}

}; //end of ViewModel
// Run it
ko.applyBindings(new viewModel() );



// function searchLocations ()  get text from input and use to filter locations list




