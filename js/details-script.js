const URLParams = new URLSearchParams(window.location.search);
const selectedId = URLParams.get("id");
console.log("SELECTED ID: ", selectedId);

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0M2MxNWY4MWI0MjAwMTM5YjI4NjMiLCJpYXQiOjE2NzkwNDc3MDIsImV4cCI6MTY4MDI1NzMwMn0.quLJ-ccRJGD441gtb3HbHZXhccFAnIa2wT4svrwY0YU';

window.onload = async () => {
    const row = document.getElementById("selected-product");
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/` + selectedId, {
            headers: {
                Authorization: "Bearer " + API_KEY
            }
        });
        const selectedProudct = await response.json();

        console.log(selectedProudct);

        const col = document.createElement("div")
            col.className = "col"
            col.innerHTML = `
            <div class="card mb-4 shadow-sm" >
                <img src="${selectedProudct.imageUrl}" alt="Picture" id="img-card-${selectedProudct._id}">
                <div class="card-body">
                    <h5 class="card-title">${selectedProudct.brand} ${selectedProudct.name}</h5>
                    <p class="card-text">${selectedProudct.description}</p>
                    <p class="card-text">Price: ${selectedProudct.price}€</p>
                </div>
            </div>
            `
            row.appendChild(col);


    } catch (error) {
        console.log(error);
    }
}

