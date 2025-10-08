let map = L.map('map').setView([0, 0], 3);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let userMarker = null;
let userCircle = null;

function success(position){
    const latitude = position.coords.latitude;
    const lon = position.coords.longitude;
    const  accuracy = position.coords.accuracy;
    const latlon = [latitude, lon];

    if (!userMarker){
        map.setView(latlon, 16)
    }
    if (userMarker){
        userMarker.setLatLng(latlon);
    }else{
        userMarker = L.marker(latlon).addTo(map).bindPopup("You're here!").openPopup();
    }
    if (userCircle){
        userCircle.setLatLng(latlon).setRadius(accuracy);
    }else{
        userCircle = L.circle(latlon,{radius: accuracy}).addTo(map);
    }
}

function error(){

}

if (navigator.geolocation){
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };
    navigator.geolocation.watchPosition(success, error, options)
}else{
    console.log("Seu navegador não suporta Geolocalização")
}

