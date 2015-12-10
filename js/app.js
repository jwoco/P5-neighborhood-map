// Model - contains data used by the ViewModel and user interface

 var locations = [
  {
   name: "Tsongas Center",
   marker: " ",
   wikiURL: 'https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json',
   //wikiURL: 'http://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=Tsongas%Center&callback=wikiCallback',
   //wikiURL: "http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=Tsongas%20Center&format=jsonp",
   //&callback=wikiCallback
   content: " ",
   latlng: {lat: 42.639444, lng: -71.314722}
  },
  {
    name: "Pawtucket Canal",
    marker: " ",
    wikiURL: 'http://en.wikipedia.org//w/api.php?action=opensearch&format=json&search=Pawtucket%20Canal&callback=wikiCallback',
    content: " ",
    latlng: {lat: 42.644167, lng: -71.305833}
  },
  {
    name: "UMass Lowell",
    marker: " ",
    wikiURL: 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=UMass%20Lowell&callback=wikiCallback',
    content: " ",
    latlng: {lat: 42.642716, lng: -71.33453}
  },
  {
    name: "Lowell Memorial Auditorium",
    marker: " ",
    wikiURL: 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=Lowell%20Memorial%20Auditorium&callback=wikiCallback',
    content: " ",
    latlng: {lat: 42.645068, lng: -71.304172 }
  },
  {
    name: "Westford Knight",
    marker: " ",
    wikiURL: 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=Westford%20Knight&callback=wikiCallback',
    content: " ",
    latlng: {lat: 42.587874, lng: -71.434396}
  }
];


//var markersArray = [];

//var location = function(data) {
//  this.name = ko.observable(data.name);
//};
//console.log(locations[2].content);

//Create map of Lowell using Google Maps API

function initMap() {

	var lowell = {lat: 42.639444, lng: -71.314722};
  var mapOptions = {
    center: lowell,
    zoom: 14,
    disableDefaultUI: true
  }
  var map = new google.maps.Map(document.getElementById('map-container'),mapOptions);





 //For each location, get content from Wikipedia API. Content will be displayed in Google Maps infowindow, when a location marker is clicked.
    //$.ajax({
      //  //url: locations[2].wikiURL;
       // url: locations[2].content,
        //dataType: "jsonp",
        //headers: { 'Api-User-Agent': 'MapMashup/1.0 joconnorje@gmail.com' },
     //   method: "POST",
        //url: "http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&callback=wikiCallback",
        //data: { location: city }
      //})
      //.done(function(data) {
        //    //article = locations[2].content;

          //  console.log(data);
      //});


    //    var article = response;
           // for (var i = articleList.length - 1; i >= 0; i--) {
           //     articleString = articleList[i];
           //     var url = 'http://en.wikipedia.org/wiki' + articleString;


        //clearTimeout(wikiRequestTimeout);
    //    }
    //});


    //return false;
    //};

// Search and Get articles using Wikipedia API
//    var wikiURL = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + locations[2].name + '&format=json&callback=wikiCallback';
//    console.log(wikiURL);

//Use timeout (can clear timeout below to stand in for error handling. jsonp does not have built-in error handling.)

   // var wikiRequestTimeout = setTimeout(function() {
   //     var wikiElem = "failed to get Wikipedia resources";
   // }, 8000);

//ViewModel contains functions that work with the data (locations) and the user interface (html).
// The ViewModel has fucntions that operate on the user interface by using the KnockOut (wwww.knockoutjs.com) framework.

//function viewModel() {
 // var self = this;


// Get info from Wikipedia
//$.getJSON('https://en.wikipedia.org/w/api.php?callback=?', function(results) {
      //    myCallback(results, infowindow);
//});


//Put wikipedia info in infoWindow
//function myCallback (article, infowindow) {
    //handle my data in here
//};

//Get content for current location from data model
// var content = locations[i].content;


for (var i = 0; i < locations.length; i++) {

  var wikiCallback = function(data) {
    console.dir(data[i]);
  }

$(function() {
  $.ajax({
      url: locations[i].wikiURL,
      dataType: 'jsonp',
      success: function(data) {
        console.log('yello');
        console.log(data);
        contentString = '<div>' +  '<p>' + data + '</p>' + '</div>';
        locations[i].content = contentString;
        console.log(contentString);

      }
  });

});

}


//var currentLocation = locations[2]; // test; don't need these 2 lines
//console.log(currentLocation);

//Define initial infowindow and set content for currentLocation
  var infowindow = new google.maps.InfoWindow(
  {
   content: 'initial content'
  });
  //};

//locations.forEach

// For each location, create a marker
//var markersArray = [];

for (var i = 0; i < locations.length; i++) {
  //create a marker on the map
    var marker = new google.maps.Marker({
    position: locations[i].latlng,
    map: map,
    //content: locations.content,
    animation: google.maps.Animation.DROP,
  });

//});
 //create an infowindow to open when marker is clicked
 //marker.infowindow = new google.maps.InfoWindow(
 //{
  //content: 'initial infowindow content'
 //});

  locations[i].marker = marker; //Add marker to locations data in Model

//Get content for current location from data model
 // var content = locations[i].content;

  //For each location, get content from Wikipedia API. Content will be displayed in Google Maps infowindow, when a location marker is clicked.
  //locations[i].content =
  //$.ajax({
    //    url: locations[i].wikiURL,
      //  //url: locations[2].content,
      //  dataType: 'jsonp',
        //headers: { 'Api-User-Agent': 'MapMashup/1.0 joconnorje@gmail.com' },
      //  type: 'GET',
        //url: "http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&callback=wikiCallback",
        //data: { location: city }
      //})
      //.done(function(data) {
       //     article = locations[i].content;

         //   console.log(article);
         //   console.log(locations[i].wikiURL);
      //});

//var wikiCallback = function(data) {
  //console.dir(data[i]);
//}

//$(function() {
  //$.ajax({
    //  url: locations[i].wikiURL,
    //  dataType: 'jsonp',
    //  success: function(data) {
    //    console.log('yello');
    //    console.log(data);
    //    contentString = '<div>' +  '<p>' + data + '</p>' + '</div>';
    //    locations[i].content = contentString;
    //    console.log(contentString);

     // }
  //});

//});

//Add listener for marker and open infowindow with current location content
  marker.addListener('click', (function(markerRef, contentString) {  //on click, open infoWindow
    return function() {
    infowindow.setContent(contentString);
    infowindow.open(map, markerRef);
  }
  })(marker,locations.content));
  //var currentMarker = markersArray[2];
}; //end for loop

}; //end of initMap

