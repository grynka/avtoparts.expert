const { url } = require('inspector');
const { URLSearchParams } = require('url');

const brandAuto = document.querySelector('.brand-auto');
const imgPatch = ('src/images/')

console.log(brandAuto)
cors = require('cors');

fetch('http://localhost:3002/makes')
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
  .then(data => {
    console.log();

        
   brandAuto.insertAdjacentHTML(
        'beforeend',
        data.map(
            ({ id, description }) =>
              `<li class="brand" data-model="${id}"><a href="http://localhost:3002/makes/${id}"><img src=\"/src/images/${description}.png\">${description}</a>
        </li>`)
          .join('')
      );
  })
  .catch(error => {
    // Error handling
  });



  


  brandAuto.addEventListener('click', (event) => {
        console.log(event.target.textContent);
      
  })

  function imgBrand() {
if (brandplace.textContent === AUDI) {
    brandPlace.style.background = "url(..\images\AUDI.png)"
}
  }

 // const brandPlace = document.querySelector('.brand');
//  imgBrand();

const li = document.createElement('li');
const a = document.createElement('a');
a.style.backgroundImage = "url('./images/ACURA.png')";
li.appendChild(a);
brandAuto.append(li);