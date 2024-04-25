let currentPageUrl = "https://swapi.dev/api/starships";

window.onload = () => {
  try {
    loadCharacters(currentPageUrl);
  } catch (error) {
    console.log(error);
    alert("Erro ao carregar imagens");
  }

  const nextButton = document.getElementById("next-button");
  const backButton = document.getElementById("back-button");

  nextButton.addEventListener("click", loadNextPage);
  backButton.addEventListener("click", loadPreviousPage);
};
async function loadCharacters(url) {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = "";

  try {
    const response = await fetch(url);
    const responseJson = await response.json();

    responseJson.results.forEach((character) => {
      const card = document.createElement("div");
      card.style.backgroundImage = `url('https://swapi.dev/api/planets/${character.url.replace(
        /\D/g,
        ""
      )}.jpg')`;
      card.className = "cardss";

      const characterNameBg = document.createElement("div");
      characterNameBg.className = "character-name-bg";

      const characterName = document.createElement("span");
      characterName.className = "character-name";
      characterName.innerHTML = `${character.name}`;

      characterNameBg.appendChild(characterName);
      card.appendChild(characterNameBg);

      card.onclick = () => {
        const modal = document.getElementById("modal");
        modal.style.visibility = "visible";

        const modalContent = document.getElementById("modal-content");
        modalContent.innerHTML = "";

        const characterImage = document.createElement("div");
        characterImage.style.backgroundImage = `url('https://swapi.dev/api/planets/${character.url.replace(
          /\D/g,
          ""
        )}.jpg')`;
        characterImage.className = "character-image";

        const name = document.createElement("span");
        name.className = "character-details";
        name.innerHTML = `Nome: ${character.name}`;

        const characterHeigth = document.createElement("span");
        characterHeigth.className = "character-details";
        characterHeigth.innerHTML = `Altura: ${convertHeigth(
          character.heigth
        )}`;

        const mass = document.createElement("span");
        mass.className = "character-details";
        mass.innerHTML = `Peso: ${convertMass(character.mass)}`;

        const eyeColor = document.createElement("span");
        eyeColor.className = "character-details";
        eyeColor.innerHTML = `Cor dos olhos: ${convertEyeColor(
          character.eye_color
        )}`;

        const birthYear = document.createElement("span");
        birthYear.className = "character-details";
        birthYear.innerHTML = `Nascimento: ${convertBirthYear(
          character.birth_year
        )}`;

        modalContent.appendChild(characterImage);
        modalContent.appendChild(name);
        modalContent.appendChild(characterHeigth);
        modalContent.appendChild(mass);
        modalContent.appendChild(eyeColor);
        modalContent.appendChild(birthYear);
      };
      mainContent.appendChild(card);
    });

    const nextButton = document.getElementById("next-button");
    const backButton = document.getElementById("back-button");

    nextButton.disabled = !responseJson.next;
    backButton.disabled = !responseJson.previous;

    backButton.style.visibility = responseJson.previous ? "visible" : "hidden";

    currentPageUrl = url;
  } catch (error) {
    alert("Erro ao carregar personagens");
    console.log(error);
  }
}

async function loadNextPage() {
  if (!currentPageUrl) return;

  try {
    const response = await fetch(currentPageUrl);
    const responseJson = await response.json();

    await loadCharacters(responseJson.next);
  } catch (error) {
    console.log(error);
    alert("Erro ao carregar a próxima página");
  }
}

async function loadPreviousPage() {
  if (!currentPageUrl) return;

  try {
    const response = await fetch(currentPageUrl);
    const responseJson = await response.json();

    await loadCharacters(responseJson.previous);
  } catch (error) {
    console.log(error);
    alert("Erro ao carregar a página anterior");
  }
}
function hideModal() {
  const modal = document.getElementById("modal");
  modal.style.visibility = "hidden";
}

function convertEyeColor(eyeColor) {
  const cores = {
    blue: "azul",
    brown: "castanho",
    green: "verde",
    yellow: "amarelo",
    black: "preto",
    pink: "rosa",
    red: "vermelho",
    orange: "laranja",
    hazel: "aveia",
    unknown: "desconhecido",
  };
  return cores[eyeColor.toLowerCase()] || eyeColor;
}

function convertHeigth(heigth) {
  if (heigth === "unknown") {
    return "desconhecida";
  }

  return (heigth / 100).toFixed(2);
}

function convertMass(mass) {
  if (mass === "unknown") {
    return "desconhecido";
  }

  return `${mass} kg`;
}

function convertBirthYear(birth_year) {
  if (birth_year === "unknown") {
    return "desconhecido";
  }
  return birth_year;
}
