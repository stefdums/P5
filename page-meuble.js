//recherche adresse de la page actuelle
let url = window.location.search;

let searchUrl = new URLSearchParams(url);
// recuperation de la valeur associée à id
let id = searchUrl.get("id");
 
let arrayMeuble = [];
let arrayListe = [];

//selection des elements 
let pageMeuble = document.querySelector("#page-meuble")       
let h1Meuble = document.querySelector("#id-titre");
let imageMeuble = document.querySelector("#img")
let description = document.querySelector("#description")
let select = document.querySelector("#vernis")
let achat = document.querySelector("#achat")
let prix = document.querySelector("#prix")
let btnAjout = document.querySelector("#btn-panier-ajout")
let btnSupp = document.querySelector("#btn-panier-supp")
//btnSupp.setAttribute("disabled", false)
let nbrArticles = document.querySelector("#nbr-articles")
let totalArticles = 0
let btnValid = document.querySelector("#btn-panier-valid")
let titlePage = document.querySelector("title")

//text pour commande quantité nul
let spanError = document.createElement("span")
spanError.innerHTML = " "
document.querySelector("#modif-achat").appendChild(spanError)
/*
if (totalArticles > 0){
    btnAjout.setAttribute("disabled", false)
    btnSupp.setAttribute("disabled", true)
}else{
    btnAjout.setAttribute("disabled", true)
    btnSupp.setAttribute("disabled", false)
}
*/
const getFurniture = async function(){
    try{
        let response = await fetch( "http://localhost:3000/api/furniture/" + id)//renvoi une promesse
        if(response.ok){
            let meuble = await response.json()//renvoi une promesse
            console.log(meuble)
            titlePage.innerHTML = meuble.name


    //creation de la liste  des differents vernis
            for (let eltVernis of meuble.varnish){

                let option = document.createElement("option");
                option.setAttribute("value", eltVernis);
                option.innerHTML = eltVernis
                select.appendChild(option)
            }

            h1Meuble.textContent = meuble.name
            
            imageMeuble.setAttribute("src", meuble.imageUrl)
            imageMeuble.setAttribute("alt", meuble.description)
            
            description.textContent = meuble.description

            prix.textContent = meuble.price + " €"
            nbrArticles.innerHTML = 0   

            
    //fonction sur le bouton pour ajouter au panier
            btnAjout.addEventListener("click", function(){
                
    //verifie si l'article n'a pas deja été ajouté           
                if(["ligne-panier_"+meuble._id+"-"+select.value] in localStorage){
                    btnSupp.disabled = true 
                    btnAjout.disabled = true
                    btnValid.disabled = true
                    spanError.innerHTML = "article déja ajouté au panier"
                }
                else{

                    totalArticles++; 
                    nbrArticles.innerHTML = totalArticles 
                    
                    spanError.innerHTML = " "
                    

/**
 * Partie du code à supprimer quand on pourra ajouter une quantité superieur à 1
 */
                    if(totalArticles=1){
                        btnAjout.disabled = true
                        btnSupp.disabled = false 
                    }
/**
 * 
 */                    

                }
            })
    //fonction sur le bouton pour supp du panier avec disabled pour chiffre < 0
            btnSupp.addEventListener("click", function(){
                
                if (totalArticles > 0) {
                    totalArticles--;
                    nbrArticles.innerHTML = totalArticles
                    btnAjout.disabled = false
                    btnSupp.disabled = true 

                    
                }else {
                   btnSupp.disabled = false
                }
            })  
            
            btnValid.addEventListener("click", function(e){
                if (totalArticles!=0){
                arrayMeuble.push(meuble.name, select.value, totalArticles, meuble.price*parseInt(totalArticles) +" €", meuble._id)
                //console.log(arrayMeuble)  

                    if(["ligne-panier_"+meuble._id+"-"+select.value] in localStorage){
                        e.preventDefault()
                        spanError.innerHTML = "article déja ajouté au panier"
                    }else{
                        localStorage.setItem("ligne-panier_"+meuble._id+"-"+select.value, arrayMeuble)
                        spanError.innerHTML = "Article ajouté au panier "
                        btnValid.disabled = true
                    }
                }    
                else {
                    e.preventDefault()
                    spanError.innerHTML = "Aucune quantité commandé"
                    console.log("aucune quantité commandé")
                }   
            })
        }else{
            console.error("Probleme acces serveur : ", response.status)
        }

    }catch(e){
        console.error ("probleme avec le fetch "+e)
    }   
}
getFurniture()