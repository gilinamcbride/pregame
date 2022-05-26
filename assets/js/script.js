//global variables needed:
var citySearchArray = [];

// TODO: function to capture form input on click

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
var getConcertArray = function (location) {
  var concertApi =
    "https://api.songkick.com/api/3.0/search/locations.json?query=" +
    location +
    "&apikey={your_api_key}";
  fetch(concertApi)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (concertData) {
          console.log(concertData);
        });
      } else {
        console.log("No concerts found");
      }
    })
    .catch(function (error) {
      console.log("Unable to connect to Beats & Brews");
    });
};
// getConcertArray("nashville");

// TODO: function to display brewery information - name of brewery/adress/website

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
saveCitySearch("charlotte");

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
