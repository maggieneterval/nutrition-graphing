function updateSearch (userInput) {

  const searchDatalist = document.getElementById('search-results');
  searchDatalist.innerHTML = '';
  if (!userInput) return;

  searchForFood(userInput, 5, USDA_API_KEY)
    .then(res => {
      if (!res.list) return;
      const searchResults = res.list.item;
      for (let i = 0; i < searchResults.length; i++) {
        if (searchResults[i].name === userInput){
          setFood(searchResults[i]);
          return;
        }
        const newOption = document.createElement('option');
        newOption.value = searchResults[i].name;
        searchDatalist.appendChild(newOption);
      }
    });
}

function setFood (result) {
  drawGraph(result.ndbno);
  //todo: display name of food item on page?
}
