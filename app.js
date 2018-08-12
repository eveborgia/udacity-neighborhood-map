/*eslint no-unused-vars: "null"*/
/*global google, ko, $ */

(function () {
    'use strict';
    // this function is strict...
}());

let map;
let infoWindow;
let infoWindowCurrent;
let markerLastClicked = null;

// Foresquare API keys
const CLIENT_ID = 'TTGRJJHD0KIUI5C3XXIMB0WYTOAT3AOHYCOKEFRGYDHMQQDS';
const CLIENT_SECRET = 'QRC5I51IMSGYUB3TXKOVRUFDXVZERYTSZOU4VYCM1GRMGYP5';

//South Beach locations that will be shown to the user.
const initialLocations = [
    {
        name: 'Meat Market',
        lat: 25.790705,
        lng: -80.137989
    },
    {
        name: 'NaiYaRa',
        lat: 25.794467,
        lng: -80.144040
    },
    {
        name: 'Regal Cinemas South Beach 18 & IMAX',
        lat: 25.790219,
        lng: -80.140988
    },
    {
        name: 'Nikki Beach Miami',
        lat: 25.769013,
        lng: -80.132246
    },
    {
        name: 'New World Center',
        lat: 25.791650,
        lng: -80.133487
    },
    {
        name: 'South Pointe Pier',
        lat: 25.763782,
        lng: -80.130180
    },
    {
        name: 'The Filmore Miami Beach',
        lat: 25.792922,
        lng: -80.133085
    },
    {
        name: 'Yardbird Southern Table & Bar',
        lat: 25.789117,
        lng: -80.140205
    },
    {
        name: 'Flamingo Park',
        lat: 25.783964,
        lng: -80.137317
    },
    {
        name: 'Joe\'s Stone Crab',
        lat: 25.768871,
        lng: -80.135259
    }
];


// ViewModel
const ViewModel = function() {
    let self = this;

    self.locationList = ko.observableArray([]);
    self.query = ko.observable('');

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 25.790705, lng: -80.137989},
        zoom: 14
    });

    initialLocations.forEach(function(data) {
        self.locationList.push(new Location(data));
    });

    //Credit: http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
    self.filteredLocations = ko.computed(function() {
        let loc = this.query().toLowerCase();
        return this.locationList().filter(function(location) {
            var isMatched = location.nameNormalized.indexOf(loc) !== -1;
            location.marker.setVisible(isMatched);
            return isMatched;
        }, this);
    }, this);
};

// Location Model
const Location = function(data) {
    let self = this;

    self.name = data.name;
    self.nameNormalized = data.name.toLowerCase();

    //Load data from the server get Json request for Forsquare data
    const url = 'https://api.foursquare.com/v2/venues/search?client_id=' + CLIENT_ID
     + '&client_secret=' + CLIENT_SECRET + '&ll=' + data.lat + ',' + data.lng
     + '&v=20180809&&query=' + data.name;

    $.getJSON(url)
        .done(function(data) {
            var fourSquareData = data.response.venues[0];
            self.address = fourSquareData.location.formattedAddress;
            self.category = fourSquareData.categories[0].shortName;
            self.lat = fourSquareData.location.lat;
            self.lng = fourSquareData.location.lng;
        // Handle in case Foresquare has an error
        }).fail(function() {
            alert('The Foursquare API has an error. Try again later.');
        });

    // Create marker per location
    self.marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(data.lat, data.lng),
        title: self.name,
        animation: google.maps.Animation.DROP
    });

    // On click event when you click on the marker to show the InfoWindow
    self.marker.addListener('click', function() {
        if (infoWindowCurrent) {
            infoWindowCurrent.close();
        }

        const cancelAnimation = function() {
            markerLastClicked.setAnimation(null);
            markerLastClicked = null;
        };

        if (markerLastClicked) {
            cancelAnimation();
        }

        // Info Window  
        const infoWindowContent = [
            '<div class="info-window">',
            '<h4>', self.name, '</h4>',
            '<p>', self.address[0], '</p>',
            '<p>', self.address[1], '</p>',
            '<p>', self.address[2], '</p>',
            '<p>Category: ', self.category, '</p>',
            '</div>'
        ];

        let infoWindow = new google.maps.InfoWindow({ content: infoWindowContent.join('') });
        infoWindowCurrent = infoWindow;

        // Bounce when click on marker
        infoWindow.open(map, self.marker);
        self.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            self.marker.setAnimation(null);
        }, 2000);

        markerLastClicked = self.marker;
        google.maps.event.addListener(infoWindow, 'closeclick', cancelAnimation);
    });

    // When clicked on Location Filter open the info window
    self.clickLocationName = function() {
        google.maps.event.trigger(self.marker, 'click');
    };
};

// Alert if google map errors
function googleMapsError() {
    alert('Google Maps error. Please refresh the page and try again!');
}

function init(){
    ko.applyBindings(new ViewModel());
}
