const austranavtsBtn = document.querySelector(".austranavts-btn");
const austranavts = document.querySelector(".austranavts");
const austranavtsCards = document.querySelector(".austranavts-cards");
const div0 = document.querySelector(".div0");
const insight = document.querySelector(".insight-background");
const header = document.querySelector(".header");
const movingPlanets = document.querySelector(".moving-planets");
const blueLight = document.querySelector(".blue-light");
const redUnivers = document.querySelector(".red-univers");
const galaxy = document.querySelector(".galaxy");
const redPlanet = document.querySelector(".red-planet");
const bluePlanet = document.querySelector(".blue-planet");
const wordNGINE = document.querySelector(".word-NGINE");
const wordPACE = document.querySelector(".word-PACE");
const charE = document.querySelector(".char-E");
const charS = document.querySelector(".char-S");
const universeSimulator = document.querySelector(".universe-simulator");
const roversBtn = document.querySelector(".rovers-btn");
const pistureOfTheDayBtn = document.querySelector(".pisture-of-the-day-btn");
const sectionPicofzday = document.querySelector(".section-picofzday");
const logoBtn = document.querySelector(".logo-btn");
const insightText= document.querySelectorAll(".insight-text");
const insightCard = document.querySelectorAll(".insight-card")
const divV = document.querySelector(".div-V");
const newPagination = document.querySelector(".new-pagination");
const serverURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/";
const demoKey = "afyo01MR3snt2TcyrvPjA5UNTN0EhkXe3emGiXYH";
const roverContainer = document.querySelector(".rover-container");
const allRoverContainer = document.querySelector(".all-rover-container");
const chooseContainer = document.querySelector(".choose-container");
const findBtn = document.querySelector(".find-btn");
const popup = document.querySelector(".popup");
const popupClose = document.querySelector(".popup-close");
const popupContent = document.querySelector(".popup-content");
const containerForMarsCards = document.querySelector(".container-for-mars-cards");
const remind = document.querySelector(".remind");
const roverBackBtn = document.querySelector(".rover-back-btn");

let current_page = 1;
let maxPagination = 0;
let chosenRover = "";
let count = 0;
let spaceArr = [];


setTimeout(() => {
    blueLight.classList.add("slow-appear");
    redUnivers.classList.add("slow-appear");
    galaxy.classList.add("slow-appear");
}, 2000);

setTimeout(() => {
    bluePlanet.classList.add("slow-translate");
    redPlanet.classList.add("slow-translate");
}, 4000);

setTimeout(() => {
    charS.classList.add("slow-translate-S");
    charE.classList.add("slow-translate-E");
}, 6000);

setTimeout(() => {
    wordNGINE.classList.add("slow-appear");
    wordPACE.classList.add("slow-appear");
    universeSimulator.id = "appear";
    divV.classList.add("slow-appear");
}, 8000);

const getDataAustranavts = async () => {
    if (count != 1) {
        const res = await fetch("https://data.nasa.gov/resource/9kcy-zwvn.json");
        if (res.ok) {
            const data = await res.json();
            count++
            for (let i = 0; i < data.length; i++) {
                if (data[i].eva != undefined & data[i].crew != undefined & data[i].date != undefined & data[i].duration != undefined & data[i].purpose != undefined & data[i].country != undefined & data[i].vehicle != undefined){
                    spaceArr.push(data[i]);  
                }
            }
            makeSpaceCard(spaceArr);
        } else {
            console.error(error);
        }
    } else { 
        showSpaceCard()
    } 
    console.log(spaceArr);
    createPadination()
}

const showRoversContainer = () => {
    if (sectionPicofzday.classList.contains("hide") & !austranavts.classList.contains("hide") & insight.classList.contains("hide")) {
        toggleElemHide(austranavts, allRoverContainer);
    } else if (!sectionPicofzday.classList.contains("hide") & austranavts.classList.contains("hide") & insight.classList.contains("hide")) {
        toggleElemHide(sectionPicofzday, allRoverContainer);
    } else if (sectionPicofzday.classList.contains("hide") & austranavts.classList.contains("hide") & !insight.classList.contains("hide")) {
        toggleElemHide(insight, allRoverContainer);
    } else if (sectionPicofzday.classList.contains("hide") & austranavts.classList.contains("hide") & insight.classList.contains("hide")) {

    } else (console.log("hello - logo"))
}

