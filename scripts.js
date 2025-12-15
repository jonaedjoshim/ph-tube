// funtion for load categories section data from api
function loadCategories() {
    // fetching data for button music, comedy, drawing
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        // got a promise and convert it to json
        .then((response) => response.json())
        // sending converted data into another funtion
        .then((data) => displayCategories(data.categories))
        // using catch function to find error and console it
        .catch(error => { console.error('Data fetching error:', error) })
}
// funtion for display the fetched data
function displayCategories(categories) {
    // get the container where i will display fetched data
    const categoriesContainer = document.getElementById("categoriesContainer")
    // now i have to make a loop for get separate data => {category_id: '1001', category: 'Music'}
    for (let category of categories) {
        // now creat element for display the data
        const categoryDiv = document.createElement("div")
        categoryDiv.innerHTML = `<button class="btn font-medium rounded-lg bg-[#25252515] text-[#25252570] hover:text-white hover:bg-[#FF1F3D] hover:shadow-md">${category.category}</button>`
        // append the loop element inside the categoryDiv
        categoriesContainer.append(categoryDiv)
    }

}

loadCategories()