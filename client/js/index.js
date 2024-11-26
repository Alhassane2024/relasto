
"use-strict";


const navbar = document.querySelector("[data-navbar]");
const navToggleBtn = document.querySelector("[data-nav-toggler]");

//ICON MENU AND NAVBAR CONTROL
navToggleBtn.addEventListener("click", ()=>{
    navToggleBtn.classList.toggle("active");
    navbar.classList.toggle("active");
})

// HEADER SCROLL CONTROL
const header = document.querySelector("[data-header]");

document.addEventListener("scroll", e =>{
    header.classList[window.scrollY > 50 ? "add" : "remove"]("active");
})

// FORM HEADER CONTROL
const tabButtons = document.querySelectorAll(".tab-button");
const contentsTab = document.querySelectorAll(".tab-content ");

tabButtons.forEach(button => {
    button.addEventListener("click", ()=>{
        tabButtons.forEach(btn => btn.classList.remove("active"));
        contentsTab.forEach(content => content.classList.remove("active"));

        button.classList.add("active");
        document.getElementById(button.dataset.tab).classList.add("active");
    });   
})

// LISTED PROPERTIES SCROLL CONTROL
const propertyList = document.querySelector(".property-list");
const btnControls = document.querySelectorAll(".icon-controls");

btnControls.forEach(btn => {
    btn.addEventListener("click", ()=>{
        btn.classList.contains("left") ? propertyList.scrollBy({ left: -200, behavior: "smooth"}) : propertyList.scrollBy({ left: 200, behavior: "smooth"})
    })
})




