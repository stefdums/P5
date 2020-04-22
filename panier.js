
let ul = document.querySelector("ul")
//let form = document.querySelector("form")
let prenom = document.querySelector("#firstname")
let nom = document.querySelector("#lastname")
let adress = document.querySelector("#adress")
let city = document.querySelector("#city")
let email = document.querySelector("#email")
let submit = document.querySelector("#submit")
let divPanier = document.querySelector("#liste-panier");
/*
//creation div pour article
let divNom = document.createElement("div")
divNom.id = "div-nom"
let divNbr = document.createElement("div")
divNbr.id = "div-nbr"
let divTotalArticles = document.createElement("div")
divTotalArticles.id = "div-total-articles"
let divVernis = document.createElement("div")
divVernis.id = "div-vernis"
*/
let table = document.querySelector("table")

//recuperation des données d'ajout au panier
let lignePanierString = localStorage.getItem("panier")
let arrayPanier = lignePanierString.split(",");
//console.log(ArrayPanier)

class LignePanier{
    constructor(name, vernis, nbrArticles , totalArticles){
        this.name = name;
        this.vernis = vernis;
        this.nbrArticles = nbrArticles;
        this.totalArticles = totalArticles;
     
    }
  
 }
let monPanier = new LignePanier(arrayPanier[0],arrayPanier[1],arrayPanier[2],arrayPanier[3])
/*
console.log(monPanier)
console.log(monPanier.length)
console.log(localStorage.length)
console.log(localStorage)
console.log(arrayPanier)
*/

// boucle pour chaque localStorage création d'un ligne tableau et une colonne pour chaque 
for (let i = 0; i < localStorage.length; i++){
    let tr = document.createElement("tr")

    for (let j = 0; j < arrayPanier.length; j++){
        
        let th = document.createElement("th")
        th.id = arrayPanier[j]
        th.innerHTML = arrayPanier[j]
        table.appendChild(th)
        table.appendChild(tr)
        
    }
}














//validation input du formulaire



// regex commence par a-z ou en maj, puis que des lettres et avec accents, plus que 2 lettres puis ajout hypothetique du prenom composé
//let regexText = /^[a-zA-Zéèîï][a-zéèêçîï]+([-'\s][a-zA-Zéèîï][a-zéèêçîï]+)?/; 


let regexText = /\D/;

let formContact = document.forms["form"]
let champsText = formContact.querySelectorAll("[type=text]")
console.log(formContact)
console.log(champsText)
let inputManquant
formContact.addEventListener("submit", function(e){
 
    let inputs = this;
     
//traitement champs text

    for (let i=0; i< champsText.length; i++){
        console.log(champsText[i])
        inputManquant = document.getElementById(champsText[i].id + "_m")
        console.log(regexText.test(champsText[i].value))
        if(regexText.test(champsText[i].value)){
            inputManquant.innerHTML = "&#10004"
            inputManquant.style.color = "green"
        }else{
            inputManquant.innerHTML = champsText[i].previousElementSibling.innerHTML + " n'est pas conforme"
            inputManquant.style.color = "orange"
        }
    }
        
    

 //traitement pour champs vides   
    for (let i=0; i< inputs.length; i++){
        inputManquant = document.getElementById(inputs[i].id + "_m")
  
        if(!inputs[i].value){
            e.preventDefault()
            inputManquant.innerHTML = inputs[i].previousElementSibling.innerHTML + " est manquant"
            inputManquant.style.color = "red"
        }
        else{
            inputManquant.innerHTML = "&#10004"
            inputManquant.style.color = "green"
        }
    }

})


/*

*/

