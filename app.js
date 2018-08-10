/*eslint no-unused-vars: "null"*/
/*global google, ko */

var map;
var infoWindowCurrent;
var markerLastClicked;


// Create a new blank array for all the listing markers.
var markers = [];

function init(){
    ko.applyBindings(new ViewModel());
}


// Use knockout to show the locations
var ViewModel = function() {
    var self = this;

    self.locationList = ko.observableArray([]);
    self.query = ko.observable('');

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 25.790705, lng: -80.137989},
        zoom: 14
    });

    initialLocations.forEach(function(data) {
        self.locationList.push(new Location(data));
    });

    self.filteredLocations = ko.computed(function() {
        return this.locationList().filter(function(location) {
            var isMatched = location.nameNormalized.indexOf(this.query().toLowerCase()) !== -1;
            location.marker.setVisible(isMatched);
  
            return isMatched;
        }, this);
    }, this);
};

// Location Model
var Location = function(data) {
    var self = this;

    self.name = data.name;
    self.nameNormalized = data.name.toLowerCase();

    self.address = data.address;
    self.lat = data.lat;
    self.lng = data.lng;

    // Create a marker per location, and put into markers array.
    self.marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(self.lat, self.lng),
        // position: {lat: myLat, lng: myLng},
        title: self.name,
        address: self.address,
        animation: google.maps.Animation.DROP,
    });


    self.marker.addListener('click', function() {
        populateInfoWindow(this, largeInfowindow);
    });
};


//These are the South Beach locations that will be shown to the user.
var initialLocations = [
    {
        name: 'Meat Market',
        address: '915 Lincoln Rd,',
        city: 'Miami Beach, FL 33139',
        lat: 25.790705,
        lng: -80.137989
    },
    {
        name: 'NaiYaRa',
        address: '1854 Bay Rd,',
        city: 'Miami Beach, FL 33139',
        location: {lat: 25.794467, lng: -80.144040},
        lat: 25.794467,
        lng: -80.144040
    },
    {
        name: 'Regal Cinemas South Beach 18 & IMAX',
        address: '1120 Lincoln Rd,',
        city: 'Miami Beach, FL 33139',
        lat: 25.790219,
        lng: -80.140988
    },
    {
        name: 'Nikki Beach Miami',
        address: '1 Ocean Dr,',
        city: 'Miami Beach, FL 33139',
        lat: 25.769013,
        lng: -80.132246
    },
    {
        name: 'New World Center',
        address: '500 17th St,',
        city: 'Miami Beach, FL 33139',
        lat: 25.791650,
        lng: -80.133487
    },
    {
        name: 'South Pointe Pier',
        address: '1 Washington Ave,',
        city: 'Miami Beach, FL 33139',
        lat: 25.763782,
        lng: -80.130180
    },
    {
        name: 'The Filmore Miami Beach',
        address: '1700 Washington Ave,',
        city: 'Miami Beach, FL 33139',
        lat: 25.792922,
        lng: -80.133085
    },
    {
        name: 'Yardbird Southern Table & Bar',
        address: '1600 Lenox Ave,',
        city: 'Miami Beach, FL 33139',
        lat: 25.789117,
        lng: -80.140205
    },
    {
        name: 'Flamingo Park',
        address: '1200 Meridian Ave,',
        city: 'Miami Beach, FL 33139',
        lat: 25.783964,
        lng: -80.137317
    },
    {
        name: "Joe's Stone Crab",
        address: '11 Washington Ave,',
        city: 'Miami Beach, FL 33139',
        lat: 25.768871,
        lng: -80.135259
    }
];




function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div>' + '<strong>' + marker.title + '</strong>' +'</div>' + '<div>' + marker.address + '</div>' + '<div>' + marker.city + '</div>');
        infowindow.open(map, marker);
      
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick',function(){
            infowindow.setMarker = null;
        });
    }
}

//https://developers.google.com/maps/documentation/javascript/examples/marker-remove
// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}
    
// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
    setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
}