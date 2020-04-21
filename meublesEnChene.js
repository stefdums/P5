   
let xhr = new XMLHttpRequest();
let listeMeubles = document.getElementById("liste-meubles")
let idMeuble

xhr.onreadystatechange = function(){
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200){
        let results = JSON.parse(this.responseText);
        console.log(results)
 
        
//creation de la boucle, 
              
        for (let i = 0; i < results.length; i++){
         
            idMeuble = results[i]._id
            let nomDuMeuble = results[i].name
            
//création d'un a avec href="meuble.html" pour chaque article,            
            let lien = document.createElement("a");
            lien.id = results[i].name;
            let adressLien = "meuble.html";
            lien.setAttribute("href", "meuble.html?id=" +idMeuble)
            //lien.setAttribute("target", "_blank") 
            lien.textContent = nomDuMeuble
//création d'un li pour chaque article
            let li = document.createElement("li");
            li.classList.add("liste-meuble")
//ajout du a dans le li
            li.appendChild(lien)
            listeMeubles.appendChild(li)

        }          
    }       
};


xhr.open("GET", "http://localhost:3000/api/furniture");
xhr.send();

