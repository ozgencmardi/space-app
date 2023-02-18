const apiKeyNasa = "5nSyRV6dlCqhWgRP72cVEBRioUuHO57peU3dJO5O";
const queryURLNasa = `https://api.nasa.gov/planetary/apod?api_key=${apiKeyNasa}`;

$.ajax({
    url: queryURLNasa,
    method: "GET"
  }).then(function(response) {
    //console.log("Title:", response.title);
    //console.log("Description:", response.explanation);
    //console.log("Image URL:", response.url);
    //console.log(`-------------------------------------------------`)
    $("#pod-title").text(response.title);
    $("#pod-description").text(response.explanation);
    $("#pod-image-url").attr("src", response.url);
  });



  const queryURLNasaPhoto = `https://images-api.nasa.gov/search?q=mars`;

  $.ajax({
    url: queryURLNasaPhoto,
    method: "GET"
  }).then(function(response) {
    let images = response.collection.items;
  
    $("#today-gallery").empty();

    for(let i = 0; i < 8; i++) {
      let randomIndex = Math.floor(Math.random() * images.length);
      let imageURL = images[randomIndex].links[0].href;
      let desc = images[randomIndex].data[0].description;
      if (desc.length > 100) {
      desc = desc.substring(0, 100) + "...";
      }
      let title = images[randomIndex].data[0].title;
      if (title.length > 15) {
        title = title.substring(0, 15) + "...";
        }

      let galleryHTML = `
        <div class="col-md-3 col-lg-3 col-sm-12">
          <img src="${imageURL}" alt="" class="img-fluid border-color gallery-img mt-3">
          <h3 class="mt-3">${title}</h3>
          <p class="mt-3">${desc}</p>
        </div>
      `;
  
      $("#today-gallery").append(galleryHTML);
    }
  });
  



/*
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://news-space.p.rapidapi.com/",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "e59f1aabebmsh9d2cde2ad55bd9ap14a2e6jsna6c5035bd8dd",
		"X-RapidAPI-Host": "news-space.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});

$.ajax(settings).done(function (response) {
    const articles = response;
    for (let i = 0; i < 10; i++) {
      const title = articles[i].title;
      const url = articles[i].url;
      console.log(title);
      console.log(url);
    }
});

*/


const contactForm = document.getElementById('contact-form');
const thankYouMessage = document.getElementById('thank-you');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value,
  };

  // Save data to local storage
  localStorage.setItem('contactFormData', JSON.stringify(formData));

  const thankYouMessageText = `Thank you for your message, ${formData.name}! We will get back to you as soon as possible.`;
  const thankYouElement = document.createElement('p');
  thankYouElement.textContent = thankYouMessageText;
  thankYouMessage.replaceChild(thankYouElement, thankYouMessage.children[0]);

  contactForm.style.display = 'none';
  thankYouMessage.style.display = 'block';
});