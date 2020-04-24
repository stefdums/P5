
let ul = document.querySelector("ul")
let divPanier = document.querySelector("#liste-panier");
let table = document.querySelector("table")

//recuperation des données d'ajout au panier
let arrayMeuble = localStorage.getItem("panier")
console.log(arrayMeuble)
let products = arrayMeuble.split(",");// [name, vernis, qté, prixTT, id]

console.log(products)


// class LignePanier{
//     constructor(name, vernis, nbrArticles , totalArticles){
//         this.name = name;
//         this.vernis = vernis;
//         this.nbrArticles = nbrArticles;
//         this.totalArticles = totalArticles; 
//     }  
// }
//let monPanier = new LignePanier(products[0],products[1],products[2],products[3])

// boucle pour chaque localStorage création d'un ligne tableau et une colonne pour chaque 
//for (let i = 0; i < localStorage.length; i++){
    let tr = document.createElement("tr")

    for (let j = 0; j < products.length -1; j++){
        
        let th = document.createElement("th")
        th.id = products[j]
        th.innerHTML = products[j]
        table.appendChild(th)
        table.appendChild(tr)
        
    }
//}

//validation inputs du formulaire



// regex commence par a-z ou en maj, puis que des lettres et avec accents, plus que 2 lettres puis ajout hypothetique du prenom composé
let regexText = /^[a-zA-Zéèîï][a-zéèêçîï]+([-'\s][a-zA-Zéèîï][a-zéèêçîï]+)?/; 
let regexMail = /.+@.+\..+/

let form = document.getElementById("form")
let inputs = document.forms["form"]
let champsText = inputs.querySelectorAll("[type=text]")
let champMail = inputs.querySelector("[type=email]")
let champAdress = inputs.querySelector("#adress")

let styleInputValid =(champ)=>{ // fonction pour valider le champ
    champ.nextElementSibling.innerHTML = "&#10004"
    champ.nextElementSibling.style.color = "green"
    return true;
}
let erreurVide = (a)=>{ // fonction pour erreur champ vide
    
    a.nextElementSibling.innerHTML = a.previousElementSibling.innerHTML + " est vide"
    a.nextElementSibling.style.color = "red"
    return false
}
let erreurConformite = (b)=>{ // fonction pour erreur champ non conforme
    
    b.nextElementSibling.innerHTML = b.previousElementSibling.innerHTML + " n'est pas conforme"
    b.nextElementSibling.style.color = "orange"
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

let contact = new FormData(inputs)
console.log(contact)

inputs.addEventListener("submit", function(e){

    console.log(inputs)
    
    if(!inputs.value)  {          
   //envoie des infos
        let contact = new FormData(inputs)
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(this.readyState == XMLHttpRequest.DONE && this.status == 200
                ){
                console.log(JSON.parse(this.response))
                console.log(this.value)

            }        
            else{
                e.preventDefault()
                console.log("pas de connection")
                //console.log(contact)
            }
        }    
        xhr.open("GET", "http://localhost:3000/api/furniture/order")
        //xhr.responseType = "json"
        //xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send()// faut reussir à envoyer (products_products[5]) et contact
    }else{
        console.log("probleme")
    }    
})



let verif = ()=>{
    for (let i=0; i< onlyLetters.length; i++){
        if(!onlyLetters[i].value && !regexText.test(onlyLetters[i].value)){
            e.preventDefault()
            return false

        }else{
            return true
                
        }   
    }
    if(!champMail.value && !regexMail.test(champMail.value) && !champAdress.value){
        e.preventDefault()
        return false
    }else{
    return true    
    }
}

