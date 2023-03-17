import axios from 'axios';

const year = document.querySelector('select#year');
const manufacturer = document.querySelector('select#manufacturer');
const model = document.querySelector('select#model');
//const type = document.querySelector('select#type');
const engine = document.querySelector('select#engine');
const automobile = document.querySelector('button[data-action="garage"]');
const numberInput = document.querySelector('.garage_input');
const autoPlace = document.querySelector('.auto_by_number');
const numButton = document.querySelector('button[data-action="number"]');
const vinInput = document.querySelector('.vin_input');
const vinButton = document.querySelector('button[data-action="vin"]');


let models = [];
let makers = 0;
let brand = [];
let numb = [];
let typ = [];

const makes = {
  method: 'GET',
  url: 'https://car-data.p.rapidapi.com/cars/makes',
  headers: {
    'X-RapidAPI-Key': '8b91d1651fmsh040a736b1a190c6p1223b4jsne6173b9df36c',
    'X-RapidAPI-Host': 'car-data.p.rapidapi.com',
  },
};

async function getMakers() {
  try {
    const response = await axios.get('https://avtoparts.onrender.com/api/autodb/manuf');
    manufacturer.insertAdjacentHTML(
      'beforeend',
      response.data
        .map(
          ({ id, description }) =>
            `<option value = "${id}">${description}</option>`
        )
        .join()
    );
    console.log(makers);
  } catch (error) {
    console.error(error);
  }
}

async function getModels(brand) {
  console.log(brand, year.value);
  try {
    const response = await axios.get(
      `https://avtoparts.onrender.com/api/autodb/mod/${brand}`
    );
    console.log(response);
    model.insertAdjacentHTML(
      'beforeend',
      response.data
        .map(
          ({id, name, constructioninterval }) =>
            `<option value="${id}">${name}, ${constructioninterval }
      </option>`
        )
        .join('')
    );
  } catch (error) {
    console.error(error);
  }
}

async function getEngines(models) {
  try {
    const response = await axios.get(
      `http://localhost:3002/types/${models}`
    );
    console.log(response);
    engine.insertAdjacentHTML(
      'beforeend',
      response.data
        .map(
          ({ id, name }) =>
            `<option name="${id}" value="${id}">${name}
     </option>`
        )
        .join('')
    );
    console.log(models);
  } catch (error) {
    console.error(error);
  }
}

async function getTypes(engine) {
  try {
    const response = await axios.get(
      `http://localhost:3002/engine/${engine}`
    );
    console.log(response);
     
    console.log(response.data.id);

    return typ.push(response.data.id)
  } catch (error) {
    console.error(error);
  }
}



async function getBrands() {
  try {
    const response = await axios.get('http://localhost:3002/brands/');
    manufacturer.insertAdjacentHTML(
      'beforeend',
      response.data
        .map(
          ({ MFA_BRAND, MFA_MFC_CODE, MFA_ID }) =>
            `<option value = "${MFA_ID}">${MFA_BRAND}</option>`
        )
        .join()
    );
    console.log(makers);
  } catch (error) {
    console.error(error);
  }
}

async function getModel(brand) {
  console.log(brand, year.value);
  try {
    const response = await axios.get(
      `http://localhost:3002/brands/${brand}/${year.value}`
    );
    console.log(response);
    model.insertAdjacentHTML(
      'beforeend',
      response.data
        .map(
          ({ MOD_ID, MOD_CDS_TEXT }) =>
            `<option value="${MOD_ID}">${MOD_CDS_TEXT}
      </option>`
        )
        .join('')
    );
  } catch (error) {
    console.error(error);
  }
}

async function getType(models) {
  try {
    const response = await axios.get(
      `http://localhost:3002/types/${models}/${year.value}`
    );
    console.log(response);
    type.insertAdjacentHTML(
      'beforeend',
      response.data
        .map(
          ({ TYP_ID, TYP_CDS_TEXT }) =>
            `<option name="${TYP_CDS_TEXT}" value="${TYP_ID}">${TYP_CDS_TEXT}
     </option>`
        )
        .join('')
    );
    console.log(type);
  } catch (error) {
    console.error(error);
  }
}

