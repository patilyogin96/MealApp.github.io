var rem = document.getElementById('fav-display-bar');
// console.log(rem);



// function to remove from array
function removeFromArray(value){

    // console.log(value);
    let fav_list = localStorage.getItem("meals")
    console.log(fav_list);

    fav_list = JSON.parse(fav_list)

    console.log(fav_list);

    fav_list.forEach((element) => {
        console.log(element);
        if(element.id == value)
        {
            let ind = fav_list.indexOf(element)
            console.log(ind);

            fav_list.splice(ind,1)
            console.log(fav_list);
        }
    })

    window.localStorage.setItem("meals", JSON.stringify(fav_list));


}


// function to remove from display
rem.addEventListener('click',function(e){
    // e.target;

    // console.log(e.target.parentElement.parentElement);

    e.target.parentElement.parentElement.remove()
})


// function to display fav meals 
function loadAndRenderFavpage(){
    console.log("Fav pade loaded");

    let fav_list = localStorage.getItem("meals")
    // console.log(fav_list);

    fav_list = JSON.parse(fav_list)

    fav_list.forEach(element => {

        const html = `<div class="dish-card">
        <div id="img-section">
            <img src="${element.img}" alt="">
        </div>
        <div id="info-section">
            <h2 id="dish-name">${element.name}</h2>
           
            
            <button id="rem-fav" onclick="removeFromArray(this.value)" value="${element.id}" >Remove from Favourites</button>
            
           
        </div>`;

        document.getElementById('fav-display-bar').innerHTML += html
        
    });
}












window.onload = loadAndRenderFavpage();