//var currentMarker = markersArray[2];
//console.log(marker);
//console.log(locations[1].content);

function viewModel() {
  var self = this;

  //self.locationsList = ko.observableArray(locations.slice(0));
  self.locationsList = ko.observableArray(locations);
  //self.filteredList = ko.observableArray();
  //self.markersList = ko.observableArray(locations.marker);
  //self.markersArray = ko.observableArray(markersArray);


  self.setMarker = function(locations) {
    console.log('click works');
    //map.setCenter(new google.maps.LatLng(locations.latlng ) );
    //map.setCenter(marker.getPosition());
    locations.marker.setAnimation(google.maps.Animation.DROP); //activate associated marker
    //infowindow.setContent(locations.content); //infowindow, map not available in local scope?
    google.maps.event.trigger(locations.marker, 'click'); //open infowindow associated with marker
    //var infowindow = new google.maps.InfoWindow({
    //});
    //infowindow.open(map,marker);
  }
  //this.locationsList = ko.observableArray(locations.slice(1) );  //would need to get marker into locations list from markersArray

 // initialLocations.forEach(function(locationItem) {
  //  self.locationsList.push(new location(locationItem) );


 // this.currentLocation = ko.observable(this.locationsList()[0] );


 // Create list of locations



  self.query = ko.observable('');

  //self.searchLocationList = ko.computed(function(){
    //return ko.utils.arrayFilter(self.locationsList(), function(locations){
    //  return locations.name.toLowerCase().indexOf(self.query().toLowerCase()) >= 0;
    //});
  //});

  self.filteredList = ko.observableArray();

  self.locationsList().forEach(function (locations) {
      self.filteredList.push(locations);
  });

// Use ko binding to user input in Serach box (self.query) to filter the display of locations and markers.
// http://codepen.io/prather-mcs/pen/KpjbNN

  self.filteringFunction = function(locations)  {

    var searchInput = self.query().toLowerCase();
    self.filteredList.removeAll();

    //self.filteredList = ko.observableArray();


     //console.log(searchInput);

      //self.locationsList([]);
      //self.locationsList.removeAll();
      //self.locationsList.removeAll();

      //console.log(locations);


      self.locationsList().forEach(function(locations) {
        locations.marker.setVisible(false);
// !== -1
       if (locations.name.toLowerCase().indexOf(searchInput) !== -1)
        //{
          self.filteredList.push(locations);
        //return locations.name.toLowerCase().indexOf(self.query().tolowerCase()) >= 0;
        //};
        //remove the current location (from forEach) from the visible locationsList
        //credit: http://www.hostingadvice.com/how-to/javascript-remove-element-array/
        //else { self.locationsList.splice(self.locationsList.indexOf(locations),1); };
      });

      //console.log(self.locationsList[0]);

      //self.locationsList.removeAll();
      //self.locationsList.pop(location);

      self.filteredList().forEach(function(locations) {
          //add the location to visible locationsList
          //self.locationsList.push(locations);
          //Make the locations marker visible
          locations.marker.setVisible(true);
      });

   // var result = locations.name.toLowerCase().indexOf(self.query().toLowerCase());

    //if (result !== 0) {
    //  marker.setVisible(false);
    //  } else {
    //    marker.setVisible(true);
    //    return(locations.name)
    //  }
  };

  //self.search = function(query) {
    //locationsList.removeAll();
    //for (var x in locationsList) {
    //  markers[x].setVisible(false);
    //  if (locationsList[x].name.toLowerCase().indexOf(self.query().toLowerCase()) >= 0) {
    //    locationsList.push(locationsList[x])
    //    markers[x].setVisible(true);
    //  }
    //}
  //}

//};

//}

}; //end of ViewModel
// Run it
ko.applyBindings(new viewModel() );



// function searchLocations ()  get text from input and use to filter locations list




