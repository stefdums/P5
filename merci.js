let nom = document.querySelector("#nom")
let prix = document.querySelector("#prix")
let idCommande = document.querySelector("#id-commande")
let btnRetour = document.querySelector("#btn-retour")

let commandePrenom = localStorage.getItem("commande-contactPrenom")
let commandeNom = localStorage.getItem("commande-contactNom")
let commandePrix = localStorage.getItem("commande-prix")
let commandeId = localStorage.getItem("commande-id")

nom.innerHTML = commandePrenom +" "+ commandeNom
prix.innerHTML = "vous nous devez " + commandePrix+" €"
idCommande.innerHTML = `votre n° de commande: ` + commandeId

window.onbeforeunload = function(e){
    localStorage.clear()
}