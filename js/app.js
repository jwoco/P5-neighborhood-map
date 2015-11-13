// Model

//function Model() {
//(note from Mark: lists of markers, places and other data)
//}
// var MODEL = new model();
//function ViewModel() {
// define observables here; define and use Google Map objects; create other functions to communicate with
// the model, observables, and Google Map objects
//  }

var locations = [
  {
   name: "Lowell, MA",
   marker: " ",
   content: "test 1",
   latlng: {lat: 42.639444, lng: -71.314722}
   //infoWindow -- array of properties
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
// ViewModel

//function viewModel() { //moved from line 116,117
//  var self = this;

// Google ViewModel
//Create map of Lowell

function initMap() {
	var lowell = {lat: 42.639444, lng: -71.314722};
  var mapOptions = {
    center: lowell,
    zoom: 14,
    disableDefaultUI: true
  }
  var map = new google.maps.Map(document.getElementById('map-container'),mapOptions);


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

    //Get and Parse the response from Wikipedia and append to html body as a list of links. (s/b in ViewModel)
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
          })

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




var currentLocation = locations[2]; // test; don't need these 2 lines
console.log(currentLocation);

//Define initial infowindow and set content for currentLocation
  var infowindow = new google.maps.InfoWindow(
    {
    //infowindow.setContent(locations[i].content);
    //content: self.locations.content//set content to currentLocation
    //content: locations[i].content
    content: 'content'
  //marker: currentMarker   how to tie infowindow to marker?
  //content: '<p>' + data[0] + '</p>'
  });
  //};


// For each location, create a marker
//var markersArray = [];
for (var i =0; i < locations.length; i++) {
  var marker = new google.maps.Marker({
    position: locations[i].latlng,
    map: map,
    animation: google.maps.Animation.DROP,
  });
  locations[i].marker = marker; //Add marker to locations data in Model

  //Define initial infowindow and set content for current location
  //var infowindow = new google.maps.InfoWindow()
  //{
  // content: locations[i].content //set content to currentLocation
  //marker: currentMarker   how to tie infowindow to marker?
  //content: '<p>' + data[0] + '</p>'
  //};

  content = locations[i].content;

  marker.addListener('click', function(content) {  //on click, open infoWindow for each marker
    //content = locations[i].content;
    infowindow.setContent(content.toString());
    infowindow.open(map, marker);
  });
  //var currentMarker = markersArray[2];
}

//var currentMarker = markersArray[2];
console.log(locations[1].marker);
console.log(locations[1].content);


//function setMarker() {
//  map.setCenter(new google.maps.LatLng(locations.latlng) );
//}
//var currentMarker = markersArray[2];
//var marker = new google.maps.Marker({     //markers should be in the Model
//    position: locations[2].latlng,
//    map: map,
//    animation: google.maps.Animation.DROP,
//    title: locations[2].name,
//    content: "check"
//  });

  //marker.addListener('click', function() {
  //  infowindow.open(map, currentMarker);
  //});

// Displays infoWindow when marker is clicked
 // function markerDisplay() {
 //   infowindow.open(map, currentMarker);
 // };
};  //end of InitMap (Model  ViewModel)



function viewModel() {
  var self = this;

 //Hard-coded locations - these should be in Model as they are data? yes, but then, in ViewModel, need to use
 // something like this.getAllLocations = ko.computed(function() {
//                    return model.Locations();
//                });
 //}

  self.locationsList = ko.observableArray(locations);
  //self.locationsList = ko.observableArray(locations.slice(0) );
  //self.markersArray = ko.observableArray(markersArray);


  self.setMarker = function(locations) {
    console.log('click works');
    //map.setCenter(new google.maps.LatLng(locations.latlng ) );
    //map.setCenter(marker.getPosition());
    locations.marker.setAnimation(google.maps.Animation.DROP); //activate associated marker
    //this.infowindow.setContent(locations.content); //infowindow, map not available in local scope?
    google.maps.event.trigger(locations.marker, 'click'); //open infowindow associated with marker
    //var infowindow = new google.maps.InfoWindow({
    //});
    //infowindow.open(map,locations.marker);
  }
  //this.locationsList = ko.observableArray(locations.slice(1) );  //would need to get marker into locations list from markersArray

 // initialLocations.forEach(function(locationItem) {
  //  self.locationsList.push(new location(locationItem) );


 // this.currentLocation = ko.observable(this.locationsList()[0] );


 // Create list of locations



  //infooWindow: function(item) {                   infoWindow object should be in Model
  //  display.infoWindow(item.name.toLowerCase());
  //},

  //query:

  //search:

//}

};
// Run it
ko.applyBindings(new viewModel() );



// function searchLocations ()  get text from input and use to filter locations list

//Class to represent a place in the Places list
//function  currentPlace(name) {
 // var self = this;
 // self.name = name;
//}

// Overall ViewModel for the page with initial values

//Current Place data from the GoogleMaps API


//View - should include map render?
// search bar, List View, Map  using Knockout

