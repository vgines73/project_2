console.log("app js loaded")

$(document).ready(function() {

  function getApi() {
    const requestUrl = '/api/artworks';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        // for (var i = 0; i < data.length; i++) {
        //   var listItem = document.createElement('li');
        //   listItem.textContent = data[i].html_url;
        //   repoList.appendChild(listItem);
        // }
      });
  }

  getApi();

});