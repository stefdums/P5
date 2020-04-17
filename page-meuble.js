let request = new XMLHttpRequest()

// recuperation de la page meuble.html 
let pageMeuble = document.querySelector("#page-meuble")

request.onreadystatechange = function(){
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200){
        let results = JSON.parse(this.responseText);
//selection des elements        
        let h1Meuble = document.querySelector("#id-titre");
        let imageMeuble = document.querySelector("#img")
        let description = document.querySelector("#description")
        let achat = document.querySelector("#achat")
        let prix = document.querySelector("#prix")
        let btnAjout = document.querySelector("#btn-panier-ajout")
        let btnSupp = document.querySelector("#btn-panier-supp")
        let nbrArticles = document.querySelector("#nbr-articles")
        let totalArticles = 0



        for (meuble of results){

            h1Meuble.textContent = meuble.name

            imageMeuble.setAttribute("src", meuble.imageUrl)
            imageMeuble.setAttribute("alt", meuble.description)
            
            description.textContent = meuble.description

            prix.textContent = meuble.price + " €"
            nbrArticles.innerHTML = 0
                      

            
        }
//fonction sur le bouton pour ajouter au panier
            btnAjout.addEventListener("click", function(){
                totalArticles++;
                nbrArticles.innerHTML = totalArticles 
                btnSupp.disabled = false
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
           
           
            
    }        
}
request.open ("GET", "http://localhost:3000/api/furniture")
request.send()

export("panier.js")

