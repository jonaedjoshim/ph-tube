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
    console.log(categories)
}

loadCategories()
