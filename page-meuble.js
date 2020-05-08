//recherche adresse de la page actuelle
let url = window.location.search;

let searchUrl = new URLSearchParams(url);
// recuperation de la valeur associée à id
let id = searchUrl.get("id");
 
let arrayMeuble = [];
let arrayListe = [];

//selection des elements 
let titlePage = document.querySelector("title")
let pageMeuble = document.querySelector("#page-meuble")       
let h1Meuble = document.querySelector("#id-titre");
let imageMeuble = document.querySelector("#img")
let description = document.querySelector("#description")
let select = document.querySelector("#vernis")
let achat = document.querySelector("#achat")
let prix = document.querySelector("#prix")
let btnAjout = document.querySelector("#btn-panier-ajout")
let btnSupp = document.querySelector("#btn-panier-supp")
let nbrArticles = document.querySelector("#nbr-articles")
let totalArticles = 0
let btnValid = document.querySelector("#btn-panier-valid")
let spanError = document.querySelector("span")
spanError.innerHTML = " "

/**
 * 
 * @param {array} meuble 
 * Fonction pour ajouter les caracteristiques du meuble à la page HTML
 */ 
const ajoutComposant=(meuble)=>{
    h1Meuble.textContent = meuble.name
            
    imageMeuble.setAttribute("src", meuble.imageUrl)
    imageMeuble.setAttribute("alt", meuble.description)
    
    description.textContent = meuble.description

    prix.textContent = meuble.price + " €"
    nbrArticles.innerHTML = 0 
}
/**
 * 
 * @param {array} meuble 
 * Fonction pour le select du vernis
 */
const choixVernis=(meuble)=>{
    for (let eltVernis of meuble.varnish){
        let option = document.createElement("option");
        option.setAttribute("value", eltVernis);
        option.innerHTML = eltVernis
        select.appendChild(option)
    }
} 
/**
 * 
 * @param {Number} totalArticles 
 * fonction pour ajouter la quantité à totalArticles
 * avec verif pour ce cas precis que totalArticles <=1
 */
let ajoutMeuble=(totalArticles)=>{
    
    nbrArticles.innerHTML = totalArticles
    spanError.innerHTML = " "
    btnAjout.disabled = true
    btnSupp.disabled = false 
    return totalArticles      
}    
/**
 * 
 * @param {Number} totalArticles
 * fonction pour enlever à totalArticles
 * avec verif totalArticles >0
 */
let suppMeuble=(totalArticles)=>{
        nbrArticles.innerHTML = totalArticles--
        btnAjout.disabled = true
        btnSupp.disabled = false 
        return totalArticles 
    }
    
/**
 * Fonction asynchrone fetch pour GET page du meuble avec son id
 */
const getFurniture = async function(){
    try{
        let response = await fetch( "http://localhost:3000/api/furniture/" + id)//renvoi une promesse
        if(response.ok){
            let meuble = await response.json()//renvoi une promesse
/**
 * TEST pour verifier que la convertion de la reponse fetch est un objet
 */            
console.log(meuble instanceof Object)

            titlePage.innerHTML = meuble.name
            choixVernis(meuble)
            btnSupp.disabled = true // au chargement de la page
/**
 * TEST pour verifier choixVernis() : meuble.varnish est un tableau
 */
console.log(Array.isArray(meuble.varnish))

            ajoutComposant(meuble)
            btnAjout.addEventListener("click", function(){
                if(totalArticles < 1){ // condition à revoir pour commander plus qu'1
                    totalArticles++
                    nbrArticles.innerHTML = totalArticles
                    btnAjout.disabled = true
                    btnSupp.disabled = false   
                }
            })
/**
 * TEST verifier totalArticles et pour ce cas =1
 * verif sur html 
 */
            btnSupp.addEventListener("click", function(){
                if(totalArticles > 0){
                    totalArticles--
                    nbrArticles.innerHTML = totalArticles
                    btnAjout.disabled = false
                    btnSupp.disabled = true      
                }
            }) 

/**
 * TEST verifier totalArticles > 0
 * verif sur html 
 */

            btnValid.addEventListener("click", function(e){
                if (totalArticles!=0){
                arrayMeuble.push(meuble.name, select.value, totalArticles, meuble.price*parseInt(totalArticles) +" €", meuble._id)
                //console.log(arrayMeuble)  
            
                    if(["ligne-panier_"+meuble._id+"-"+select.value] in localStorage){
                        e.preventDefault()
                        spanError.innerHTML = "article déja ajouté au panier"
                        btnValid.disabled = true
                    }else{
                        localStorage.setItem("ligne-panier_"+meuble._id+"-"+select.value, arrayMeuble)
                        spanError.innerHTML = "Article ajouté au panier "
                        btnValid.disabled = true
                    }
                }    
                else {
                    e.preventDefault()
                    spanError.innerHTML = "Aucune quantité commandée"
                    console.log("aucune quantité commandé")
                } 
/**
 * TEST sur la page HTML
 * verif de arrayMeuble.length == 5
 * On ne peut pas ajouter au panier si qté = 0 -> mess : Aucune quantité commandée
 * On peut ajouter au panier que si qté = 1 -> mess: article ajouté au panier
 * Si article deja ajouté au panier (verif avec localStorage), pas d'ajout au panier ->mess: article déja ajouté au panier
 * 
 */                 
console.log(arrayMeuble.length == 5 ||arrayMeuble.length == 0)
            }) 
        }else{
            console.error("Probleme acces serveur : ", response.status) // si pb d'acces serveur
        }
    }catch(e){
        console.error ("probleme avec le fetch "+e) // si resolution de la promesse est une erreur
    }   
}
getFurniture()