const chooseRover = (e) => {
    const target = e.target;
    const title = target.closest(".chosen");
    if (title) {
        roverBackBtn.classList.toggle("hide");
        chosenRover = target.textContent.toLowerCase();
        remind.textContent = `You have chosen - ${chosenRover} rover`
        console.log(chosenRover);
        toggleElemHide(roverContainer, chooseContainer);
    }
    
}
// https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=DEMO_KEY&sol=1000
// https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?api_key=afyo01MR3snt2TcyrvPjA5UNTN0EhkXe3emGiXYH&sol=1000
// ${serverURL}${chosenRover}/photos?api_key=${demoKey}&sol=${inputData}
// ${serverURL}${chosenRover}/photos?api_key=${demoKey}&sol=${inputData}&${selectData}

const getPictures = async (e) => {
    const inputData = document.querySelector(".input-sol").value;
    console.log(inputData);
    console.log(document.querySelector(".select-camera").value);
    let url = "";
    if (document.querySelector(".select-camera").value == "any") {
        url = `${serverURL}${chosenRover}/photos?api_key=${demoKey}&sol=${inputData}`;
        console.log(url);

    } else {
        const selectData = `&camera=${document.querySelector(".select-camera").value}`;
        console.log(selectData);
        url = `${serverURL}${chosenRover}/photos?api_key=${demoKey}&sol=${inputData}&${selectData}`;
        console.log(url);
    }
    
    const res = await fetch(url);
    if(res.ok) {
        const data = await res.json();
        console.log(data);
        console.log(data.photos.length);
        if (data.photos.length === 0) {
            popup.classList.toggle("open");
            popupContent.classList.toggle("open-content")
        } else {
            makeMarsPhotos(data.photos);
            containerForMarsCards.classList.remove("hide");
        }
    } else {
        console.error(error)
    }
}

const makeMarsPhotos = (data) => {
    containerForMarsCards.innerHTML = ""
    data.forEach(element => {
        const marsCard = `
        <div class="mars-card">
            <h1>Rover: ${element.rover.name}</h1>
            <h3>Sol: ${element.sol} / Earth Date: ${element.earth_date}</h3>
            <p>Camera: ${element.camera.name}</p>
            <img src="${element.img_src}" alt="#">
        </div>
        `
        containerForMarsCards.insertAdjacentHTML("beforeend", marsCard)
    });
}

const previousSection = () => {
    toggleElemHide(chooseContainer, roverContainer, roverBackBtn);
}

const PopupClose = () => {
    popup.classList.toggle("open");
    popupContent.classList.toggle("open-content")
}

const getDataPictureOfTheDay = async (e) => {
    const res = await fetch("https://api.nasa.gov/planetary/apod?api_key=afyo01MR3snt2TcyrvPjA5UNTN0EhkXe3emGiXYH");
    if(res.ok) {
        const data = await res.json();
        console.log(data);
        localStorage.setItem("data", JSON.stringify(data))
        makePictureOfTheDay()
    }
}

const toggleElemHide = (...elems) => {
    elems.forEach(item => item.classList.toggle("hide"));
}

const showFrontPage = () =>{

    if (sectionPicofzday.classList.contains("hide") & !austranavts.classList.contains("hide") & allRoverContainer.classList.contains("hide")) {
        toggleElemHide(austranavts, insight);
    } else if (!sectionPicofzday.classList.contains("hide") & austranavts.classList.contains("hide") & allRoverContainer.classList.contains("hide")) {
        toggleElemHide(sectionPicofzday, insight);
    } else if (sectionPicofzday.classList.contains("hide") & austranavts.classList.contains("hide") & !allRoverContainer.classList.contains("hide")) {
        toggleElemHide(allRoverContainer, insight);
    } else if (sectionPicofzday.classList.contains("hide") & austranavts.classList.contains("hide") & allRoverContainer.classList.contains("hide")) {

    }

}

const showSpaceCard = () => {
    if (sectionPicofzday.classList.contains("hide") & !insight.classList.contains("hide") & allRoverContainer.classList.contains("hide")) {
        toggleElemHide(insight, austranavts);

    } else if (!sectionPicofzday.classList.contains("hide") & insight.classList.contains("hide") & allRoverContainer.classList.contains("hide")) {
        toggleElemHide(sectionPicofzday, austranavts);

    } else if (sectionPicofzday.classList.contains("hide") & insight.classList.contains("hide") & !allRoverContainer.classList.contains("hide")) {
        toggleElemHide(allRoverContainer, austranavts);

    } else if (sectionPicofzday.classList.contains("hide") & insight.classList.contains("hide") & allRoverContainer.classList.contains("hide")) {

    } else {

    }
}

