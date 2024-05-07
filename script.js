let inject = document.getElementById('inject')

fetch("https://tyradex.tech/api/v1/gen/1")
.then(response => {
  return response.json();
})
  .then(data => {
    data.forEach(pokeForeach)
    function pokeForeach(pokemon){

      let name = pokemon.name.fr
      let type = pokemon.types[0].name
      let pic = pokemon.sprites.regular

      inject.innerHTML += `
      <div class="card">
        <div class="upCard">
          <img src="` + pic + `" alt=""><p>` + name +`</p>
        </div>
        <div class="middleCard"></div>
        <div class="bottomCard">
          <p>Types : ` + type + `</p>
        </div>
      </div>`
    }
  })
  .catch(error => {
    console.error("There was a problem with the fetch operation:", error);
  });
