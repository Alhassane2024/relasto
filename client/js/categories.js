import { fectData } from "./utils.js";
document.addEventListener("DOMContentLoaded", async()=>{
    const categories = await fectData("api/categories/getcategory");
    displayCategories(categories);
    
})

const displayCategories = (categories)=>{
    const dropdownMenu = document.getElementById("dropdown");
    console.log(dropdownMenu);
    
    categories.forEach(category =>{
        const option = document.createElement("option");
        option.value = category.id;
        option.innerText = category.name;
        dropdownMenu.appendChild(option)
    })
    
}