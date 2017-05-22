// Document ready function to ensure that HTML loads prior to .js running
$(document).ready(function() {
  // click listener function set-up to listen for clicks across all "filter" buttons and toggle css based on mouse over and selected button
  $(".hall-btn").click(function(){
    $(".hall-btn").removeClass("selected");
    $(this).addClass("selected");
    // URL for public flickr feed including JSON call back string to convert XML into JSON
    var flickerAPI = "https://www.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    //jQuery 'this' method to target button clicked.  Text captured using .text()
    var filter = $(this).text(); 
    // optional & manditory data used as criteria.  Later passed as an argument into the $.getJSON function below.
    var flickerOptions = {
      id: "137821035@N07",
      tags: filter,
      format: "json"
    };
    // HTML 'render function' using custom elements of the flickr JSON data
    function displayPhotos(data) {
      // create a local 'photoHTML' variable which is gradually built up into the required HTML structure incl. bootstrap responsive classes.
      var photoHTML = '<div class="row">';
      $.each(data.items, function (i, photo) {
        photoHTML += '<div class="col-lg-3 col-sm-6">';
        photoHTML += '<div class="thumbnail">';
        photoHTML += '<a href="' + photo.link + '" target="blank"><img class="flickr-img" src="' + photo.media.m + '"></a>';
        photoHTML += '</div>';
        photoHTML += '</div>';
      });
      photoHTML += '</div>';
      // jQuery to traverse HTML and manipulation of the HTML using the photoHTML variable
      $('#photos').html(photoHTML);
    }
    // get JSON function called including parameters for the URL, flickr data & callback function
    $.getJSON(flickerAPI, flickerOptions, displayPhotos);
  });
}); // end ready


 
