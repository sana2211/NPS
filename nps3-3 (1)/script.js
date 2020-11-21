'use strict';
// put your own value below!
const apiKey = "xK8CdTImrEHLFRftUhG6MlpPHiLeQEd7R9hnxCt1";
const searchURL = "https://developer.nps.gov/api/v1/parks";

function submitForm(){
  $('#parkForm').submit(event => {
    event.preventDefault();
    if(!/^\w(\s*,?\s*\w)*$/.test($("#stateInput").val())){
      alert("Invalid input");
      return;
    }
    const userInput = $('#stateInput').val().split(",");
    const numResults = $('#resultInput').val();
    getParkResults(userInput, numResults);
  });
}
//Format Search Query
function formatQueryParams(params){
  const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}
//GET Request to NPS API
function getParkResults(query, maxResults){
  const params = {
    api_key: apiKey,
    stateCode: query,      
    limit: maxResults
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;  
  console.log(url);  
  fetch(url)
    .then(response =>response.json())
    .then(response => renderParkResults(response.data))
  .catch(err => {
           $('#js-error-message').text(`Unfortuntately our server is down and we're unable to process your request at the moment :-(, please try again later.`);
         });
}
//Render the GET Request results to the DOM
function renderParkResults(parkList){    
  console.log(parkList)  
  $('#results-list').empty();
  $('#results').text("Check your search result below:");
  parkList.forEach(item =>{
  $('#results').append(`<li><h3>${item.fullName}</h3>
  <p>${item.description}</p><a href=${item.url}>Park's Website</a><div id="addresses"><h5>${item.addresses[0].type}:</h5><p class="addresses">${item.addresses[0].line1}</p><p class="addresses">${item.addresses[0].line2}</p><p class="addresses">${item.addresses[0].line3}</p>
  <p class="addresses">${item.addresses[0].city}, ${item.addresses[0].stateCode}, ${item.addresses[0].postalCode}</p></div>
  <p class="states"><b>${item.states}</b></p></div>
  </li>`)
});
}

$(submitForm);
    
