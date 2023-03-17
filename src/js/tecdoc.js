const { url } = require('inspector');
const { URLSearchParams } = require('url');

const brandAuto = document.querySelector('.brand-auto');
const imgPatch = ('src/images/')
const make = document.querySelector('a')
const MODELS = document.querySelector('.models');


fetch('https://avtoparts.onrender.com/api/autodb/manuf')
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
              `<li class="brand" data-model="${id}"><a https://avtoparts.onrender.com/api/autodb/mod/${id}" style="background-image: url(./images/${description}.png)"><img src=\"./images/${description}.png\"></a></li>`)
          .join('')
      );
  })
  .catch(error => {
    // Error handling
  });

function getModel(makes) {
  fetch(`https://avtoparts.onrender.com/api/autodb/mod/${makes}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
  .then(data => {
    MODELS.innerHTML =
      data.map(
          ({ id, name, constructioninterval}) =>
            `<li class="models" data-model="${id}">Модель: ${name}, Роки випуску: ${constructioninterval}
      </li>`)
        .join('')
  })
  .catch(error => {
    // Error handling
  });
}


  


 brandAuto.addEventListener('click', (event) => {
event.preventDefault();
 if (event.target.tagName === "LI")

  console.log(event.target.dataset.model);
 getModel(event.target.dataset.model)
 })

 
 // const brandPlace = document.querySelector('.brand');
//  imgBrand();

const li = document.createElement('li');
const a = document.createElement('a');
a.style.backgroundImage = `url("./images/ACURA.png")`;
li.appendChild(a);
//brandAuto.append(li);
