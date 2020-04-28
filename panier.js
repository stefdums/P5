
let ul = document.querySelector("ul")
let divPanier = document.querySelector("#liste-panier");
let table = document.querySelector("table")
let tFoot = document.querySelector("#prix-total")
let arrayPanier = [];
let prixTotal = 0
let product;

//recuperation des données d'ajout au panier
//création d'un tableau "arrayPanier" avec ajout de tableau "product" avec données pour chaque meuble

for (let i=0; i<localStorage.length; i++){
    let stringProduct = localStorage.getItem(localStorage.key([i]))
    //console.log(stringProduct)
    let product = stringProduct.split(",");// [name, vernis, qté, prixTT, id]
    //console.log(product)
    arrayPanier.push(product)
}
//console.log(arrayPanier)
//console.log(parseInt(arrayPanier[0][3],10))
if(prixTotal = 0){
    tFoot.innerHTML = "Votre panier est vide"
}
for (let i = 0; i < arrayPanier.length; i++){
    let tr = document.createElement("tr")
    let btnSupp = document.createElement("button")
    btnSupp.innerHTML = "Supprimer"

    prixTotal += parseInt(arrayPanier[i][3],10)
    tFoot.innerHTML = prixTotal + " €"    
    //console.log(tFoot.innerHTML)
    
    
// ajout du bouton pour supp la ligne   
    btnSupp.addEventListener("click", function(e){
        prixTotal -= parseInt(arrayPanier[i][3],10)
        if(prixTotal <= 0){
            tFoot.innerHTML = "Votre panier est vide"
        }else{
            tFoot.innerHTML = prixTotal + " €"
        }
        //console.log(prixTotal)
        localStorage.removeItem(localStorage.key([i]))
        tr.remove();
        event.stopPropagation()
        
    })

//boucle pour ajouter des cases aux lignes avec [name, vernis, qté, prixTT, id]
    for(let j=0; j<arrayPanier[i].length -1; j++){ // -1 pour enlever l'affichage de l id
        let th = document.createElement("th")
        th.innerHTML = arrayPanier[i][j]
        table.appendChild(tr)
        tr.appendChild(th)
        
    }
    tr.appendChild(btnSupp)
}

//test bouton pour recup le tableau de commande
let btnTest = document.querySelector("#btn-test")
btnTest.addEventListener("click", function(e){
    console.log(arrayPanier)
})






//validation inputs du formulaire



// regex commence par a-z ou en maj, puis que des lettres et avec accents, plus que 2 lettres puis ajout hypothetique du prenom composé
let regexText = /^[a-zA-Zéèîï][a-zéèêçîï]+([-'\s][a-zA-Zéèîï][a-zéèêçîï]+)?/; 
let regexMail = /.+@.+\..+/
let contact
let form = document.getElementById("form")
let inputs = document.forms["form"]
let champsText = inputs.querySelectorAll("[type=text]")
let champMail = inputs.querySelector("[type=email]")
let champAdress = inputs.querySelector("#adress")


let styleInputValid =(champ)=>{ // fonction pour valider le champ
    champ.nextElementSibling.innerHTML = "&#10004"
    champ.nextElementSibling.style.color = "green"
    champ.dataset.valid = "true"
    return true;
}
let erreurVide = (champ)=>{ // fonction pour erreur champ vide
    
    champ.nextElementSibling.innerHTML = champ.previousElementSibling.innerHTML + " est vide"
    champ.nextElementSibling.style.color = "red"
    champ.dataset.valid = "false"
    return false
}
let erreurConformite = (champ)=>{ // fonction pour erreur champ non conforme
    
    champ.nextElementSibling.innerHTML = champ.previousElementSibling.innerHTML + " n'est pas conforme"
    champ.nextElementSibling.style.color = "orange"
    champ.dataset.valid = "false"
    return false
}


//traitement pour validation inputs avec du text
let onlyLetters = document.querySelectorAll(".only-letters")

for (let i=0; i< onlyLetters.length; i++){
    onlyLetters[i].addEventListener("blur", function(e){
    
        if(!onlyLetters[i].value){
            e.preventDefault()
            erreurVide(onlyLetters[i])

        }else if(!regexText.test(onlyLetters[i].value)) {
            e.preventDefault()
            erreurConformite(onlyLetters[i])

        }else{
            styleInputValid(onlyLetters[i])
            
            
        }
    })
}
//validation des inputs avec un mail
champMail.addEventListener("blur", function(e){
    
    if(!champMail.value){
        e.preventDefault()
        erreurVide(champMail)
        
    }else if(!regexMail.test(champMail.value)){
        e.preventDefault()
        erreurConformite(champMail)
    }else{
        styleInputValid(champMail)
        
    }
})
//validation des inputs avec une adress
champAdress.addEventListener("blur", function(e){
    if(!champAdress.value){
        e.preventDefault()
        erreurVide(champAdress)
    }else{
        styleInputValid(champAdress)
          
    }    
})



//console.log(contact)

form.addEventListener("submit", function(e){
    let valide = true
    for(let input of inputs){
        console.log(input.dataset.valid)
        if(input.dataset.valid == "false"){
            e.preventDefault()
            valide = false
            break
            
        }else {
            console.log("test")
        }
    }
    if (valide == true){
        contact = new FormData(form)
        console.log(valide)
        confirm(arrayPanier, contact) 
    }else{
            alert("marche pas")
        } 
})

                
    //envoie des infos
            // let contact = new FormData(form)
            // console.log(contact.get("lastName"))
            // let xhr = new XMLHttpRequest();
            // xhr.onreadystatechange = function(){
            //     if(this.readyState == XMLHttpRequest.DONE && this.status == 200
            //         ){
            //         console.log(JSON.parse(this.response))
            //         console.log(this.value)
            //         confirm("ca marche")

            //     }        
            //     else{
            //         e.preventDefault()
            //         alert("pas de connection")
            //         //console.log(contact)
            //     }
            // }    
            // xhr.open("POST", "http://localhost:3000/api/furniture/order")
            // xhr.responseType = "json"
            // xhr.setRequestHeader("Content-Type", "application/json");
            // xhr.send()// faut reussir à envoyer (product_product[5]) et contact

