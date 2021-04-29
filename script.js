let prodLink = document.getElementById("products-page");
let contactLink = document.getElementById("contact-page");
let startLink = document.getElementById("start-page");
let container = document.getElementById("container");

window.onload = startPage;

prodLink.addEventListener("click", function () {
  fetch("http://localhost:3000/products")
    .then(res => res.json())
    .then(result => {
      // console.log(result);
      let printCategories = `<div><h1>Här är produktkategorierna</h1><br>
      <div id="categories"><ul>`
      for (product in result) {
        printCategories += `<li id="${result[product].productLine}">${result[product].productLine}</li>`
      }
      printCategories += `</ul></div></div>`
      container.innerHTML = printCategories;


      document.querySelector("#categories").addEventListener("click", function (e) {
        console.log("Klick på kategori ul");
        console.log(e.target.id);
        let productCategory = {
          category: e.target.id
        }

        fetch("http://localhost:3000/products", {
            method: "post",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify(productCategory)
          })
          .then(res => res.json())
          .then(result => {
            console.log(result);
            let printProducts = `<div><h1>Här är produkterna i kategorin ${e.target.id}</h1><br>`
            for (product in result) {
              printProducts += `<li id="${result[product].productName}">${result[product].productName}</li>`
            }
            printProducts += `</ul></div></div>`
            container.innerHTML = printProducts;
          })
      })
    })
})

contactLink.addEventListener("click", function () {
  fetch("http://localhost:3000/contacts/offices")
    .then(res => res.json())
    .then(offices => {
      console.log(offices);
      let printContacts = `<div><h1>Här är kontaktinformationen</h1><br>
      <div id="contacts">`

      for (office in offices) {

        printContacts += `<div id="${offices[office].officeCode}"><h2>${offices[office].city}</h2><div class="address"> ${offices[office].addressLine1}<br>${offices[office].addressLine2}</div>
        <div><h3>Anställda</h3></div>
        </div>`;

        container.innerHTML = printContacts;

        let officeCode = offices[office].officeCode;
        console.log(officeCode);
        let officeCodeObj = {
          officeCode: officeCode
        };
        console.log(officeCodeObj);


        fetch(`http://localhost:3000/contacts/${officeCode}`, {
            method: "post",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify(officeCodeObj)
          })
          .then(res => res.json())
          .then(employees => {
            for (employee in employees) {
              console.log(employees);
              if (employees[employee].reportsTo == null) {
                employees[employee].reportsTo = "Noone";
              }
              let officeDiv = document.getElementById(`${employees[employee].officeCode}`);
              officeDiv.insertAdjacentHTML("beforeend", `
              <div id="${employees[employee].employeeNumber}" class="employeeDiv">
              <li><span>Title: </span>${employees[employee].jobTitle}</li>
              <li><span>Namn:</span> ${employees[employee].firstName} ${employees[employee].lastName}</li> 
              <li><span>Ext: </span>${employees[employee].extension} </li>
              <li><span>Email:</span> ${employees[employee].email} </li>
              </div>`)
            }
          })
      }
    })
})

startLink.addEventListener("click", function () {
  startPage();
})

function startPage() {
  container.innerHTML = `<h1>Välkommen till Classic Models!</h1>`;
};