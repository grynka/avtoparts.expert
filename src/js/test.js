import modelId from './models_id.json';
import manufId from './manufacturer_id.json';
import axios from 'axios';
import assert from 'assert';
import numbers from './number.json';

const year = document.querySelector('select#year');
const manufacturer = document.querySelector('select#manufacturer');
const model = document.querySelector('select#model');
const type = document.querySelector('select#type');
const automobile = document.querySelector('button[data-action="garage"]');
const numberInput = document.querySelector('.garage_input');
const autoPlace = document.querySelector('.auto_by_number');
const numButton = document.querySelector('button[data-action="number"]');

let models = [];
let makers = 0;
let brand = [];
let numb = [];

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
            `<option value="${TYP_ID}">${TYP_CDS_TEXT}
     </option>`
        )
        .join('')
    );
    console.log(type);
  } catch (error) {
    console.error(error);
  }
}

async function getNumber() {
  try {
    const response = await axios.get(
      //`https://opendatabot.com/api/v3/tech-passport?apiKey=ke2CdK5YxBPn&number=${numberInput.value}`
      numbers
    );

    autoPlace.insertAdjacentHTML(
      'beforeend',
      numbers.data.data.items
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
    type.length = 0;
    models.push(model.value);
    console.log(models);
    getType(model.value);
    models.length = 0;
    console.log(models);
  })
);

manufacturer.addEventListener(
  'change',
  (event = () => {
    model.length = 0;
    brand.push(manufacturer.value);
    console.log(brand);
    getModel(manufacturer.value);
    brand.length = 0;
    console.log(brand);
  })
);

automobile.addEventListener('submit', adding);

function adding(event) {
  event.preventDefault();
  console.log(event.target);
  console.log(
    'Додано: ',
    manufacturer.textContent,
    model.textContent,
    type.textContent
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
