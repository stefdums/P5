
let ul = document.querySelector("ul")
let form = document.querySelector("form")
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

console.log(monPanier)
console.log(monPanier.length)
console.log(localStorage.length)
console.log(localStorage)
console.log(arrayPanier)

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

form.addEventListener("submit", function(e){

    console.log(form)
    for (let i = 0; i < form.length; i++){

        if(form[i].value !== ""){
            window.confirm("Voulez vous confirmer?")
            //form[i].required = true
            console.log("validé")

        }else{
            e.preventDefault()
            alert(form[i].id + " n'est pas remplis" )
            
        }
    }
    
})


