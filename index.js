console.log("Anime Quotes");

let title = document.getElementsByClassName('card-title');
let character = document.getElementsByClassName('card-subtitle');
let text = document.getElementsByClassName('card-text');
let box = document.getElementById('bigBox');
let submit = document.getElementById('submit');
let search = document.getElementById('search');
let welcome = document.getElementById('welcome');


let nameData = getAnimeNames();

nameData.then(list => {
    populateNames(list);
});
nameData.catch(error => {
    console.log("can't get names " + error);
})


submit.addEventListener('click', (e) => {
    e.preventDefault();
    welcome.style.display = "none";
    let animeName = search.value;
    let data = getData(animeName);
    
    
    data.then(list => {
        populate(list);
    });
    data.catch(error => {
        console.log(error);
    });
});

async function getAnimeNames(){
    const response = await fetch(`https://animechan.vercel.app/api/available/anime`)
    const namedata = await response.json();
    return namedata;
}


async function getData(animeName){
    const response = await fetch(`https://animechan.vercel.app/api/quotes/anime?title=${animeName}`)
    const data = await response.json();
    return data;
}

function populateNames(list){
    let selector = document.getElementById('datalistOptions');
    let names = "";
    for(item in list){
        names += `<option value="${list[item]}"></option>`;
    }

    selector.innerHTML = names;
}


function populate(list){
    let card = ""; 

  for(item in list){
      card += 
      `<div class="accordion" id="accordionExample">
      <div class="accordion-item box-item">
        <h2 class="accordion-header" id="heading${item}">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${item}" aria-expanded="false" aria-controls="collapse${item}">
            ${list[item]["character"]}
          </button>
        </h2>
        <div id="collapse${item}" class="accordion-collapse collapse" aria-labelledby="heading${item}" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            ${list[item]["quote"]}
          </div>
        </div>
      </div>
    </div>`
  }

  box.innerHTML = card;

}