async function getVin() {
  try {
    const response = await axios.get(
      `https://baza-gai.com.ua/vin/${vinInput.value}`,
      {
        headers: {
          Accept: 'application/json',
          'X-Api-Key': 'a382ea1e29e050d098178731e9e9134e',
        },
      }
    );

    console.log(
      response.data.vendor,
      response.data.model,
      response.data.model_year,
      response.data.vin
    );
  autoPlace.insertAdjacentHTML(
    'beforeend',
              `<p> ${response.data.vendor}, ${response.data.model},  ${response.data.model_year}, ${response.data.vin}</p>`
      )
  
  } catch (error) {
    console.error(error);
  }
}

async function getNumber() {
  try {
    const response = await axios.get(
      `https://opendatabot.com/api/v3/tech-passport?apiKey=ke2CdK5YxBPn&number=${numberInput.value}`
    );
    console.log(response);
    autoPlace.insertAdjacentHTML(
      'beforeend',
      response.data.data.items
        .map(
          ({ brand, model, makeYear, vin }) =>
            `<p> ${brand}, ${model},  ${makeYear},  ${vin}
     </p>`
        )
        .join('')
    );
    console.log(numberInput);
  } catch (error) {
    console.error(error);
  }
}

year.addEventListener(
  'change',
  (event = () => {
    manufacturer.length = 0;
    getMakers();
  })
);

model.addEventListener(
  'change',
  (event = () => {
    console.log(model.value);
    engine.length = 0;
    models.push(model.value);
    console.log(models);
    getEngines(model.value);
    engine.length = 0;
    console.log(models);
  })
);

manufacturer.addEventListener(
  'change',
  (event = () => {
    model.length = 0;
    brand.push(manufacturer.value);
    console.log(brand.selected);
    getModels(manufacturer.value);
    brand.length = 0;
    console.log(brand);
  })
);

engine.addEventListener(
  'change',
  (event = () => {
    console.log(engine.value);
   // engine.length = 0;
  //  models.push(engine.value);
    console.log(engine);
    getTypes(engine.value);
    //type.length = 0;
    console.log(engine);
  })
);

automobile.addEventListener('click', adding);

function adding(event) {
  event.preventDefault();
  console.log(event.target);
  console.log(
    'Додано: ',
    manufacturer.value,
    model.value,
    engine.value
  );
}

numButton.addEventListener('click', check);

function check(event) {
  event.preventDefault();
  numb = numberInput.value;
  //numb.push(numberInput.value);
  console.log(numb);
  getNumber(numberInput.value);
}

vinButton.addEventListener('click', search);

function search(event) {
  event.preventDefault();
    //numb.push(numberInput.value);
  console.log(vinInput.value);
  getVin(vinInput.value);
}

const merc  = {
  "data": {
    "status": "ok",
    "data": {
      "count": 1,
      "items": [
        {
          "brand": "MERCEDES-BENZ",
          "model": "SPRINTER 519 CDI",
          "makeYear": "2013",
          "vin": "WDB9061551N555296",
          "kind": "ВАНТАЖНИЙ",
          "fuel": "ДИЗЕЛЬНЕ ПАЛИВО",
          "color": "БІЛИЙ",
          "lastDate": "2016-04-22 00:00:00",
          "capacity": 2987,
          "wanted": 0,
          "operCode": 100,
          "number": "АА7015КН"
        }
      ]
    },
    "forDevelopers": "https://t.me/joinchat/nyOvz2if_pkyOGU1"
  },
  "status": 200,
  "statusText": "",
  "headers": {
    "content-type": "application/json; charset=utf-8"
  },
  "config": {
    "transitional": {
      "silentJSONParsing": true,
      "forcedJSONParsing": true,
      "clarifyTimeoutError": false
    },
    "transformRequest": [null],
    "transformResponse": [null],
    "timeout": 0,
    "xsrfCookieName": "XSRF-TOKEN",
    "xsrfHeaderName": "X-XSRF-TOKEN",
    "maxContentLength": -1,
    "maxBodyLength": -1,
    "env": {
      "FormData": null
    },
    "headers": {
      "Accept": "application/json, text/plain, */*"
    },
    "method": "get",
    "url": "https://opendatabot.com/api/v3/tech-passport?apiKey=ke2CdK5YxBPn&number=AA7015KH"
  },
  "request": {}
}
