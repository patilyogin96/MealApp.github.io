const inpVal = document.getElementById("search");

const innnn = document.querySelector("input");
console.log(innnn.value);

var suggest = [];

function toGetArray() {
  fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then((response) => response.json())
    .then((data) => {
      // console.log(data.categories["0"])

      var arsg = data.categories;

      // console.log(arsg);

      arsg.forEach((element) => {
        suggest.push(element.strCategory);
      });
      // console.log(data["0"].strCategory)
      // for(let x of data)
      console.log('suggest array');
      console.log(suggest);
    });
}

toGetArray();

function listing() {
  removeElements();

  for (let i of suggest) {
    if (
      i.toLowerCase().startsWith(inpVal.value.toLowerCase()) &&
      inpVal.value != ""
    ) {
      // console.log("exe in listing fun");
      let listItem = document.createElement("li");
      listItem.classList.add("list-items");
      listItem.style.cursor = "pointer";
      listItem.setAttribute("onclick", "displayNames('" + i + "')");

      let word = "<b>" + i.substr(0, inpVal.value.length) + "</b>";
      console.log(word);

      word += i.substr(inpVal.value.length);
      console.log(word);
      listItem.innerHTML = word;
      document.querySelector(".list").appendChild(listItem);
    }
  }
}

function displayNames(value) {
  inpVal.value = value;
  // console.log(inpVal.value);
  removeElements();
}

function removeElements() {
  //clear all the item
  let items = document.querySelectorAll(".list-items");
  items.forEach((item) => {
    item.remove();
  });
}

// let sortsuggest = suggest.sort();

const favouriteList = [];
// set favouriteList to the local storage.
window.localStorage.setItem("meals", JSON.stringify(favouriteList));
// console.log(favouriteList);

function addToFav(value) {
  // console.log(value);
  // console.log(value.length)

  if (localStorage.getItem("meals") === null) {
    // console.log("true")
  } else {
    // console.log("false")

    let favouriteList = localStorage.getItem("meals");
    console.log(favouriteList);

    favouriteList = JSON.parse(favouriteList);
    console.log(favouriteList);

    let dish_name = "";
    let area_name = "";
    let dish_img = "";
    let dish_num = "";
    let start = 0;
    let end = 0;
    console.log(dish_name.length);

    for (let i = 0; i < value.length; i++) {
      if (value.charAt(i) == "-" && dish_num == 0) {
        end = i;

        dish_num = value.substring(start, end);
        // console.log(dish_num);
        start = i + 1;
        end = i + 1;
      } else if (value.charAt(i) == "-" && dish_name == 0) {
        end = i;

        dish_name = value.substring(start, end);
        // console.log(dish_name);
        start = i + 1;
        end = i + 1;
        // return;
      } else if (value.charAt(i) == "-" && area_name == 0) {
        end = i;

        dish_area = value.substring(start, end);
        // console.log(dish_area);
        start = i + 1;
        end = i + 1;
      } else if (i == value.length - 1 && dish_img == 0) {
        end = i + 1;

        dish_img = value.substring(start, end);
        // console.log(dish_img);
        start = i + 1;
        end = i + 1;
      }
    }

    var isDishPresent = false;

    favouriteList.forEach((element) => {
      if (element.id == dish_num) {
        alert("Dish Already present");

        isDishPresent = true;
      }
    });

    if (!isDishPresent) {
      favouriteList.push({
        name: dish_name,
        id: dish_num,
        img: dish_img,
      });
      alert("Added to fav");
    }

    // console.log(favouriteList);
    window.localStorage.setItem("meals", JSON.stringify(favouriteList));
    // console.log(favouriteList)
  }
}

function testing(idnum) {
  // console.log(idnum)

  window.localStorage.setItem("dish_details", idnum);
}

function displayAllDishes(dish) {
  dish.forEach((element) => {
    // console.log(element)
    var name = element.strMeal;
    var area = element.strArea;
    var img = element.strMealThumb;
    var num = element.idMeal;
    // console.log(num)

    const html = `<div class="dish-card" id="dish-card">
        <div id="img-section">
            <img src="${img}" alt="">
        </div>
        <div id="info-section">
            <h2 id="dish-name" style="font-size: 25px;">${name}</h2>
            <h4 id="dish-area" style="font-size: 20px;">${area}</h4>
            <a href="moreinfo.html" target="_blank"><button id="know-more" onclick="javascript:testing(this.value)" value="${num}">Know More</button></a>
             <button type="click" id="add-fav" onclick="addToFav(this.value)" value = "${num}-${name}-${area}-${img}" ><span><i class="fa-solid fa-heart"></i></span> Add to favourites</button>
           
        </div>`;

    document.getElementById("display-bar").innerHTML += html;
  });
}

// function to search all dishes from api

function searchResult() {
  // inpVal.remove();
  // console.log(inpVal.value);
  // console.log(inpVal.value.toLowerCase());
  // console.log("search call happening");

  if (inpVal.value.length < 2 || inpVal == "") {
    alert("Enter a valid dish name");
  } else {
    // var inputtt = inpVal.value;
    fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${inpVal.value}`
    )
      .then((respone) => respone.json())
      .then((data) => {
        var dishname = data.meals;
        if (dishname == null) {
          alert("Dish Not found");
        } else {
          displayAllDishes(dishname);
        }
        // console.log(dishname)
      });
  }
}
