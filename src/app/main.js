function Application(configFromURL) {
    // Check for JSON configuration file
    if (configFromURL.config) {
        // Get JSON configuration file
        request = new XMLHttpRequest();
        request.onload = function() {
            if (request.status != 200) {
                // Display error if JSON can't be loaded
                var a = document.createElement('a');
                a.href = configFromURL.config;
                a.innerHTML = a.href;
                anError('The file ' + a.outerHTML + ' could not be accessed.');
                return;
            }

            var responseMap = JSON.parse(request.responseText);

            // Set JSON file location
            if (responseMap.basePath === undefined)
                responseMap.basePath = configFromURL.config.substring(0, configFromURL.config.lastIndexOf('/')+1);

            // Merge options
            for (var key in responseMap) {
                if (configFromURL.hasOwnProperty(key)) {
                    continue;
                }
                configFromURL[key] = responseMap[key];
            }

            // Set title
            if ('title' in configFromURL)
                document.title = configFromURL.title;

            // Create viewer
            configFromURL.escapeHTML = true;
            this.viewer = pannellum.viewer('container', configFromURL);
        };
        request.open('GET', configFromURL.config);
        request.send();
        return;
    }

    this.viewer = pannellum.viewer('container', configFromURL);
    
}

(function() {
    // your page initialization code here
    // the DOM will be available here
    //pitch: nose up and down
    //yaw: nose left and right
    let config = {
        //'panorama' : "equirec.jpg",
        config : "config.json",
        hotSpotDebug: true,
    };
    let app = new Application(config);
 })();