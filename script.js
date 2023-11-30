function initMap() {
  var southlandLocation = { lat: 32.885310, lng: -96.768940 };

    var map = new google.maps.Map(document.getElementById("map"), {
      center: southlandLocation,
      zoom: 17,
      mapTypeId: "hybrid",
      styles: [
        {
          featureType: "poi",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "transit",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ visibility: "on" }],
        },
      ],
   });
  
    var marker = new google.maps.Marker({
      position: southlandLocation,
      map: map,
      title: "Southland Consulting Engineers",
    });
  
    var infoWindow = new google.maps.InfoWindow({
      content: "<strong>Southland Consulting Engineers</strong><br>Phone: <a href='tel:4694550953' target='_blank' rel='noopener'>469-455-0953</a><br>Email: <a href='mailto:jgonzalez@southlandce.com' target='_blank' rel='noopener'>jgonzalez@southlandce.com</a><br><a href='https://www.google.com/maps/dir/?api=1&destination=" + southlandLocation.lat + "," + southlandLocation.lng + "' target='_blank'>Get Directions</a>",
    });
  
    infoWindow.open(map, marker);
  
    marker.addListener("click", function () {
      infoWindow.open(map, marker);
    });
  };


  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();

        var recaptchaResponse = grecaptcha.getResponse();
        fetch('https://iiuv88jm32.execute-api.us-east-2.amazonaws.com/default/EmailCaptcha', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value,
                recaptcha: recaptchaResponse
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            // Handle success - e.g., display a success message
        })
        .catch((error) => {
            console.error('Error:', error);
            // Handle errors here, e.g., display an error message
        });
    });
});



 


