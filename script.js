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
        var url = this.action;
        var formData = new FormData(this);
    
        fetch(url, {
          method: 'POST',
          body: formData,
          mode: 'no-cors' // 'cors' by default
        }).then(response => {
          console.log(response);
          alert('Form Submitted Successfully!');
          cloneForm.reset(); // Reset the form after successful submission
        }).catch(error => {
          console.error('Error:', error);
        });
      });
    });

    function openModal(projectId) {
      var projectCard = document.getElementById(projectId);
      document.getElementById('modalTitle').innerText = projectCard.querySelector('h3').innerText;
      document.getElementById('modalImage').src = projectCard.querySelector('img').src;
      document.getElementById('modalImage').alt = projectCard.querySelector('img').alt;
      document.getElementById('modalDescription').innerText = projectCard.querySelector('.long-description').innerText;
      modal.style.display = "block";
  }
    
  
    