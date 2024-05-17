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
          <img src="` + pic + `" alt="" onclick="popup('` + id +`')"><p class='pkmName'>` + name +`</p>
        </div>
        <div class="middleCard"></div>
        <div class="bottomCard">
          <p>Type principal : ` + type + `</p>
          <svg class="popupBtn" onclick="popup('` + id +`')" viewBox="-7.68 -7.68 47.36 47.36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="black">
            <g id="SVGRepo_bgCarrier" stroke-width="0">
              <rect x="-7.68" y="-7.68" width="47.36" height="47.36" rx="23.68" fill="white" strokewidth="0" class="svg-backG"></rect>
            </g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <g id="Page-1" stroke-width="0.00032" fill="white" fill-rule="evenodd" sketch:type="MSPage">
                <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-360.000000, -1035.000000)" fill="black" class="svg-plus">
                  <path d="M388,1053 L378,1053 L378,1063 C378,1064.1 377.104,1065 376,1065 C374.896,1065 374,1064.1 374,1063 L374,1053 L364,1053 C362.896,1053 362,1052.1 362,1051 C362,1049.9 362.896,1049 364,1049 L374,1049 L374,1039 C374,1037.9 374.896,1037 376,1037 C377.104,1037 378,1037.9 378,1039 L378,1049 L388,1049 C389.104,1049 390,1049.9 390,1051 C390,1052.1 389.104,1053 388,1053 L388,1053 Z M388,1047 L380,1047 L380,1039 C380,1036.79 378.209,1035 376,1035 C373.791,1035 372,1036.79 372,1039 L372,1047 L364,1047 C361.791,1047 360,1048.79 360,1051 C360,1053.21 361.791,1055 364,1055 L372,1055 L372,1063 C372,1065.21 373.791,1067 376,1067 C378.209,1067 380,1065.21 380,1063 L380,1055 L388,1055 C390.209,1055 392,1053.21 392,1051 C392,1048.79 390.209,1047 388,1047 L388,1047 Z" id="plus" sketch:type="MSShapeGroup"></path>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>`
    }
  })
  .catch(error => {
    console.error("There was a problem with the fetch operation:", error);
  });
