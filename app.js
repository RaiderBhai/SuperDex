let url = "https://superheroapi.com/api.php/a43aa2073472912a6d739fa1e4282e95/"
let url2 = "https://superheroapi.com/api.php/a43aa2073472912a6d739fa1e4282e95/search/"



let bd = document.querySelector("body");
let sign = document.querySelector(".sign")
let form = document.querySelector(".form-search");
let list = document.getElementById("search-list");
let cCount = 0;

let flag=0;

bd.addEventListener("click",(det)=>{
    sign.style.left=`${det.clientX -50}px`;
    sign.style.top=`${det.clientY -50}px`;
    // sign.style.backgroundImage = "/images/pow.png";
    sign.classList.add("snh");
    sign.classList.add("cursor"+cCount); 

    setTimeout(() => {
        sign.classList.remove("snh");
        sign.classList.remove("cursor"+cCount);
        cCount = (cCount + 1)%3;
        console.log(cCount);
    }, 500)
});

let tabs_heads = document.querySelectorAll(".tab");
let tab_bodies = document.querySelectorAll(".tab-body")
let atab = 1, data;

const init = ()=>{
    showHead();
    showBody();
}

const showHead = ()=> tabs_heads[atab-1].classList.add("active-tab");
const showBody = ()=>{
    hideBody();
    tab_bodies[atab-1].classList.add("show-tab");
}

const hideBody = ()=> tab_bodies.forEach((body)=>body.classList.remove("show-tab"));
const hideHead = ()=> tabs_heads.forEach((head)=>head.classList.remove("active-tab"));

window.addEventListener("DOMContentLoaded",()=> init());

tabs_heads.forEach(head=>{
    head.addEventListener("click",()=>{
        hideHead();
        atab = head.getAttribute("id");
        showBody();
        showHead();
    })
})

const getInput = (ev)=>{
    ev.preventDefault();
    let search = form.search.value;
    fetchHeroes(search);
}

form.addEventListener("submit",getInput);

const fetchHeroes = async (search)=>{
    let link = url2+search;
    try{
        const response = await fetch(link);
        data = await response.json();
        if(data.response === "success"){
            // console.log(data);
            showList(data.results);
        }
    }
    catch(error){
        console.log(error);
    }
}

let card_arr = document.querySelectorAll(".card");
card_arr.forEach((card)=>{
    card.addEventListener("click",async ()=>{
        let l2 = url+card.getAttribute("id");
        try{
            const response = await fetch(l2);
            data = await response.json();
            if(data.response === "success"){
                console.log(data);
                showHero(data);
            }
        }
        catch(error){
            console.log(error);
        }
    })
});

const showList = (data)=>{
    list.innerHTML="";
    data.forEach(result =>{
        const el = document.createElement("div");
        el.classList.add("search-list-item");
        el.innerHTML =  `
                            <img src="${result.image.url ? result.image.url : ""}" alt="">
                            <p id = "${result.id}">${result.name}</p>
        `;
        list.appendChild(el); 
    })
}

form.search.addEventListener("keyup",()=>{
    if(form.search.value.length > 1){
        fetchHeroes(form.search.value);
    }
    else{
        list.innerHTML = "";
    }
})

list.addEventListener("click",(ev)=>{
    let superID = ev.target.id;
    let singleData = data.results.filter(singleData =>{
        return superID === singleData.id;
    })
    // console.log(singleData);
    showHero(singleData);
    list.innerHTML = "";
})

const showHero = (data)=>{
    flag=1;
    localStorage.setItem('heroData', JSON.stringify(data));
    window.location="superhero.html";
};

