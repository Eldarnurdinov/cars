// //CRUD (REST API)
// //Create - POST
// // Read -GET
// // Update - PUT or PATCH
// //Delete - DELETE
// // HTTP methods (GET, POST, PUT,DELETE, PATCH)
// // fetch (url, options) options = {method: "POST"}

const url = "https://6611785c95fdb62f24ed3d8e.mockapi.io/api/v1/cars"
//DOM
const tbody = document.getElementById("tbody")
const total = document.querySelector("#total")
const form = document.querySelector("form")
let allTotal = 0

form.onsubmit = (event) => {
    event.preventDefault()
    const formData = event.target // <form></form>
    const car = {
        model: formData.model.value,
        country: formData.country.value,
        year: formData.year.value,
        price: formData.price.value,
        phone: formData.phone.value
    }
    console.log(car, '---car---');
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(car)
    })
        .then(res => res.json())
        .then(d => {
            console.log(d);
            fetchCars()
        })



}

function fetchCars() {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data, '---data---');
            // const exp = data.map(car => car.price)
            // allTotal = exp.reduce((t, money) => { return t + +money },0 )
            renderTBody(data)
            // total.innerText = `TOTAL: ${allTotal} p`
        })
}
fetchCars()

function renderTBody(arr) {
    tbody.innerHTML = ''
    for (const car of arr) {
        tbody.innerHTML += `
        <tr>
           <th scope="row">${car.id}</th>
           <td>${car.model}</td>
           <td>${car.country}</td>
           <td>${car.year}</td>
           <td>${car.price} p </td>
           <td>${car.phone}</td>
           <td>
             <div class = "d-flex gap-2">
               <button onclick="editCar(${car.id})" class="btn btn-warning" >edit</button>
               <button onclick="delCar(${car.id})" class="btn btn-danger">delete</button>
             </div>
           </td>
        </tr>`
    }
}

function delCar(carID) {
    fetch(url + `/${carID}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then(del => fetchCars())
}

function editCar(carID) {
    fetch(url + `/${carID}`)
        .then(res => res.json())
        .then(car => {
            // Populate form fields with car data
            form.model.value = car.model;
            form.country.value = car.country;
            form.year.value = car.year;
            form.price.value = car.price;
            form.phone.value = car.phone;

            // Update form submission to handle editing
            form.onsubmit = (event) => {
                event.preventDefault();
                const formData = event.target;
                const updatedCar = {
                    model: formData.model.value,
                    country: formData.country.value,
                    year: formData.year.value,
                    price: formData.price.value,
                    phone: formData.phone.value
                };
                // Send PUT or PATCH request to update car details
                fetch(url + `/${carID}`, {
                    method: 'PUT', // or 'PATCH'
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedCar)
                })
                .then(res => res.json())
                .then(updated => {
                    // Fetch updated cars after editing
                    fetchCars();
                    form.reset();
                });
            };
        });
}




