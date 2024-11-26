import { fectData } from "./utils.js";

document.addEventListener("DOMContentLoaded", async()=>{
    const properties = await fectData("api/properties/getproperty");
     displayProperties(properties)
})

const displayProperties =  (properties)=>{
    
    const propertyList = document.querySelector(".property-list");
    propertyList.innerHTML = "";
    propertyList.className = "property-list";

    for(const property of properties){
        console.log(property);
             
        const propertyCard = document.createElement("div");

        propertyCard.className = "property-card";

        propertyCard.innerHTML = `

        <img src="${property.image_url}" alt="Property 1" />

                <div class="property-text-container flex-column gap-16">
                  <div class="flex-row gap-8">
                    <ion-icon
                      class="icon-ameneties"
                      name="location-outline"
                    ></ion-icon>
                    <p class="size-xs">${property.location}</p>
                  </div>

                  <div class="flex-column gap-8">
                    <div class="flex-row jc-s-between">
                      <div class="flex-row gap-8">
                        <ion-icon
                          class="icon-ameneties"
                          name="bed-outline"
                        ></ion-icon>
                        <p class="size-xs">3 Bed Room</p>
                      </div>

                      <div class="flex-row gap-8">
                        <ion-icon
                          class="icon-ameneties"
                          name="color-fill-outline"
                        ></ion-icon>
                        <p class="size-xs">1 Bath</p>
                      </div>
                    </div>

                    <div class="flex-row jc-s-between">
                      <div class="flex-row gap-8">
                        <ion-icon
                          class="icon-ameneties"
                          name="expand-outline"
                        ></ion-icon>
                        <p class="size-xs">1,032 sqft</p>
                      </div>

                      <div class="flex-row gap-8">
                        <ion-icon
                          class="icon-ameneties"
                          name="wifi-outline"
                        ></ion-icon>
                        <p class="size-xs">Family</p>
                      </div>
                    </div>
                  </div>

                  <div class="flex-row jc-s-between">
                    <a
                      href="#"
                      class="btn btn-fill-login view-details-button"
                      style="flex: 1; font-weight: 600"
                      >Details</a
                    >
                    <p class="size-xs" style="flex: 1">${property.price}</p>
                  </div>
                </div>
        
        `
        propertyList.appendChild(propertyCard);
    }    
    }
