// TO DO: 
// [x] Get the geographic location from the browser
// [x] Construct the query URL
// [x] Use fetch to send the request to Flickr
// [x] Process the response data into an object
// [x] Use the values in the response object to construct an image source URL
// [x] Display the first image on the page
// [x] In response to some event (e.g. a button click or a setInterval), show the next image in the collection


function init () {
    const status = document.querySelector('.status');
    let json = {}, imgIndex=0;

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        status.textContent = `Current Location: ${latitude}, ${longitude}`;

        getJson(latitude, longitude)
    }

    function error () {
        // default location set to Indianapolis
        const longitude = '39.76574';
        const latitude = '-86.1579024';
        status.textContent = `Could not get location... Showing default location: ${latitude}, ${longitude}`;

        getJson(latitude, longitude)
    }
    
    function getJson (lat, lon) {
        fetch('https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=f28f6f6111a311294dc988ab32e57546&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=' + lat + '&lon=' + lon + '&text=street')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            json = data;
            const imageUrl = constructImageURL(data.photos.photo[0]);
            displayImage(imageUrl);
        });
    }
    
    function displayImage (url) {
        let img = document.querySelector('.image');
        img.src = url;
        let div = document.querySelector('.image-wrapper');
        div.appendChild(img);
    }

    function constructImageURL (photoObj) {
        return "https://farm" + photoObj.farm + 
                ".staticflickr.com/" + photoObj.server +
                "/" + photoObj.id + "_" + photoObj.secret + ".jpg";
    }

    function prevImg () {
        if (imgIndex > 0) {
            imgIndex--;
            displayImage(constructImageURL(json.photos.photo[imgIndex]));
        }
    }

    function nextImg () {
        if (imgIndex < json.photos.photo.length-1) {
            imgIndex++;
            displayImage(constructImageURL(json.photos.photo[imgIndex]))
        }
    }

    navigator.geolocation.getCurrentPosition(success, error);
    document.querySelector('.previous').addEventListener('click', prevImg);
    document.querySelector('.next').addEventListener('click', nextImg);
}   

init()