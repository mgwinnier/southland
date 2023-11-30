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
  }


  function submitContactForm(event) {
    event.preventDefault(); // Prevent default form submission

    var form = document.getElementById('contact-form');
    var recaptchaResponse = grecaptcha.getResponse();

    // Collect form data
    var formData = {
      name: form['name'].value,
      email: form['email'].value,
      message: form['message'].value,
      recaptcha: recaptchaResponse
    };

    // Lambda function endpoint
    var endpoint = 'https://b5xerj8v2h.execute-api.us-east-2.amazonaws.com/dev';

    // Make a POST request to your serverless function
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      // Handle success - maybe display a success message
      // Reset the form and reCAPTCHA
      form.reset();
      grecaptcha.reset();
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle errors here, such as displaying an error message
    });
  }


 


