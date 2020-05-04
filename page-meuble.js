//recherche adresse de la page actuelle
let url = window.location.search;

let searchUrl = new URLSearchParams(url);
// recuperation de la valeur associée à id
let id = searchUrl.get("id");

let request = new XMLHttpRequest()

// recuperation de la page meuble.html 
let pageMeuble = document.querySelector("#page-meuble")
let arrayMeuble = [];
let arrayListe = [];

request.onreadystatechange = function(){
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200){
        let meuble = JSON.parse(this.responseText);
        console.log(meuble)
//selection des elements        
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
        //text pour commande quantité nul
        let spanError = document.createElement("span")
        spanError.innerHTML = " "
        document.querySelector("#modif-achat").appendChild(spanError)

    
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
            totalArticles = 1; //car pour le MVP pas plus d'une ref pour l'ajout au panier
            nbrArticles.innerHTML = totalArticles 
            btnSupp.disabled = false
            spanError.innerHTML = " "
        })
//fonction sur le bouton pour supp du panier avec disabled pour chiffre < 0
        btnSupp.addEventListener("click", function(){
            
            if (totalArticles > 0) {
                totalArticles--;
                nbrArticles.innerHTML = totalArticles 
                
            }else {
                btnSupp.disabled = true
            }
        })  
        
        btnValid.addEventListener("click", function(e){
            if (totalArticles>=1){
            arrayMeuble.push(meuble.name, select.value, totalArticles, meuble.price*parseInt(totalArticles) +" €", meuble._id)
            console.log(arrayMeuble)  
            localStorage.setItem("ligne-panier_"+meuble._id+select.value, arrayMeuble)
            spanError.innerHTML = " "

            }else {
                e.preventDefault()
                spanError.innerHTML = "Aucune quantité commandé"
                console.log("aucune quantité commandé")
            }   
        })
    }
           
}
request.open ("GET", "http://localhost:3000/api/furniture/" + id)
request.send()


