
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

 const form = document.getElementById('contact-form');
const submitButton = document.getElementById('submit-button');

async function onSubmit(event) {
  event.preventDefault();

  const recaptchaResponse = grecaptcha.getResponse();
  if (recaptchaResponse.length === 0) {
    alert('Please verify that you are not a robot.');
    return;
  }

  const formData = new FormData(form);
  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });
  formObject['g-recaptcha-response'] = recaptchaResponse;

  try {
    const response = await fetch('https://8mkwrmev0m.execute-api.us-east-2.amazonaws.com/SouthlandForm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formObject),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    if (result.success) {
      alert('Message sent successfully!');
      form.reset();
      grecaptcha.reset();
    } else {
      alert('Failed to send message. Please try again.');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('An error occurred while sending the message. Please try again later.');
  } finally {
    enableSubmitButton();  // Ensure the button is re-enabled even if an error occurs
  }
}

function enableSubmitButton() {
  submitButton.disabled = false;
}

function disableSubmitButton() {
  submitButton.disabled = true;
}

document.addEventListener('DOMContentLoaded', () => {
  form.addEventListener('submit', onSubmit);

  // Optional: Reset the reCAPTCHA when the form is reset
  form.addEventListener('reset', function () {
    grecaptcha.reset();
    disableSubmitButton();
  });

  disableSubmitButton();
});