const updateHeroPage = () => {
    const data = JSON.parse(localStorage.getItem('heroData'));

    if (!data) return;

    if(data[0]===undefined){
        document.querySelector(".image").innerHTML = `
    <img src="${data.image.url}" alt="">
    `;
    document.querySelector(".c-list .name").innerHTML = `
    ${data.name}
    `;
    document.querySelector(".stats").innerHTML =`
    <li>
                            <div>
                                <i class="fa-solid fa-dumbbell"></i>
                                <span>Strength</span>
                            </div>
                            <span>${data.powerstats.strength}</span>
                        </li>
                        <li>
                            <div>
                                <i class="fa-solid fa-brain"></i>
                                <span>Intelligence</span>
                            </div>
                            <span>${data.powerstats.intelligence}</span>
                        </li>
                        <li>
                            <div>
                                <i class="fa-solid fa-person-running"></i>
                                <span>Speed</span>
                            </div>
                            <span>${data.powerstats.speed}</span>
                        </li>
                        <li>
                            <div>
                                <i class="fa-solid fa-hand-fist"></i>
                                <span>Power</span>
                            </div>
                            <span>${data.powerstats.power}</span>
                        </li>
                        <li>
                            <div>
                                <i class="fa-solid fa-shield"></i>
                                <span>Durability</span>
                            </div>
                            <span>${data.powerstats.durability}</span>
                        </li>
                        <li>
                            <div>
                                <i class="fa-solid fa-khanda"></i>
                                <span>Combat</span>
                            </div>
                            <span>${data.powerstats.combat}</span>
                        </li>
    `;

    document.querySelector(".biography").innerHTML = `
    <li>
                            <span>Full Name: </span>
                            <span>${data.biography["full-name"]}</span>
                        </li>
                        <li>
                            <span>Alter Egos: </span>
                            <span>${data.biography["alter-egos"]}</span>
                        </li>
                        <li>
                            <span>Aliases: </span>
                            <span>${data.biography["aliases"]}</span>
                        </li>
                        <li>
                            <span>Place of Birth: </span>
                            <span>${data.biography["place-of-birth"]}</span>
                        </li>
                        <li>
                            <span>First Appearance: </span>
                            <span>${data.biography["first-appearance"]}</span>
                        </li>
                        <li>
                            <span>Publishers: </span>
                            <span>${data.biography["publisher"]}</span>
                        </li>
    `;

    document.querySelector(".appearance").innerHTML = `
    <li>
                            <span>
                                <i class="fa-solid fa-star"></i>Gender
                            </span>
                            <span>${data.appearance["gender"]}</span>
                        </li>
                        <li>
                            <span>
                                <i class="fa-solid fa-star"></i>Race
                            </span>
                            <span>${data.appearance["race"]}</span>
                        </li>
                        <li>
                            <span>
                                <i class="fa-solid fa-star"></i>Height
                            </span>
                            <span>${data.appearance["height"]}</span>
                        </li>
                        <li>
                            <span>
                                <i class="fa-solid fa-star"></i>Weight
                            </span>
                            <span>${data.appearance["weight"]}</span>
                        </li>
                        <li>
                            <span>
                                <i class="fa-solid fa-star"></i>Eye-color
                            </span>
                            <span>${data.appearance["eye-color"]}</span>
                        </li>
                        <li>
                            <span>
                                <i class="fa-solid fa-star"></i>Hair-color
                            </span>
                            <span>${data.appearance["hair-color"]}</span>
                        </li>
    `;

    document.querySelector(".connections").innerHTML = `
    <li>
                            <span>Group--Affiliation</span>
                            <span>${data.connections["group-affiliations"]}</span>
                        </li>
                        <li>
                            <span>Relatives</span>
                            <span>${data.connections["relatives"]}</span>
                        </li>
    `;
    }
    else{
        document.querySelector(".image").innerHTML = `
    <img src="${data[0].image.url}" alt="">
    `;
    document.querySelector(".c-list .name").innerHTML = `
    ${data[0].name}
    `;
    document.querySelector(".stats").innerHTML =`
    <li>
                            <div>
                                <i class="fa-solid fa-dumbbell"></i>
                                <span>Strength</span>
                            </div>
                            <span>${data[0].powerstats.strength}</span>
                        </li>
                        <li>
                            <div>
                                <i class="fa-solid fa-brain"></i>
                                <span>Intelligence</span>
                            </div>
                            <span>${data[0].powerstats.intelligence}</span>
                        </li>
                        <li>
                            <div>
                                <i class="fa-solid fa-person-running"></i>
                                <span>Speed</span>
                            </div>
                            <span>${data[0].powerstats.speed}</span>
                        </li>
                        <li>
                            <div>
                                <i class="fa-solid fa-hand-fist"></i>
                                <span>Power</span>
                            </div>
                            <span>${data[0].powerstats.power}</span>
                        </li>
                        <li>
                            <div>
                                <i class="fa-solid fa-shield"></i>
                                <span>Durability</span>
                            </div>
                            <span>${data[0].powerstats.durability}</span>
                        </li>
                        <li>
                            <div>
                                <i class="fa-solid fa-khanda"></i>
                                <span>Combat</span>
                            </div>
                            <span>${data[0].powerstats.combat}</span>
                        </li>
    `;

    document.querySelector(".biography").innerHTML = `
    <li>
                            <span>Full Name: </span>
                            <span>${data[0].biography["full-name"]}</span>
                        </li>
                        <li>
                            <span>Alter Egos: </span>
                            <span>${data[0].biography["alter-egos"]}</span>
                        </li>
                        <li>
                            <span>Aliases: </span>
                            <span>${data[0].biography["aliases"]}</span>
                        </li>
                        <li>
                            <span>Place of Birth: </span>
                            <span>${data[0].biography["place-of-birth"]}</span>
                        </li>
                        <li>
                            <span>First Appearance: </span>
                            <span>${data[0].biography["first-appearance"]}</span>
                        </li>
                        <li>
                            <span>Publishers: </span>
                            <span>${data[0].biography["publisher"]}</span>
                        </li>
    `;

    document.querySelector(".appearance").innerHTML = `
    <li>
                            <span>
                                <i class="fa-solid fa-star"></i>Gender
                            </span>
                            <span>${data[0].appearance["gender"]}</span>
                        </li>
                        <li>
                            <span>
                                <i class="fa-solid fa-star"></i>Race
                            </span>
                            <span>${data[0].appearance["race"]}</span>
                        </li>
                        <li>
                            <span>
                                <i class="fa-solid fa-star"></i>Height
                            </span>
                            <span>${data[0].appearance["height"]}</span>
                        </li>
                        <li>
                            <span>
                                <i class="fa-solid fa-star"></i>Weight
                            </span>
                            <span>${data[0].appearance["weight"]}</span>
                        </li>
                        <li>
                            <span>
                                <i class="fa-solid fa-star"></i>Eye-color
                            </span>
                            <span>${data[0].appearance["eye-color"]}</span>
                        </li>
                        <li>
                            <span>
                                <i class="fa-solid fa-star"></i>Hair-color
                            </span>
                            <span>${data[0].appearance["hair-color"]}</span>
                        </li>
    `;

    document.querySelector(".connections").innerHTML = `
    <li>
                            <span>Group--Affiliation</span>
                            <span>${data[0].connections["group-affiliations"]}</span>
                        </li>
                        <li>
                            <span>Relatives</span>
                            <span>${data[0].connections["relatives"]}</span>
                        </li>
    `;
    }
};

window.onload = updateHeroPage;