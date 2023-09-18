
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

    document.addEventListener('DOMContentLoaded', (event) => {
      var form = document.getElementById('contact-form');
    
      // Removes existing 'submit' event listeners
      var cloneForm = form.cloneNode(true);
      form.parentNode.replaceChild(cloneForm, form);
    
      // Adds new 'submit' event listener
      cloneForm.addEventListener('submit', function(e) {
        e.preventDefault();
    
        var recaptchaResponse = document.querySelector('#g-recaptcha-response').value;
    
        // Verify the reCAPTCHA token
        fetch('https://teal-mermaid-ac1241.netlify.app/.netlify/functions/recaptcha-verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: recaptchaResponse }),
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // reCAPTCHA verification succeeded, proceed with form submission
            var formData = new FormData(cloneForm);
            fetch(cloneForm.action, {
              method: 'POST',
              body: formData,
              mode: 'no-cors' // 'cors' by default
            })
            .then(response => {
              console.log(response);
              alert('Form Submitted Successfully!');
              cloneForm.reset(); // Reset the form after successful submission
            })
            .catch(error => {
              console.error('Error:', error);
            });
          } else {
            // reCAPTCHA verification failed, show an error message
            console.error('reCAPTCHA verification failed', data.error);
            alert('reCAPTCHA verification failed. Please try again.');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
      });
    });
  
    