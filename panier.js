
let ul = document.querySelector("ul")
let divPanier = document.querySelector("#liste-panier");
let table = document.querySelector("table")
let tFoot = document.querySelector("#prix-total")
tFoot.innerHTML = "Votre panier est vide"
const panierVide =()=>{
    tFoot.innerHTML = "Votre panier est vide"
}
let productsTotal = []; // panier total
let product; // article dans le panier
let prixTotal = 0
let products_id = []// recuperation des id

//recuperation des données d'ajout au panier
//création d'un tableau "productsTotal" avec ajout de tableau "product" avec données pour chaque meuble

for (let i=0; i<localStorage.length; i++){
    let stringProduct = localStorage.getItem(localStorage.key([i])) //recup la chaine de caracteres de chaque localStorage
    //console.log(stringProduct)
    let product = stringProduct.split(",");// [name, vernis, qté, prixTT, id]
    //console.log(product)
    productsTotal.push(product)
/**
 * TEST 
 * verif que product et productsTotal sont des tableaux
 */
console.log(Array.isArray(product), Array.isArray(productsTotal))
}
if(prixTotal = 0){
    panierVide();
}
for (let i = 0; i < productsTotal.length; i++){
    let tr = document.createElement("tr")
    let btnSupp = document.createElement("button")
    btnSupp.innerHTML = "Supprimer"

    prixTotal += parseInt(productsTotal[i][3],10)
    tFoot.innerHTML = `Prix total: ${prixTotal}  €`    
    
    
// ajout du bouton pour supp la ligne   
    btnSupp.addEventListener("click", function(e){
        prixTotal -= parseInt(productsTotal[i][3],10)
        if(prixTotal <= 0){
            panierVide()
        }else{
            tFoot.innerHTML = `Prix total: ${prixTotal}  €`
        }
        //console.log(prixTotal)
        localStorage.removeItem(localStorage.key([i]))
        tr.remove();
        event.stopPropagation()   
    })

//boucle pour ajouter des cases aux lignes avec [name, vernis, qté, prixTT, id]
    for(let j=0; j<productsTotal[i].length -1; j++){ // -1 pour enlever l'affichage de l id
        let th = document.createElement("th")
        th.innerHTML = productsTotal[i][j]
        table.appendChild(tr)
        tr.appendChild(th)  
    }
    tr.appendChild(btnSupp)
}

/**
 * Création d'une boucle pour
 * recuperation dans products_id[] des product[5] de productsTotal[] 
 * 
 */
for(let i=0; i<productsTotal.length; i++){
    products_id.push(productsTotal[i][4])
}

/**
 * 
 * validation inputs du formulaire [^0-9]
 *  
*/
// regex commence par a-z ou en maj, puis que des lettres et avec accents, plus que 2 lettres puis ajout hypothetique du prenom composé
let regexText = /^[a-zA-Zéèçîï][a-zA-Zéèêçîï]+([a-zA-Zéèêçîï\-'\s]+)$/; 
let regexMail = /.+@.+\..+/
let contact
let form = document.getElementById("form")
let inputs = document.forms["form"]
let champsText = document.querySelectorAll(".only-letters")
let champMail = inputs.querySelector("[type=email]")
let champAddress = inputs.querySelector("#address")

/**
 * fonction pour valider le champ
 * @param {string} champ 
 */
let styleInputValid =(champ)=>{ 
    champ.nextElementSibling.innerHTML = "&#10004"
    champ.nextElementSibling.style.color = "green"
    champ.dataset.valid = "true"
    
}
/**
 * fonction pour erreur champ vide
 * @param {string} champ 
 */
let erreurVide = (champ)=>{ 
    champ.nextElementSibling.innerHTML = champ.previousElementSibling.innerHTML + " est vide"
    champ.nextElementSibling.style.color = "red"
    champ.dataset.valid = "false"
    
}
/**
 * fonction pour erreur champ non conforme
 * @param {string} champ 
 */
let erreurConformite = (champ)=>{ 
    champ.nextElementSibling.innerHTML = champ.previousElementSibling.innerHTML + " n'est pas conforme"
    champ.nextElementSibling.style.color = "orange"
    champ.dataset.valid = "false"
    
}

//traitement pour validation inputs avec du text
for (let i=0; i< champsText.length; i++){
    champsText[i].addEventListener("blur", function(e){
    
        if(!champsText[i].value){
            e.preventDefault()
            erreurVide(champsText[i])
        }else if(!regexText.test(champsText[i].value)) {
            e.preventDefault()
            erreurConformite(champsText[i])

        }else{
            styleInputValid(champsText[i])
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
//validation des inputs avec une address
champAddress.addEventListener("blur", function(e){
    if(!champAddress.value){
        e.preventDefault()
        erreurVide(champAddress)
    }else{
        styleInputValid(champAddress)
          
    }    
})
 
let responseSubmit;
let json
/**
 * fonction asynchrone pour envoyer avec POST json avec contact et products
 */
const postForm = async function(){
    try{
        let response = await fetch("http://localhost:3000/api/furniture/order", {
            method:'POST',
            headers:{
                "X-Requested-With":"XMLHttpRequest",
                'Content-type': 'application/json'
            },
            body: json
        })
        responseSubmit = await response.json()
        if(response.ok === false){//si le status n'est pas entre 200 et 299
            console.error(responseSubmit + response.status)
        }else {
/**
 * TEST verif qu'on envoi bien une chaine de caractere (json) et que la reponse est bien un objet 
 * 
 */            
            console.log(typeof(json) == "string")
            console.log( "envoi correct")
            console.log(responseSubmit instanceof Object)
            


        } 
    }catch(e){
        console.log("probleme avec postForm  "+e)
    }
};

/**
 * Submit si TOUT les champs du formulaire sont validés
 */
form.addEventListener("submit", async function(e){
    let valide = true
    for(let input of inputs){
        //console.log(input.dataset.valid)
        if(input.dataset.valid == "false"){
            e.preventDefault()
            valide = false
            break    
        }
    }
    if (valide == true && table.children.length > 2 ){
/**
 * TEST verif valid == true && panier non vide
 */
console.log(valide == true)
console.log(table.children.length >2)


        e.preventDefault() 
/**
 * création d'un nouvel objet FormData qui recupere les names du formulaire et leurs valeurs
 */        
        contact = new FormData(form)
/**
 * variable pour convertir FormData en objet JS
 */        
        let object = {};
        contact.forEach(function(value, key){
        object[key] = value; 
        });
/**
* variable a envoyer en POST avec object{} qui contient le FormData et products[] qui contient les id du panier 
*/        
        json = JSON.stringify({"contact":object, "products": products_id});
        await postForm()
               
/**
*  Recuparation en localStorage du firstName, lastName, prixTotal et orderId
* */    
     
        localStorage.setItem("commande-contactPrenom", responseSubmit.contact.firstName)
        localStorage.setItem("commande-contactNom", responseSubmit.contact.lastName)
        localStorage.setItem("commande-prix",prixTotal)
        localStorage.setItem("commande-id",responseSubmit.orderId)
        
        window.open("merci.html", '_self')
         
        console.log("formulaire validé et envoyé")
    }else{
        e.preventDefault()
        if(valide != true){
            console.error("Le formulaire est mal remplis")
            alert("Le formulaire est mal remplis")
        }
        else if (table.children.length == 2){
            console.error(" votre panier est vide")
            alert("votre panier est vide")
        }
    }     
})

