import modelId from './models_id.json';
import manufId from './manufacturer_id.json'

const year = document.querySelector("select#year");
const manufacturer = document.querySelector("select#manufacturer");
const model = document.querySelector("select#model");
const type = document.querySelector("select#type");

//console.log(Date.parse(modelId.map(modelId => modelId.MOD_PCON_START).sort()));

year.addEventListener(
  'change',
  (event = () => {
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
    console.log(manufacturer.value);
    model.insertAdjacentHTML('beforeend', listModel(modelId));
  })
);

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