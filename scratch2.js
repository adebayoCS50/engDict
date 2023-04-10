const inputElem = document.getElementById("input");
const wordSearchElem = document.getElementById("info-text");
const meaningContainerElem = document.getElementById("meaning-container");
const titleElem = document.getElementById("title");
const meaningElem = document.getElementById("meaning");
const audioElem = document.getElementById("audio");

async function fetchAPI(word) {
  try {
    wordSearchElem.style.display = "block";
    meaningContainerElem.style.display = "none";
    wordSearchElem.innerText = `Searching the meaning of the word:${word}`;
    const apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(apiURL).then((res) => res.json());

    if (result.title) {
      meaningContainerElem.style.display = "block";
      wordSearchElem.style.display = "none";
      titleElem.innerText = word;
      meaningElem.innerText = "N/A";
      audioElem.style.display = "none";
    } else {
      wordSearchElem.style.display = "none";
      meaningContainerElem.style.display = "block";
      audioElem.style.display = "inline-flex";
      titleElem.innerText = result[0].word;
      meaningElem.innerText = result[0].meanings[0].definitions[0].definition;
      audioElem.src = result[0].phonetics[0].audio;
    }
  } catch (error) {
    console.log(error);
    wordSearchElem.innerText = `Error occured while searching,try again later.`;
  }
}

inputElem.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    fetchAPI(e.target.value);
  }
});
