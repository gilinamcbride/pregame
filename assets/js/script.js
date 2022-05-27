//global variables needed:
var citySearchArray = [];
var formEl;
var formInputEl;
var breweryListEl = document.querySelector("#brews-list");

// TODO: function to capture form input on click
var submitForm = function (event) {
  event.preventDefault();
  var cityInput = formInputEl.value.trim();
  var city = cityInput.toLowerCase();
  if (city) {
    getBreweryArray(city);
    //   getConcertArray(city);
    saveCitySearch(cityInput);
  } else {
    alert("Please enter a city name.");
  }
};
// formEl.addEventListener("submit", submitForm);

// TODO: function to use brew API /fetch /catch with information from search function

var getBreweryArray = function (location) {
  var breweryApi =
    "https://api.openbrewerydb.org/breweries?by_city=" +
    location +
    "&per_page=15";
  fetch(breweryApi)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (breweryData) {
          console.log(breweryData);
          breweryDisplay(breweryData);
        });
      } else {
        console.log("No breweries found");
      }
    })
    .catch(function (error) {
      console.log("Unable to connect to Beats & Brews");
    });
};
getBreweryArray("los angeles");

// TODO: function to use concert API /fetch /catch with information from search function
var getSecondArray = function (location) {
  var concertApi = "http://www.boredapi.com/api/activity/";
  fetch(concertApi)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          //   eventsDisplay(data);
        });
      } else {
        console.log("No concerts found");
      }
    })
    .catch(function (error) {
      console.log("Unable to connect to Beats & Brews");
    });
};
// getSecondArray();

// TODO: function to display brewery information - name of brewery/adress/website

var breweryDisplay = function (breweryArray) {
  for (var i = 0; i < breweryArray.length; i++) {
    var name = breweryArray[i].name;
    var address =
      breweryArray[i].street +
      " " +
      breweryArray[i].city +
      ", " +
      breweryArray[i].state +
      " " +
      breweryArray[i].postal_code;
    var url = breweryArray[i].website_url;

    var breweryLinkEl = document.createElement("a");
    breweryLinkEl.setAttribute("href", url);

    var titleEl = document.createElement("button");
    titleEl.innerHTML = name + "<br/>" + address;

    breweryLinkEl.appendChild(titleEl);

    breweryListEl.appendChild(breweryLinkEl);
  }
};

// TODO: function to display concert information

// TODO: store recent searches

function saveCitySearch(cityName) {
  if (citySearchArray.indexOf(cityName) !== -1) {
    return;
  }
  citySearchArray.push(cityName);
  localStorage.setItem("city", JSON.stringify(citySearchArray));
}
//remove this call when placing it in correct location
// saveCitySearch("charlotte");

// TODO: retrieve recent searches

function getRecentSearch() {
  var citySearch = localStorage.getItem("city");
  if (citySearch) {
    citySearchArray = JSON.parse(citySearch);
  }
  console.log(citySearchArray);
  // add function call to display recent searches
}
//remove this call when placing it in correct location - needs a separate call at the botton on its own
getRecentSearch();

// TODO: display recent searches

// TODO: call get recent search function at the bottom

// POTENTIAL ADD ONS
// google map to populate based on city searched
