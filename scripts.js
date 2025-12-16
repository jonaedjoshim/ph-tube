// remove active from buttons
function removeActive() {
    const activeButtons = document.getElementsByClassName("active")
    for (let button of activeButtons) {
        button.classList.remove("active")
    }
}

// function for load categories section data from api
function loadCategories() {
    // fetching data for button music, comedy, drawing
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        // got a promise and convert it to json
        .then((response) => (response.json()))
        // sending converted data into another function
        .then((data) => displayCategories(data.categories))
        // using catch function to find error and console it
        .catch((error) => { console.error('Data fetching error:', error) })
}

// function for load videos section from api 
function loadVideos() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then((response) => (response.json()))
        .then((data) => {
            removeActive()
            document.getElementById("allBtn").classList.add("active")
            displayVideos(data.videos)
        })
        .catch((error) => { console.error('Data fetching error:', error) })
}

// function for load category Videos data 
function loadCategoryVideos(id) {
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    fetch(url)
        .then((response) => (response.json()))
        .then((data) => {
            removeActive() //after that function there will be no active class in btn
            const clickedButton = document.getElementById(`${id}`)
            clickedButton.classList.add("active")
            displayVideos(data.category)
        })
        .catch((error) => { console.error('Data fetching error:', error) })
}

// function for display the fetched data
function displayCategories(categories) {
    // get the container where i will display fetched data
    const categoriesContainer = document.getElementById("categoriesContainer")
    // now i have to make a loop for get separate data => {category_id: '1001', category: 'Music'}
    for (let category of categories) {
        // now create element for display the data
        const categoryDiv = document.createElement("div")
        categoryDiv.innerHTML = `<button id="${category.category_id}" onclick="loadCategoryVideos(${category.category_id})" class="btn font-medium rounded-lg bg-[#25252515] text-[#252525] hover:text-white hover:bg-[#FF1F3D] hover:shadow-md">${category.category}</button>`
        // append the loop element inside the categoryDiv
        categoriesContainer.append(categoryDiv)
    }
}

// use arrow function for smoothness --- const displayVideos = (videos) => {};
function displayVideos(videos) {
    const videosContainer = document.getElementById("videosContainer")
    videosContainer.innerHTML = ""
    if (videos.length == 0) {
        videosContainer.innerHTML = `
        <div class="col-span-full justify-center items-center text-center mt-6 lg:mt-16 py-5">
            <img src="assets/Icon.png" alt="no videos icon" class="size-32 mx-auto mb-8">
            <h2 class="text-[#171717] text-3xl font-bold">Oops!! Sorry, There is no <br> content here</h2>
         </div>
         `
        return
    }
    // we can use foreach if we use arrow function. videos.forEach(video=>) {}; it will work as a function 
    for (let video of videos) {
        const videoDiv = document.createElement("div")
        videoDiv.innerHTML = `
        <div class="card cursor-pointer">
            <figure class="relative">
                <img src="${video.thumbnail}" alt="thumbnail" class="object-cover w-full h-52" />
                <p class="absolute bottom-3 right-3 bg-[#17171775] p-1 rounded text-white text-xs ">3hrs 56 min ago</p>
            </figure>
            <div class="p-2 mt-5 flex gap-3 ">
                <div class="avatar">
                    <div class="w-10 h-10 mt-2 rounded-full">
                        <img src="${video.authors[0].profile_picture}" />
                    </div>
                </div>
                <div>
                    <h4 class="text-[#171717] text-lg font-bold">${video.title}
                    </h4>
                    <div class="flex gap-2 items-center">
                        <p class="text-[#17171770]">${video.authors[0].profile_name}</p>
                        <img
                            src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="verified_badge"
                            class="size-5">
                    </div>
                    <p class="text-[#17171770]">${video.others.views} views</p>
                </div>
            </div>
        </div>
        
        `
        videosContainer.append(videoDiv)
    }
}

loadCategories()