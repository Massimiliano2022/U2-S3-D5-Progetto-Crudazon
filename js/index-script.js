const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0M2MxNWY4MWI0MjAwMTM5YjI4NjMiLCJpYXQiOjE2NzkwNDc3MDIsImV4cCI6MTY4MDI1NzMwMn0.quLJ-ccRJGD441gtb3HbHZXhccFAnIa2wT4svrwY0YU';

window.onload = async () => {

    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/`, {
            headers: {
                Authorization: "Bearer " + API_KEY
            }
        });
        const product = await response.json();

        //console.log(product);

        showProduct(product);

    } catch (error) {
        console.log(error);
    }
}


function showProduct(product) {

    if (product) {

        let row = document.querySelector('.container-fluid .row');
        row.innerHTML = '';

        for (let i = 0; i < product.length; i++) {

            //console.log(product[i]);

            console.log(product[i]._id);

            const col = document.createElement("div")
            col.className = "col-md-4"
            col.innerHTML = `
            <div class="card mb-4 shadow-sm" >
                <img src="${product[i].imageUrl}" alt="Picture" id="img-card-${product[i]._id}">
                <div class="card-body">
                    <h5 class="card-title">${product[i].brand} ${product[i].name}</h5>
                    <p class="card-text">${product[i].description}</p>
                    <p class="card-text">Price: ${product[i].price}€</p>
                    <button type="button" class="btn btn-primary" id="btnModify-${product[i]._id}">Modify</button>
                    <button type="button" class="btn btn-secondary" id="btnDetails-${product[i]._id}">See product details</button>
                </div>
            </div>
            `
            const btnModify =col.querySelector(`#btnModify-${product[i]._id}`)
            btnModify.addEventListener('click', () => {
                const id = product[i]._id;
                window.location.assign(`back-office.html?id=${id}`);
            });

            const btnDetails =col.querySelector(`#btnDetails-${product[i]._id}`)
            btnDetails.addEventListener('click', () => {
                const id = product[i]._id;
                window.location.assign(`details.html?id=${id}`);
            });

            row.appendChild(col);
        }
    }

}