
/* ------------------------- GLOBAL VARIABLES ------------------------- */


const url_interview_data = "https://luisfernandobueno.github.io/json/jipapp.json";
// const url_interview_data = "https://getpantry.cloud/apiv1/pantry/3892fc79-3651-48dd-aa62-75da3e708be7/basket/my-new-basket-name";
const inputSearch = document.getElementById("inputSearch");
const displayAllQuestions = document.getElementById("displayAllQuestions");




/* ------------------------- FUNCTIONS ------------------------- */

/* DISPLAY ALL THE QUESTIONS ON SCREEN */
function displayAll(data) {

    data.forEach(e => {

        displayAllQuestions.innerHTML += `
            <a href="index.html" class="searchQuestion">${e.question}</a>`;

    });

    document.querySelectorAll("a").forEach(a => {

        a.addEventListener("click", () => {
            localStorage.setItem("searchedQuestion", a.textContent);
        });

    });
}


/* FILTER QUESTIONS IN REAL TIME */
function searchingQuestion() {   
    inputSearch.addEventListener('keyup', () => {

        displayAllQuestions.innerHTML = '';   
        const texto = inputSearch.value.toLowerCase();
    
        for (let index of data) {
            let typedQuestion = index.question.toLowerCase();
    
            if (typedQuestion.indexOf(texto) !== -1) {
                displayAllQuestions.innerHTML += `
                        <a href="index.html" class="searchQuestion">${index.question}</a>
                        `
            }
        }
    })
}







/* --------------- FROM HERE AND FORWARD, THE DOM BEHAVIOR STARTS ------------------ */

document.addEventListener("DOMContentLoaded", function () {

    fetch(url_interview_data)
        .then((res) => res.json())
        .then((json) => {
            originalData = json;
            data = json.lines;
            //console.log(data)

            displayAll(data);
            searchingQuestion();

        });
});
