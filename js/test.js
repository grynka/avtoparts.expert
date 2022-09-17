
const years = document.querySelector("select#year");
const manufacturer = document.querySelector("select#manufacturer");
const model = document.querySelector("select#model");
const type = document.querySelector("select#type");

const manufacturersOption = document.createElement("option");

years.addEventListener(
  "change",
  (event = () => {
    console.log("click");
    manufacturer.innerHTML = "<option>ACURA</option><option>BMW</option>";
  })
);

manufacturer.addEventListener(
  "change",
  (event = () => {
    console.log("click");
    model.innerHTML = "<option>MDX</option><option>3-series</option>";
  })
);

model.addEventListener(
  "change",
  (event = () => {
    console.log("click");
    type.innerHTML = "<option>3.5L SL</option>";
  })
);
