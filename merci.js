let nom = document.querySelector("#nom")
let prix = document.querySelector("#prix")
let idCommande = document.querySelector("#id-commande")
let btnRetour = document.querySelector("#btn-retour")
//let merci = localStorage.getItem("commande")
let commandePrenom = localStorage.getItem("commande-contactPrenom")
let commandeNom = localStorage.getItem("commande-contactNom")
let commandePrix = localStorage.getItem("commande-prix")
let commandeId = localStorage.getItem("commande-id")
//console.log(merci)
//let commande = merci.split(",")
//let commandeComplete = [commande]
nom.innerHTML = commandePrenom +" "+ commandeNom
prix.innerHTML = "vous nous devez " + commandePrix+" €"
idCommande.innerHTML = `votre n° de commande: ` + commandeId

window.onbeforeunload = function(e){
    localStorage.clear()
}