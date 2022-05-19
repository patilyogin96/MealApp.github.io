
function displayInformation(data){
   
        // console.log(data["0"].strMeal);
        let dish_extract = data["0"];
        console.log(dish_extract);

        let name = dish_extract.strMeal;
        let img = dish_extract.strMealThumb;
        let instruction =dish_extract.strInstructions;

        const html =`<div class="more-info-container">

        <div>
          <h1>${name}</h1>
        </div>
        <div id="detail-img">
          <img src="${img}" alt="">
        </div>
        <div id="p-of-inst">
          <p>${instruction}</p>
        </div>
      </div>`


      document.getElementById('dis-details').innerHTML += html;

    
}






function fetchMoreDetails(){
    console.log('Fetch more detail page loaded')

    let dish_det  =  window.localStorage.getItem('dish_details');
    // console.log(dish_det);

    // const url = `www.themealdb.com/api/json/v1/1/lookup.php?i=${dish_det}`;

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${dish_det}`)
  .then(response => response.json())
  .then(data =>{
    //   console.log(data)
    var info_of_dish = data.meals
    displayInformation(info_of_dish);
} );


}




window.onload = fetchMoreDetails();