
let listeMeubles = document.getElementById("liste-meubles")
let idMeuble

const getFurnitures = async function(){
    try{
        let response = await fetch("http://localhost:3000/api/furniture")//renvoi une promesse
        if(response.ok){//status = 200->299
            let results = await response.json()//renvoi une promesse (converti en json)
/**
 *  TEST retour d'un tableau d'objet
 */            
            console.log(Array.isArray(results))
            
            for (let i = 0; i < results.length; i++){
         
                idMeuble = results[i]._id
                let nomDuMeuble = results[i].name
                
            //création d'un a avec href="meuble.html" pour chaque article,            
                let lien = document.createElement("a");
                lien.id = results[i].name;
                let adressLien = "produit.html";
                lien.setAttribute("href", "produit.html?id=" +idMeuble) 
                lien.textContent = nomDuMeuble
            //création d'un li pour chaque article
                let li = document.createElement("li");
                li.classList.add("liste-meuble")
            //ajout du a dans le li
                li.appendChild(lien)
                listeMeubles.appendChild(li)
            }

/**
 * TEST bon nombre de li en fonction de results.lenght
 */          
console.log(listeMeubles.children.length == results.length)

        }else{
            console.error("Retour du serveur: ", response.status)
        } 
    }catch(e){
        console.error(e + " probleme avec le fetch, promesse rejetée") // si resolution de la promesse est une erreur
    }      
}
getFurnitures()

