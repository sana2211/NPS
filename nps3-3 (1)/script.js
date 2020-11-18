'use strict';
// put your own value below!
const apiKey = "xK8CdTImrEHLFRftUhG6MlpPHiLeQEd7R9hnxCt1";
const searchURL = "https://developer.nps.gov/api/v1/parks";

function submitForm(){
    $('.js-form').submit(e => {
      e.preventDefault();
      const userInput = $('#stateInput').val();
      const numResults = $('#resultInput').val();
      getParkResults(userInput, numResults);
    });
}

function formatQueryParams(params){
  const queryItems = Object.keys(params)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function getParkResults(query, limit){
  const params = {
      api_key: apiKey,
      stateCode: query,      
      limit: limit
  };
let queryString = $.param(params);
 const url = searchURL + '?' + queryString;
     console.log("url", url);
    
  fetch(url)
         if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    }).then(responseJson => displayResults(responseJson.data))
    .catch(err=> {
        $("#js-error-message").text(`Something failed: ${err.message}`);
    })
}

function displayResults(parkList){
  console.log(parkList)
    $('#results').html("");
    $('.result-header').append("Check your search result below:");
    parkList.forEach(item =>{
    $('#results').append(`<li><h3>${item.fullName}</h3>
    <p>${item.description}</p><a href=${item.url}>Park's Website</a><div id="addresses"><h5>${item.addresses[0].type}:</h5><p class="addresses">${item.addresses[0].line1}</p><p class="addresses">${item.addresses[0].city}</p><p class="addresses">${item.addresses[0].stateCode}</p>
    <p class="addresses">${item.addresses[0].city}, ${item.addresses[0].stateCode}, ${item.addresses[0].postalCode}</p></div></li>`)
    });
}

function init(){
    submitForm();
}

$(init);
