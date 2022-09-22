import modelId from './models_id.json';
import manufId from './manufacturer_id.json';
import axios from 'axios';



const year = document.querySelector("select#year");
const manufacturer = document.querySelector("select#manufacturer");
const model = document.querySelector("select#model");
const type = document.querySelector("select#type");

//console.log(Date.parse(modelId.map(modelId => modelId.MOD_PCON_START).sort()));

let models = 0;
let makers = 0;
let brand;

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
   makers =  response.data.map (({ MFA_BRAND, MFA_MFC_CODE, MFA_ID }) =>
         `<option value = "${MFA_ID}">${MFA_BRAND}</option>`
     ).join();
    console.log(makers);
  //  return JSON.stringify(makers)
  } catch (error) {
    console.error(error);
  }
}

async function getModel(brand) {
  try {
    const response = await axios.get(
      `http://localhost:3002/brands/${brand}/${year.value * 100}`
    );
    console.log(response.data);
    models = response.data
      .map(
        ({ MOD_ID, MOD_CDS_TEXT }) =>
          `<option value="${MOD_ID}">${MOD_CDS_TEXT}
      </option>`
      )
      .join('');
    console.log(models);
    //  return JSON.stringify(makers)
  } catch (error) {
    console.error(error);
  }
}

async function getType(models) {
  try {
    const response = await axios.get(
      `http://localhost:3002/brands/${brand}/${year.value * 100}`
    );
    console.log(response.data);
    models = response.data
      .map(
        ({ MOD_ID, MOD_CDS_TEXT }) =>
          `<option value="${MOD_ID}">${MOD_CDS_TEXT}
      </option>`
      )
      .join('');
    console.log(models);
    //  return JSON.stringify(makers)
  } catch (error) {
    console.error(error);
  }
}



async function getModela(brand) {
  let requests = brand.map(brand =>
    fetch(`http://localhost:3002/brands/${brand}/${year.value}`)
      .then(response => (response.status === 200 ? response.json() : null))
    
   );
    
  const result = await Promise.all(requests);
  
console.log(response.data);

  const modelsFlat = [];
  modelsFlat.push(
    ...result.flat()
  );

  models = modelsFlat
    .map(
      ({ MOD_ID, MOD_CDS_TEXT }) =>
        `<option value="${MOD_ID}">${MOD_CDS_TEXT}
      </option>`
    )
    .join('');
  
//console.table(modelsFlat);
  return  model.insertAdjacentHTML('beforeend', models);
}


year.addEventListener(
  'change',
  (event = () => {
    getMakers();
    manufacturer.insertAdjacentHTML('beforeend', makers);
  })
);

model.addEventListener(
  "change",
  (event = () => {
    console.log('modelsId');
    
  })
);

manufacturer.addEventListener(
  'change',
  (event = () => {
    
    brand = [];
    console.log(brand);
    brand.push(manufacturer.value);
    console.log(brand)
    getModel(brand);
    model.insertAdjacentHTML('beforeend', models);

  })
);

function listModels(models) {
  getModel(brand);
  console.log(models);
  return models
  }

function listManuf() {

    
      manufacturer.append(
        ...make.map(label => {
          const option = document.createElement('option');
          option.value = label;
          option.textContent = label;
          return option;
        })
      );
    
}

function listModel(modelId) {

  console.log(
    modelId
      .filter(modelId => modelId.MOD_MFA_ID == manufacturer.value)
      .filter(modelId => modelId.MOD_PCON_START >= year.value)
      .join('').length
  );
    return modelId
      .filter(modelId => modelId.MOD_MFA_ID == manufacturer.value)
      .filter(modelId => modelId.MOD_PCON_START !== 0, modelId.MOD_PCON_START <= year.value <= modelId.MOD_PCON_END)
      .map(
        ({ MOD_ID, MOD_CDS_ID }) =>
          `<option value="${MOD_ID}">${MOD_CDS_ID}
      </option>`
      )
      .join('');
}

function listType(modelBase) {
  return modelBase
    .map(
      ({ id, matchcode }) =>
        `<option value="${id}">${matchcode}
      </optiom>`
    )
    .join('');
}