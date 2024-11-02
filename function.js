const form=document.querySelector(".form");
const city_inp=document.querySelector(".city_input");
const card=document.querySelector(".card");
const apiKey="407bde078ac98ed98c22c356379b22d9"

form.addEventListener("submit",async event=>{
    event.preventDefault();
    const city=city_inp.value;

    if (city){
        try{
            const wheatherData=await getWheatherData(city);
            displayWheatherInfo(wheatherData);
        }
        catch(error){
            console.error(error);
            displayError(error)
        }
    }
    else{
        displayError("please enter a valid city name!")
    }
}
);

async function getWheatherData(city){
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response=await fetch(apiUrl);
    
    if (!response.ok){
        throw new Error("could not fetch data!");
    }
    
    return await response.json();
};

function displayWheatherInfo(data){
    const {name:city,
           main:{temp,humidity},
           weather:[{description,id}]}=data;
    
    card.textContent="";
    card.style.display="flex";

    const city_display=document.createElement("h1");
    city_display.textContent=city;
    city_display.classList.add("city")
    card.appendChild(city_display);

    const temp_display=document.createElement("p");
    temp_display.textContent=`${(temp-273).toFixed(1)}°C`;
    temp_display.classList.add("temp");
    card.appendChild(temp_display);

    const humidity_display=document.createElement("p");
    humidity_display.textContent=`Humidity: ${humidity}%`;
    humidity_display.classList.add("humidity");
    card.appendChild(humidity_display);

    const desc_display=document.createElement("p");
    desc_display.textContent=description;
    desc_display.classList.add("sky");
    card.appendChild(desc_display);

    const emoji_display=document.createElement("p");
    emoji_display.textContent=getWheatherEmoji(id);
    emoji_display.classList.add("emoje")
    card.appendChild(emoji_display);
    
    

};

function getWheatherEmoji(wheatherId){
    switch(true){
        case (wheatherId>=200 && wheatherId<300):
            return "⛈️";
        case (wheatherId>=300 && wheatherId<400):
            return "🌧️";
        case (wheatherId>=500 && wheatherId<600):
            return "🌧️"
        case (wheatherId<=600 && wheatherId<700):
            return "❄️";
        case (wheatherId<=700 && wheatherId,800):
            return "🌁";
        case (wheatherId===800):
            return "☀️";
        case (wheatherId>=801 && wheatherId<=809):
            return "🌥️";
        default:
            return "❓";

    }
}

function displayError(message){
    const errorDisplay=document.createElement("p");
    errorDisplay.textContent=message;
    errorDisplay.classList.add("extra_disc");

    card.textContent="";
    card.style.display="flex";
    card.appendChild(errorDisplay);
}