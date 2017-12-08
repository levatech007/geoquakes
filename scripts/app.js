// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
// lists quakes mag 4.5+ for the past week

$(document).ready(function() {
  console.log("Let's get coding!");
  var uluru = {lat: 37.78, lng: -122.44};
      map = new google.maps.Map(document.getElementById('map'), {
        center: uluru,
        zoom: 8
      });
      marker = new google.maps.Marker({
        position: uluru,
        map: map
      });


      let ajaxOptions = {
        method: 'GET',
        url: weekly_quakes_endpoint,
        dataType: 'json',
        success: onSuccess,
        error: onError
      };

      $.ajax(ajaxOptions);

      function onSuccess(quakeData) {
        //debugger;  use to 'pause' website from executing code that follows. It allows to play with and acces the fetched data (e.g. to find paths)
        // console.log(quakeData)
        let quakes = quakeData.features; //creates an array of the data
        //console.log(quakes);
        let quakeTitles = quakes.map (function(quake) {return  quake.properties.title}); // gets all quake titles
        //console.log(quakeTitles);
        let quakeTime = quakes.map (function(quake) {return  quake.properties.time}); // gets all quake times
        //let timeSince = Math.round((Date.now() - quakeTime)/ 60 / 60 / 1000);

        //console.log(quakeTime);
        let quakeCoordinates = quakes.map (function(quake) {return  quake.geometry.coordinates});
        console.log(quakeCoordinates);
        quakeTitles.map (function(title){  //map function appends mutiple images in a loop
          $("div#info").append(`<p>${title}</p>`);
        });
     };


      function onError() {
        console.log("error");
      };

      //$.ajax(ajaxOptions);


      // setTimeout(function() { // function to refresh data in the background
      //   $.ajaxOptions(ajaxOptions);
      // }, //specify time);



});
