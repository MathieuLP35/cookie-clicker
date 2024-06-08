let cookieCounter = document.getElementById('cookie');
let clicker = document.getElementById('click');
let clickerNbCookie = 1;

let upgrade1 = document.getElementById('upgrade1');
let upgrade2 = document.getElementById('upgrade2');
let upgrade3 = document.getElementById('upgrade3');
let upgrade4 = document.getElementById('upgrade4');
let upgrade5 = document.getElementById('upgrade5');

let upgrade1Price = document.getElementById('price-up1');
let upgrade2Price = document.getElementById('price-up2');
let upgrade3Price = document.getElementById('price-up3');
let upgrade4Price = document.getElementById('price-up4');
let upgrade5Price = document.getElementById('price-up5');

let countUp1 = document.getElementById('count-up1');
let countUp2 = document.getElementById('count-up2');
let countUp3 = document.getElementById('count-up3');
let countUp4 = document.getElementById('count-up4');
let countUp5 = document.getElementById('count-up5');

let upgrade1NbCookie = 0.1;
let upgrade2NbCookie = 0.5;
let upgrade3NbCookie = 4;
let upgrade4NbCookie = 10;
let upgrade5NbCookie = 40;

let goldenCookie = document.getElementById('goldenCookie');
let showGoldenCookieNumber = 0.2
let goldenCookieInterval;
let isGoldenCookieActivate = false;

let totalCookiePerSecond = document.getElementById('cookies-per-second');

window.onload = () => {
    goldenCookieInterval = setInterval(function() {
        goldenCookieBoucle();
    }, 5000);
};

clicker.addEventListener('mousedown', function(){
    clicker.classList.add('scale-75');
    addCookie(clickerNbCookie);
})

clicker.addEventListener('mouseup', function(){
    clicker.classList.remove('scale-75');
})

goldenCookie.addEventListener('click', function(){
    if (!isGoldenCookieActivate){
        isGoldenCookieActivate = true;

        clearInterval(goldenCookieInterval);

        goldenCookie.classList.remove('hidden');
        goldenCookie.classList.add('animate-bounce');

        // Bonus du golden cookie
        clickerNbCookie = 2;

        goldenCookieInterval = setInterval(function() {
            if(parseInt(totalCookiePerSecond.innerText) === 0){
                addCookie(0.1);
            } else{
                addCookie(totalCookiePerSecond.innerText * 1.3);
            }
        }, 500);

        setTimeout(function(){
            clearInterval(goldenCookieInterval);
            goldenCookie.classList.add('hidden');
            goldenCookie.classList.remove('animate-bounce');

            clickerNbCookie = 1;

            goldenCookieInterval = setInterval(function() {
                goldenCookieBoucle();
            }, 5000);

            isGoldenCookieActivate = false;
        }, 20000)
    }
})


gestionBatiment(upgrade1, upgrade1Price, upgrade1NbCookie, countUp1);
gestionBatiment(upgrade2, upgrade2Price, upgrade2NbCookie, countUp2);
gestionBatiment(upgrade3, upgrade3Price, upgrade3NbCookie, countUp3);
gestionBatiment(upgrade4, upgrade4Price, upgrade4NbCookie, countUp4);
gestionBatiment(upgrade5, upgrade5Price, upgrade5NbCookie, countUp5);

function gestionBatiment(batiment, batimentPrice, batimentRendement, batimentUpgradeCount){
    batiment.addEventListener('click', function() {
        if(parseFloat(cookieCounter.innerText) >= parseFloat(batimentPrice.innerText)) {
            totalCookiePerSecond.innerHTML = (parseFloat(totalCookiePerSecond.innerText) + batimentRendement).toFixed(2);
            intervalForAddCookie(batimentRendement, 1000);
            cookieCounter.innerText = (parseFloat(cookieCounter.innerText) - parseFloat(batimentPrice.innerText)).toFixed(1);
            batimentPrice.innerText = parseFloat(batimentPrice.innerText) * 2;
            batimentRendement = batimentRendement * 1.5;
            batimentUpgradeCount.innerText = parseInt(batimentUpgradeCount.innerText) + 1;
        } else {
            alert("Vous n'avez pas assez de cookies !");
        }
    });
}

function addCookie(nbCookie) {
    cookieCounter.innerText = (parseFloat(cookieCounter.innerText) + nbCookie).toFixed(1)
}

function intervalForAddCookie(nbCookie, interval) {
    setInterval(function() {
        addCookie(nbCookie);
    }, interval);
}

function goldenCookieBoucle(){
    let randomShowGoldenCookieNumber = Math.random() * 1.5;

    console.log(parseFloat(randomShowGoldenCookieNumber.toFixed(1)));
    console.log(parseFloat(showGoldenCookieNumber));

    if(parseFloat(randomShowGoldenCookieNumber.toFixed(1)) === parseFloat(showGoldenCookieNumber)){
        goldenCookie.classList.remove('hidden');
    } else {
        goldenCookie.classList.add('hidden');
    }
}