var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 25.789776, lng: -80.144386},
        zoom: 13
    });
}

//These are the South Beach locations that will be shown to the user.
var locations = [
    {
        name: 'Meat Market',
        address: '915 Lincoln Rd, Miami Beach, FL 33139',
        location: {lat: 25.790705, lng: -80.137989}
    },
    {
        name: 'NaiYaRa',
        address: '1854 Bay Rd, Miami Beach, FL 33139',
        location: {lat: 25.794467, lng: -80.144040}
    },
    {
        name: 'Regal Cinemas South Beach 18 & IMAX',
        address: '1120 Lincoln Rd, Miami Beach, FL 33139',
        location: {lat: 25.790219, lng: -80.140988}
    },
    {
        name: 'Nikki Beach Miami',
        address: '1 Ocean Dr, Miami Beach, FL 33139',
        location: {lat: 25.769013, lng: -80.132246}
    },
    {
        name: 'New World Center',
        address: '500 17th St, Miami Beach, FL 33139',
        location: {lat: 25.791650, lng: -80.133487}
    },
    {
        name: 'South Pointe Pier',
        address: '1 Washington Ave, Miami Beach, FL 33139',
        location: {lat: 25.763782, lng: -80.130180}
    }
];



var ViewModel = function() {
    this.name = ko.observable('');
};

ko.applyBindings(new ViewModel());