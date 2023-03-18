const URLParams = new URLSearchParams(window.location.search);
const selectedId = URLParams.get("id");
console.log("SELECTED ID: ", selectedId);

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0M2MxNWY4MWI0MjAwMTM5YjI4NjMiLCJpYXQiOjE2NzkwNDc3MDIsImV4cCI6MTY4MDI1NzMwMn0.quLJ-ccRJGD441gtb3HbHZXhccFAnIa2wT4svrwY0YU';

window.onload = async () => {

    if (selectedId) {

        const divForm = document.getElementById("divForm");
        divForm.classList.add("d-none");
        const row = document.getElementById("selected-product");
        row.innerHTML = "";
        try {
            const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/` + selectedId, {
                headers: {
                    Authorization: "Bearer " + API_KEY
                }
            });
            const selectedProduct = await response.json();

            //console.log(selectedProduct);

            const col = document.createElement("div")
            col.className = "col"
            col.innerHTML = `
            <div class="card mb-4 shadow-sm" >
                <img src="${selectedProduct.imageUrl}" alt="Picture" id="img-card-${selectedProduct._id}">
                <div class="card-body">
                    <h5 class="card-title">${selectedProduct.brand} ${selectedProduct.name}</h5>
                    <p class="card-text">${selectedProduct.description}</p>
                    <p class="card-text">Price: ${selectedProduct.price}€</p>
                    <button type="button" class="btn btn-primary" id="btnEdit-${selectedProduct._id}">Edit</button>
                    <button type="button" class="btn btn-secondary" id="btnDetails-${selectedProduct._id}">Delete</button>
                </div>
            </div>
            `
            row.appendChild(col);

            const btnEdit = col.querySelector(`#btnEdit-${selectedProduct._id}`)
            btnEdit.addEventListener('click', () => {
                editProduct(selectedProduct);
            });

            const btnDelete = col.querySelector(`#btnDetails-${selectedProduct._id}`)
            btnDelete.addEventListener('click', async () => {
                deleteProduct(selectedProduct);
            });

        } catch (error) {
            console.log(error);
        }
    } else {
        const divCard = document.getElementById("selected-product");
        divCard.classList.add("d-none");

        const btnAddProduct = document.querySelector("#btn-add-product")
        btnAddProduct.addEventListener('click', async () => {
            addNewProduct();
        });

    }
}

function editProduct(selectedProduct) {

    showProductForm(selectedProduct);

}

function showProductForm(selectedProduct) {

    let container = document.getElementById('main-container');
    container.innerHTML = `
    <form id="create-product-form">
      <div class="mb-3">
        <label for="name" class="form-label">Name:</label>
        <input type="input" class="form-control" id="name">
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description:</label>
        <input type="input" class="form-control" id="description">
      </div>
      <div class="mb-3">
        <label for="brand" class="form-label">Brand:</label>
        <input type="input" class="form-control" id="brand">
      </div>
      <div class="mb-3">
        <label for="imageUrl" class="form-label">Image URL:</label>
        <input type="input" class="form-control" id="imageUrl">
      </div>
      <div class="mb-3">
        <label for="price" class="form-label">Price:</label>
        <input type="number" class="form-control" id="price">
      </div>
      <button type="button" class="btn btn-primary" id="btnSaveEdit-${selectedProduct._id}" >Save edit</button>
    </form>
  `;

    const nameInput = document.querySelector('#name');
    const descriptionInput = document.querySelector('#description');
    const brandInput = document.querySelector('#brand');
    const imageUrlInput = document.querySelector('#imageUrl');
    const priceInput = document.querySelector('#price');

    nameInput.value = selectedProduct.name;
    descriptionInput.value = selectedProduct.description;
    brandInput.value = selectedProduct.brand;
    imageUrlInput.value = selectedProduct.imageUrl;
    priceInput.value = selectedProduct.price;

    const btnSaveEdit = container.querySelector(`#btnSaveEdit-${selectedProduct._id}`)
    btnSaveEdit.addEventListener('click', () => {
        saveEdit(selectedProduct);
    });

}

async function saveEdit(selectedProduct) {

    //console.log("SALVA L'OGGETTO CON ID :"+selectedProduct._id);
    const nameInput = document.querySelector('#name');
    const descriptionInput = document.querySelector('#description');
    const brandInput = document.querySelector('#brand');
    const imageUrlInput = document.querySelector('#imageUrl');
    const priceInput = document.querySelector('#price');

    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${selectedProduct._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + API_KEY
            },
            body: JSON.stringify({ name: nameInput.value, description: descriptionInput.value, brand: brandInput.value, imageUrl: imageUrlInput.value, price: priceInput.value })
        });
        const data = await response.json();
        console.log(data);
        alert("Hai modificato il prodotto.");
        window.location.assign("./index.html");
    } catch (error) {
        console.log(error);
    }

}

async function deleteProduct(selectedProduct) {
    const hasAccepted = confirm("Sei sicuro di voler elimilare questo prodotto?");
    if (hasAccepted) {
        try {
            console.log("DELETE");
            const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${selectedProduct._id}`, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + API_KEY
                }
            });
            alert("Hai eliminato il prodotto.");
            window.location.assign("./index.html")
        } catch (error) {
            console.log(error);
        }

    }
}

async function addNewProduct(){

    console.log("AGGIUNGI UN NUOVO PRODOTTO");

    const nameInput = document.querySelector('#name');
    const descriptionInput = document.querySelector('#description');
    const brandInput = document.querySelector('#brand');
    const imageUrlInput = document.querySelector('#imageUrl');
    const priceInput = document.querySelector('#price');

    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + API_KEY
            },
            body: JSON.stringify({ name: nameInput.value, description: descriptionInput.value, brand: brandInput.value, imageUrl: imageUrlInput.value, price: priceInput.value })
        });
        const data = await response.json();
        console.log(data);
        alert("Hai inserito il nuovo prodotto.");
        window.location.assign("./index.html");
    } catch (error) {
        console.log(error);
    }


}