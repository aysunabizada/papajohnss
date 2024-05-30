const main = document.querySelector("main");
const zehrimar = document.querySelector("#zehrimar");
const basket = document.querySelector("#basket");
const cards = document.querySelector(".cards");
const background = document.querySelector(".background");
const background2 = document.querySelector(".background2");
const bonus = document.querySelector(".bonus");
const message = document.querySelector(".message");
const bunusec = document.querySelector(".bunusec");
const prokod = document.querySelector("#prokod");
const pizzaCategory = document.querySelector(".pizzaCategory");

//kampaniyalara geden sey
const dataKampaniya = [
    {id: 1, img: "img/sl1mobil.jpg"},
    {id: 2, img: "img/sl2mobil.jpg"},
    {id: 3, img: "img/sl3mobil.png"},
    {id: 4, img: "img/sl4mobil.png"},
    {id: 5, img: "img/sl5mobil.png"},
    {id: 6, img: "img/sl6mobil.png"},
    {id: 7, img: "img/sl7mobil.jpg"},
    {id: 8, img: "img/sl8mobil.png"}
]
function getKampaniya() {
    cards.innerHTML = ''
    zehrimar.style.display = 'none';
    dataKampaniya.forEach((item) => {
        cards.innerHTML += `<div class="card">
                                <a href=""><img src="${item.img}" alt=""></a>
                                <button class="m30">ətraflı məlumat</button>
                            </div>`
    })
}

//data fetchhh
let data
async function dataGet() {
    const res = await fetch('data/data.json')
    data = await res.json()
}

//Kartlarim
async function show(arg) {
    await dataGet();
    pizzaCategory.style.display = (arg === 'Pizzalar') ? 'block' : 'none';
    bonus.style.display = (arg === 'Bonus') ? 'block' : 'none';
    zehrimar.style.display = 'none'
    const filteredCard = data.filter(item => item.category === arg).map(item => {
        return `<div class="card">
                    <a href="#" onclick="bunuSec(${item.id})"><img src="${item.img}" alt="${item.name}"></a>
                    <div class="sum">
                        <h3>${item.name}</h3>
                        <button onclick="bunuSec(${item.id})">BUNU SEC</button>
                    </div>
                    <p>${item.composition}</p>
                    <span>${item.price} ₼</span>
                </div>`
    }).join('')
    cards.innerHTML = filteredCard
}


//promokod tetbiq edir
prokod.value == 'aysu20'
function getPromokod() {
    if (prokod.value === 'aysu20') {
        message.innerHTML = `<h2>'${prokod.value}' promo kodu tətbiq edildi!</h2>`
        const filteredCard = data.map(item => {
            const discountedPrice = item.price - ((item.price * 20) / 100)
            return `<div class="card">
                        <a href="#" onclick="bunuSec(${item.id})"><img src="${item.img}" alt="${item.name}"></a>
                        <div class="sum">
                            <h3>${item.name}</h3>
                            <button onclick="bunuSec(${item.id})">BUNU SEC</button>
                        </div>
                        <p>${item.composition}</p>
                        <span><del>${item.price} ₼</del> ${discountedPrice} ₼</span>
                    </div>`
        }).join('')
        cards.innerHTML = filteredCard
    } else {
        message.innerHTML = `<h2>'${prokod.value}' promo kodu mövcud deyil!</h2>`
    }
}

let flag = true;
function goBasket() {
    background.style.display = flag ? 'block' : 'none';
    basket.style.display = flag ? 'block' : 'none';
    document.body.classList.toggle('no-scroll', flag);
    flag = !flag;
}

function bunuSec(id) {
    background2.style.display = flag ? 'block' : 'none';
    bunusec.style.display = flag ? 'block' : 'none';
    const item = data.find(item => item.id === id);
    if (!item) return;
    bunusec.innerHTML = `
            <i class="fa-solid fa-circle-xmark" onclick="bunuSec()"></i><br>
            <img src="${item.img}" alt="">
            <h2>${item.name}</h2>
            <div class="btn-group">
                <div class="btnSec">
                    <button onclick="azalt()">-</button>
                    <span id="say">1</span>
                    <button onclick="artir()">+</button>
                </div>
                <h2>${item.price} ₼</h2>
            </div>
            <div class="df btn-group">
                <div class="sebet txtcenter">
                    <span class="sebetsay">0</span>
                    <a href="#" onclick="goBasket()" class="fa-solid fa-basket-shopping"></a>
                    <p class="sebetqiymet">0 ₼</p>
                </div>
                <button onclick="sebeteAt(${item.id})">Səbətə at</button>
            </div>`
    document.body.classList.toggle('no-scroll', flag);
    flag = !flag;
}

const yemekler = document.querySelector(".yemekler");
const sebetdekiYemek = [];


function sebeteAt(id) {
    const index = data.findIndex(item => id == item.id);
    sebetdekiYemek.push(index)
}
console.log(sebetdekiYemek);
sebeteAt()