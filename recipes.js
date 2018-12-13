const xhr = new XMLHttpRequest(),
baseUrl = 'https://api.edamam.com/search?q=',
YOUR_APP_ID = "&app_id=6917dbca",
YOUR_APP_KEY = "&app_key=e1bb9b2c26d56922c192da9b5e38ca18",
userInput = document.getElementById('food'),
timeInput = document.getElementById('timeFood'),
selected = document.getElementById('selection'),
submitBtn = document.getElementById('submitMe');


submitBtn.addEventListener('click', function() {
  selected.innerHTML = '';
  let whatTheUserTyped = userInput.value;
  let theTimeSet = timeInput.value;
  selected.innerHTML = `<p>You selected: <span>${whatTheUserTyped}</span> and a maximum cooking time of <span>${theTimeSet}</span> minutes</p>`;
  callThatAPI(whatTheUserTyped, theTimeSet);
  userInput.value = '';
  timeInput.value = '';

});

function callThatAPI(searchParams, timeSet) {
  xhr.open('GET', `${baseUrl}${searchParams}${YOUR_APP_ID}${YOUR_APP_KEY}&from=0&to=21&time=5-${timeSet}`);
  xhr.send();
  xhr.onload = handleSuccess;
  xhr.onerror = handleError;
}

function handleSuccess() {
  var response = JSON.parse(xhr.responseText);
  var hits = response.hits;
  const picsDiv = document.getElementById('pics');
  picsDiv.innerHTML = '';

  console.log("ALL", response);

  for(let i = 0; i < hits.length; i++) {
    picsDiv.innerHTML += `<div class="img-div"><p>${hits[i].recipe.label}</p><img src="${hits[i].recipe.image}" /><a class="linkRecipe" href="${hits[i].recipe.url}">Read the recipe</a></div>`

  }
}

function handleError() {
  console.log('ooops');
}
