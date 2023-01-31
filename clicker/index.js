// Button -> Affichage -> Event -> Score

// Query Balise
let puissance_souris =1
let button = document.querySelector("#click")
let autoclicker_button = document.querySelector("#groom")
let saveb = document.querySelector("#save")
let star_button = document.querySelector("#star_button")
let spanScore = document.querySelector("#score")
let spanGrooms = document.querySelector("#number_of_grooms")
let spanPrice_of_groom = document.querySelector("#price_of_groom")
let spanPrice_of_star = document.querySelector("#price_of_star")
let etoiles = document.querySelector("#etoiles")
let game = {
    score: 1000,
    grooms: 0,
    price_of_groom: 50,
    nombre_etoiles: 0,
    price_of_star: 1000,
    
}


//const newImg = document.createElement("img").appendChild(document.createAttribute('src'));

function setup(){
    if (localStorage.getItem("game") !== null) {
        game = JSON.parse(localStorage.getItem("game"))
        
    }
    updateUI()
}



// Affichage score
function updateUI(){
    spanScore.innerHTML = game.score
    spanGrooms.innerHTML = game.grooms
    spanPrice_of_groom.innerHTML = game.price_of_groom
    spanPrice_of_star.innerHTML = game.price_of_star
}

// Score
button.addEventListener("click",()=>{
    addScore(puissance_souris)
})

function addScore(toAdd){
    game.score += toAdd
    updateUI()
}

//Autoclicker
autoclicker_button.addEventListener("click",()=>{
    addGrooms(1)
})

function addGrooms(toAdd){
    
    if (game.price_of_groom <= game.score){
        game.grooms += toAdd
        addScore(-game.price_of_groom)
        game.price_of_groom = Math.trunc(50*1.2**game.grooms)
        updateUI()
    }

}

function autoclicker(){
    addScore(game.grooms*1)
    updateUI()
}

setInterval(autoclicker, 500);

star_button.addEventListener("click",()=>{
    if (game.nombre_etoiles < 5) {
    addStar(1)
    }
})

function addStar(toAdd){
    
    if (game.nombre_etoiles===0 && game.score >= 1000) {
        amelioration_etoile(toAdd,2,30000)
    }
    else if (game.nombre_etoiles===1 && game.score >= 30000){
        amelioration_etoile(toAdd,5,500000)
    }
    else if (game.nombre_etoiles===2 && game.score >= 500000 ){
        amelioration_etoile(toAdd,15,10000000)
    }
    else if (game.nombre_etoiles===3 && game.score >= 10000000){
        amelioration_etoile(toAdd,30,500000000)
    }
    else if (game.nombre_etoiles===4 && game.score >= 500000000){
        amelioration_etoile(toAdd,100,9999999999999)
    }
    
}
function amelioration_etoile(toAdd, valeur_souris, valeur_prix){
    addScore(-game.price_of_star)
    game.price_of_star = valeur_prix
    puissance_souris = valeur_souris
    game.nombre_etoiles += toAdd
    insert_star()
    updateUI()
}

function insert_star() {
    let img = document.createElement("img");
    let src = document.createAttribute("src");
    src.value = "img/star.png";
    img.setAttributeNode(src);
    insertAfter(star_button, img)
}


// SAVE
saveb.addEventListener("click",()=>{
    save()
})

function save(){
    localStorage.setItem("game",JSON.stringify(game))
}

// RESET SAVE
document.querySelector("#reset").addEventListener("click", () => {
    localStorage.removeItem("game")
    location.reload()
})

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
setInterval(save, 60000)


setup(); 

for (i=0;i<game.nombre_etoiles;i++) {
    insert_star();
    
}

