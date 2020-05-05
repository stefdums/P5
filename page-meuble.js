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
btnSupp.setAttribute("disabled", false)
let nbrArticles = document.querySelector("#nbr-articles")
let totalArticles = 0
let btnValid = document.querySelector("#btn-panier-valid")
let titlePage = document.querySelector("title")

//text pour commande quantité nul
let spanError = document.createElement("span")
spanError.innerHTML = " "
document.querySelector("#modif-achat").appendChild(spanError)



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
                    btnAjout.setAttribute("disabled", false)
                    btnValid.setAttribute("disabled", false)
                    
                    spanError.innerHTML = "article déja ajouté au panier"
                }
                else{

                    totalArticles = 1; //car pour le MVP pas plus d'une ref pour l'ajout au panier
                    nbrArticles.innerHTML = totalArticles 
                    btnSupp.setAttribute("disabled", false)
                    spanError.innerHTML = " "
                }
            })
    //fonction sur le bouton pour supp du panier avec disabled pour chiffre < 0
            btnSupp.addEventListener("click", function(){
                
                if (totalArticles > 0) {
                    totalArticles--;
                    nbrArticles.innerHTML = totalArticles

                    
                }else {
                    btnSupp.setAttribute("disabled", true)
                }
            })  
            
            btnValid.addEventListener("click", function(e){
                if (totalArticles>=1){
                arrayMeuble.push(meuble.name, select.value, totalArticles, meuble.price*parseInt(totalArticles) +" €", meuble._id)
                console.log(arrayMeuble)  

                    if(["ligne-panier_"+meuble._id+"-"+select.value] in localStorage){
                        spanError.innerHTML = "article déja ajouté au panier"
                    }else{
                        localStorage.setItem("ligne-panier_"+meuble._id+"-"+select.value, arrayMeuble)
                        spanError.innerHTML = "Article ajouté au panier "
                        btnValid.setAttribute("disabled", true)
                    }
                }    
                else {
                    //e.preventDefault()
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