const makeSpaceCard = (data) => {
    showSpaceCard()
    
    austranavtsCards.innerHTML = `
        <div class="div0">
            <div class="extra-div">

            </div>
        </div>`
    let counter = 1;
    for (let i = 1; i <= 10; i++) {
        if (counter === 1) {
            counter = 2;
            const card = `
            <div class="background${counter}">
                <div class="card">
                    <h3>Crew: ${data[i].crew}</h3>
                    <span>Date: ${data[i].date}</span>
                    <span>Duration: ${data[i].duration}</span>
                    <span>Vehicle: ${data[i].vehicle}</span>
                    <span class="purpose">Purpose: ${data[i].purpose}</span>
                    <span>Country: ${data[i].country}</span>
                </div>
            </div>
            `
            austranavtsCards.insertAdjacentHTML("beforeend", card);
        } else if (counter === 2) {
            counter = 1;
            const card = `
            <div class="background${counter}">
                <div class="card">
                    <h3>Crew: ${data[i].crew}</h3>
                    <span>Date: ${data[i].date}</span>
                    <span>Duration: ${data[i].duration}</span>
                    <span>Vehicle: ${data[i].vehicle}</span>
                    <span class="purpose">Purpose: ${data[i].purpose}</span>
                    <span>Country: ${data[i].country}</span>
                </div>
            </div>
            `
            austranavtsCards.insertAdjacentHTML("beforeend", card);
        }     
    }
}

window.addEventListener("scroll", (e) => {
    let scrollY = window.scrollY;
    let movingPlanetsHeight = movingPlanets.offsetHeight;
    if (scrollY >= movingPlanetsHeight) {
        div0.classList.add("slow-appear");
        div0.style.top = `${scrollY - movingPlanetsHeight + 150}px `;
    } else {
        div0.classList.add("slow-disappear");
        div0.classList.remove("slow-appear");
    }
})

window.addEventListener("scroll", (e) => {
    let windowCenter = window.innerHeight + window.scrollY;
    insightText.forEach(el => {
        let scrollOffset = el.offsetTop + el.offsetHeight;
        if (windowCenter >= scrollOffset) {
            el.classList.add("fast-appear");
        } else {
            el.classList.remove("fast-appear");
        }
    });
    insightCard.forEach(el => {       
        let scrollOffset = el.offsetTop  + el.offsetHeight / 2;
        if (windowCenter >= scrollOffset) {
            el.classList.add("translate-appear");
        }
    });    
})

const createPadination = () => {
    newPagination.innerHTML = "";
    const buttonsCount = Math.ceil(spaceArr.length / 10);
    maxPagination = buttonsCount;
    logic()
}

const openProductsPage = async (e) => {
    const paginationButton = e.target.closest("button");

    if (paginationButton) {
        austranavtsCards.innerHTML = ""
        const currentPage = paginationButton.textContent;
        let skip = 10 * currentPage;

        const arr = spaceArr;
        const newArr = arr.slice(skip, skip + 10)
        console.log(newArr);
        let counter = 1;
        for (let i = 0; i < newArr.length; i++) { 
            if (counter === 1) {
                counter = 2;
                const card = `
                <div class="background${counter}">
                    <div class="card">
                        <h3>Crew: ${newArr[i].crew}</h3>
                        <span>Date: ${newArr[i].date}</span>
                        <span>Duration: ${newArr[i].duration}</span>
                        <span class="purpose">Purpose: ${newArr[i].purpose}</span>
                        <span>Country: ${newArr[i].country}</span>
                    </div>
                </div>
                `
                austranavtsCards.insertAdjacentHTML("beforeend", card);
            } else if (counter === 2) {
                counter = 1;
                const card = `
                <div class="background${counter}">
                    <div class="card">
                        <h3>Crew: ${newArr[i].crew}</h3>
                        <span>Date: ${newArr[i].date}</span>
                        <span>Duration: ${newArr[i].duration}</span>
                        <span class="purpose">Purpose: ${newArr[i].purpose}</span>
                        <span>Country: ${newArr[i].country}</span>
                    </div>
                </div>
                `
                austranavtsCards.insertAdjacentHTML("beforeend", card);
            }     
        }
    }
}

