import modelId from './models_id.json';
import manufId from './manufacturer_id.json';


const year = document.querySelector("select#year");
const manufacturer = document.querySelector("select#manufacturer");
const model = document.querySelector("select#model");
const type = document.querySelector("select#type");

//console.log(Date.parse(modelId.map(modelId => modelId.MOD_PCON_START).sort()));

let models = [];




async function getModel(brand) {
  let requests = brand.map(brand =>
    fetch(`http://localhost:3002/brands/${brand}`)
      .then(response => (response.status === 200 ? response.json() : null))
   );
  
  
  const result = await Promise.all(requests);
  
  const modelsFlat = [];
  modelsFlat.push(...result.flat());
  models = modelsFlat.map(
    ({ MOD_ID, MOD_CDS_TEXT }) =>
      `<option value="${MOD_ID}">${MOD_CDS_TEXT}
      </option>`
  )
  .join('');
  
console.log(models);
  return  model.insertAdjacentHTML('beforeend', models);
}

const brand = [];



year.addEventListener(
  'change',
  (event = () => {
    console.log(
      
    )
    manufacturer.insertAdjacentHTML('beforeend', listManuf(manufId));   
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
    
    brand.length = 0;
    brand.push(manufacturer.value);
    //getUsers(brand);
    getModel(brand);
    model.insertAdjacentHTML('beforeend', listModels(models));

  })
);

function listModels(models) {
  console.log(models.flat());
  return models.flat()
  }

function listManuf(manufId) {
   return manufId
     .filter(manufId => manufId.MFA_PC_MFC === 1)
     .map(
       ({ MFA_BRAND, MFA_MFC_CODE, MFA_ID }) =>
         `<option value = "${MFA_ID}">${MFA_BRAND}</option>`
     )
     .join('');
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