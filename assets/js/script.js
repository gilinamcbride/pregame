//global variables:
var citySearchArray = [];
var formEl = document.querySelector("#form");
var formInputEl = document.querySelector("#search-bar");
var breweryListEl = document.querySelector("#brew-list-btns");
var eventsListEl = document.querySelector("#beats-list-btns");
var brewCityTitleEl = document.querySelector("#location-brew");
var beatsCityTitleEl = document.querySelector("#location-beats");
var recentSearchEl = document.querySelector("#recent-search");
var btn;
var clearSearchBtn = document.querySelector("#clear-search");

// function to get the form value on submit and send it to the next functions
// if no city is entered it tells user to enter a city and returns out of function
var submitForm = function (event) {
  event.preventDefault();
  var cityInput = formInputEl.value.trim();
  var city = cityInput.toLowerCase();
  var formErrorEl = document.querySelector("#form-error");
  if (city) {
    formErrorEl.textContent = "";
    getBreweryArray(city);
    getEventArray(city);
    saveCitySearch(cityInput);
  } else {
    var errorAlert = document.createElement("p");
    errorAlert.textContent = "Please enter a city name.";
    errorAlert.className = "form-error";
    formErrorEl.appendChild(errorAlert);
    return;
  }
};
formEl.addEventListener("submit", submitForm);

// function to fetch data from open brewery db API using information from search function or from recent search buttons
// sends data retrieved to next function to display on page
var getBreweryArray = function (location) {
  var breweryApi =
    "https://api.openbrewerydb.org/breweries?by_city=" +
    location +
    "&per_page=10";
  fetch(breweryApi)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (breweryData) {
          breweryDisplay(breweryData);
        });
      } else {
        console.log("No breweries available in this area.");
        return;
      }
    })
    .catch(function (error) {
      console.log("Unable to connect to Beats & Brews");
    });
};

// function to fetch ticketmaster event API using information gained from search function or from recent search buttons
// sends data retrieved to next function to display on page
var getEventArray = function (location) {
  var eventApi =
    "https://app.ticketmaster.com/discovery/v2/events.json?size=10&city=" +
    location +
    "&apikey=QzmSyGhz4EWBjtKkGYvAcjyFA6wOqBoG";
  fetch(eventApi)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (eventData) {
          eventsDisplay(eventData);
        });
      } else {
        console.log("No events found");
      }
    })
    .catch(function (error) {
      console.log("Unable to connect to Beats & Brews");
    });
};

// function to display brewery information on page - name of brewery/adress/website/clickable link
var breweryDisplay = function (breweryArray) {
  breweryListEl.textContent = "";
  brewCityTitleEl.textContent = "";

  var title = (brewCityTitleEl.textContent = formInputEl.value.trim());
  if (!title) {
    brewCityTitleEl.textContent = btn.getAttribute("data-name");
  }
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
    breweryLinkEl.setAttribute("target", "blank");

    var titleEl = document.createElement("button");
    titleEl.className = "results";
    titleEl.innerHTML = name + "<br/>" + address;

    breweryLinkEl.appendChild(titleEl);

    breweryListEl.appendChild(breweryLinkEl);
  }
};

// function to display entertainment event information - name/date/venue/clickable link
var eventsDisplay = function (eventsObj) {
  eventsListEl.textContent = "";
  beatsCityTitleEl.textContent = "";

  var title = (beatsCityTitleEl.textContent = formInputEl.value.trim());
  if (!title) {
    beatsCityTitleEl.textContent = btn.getAttribute("data-name");
  }
  formInputEl.value = "";

  var eventsArray = eventsObj._embedded.events;
  for (var i = 0; i < eventsArray.length; i++) {
    var name = eventsArray[i].name;
    var url = eventsArray[i].url;
    var arrayDate = eventsArray[i].dates.start.localDate;
    var date = moment(arrayDate).format("MMM DD, YYYY");
    var venue = eventsArray[i]._embedded.venues[0].name;

    var eventLinkEl = document.createElement("a");
    eventLinkEl.setAttribute("href", url);
    eventLinkEl.setAttribute("target", "blank");

    var titleEl = document.createElement("button");
    titleEl.className = "results";
    titleEl.innerHTML = name + "<br/>" + date + "<br/>" + venue;

    eventLinkEl.appendChild(titleEl);

    eventsListEl.appendChild(eventLinkEl);
  }
};

// function to store recent searches to local storage
function saveCitySearch(cityName) {
  if (citySearchArray.indexOf(cityName) !== -1) {
    return;
  }
  citySearchArray.push(cityName);
  localStorage.setItem("city", JSON.stringify(citySearchArray));
  displayRecentSearch();
}

// function to retrieve recent searches from local storage
// calls next function to display items from storage on page
function getRecentSearch() {
  var citySearch = localStorage.getItem("city");
  if (citySearch) {
    citySearchArray = JSON.parse(citySearch);
  }
  displayRecentSearch();
}

// function to display recent searches as clickable buttons on the page
function displayRecentSearch() {
  recentSearchEl.innerHTML = "";
  for (var i = citySearchArray.length - 1; i >= 0; i--) {
    var searchBtn = document.createElement("button");
    searchBtn.setAttribute("type", "button");
    searchBtn.className = "btn-data";
    searchBtn.setAttribute("data-name", citySearchArray[i]);
    searchBtn.textContent = citySearchArray[i];
    recentSearchEl.appendChild(searchBtn);
  }
}

// function to call when a recent search button is clicked
// takes the data-attribute "data-name" and sends back through getBreweryArray and getEventArray
function savedHistoryClick(e) {
  if (!e.target.matches(".btn-data")) {
    return;
  }
  btn = e.target;
  var city = btn.getAttribute("data-name");
  getBreweryArray(city);
  getEventArray(city);
}
// event listener for click on recent search button to start saveHistoryClick function
recentSearchEl.addEventListener("click", savedHistoryClick);

// call function getRecentSearch at the bottom of page so it displays recent search info always
getRecentSearch();

//TODO: event listener to clear recent search buttons and localStorage
// clearSearchBtn.addEventListener("click", function () {
//   localStorage.clear();
//   recentSearchEl.innerHTML = "";
// });

// TODO: Solve empty array problem and missing events data problem
//   if (breweryArray === []) {
//     var noBreweries = document.createElement("p");
//     noBreweries.textContent = "There are no breweries found in this area.";
//     breweryListEl.appendChild(noBreweries);
//     console.log(noBreweries);
//   }
// if there is no .events on the object

// TODO: replace console.log errors with something else
