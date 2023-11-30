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


          var form;
          var button;
      
          window.onload = function () {
              form = document.getElementById('contact-form');
              button = document.getElementById('submit-button');
              const $recaptcha = document.querySelector('#g-recaptcha-response');
              if ($recaptcha) {
                  $recaptcha.setAttribute('required', 'required');
              }
          }
      
          function submitContactForm(event){
      
              var data = {};
              for (var i = 0, ii = form.length; i < ii; ++i) {
                  var input = form[i];
                  if (input.name) {
                      data[input.name] = input.value;
                  }
              }
              
      
              axios({
                  method: 'post',
                  url: 'https://il775iibknmfaumwimy4viw3kq0uxwsp.lambda-url.us-east-2.on.aws/',
                  headers: ['Content-type', 'application/json; charset=UTF-8'],
                  data: data
              }).then(response => {
                  if(response.data.success){
                      let prompt = document.getElementById('message-prompt');
                      prompt.classList.remove("collapse");
                      prompt.classList.add("visible");
                      form.reset();
                  }
              });
              
          };


          function ccb(response) {
          document.getElementById("contact-submit").disabled = false;
          }
 