const showPictureOfTheDay = () => {

    if (allRoverContainer.classList.contains("hide") & !austranavts.classList.contains("hide") & insight.classList.contains("hide")) {
        toggleElemHide(austranavts, sectionPicofzday);
        if(JSON.parse(localStorage.getItem("data"))) {
            makePictureOfTheDay()
        } else {
            getDataPictureOfTheDay()
        }
    } else if (!allRoverContainer.classList.contains("hide") & austranavts.classList.contains("hide") & insight.classList.contains("hide")) {
        toggleElemHide(allRoverContainer, sectionPicofzday);
        if(JSON.parse(localStorage.getItem("data"))) {
            makePictureOfTheDay()
        } else {
            getDataPictureOfTheDay()
        }
    } else if (allRoverContainer.classList.contains("hide") & austranavts.classList.contains("hide") & !insight.classList.contains("hide")) {
        toggleElemHide(insight, sectionPicofzday);
        if(JSON.parse(localStorage.getItem("data"))) {
            makePictureOfTheDay()
        } else {
            getDataPictureOfTheDay()
        }
    } else if (allRoverContainer.classList.contains("hide") & austranavts.classList.contains("hide") & insight.classList.contains("hide")) {

    }
}

const makePictureOfTheDay = () => {
    sectionPicofzday.innerHTML = ""
    const data = JSON.parse(localStorage.getItem("data"));
    if (data.url.includes("youtube")) {
        console.log(data);
        const card = `
            <h1>NASA  Astronomy Picture Of The Day</h1>
            <h2>${data.title}</h2>
            <p>${data.date}</p>
            <iframe class="iframe" width="700" height="450" src="${data.url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <span>${data.explanation}</span>
        `
        sectionPicofzday.insertAdjacentHTML("beforeend", card);
    } else {
        console.log(data);
        const card = `
            <h1>NASA  Astronomy Picture Of The Day</h1>
            <h2>${data.title}</h2>
            <p>${data.date}</p>
            <img src="${data.url}" alt="#">
            <span>${data.explanation}</span>
        `
        sectionPicofzday.insertAdjacentHTML("beforeend", card);
    }
}

const appendBtn = (i, ellipsis) => {
    const activeBtn = current_page === i;
    const button = document.createElement('button');
    button.classList.add('btn');
    if (ellipsis === true) {
        button.innerHTML = '...';
        button.disabled = true;
        newPagination.append(button);
        return false;
    }
    if (activeBtn) {
        button.classList.add('active');
    }
        button.disabled = activeBtn;
        button.innerHTML = i;
        button.addEventListener('click', () => {
        current_page = i;
        newPagination.innerHTML = '';
        logic();
    });
    newPagination.append(button);
}

const logic = () => {
  // это лево
  appendBtn(1);
  appendBtn(2);
  // это лево

  // это середина
  if (current_page < 6) {
    appendBtn(3);
    appendBtn(4);
    appendBtn(5);
    appendBtn(6);
    appendBtn(7);
    appendBtn(current_page, true);
  } else if (current_page <= maxPagination - 5) {
    appendBtn(current_page, true);
    appendBtn(current_page - 2);
    appendBtn(current_page - 1);
    appendBtn(current_page);
    appendBtn(current_page + 1);
    appendBtn(current_page + 2);
    appendBtn(current_page, true);
  } else {
    appendBtn(current_page, true);
    appendBtn(maxPagination - 6);
    appendBtn(maxPagination - 5);
    appendBtn(maxPagination - 4);
    appendBtn(maxPagination - 3);
    appendBtn(maxPagination - 2);
  }
  // это середина

  // это право
  appendBtn(maxPagination - 1);
  // это право
}

const checkerDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month <= 9) {
        month = `0${month}`
    }
    if (day <= 9) {
        day = `0${day}`
    }
    const currentDate = `${year}-${month}-${day}`;
    console.log(currentDate);
    if (JSON.parse(localStorage.getItem("data"))) {
        const localStorageObj = JSON.parse(localStorage.getItem("data"));
        console.log(localStorageObj.date);
        if (currentDate > localStorageObj.date) {
            console.log("LocalStorage очищен");
            localStorage.removeItem("data");
        } 
    }
    
}


logoBtn.addEventListener("click", showFrontPage)
austranavtsBtn.addEventListener("click", getDataAustranavts);
newPagination.addEventListener("click", openProductsPage);
roversBtn.addEventListener("click", showRoversContainer);
pistureOfTheDayBtn.addEventListener("click", showPictureOfTheDay);
allRoverContainer.addEventListener("click", chooseRover);
findBtn.addEventListener("click", getPictures);
popupClose.addEventListener("click", PopupClose);
roverBackBtn.addEventListener("click", previousSection);
checkerDate()