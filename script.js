function init () {
    const status = document.querySelector('.status');
    const title = document.querySelector('.title');
    let json = {}, imgIndex=0;

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        status.textContent = `Current Location: ${latitude}, ${longitude}`;

        getJson(latitude, longitude)
    }

    function error () {
        // default location set to Indianapolis
        const longitude = -122.431297;
        const latitude = 37.773972;
        status.textContent = `Could not get location... Showing default location (San Francisco): ${latitude}, ${longitude}`;

        getJson(latitude, longitude)
    }
    
    function getJson (lat, lon) {
        fetch('https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=f28f6f6111a311294dc988ab32e57546&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=' + lat + '&lon=' + lon + '&text=street')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            json = data;
            title.textContent = data.photos.photo[0].title
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
            title.textContent = json.photos.photo[imgIndex].title;
        }
    }

    function nextImg () {
        if (imgIndex < json.photos.photo.length-1) {
            imgIndex++;
            displayImage(constructImageURL(json.photos.photo[imgIndex]))
            title.textContent = json.photos.photo[imgIndex].title;
        }
    }

    navigator.geolocation.getCurrentPosition(success, error);
    document.querySelector('.previous').addEventListener('click', prevImg);
    document.querySelector('.next').addEventListener('click', nextImg);
}   

init()