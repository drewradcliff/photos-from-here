// TO DO: 
// [x] Get the geographic location from the browser
// [x] Construct the query URL
// [x] Use fetch to send the request to Flickr
// [x] Process the response data into an object
// [x] Use the values in the response object to construct an image source URL
// [] Display the first image on the page
// [] In response to some event (e.g. a button click or a setInterval), show the next image in the collection


function init () {

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        getJson(latitude, longitude)
    }

    function error () {
        // default location set to Indianapolis
        const longitude = '39.76574';
        const latitude = '-86.1579024';

        getJson(latitude, longitude)
    }
    
    function getJson (lat, lon) {
        fetch('https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=f28f6f6111a311294dc988ab32e57546&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=' + lat + '&lon=' + lon + '&text=city')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const imageUrl = constructImageURL(data.photos.photo[0]);
            displayImage(imageUrl)
        });
    }
    
    function displayImage (url) {
        let img = document.createElement('img');
        img.src = url
        document.body.appendChild(img)
    }

    function constructImageURL (photoObj) {
        return "https://farm" + photoObj.farm + 
                ".staticflickr.com/" + photoObj.server +
                "/" + photoObj.id + "_" + photoObj.secret + ".jpg";
    }

    navigator.geolocation.getCurrentPosition(success, error);
}   

init()