let inject = document.getElementById('inject')
let popupInject = document.getElementById('popupInject')

//Afficher POPUP

function popup(id){

  let url = "https://tyradex.tech/api/v1/pokemon/" + id

  fetch(url)
  .then(response => {
    return response.json();
  })
    .then(pokemon => {

        let name = pokemon.name.fr
        let types = pokemon.types
        let talents = pokemon.talents
        let pic = pokemon.sprites.regular
        let id = pokemon.pokedex_id

        popupInject.innerHTML = `
        <button type="button" name="button" onclick="closePopup()" class="closeBtn">X</button>
        <div class="popupContainer">
                  <div class="popupCard">

                    <div class="popupPkmn">
                      <p class='pkmName'>` + name +`</p> <img src="` + pic + `" onmouseover="shinyChange('` + id +`')" onmouseout="shinyRevert('` + id +`')" id="pkmnPic">
                    </div>

                    <div class="popupTC">

                    <div class="popupType">
                        ` + types.map(type => `<p>${type.name}</p>`).join('') + `
                    </div>

                  </div>

                    <div class="popupSx2">

                      <div class="popupStats">

                        <p>STATISTIQUES</p>
                        <p>HP : ` + pokemon.stats.hp +`</p>
                        <p>ATK : ` + pokemon.stats.atk +`</p>
                        <p>DEF : ` + pokemon.stats.def +`</p>
                        <p>ATK SPE : ` + pokemon.stats.spe_atk +`</p>
                        <p>DEF SPE : ` + pokemon.stats.spe_def +`</p>
                        <p>VIT : ` + pokemon.stats.vit +`</p>

                      </div>


                      <div class="popupInfo">
                        <p>INFOS</p>
                        <p>Taille : ` + pokemon.height +`</p>
                        <p>Poids : ` + pokemon.weight +`</p>

                      </div>


                      <div class="popupSkill">
                      <p>TALENTS</p>
                      ` + talents.map(talents => `<p>${talents.name}</p>`).join('') + `
                      </div>

                    </div>


                  </div>
                </div>`

        popupInject.style.display = "flex";

    })
    .catch(error => {
      console.error("There was a problem with the fetch operation:", error);
    });



}

//Fermer Popup

function closePopup(){
  popupInject.style.display = "none";
}


//Afficher le shiny

function shinyChange(id) {

  let url = "https://tyradex.tech/api/v1/pokemon/" + id

  fetch(url)
  .then(response => {
    return response.json();
  })
    .then(data => {

        let pic = data.sprites.shiny

        document.getElementById("pkmnPic").src = pic;


    })
    .catch(error => {
      console.error("There was a problem with the fetch operation:", error);
    });

}

//Afficher regular

function shinyRevert(id) {
  let url = "https://tyradex.tech/api/v1/pokemon/" + id

  fetch(url)
  .then(response => {
    return response.json();
  })
    .then(data => {

        let pic = data.sprites.regular

        document.getElementById("pkmnPic").src = pic;


})
.catch(error => {
  console.error("There was a problem with the fetch operation:", error);
});

}

//PRINCIPAL -> CARDs

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
      let id = pokemon.pokedex_id

      inject.innerHTML += `
      <div class="card">
        <div class="upCard">
          <img src="` + pic + `" alt=""><p class='pkmName'>` + name +`</p>
        </div>
        <div class="middleCard"></div>
        <div class="bottomCard">
          <p>Types : ` + type + `</p>
          <button class="popupBtn" onclick="popup('` + id +`')">+</button>
        </div>
      </div>`
    }
  })
  .catch(error => {
    console.error("There was a problem with the fetch operation:", error);
  });
