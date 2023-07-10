function loadProducts() {
    // Load products from local storage:
    const allProducts = getProductsFromLocalStorage();
    // Display the products:
    displayProducts(allProducts);
}

loadProducts();

function addProduct() {
    // Validate the input fields:
    const isValid = validate();
    if (!isValid) {
        return;
    }

    // Create a product object from the input values:
    const product = getProductObject();

    // Get all products from local storage:
    const allProducts = getProductsFromLocalStorage();

    // Add the new product to the array:
    allProducts.push(product);

    // Save the updated products array to local storage:
    saveProductsToLocalStorage(allProducts);

    // Display the updated list of products:
    displayProducts(allProducts);

    // Clear the input form:
    clearForm();
}

function getProductObject() {
    // Create a product object with values from input fields:
    const product = {
        productName: nameBox.value,
        productPrice: +priceBox.value,
        productCategory: categoryBox.value,
        productImage: pictureBox.value
    };
    return product;
}

function getProductsFromLocalStorage() {
    // Retrieve products from local storage:
    const str = localStorage.getItem("products");
    const products = (str === null) ? [] : JSON.parse(str);
    return products;
}

function saveProductsToLocalStorage(allProducts) {
    // Save products to local storage:
    const str = JSON.stringify(allProducts);
    localStorage.setItem("products", str);
}

function displayProducts(allProducts) {
    // Clear the table body:
    tBody.innerHTML = "";

    // Loop through all products and create rows for each product:
    for (const product of allProducts) {
        const row = `
        <tr>
            <td>${product.productName}</td>
            <td>${product.productPrice}</td>
            <td>${product.productCategory}</td>
            <td><img src="${product.productImage}" width="100px" height="100px"></td>
            <td><button type="button" class="btn btn-primary" onclick="deleteProduct(this)">Delete</button></td>
        </tr>
        `;
        // Append the row to the table body:
        tBody.innerHTML += row;
    }
}

function validate() {
    // Get the values from input fields:
    const productName = nameBox.value;
    const productPrice = +priceBox.value;
    const productCategory = categoryBox.value;
    const productImage = pictureBox.value;

    // Clear input background colors:
    clearInputBackgroundColors();

    // Check for missing or invalid input values:
    if (productName === "") {
        swal("Error!", "Missing product name!", "error");
        setInvalidInputBackground(nameBox);
        return false;
    }

    if (productPrice === 0) {
        swal("Error!", "Missing product price!", "error");
        setInvalidInputBackground(priceBox);
        return false;
    }

    if (productPrice < 0) {
        swal("Error!", "Invalid price!", "error");
        setInvalidInputBackground(priceBox);
        return false;
    }

    if (productCategory === "") {
        swal("Error!", "Missing product category!", "error");
        setInvalidInputBackground(categoryBox);
        return false;
    }

    if (productImage === "") {
        swal("Error!", "Missing product image!", "error");
        setInvalidInputBackground(pictureBox);
        return false;
    }

    return true;
}

function clearForm() {
    // Clear the input fields and set focus to nameBox:
    nameBox.value = "";
    priceBox.value = "";
    categoryBox.value = "";
    pictureBox.value = "";
    nameBox.focus();
}

function deleteProduct(button) {
    // Get the index of the product to be deleted:
    const index = button.id;
    // Get all products from local storage:
    const allProducts = getProductsFromLocalStorage();
    // Remove the product from the array:
    allProducts.splice(index, 1);
    // Display the updated list of products:
    displayProducts(allProducts);
    // Save the updated products array to local storage:
    saveProductsToLocalStorage(allProducts);
}

function clearInputBackgroundColors() {
    // Clear the background color of input fields:
    const inputs = [nameBox, priceBox, categoryBox, pictureBox];
    inputs.forEach((input) => {
        input.style.backgroundColor = "";
    });
}

function setInvalidInputBackground(input) {
    // Set the background color of an input field to pink:
    input.style.backgroundColor = "pink";
}

function clearInput() {
    // Clear the background color of input fields and set focus to nameBox:
    nameBox.style.backgroundColor = "";
    priceBox.style.backgroundColor = "";
    categoryBox.style.backgroundColor = "";
    pictureBox.style.backgroundColor = "";
    nameBox.focus();
    // Clear the background colors of all input fields:
    clearInputBackgroundColors();
}
