var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 25.789776, lng: -80.144386},
        zoom: 13
    });
}