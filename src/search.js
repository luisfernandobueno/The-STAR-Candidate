
/* ------------------------- GLOBAL VARIABLES ------------------------- */

const url_interview_data = localStorage.getItem("url_interview_data");
const inputSearch = document.getElementById("inputSearch");
const displayAllQuestions = document.getElementById("displayAllQuestions");
const displayScreen = localStorage.getItem("displayScreen");
const history_arr = JSON.parse(
    localStorage.getItem("history_arr")
);
let screenType = document.getElementById("screenType");



/* ------------------------- FUNCTIONS ------------------------- */


/* DISPLAY ALL THE QUESTIONS ON SCREEN */
function displayAll(data) {

    data.forEach(e => {

        displayAllQuestions.innerHTML += `
                <a href="index.html" class="searchQuestion">
                    ${e.question.replace(/<[^>]*>/g, "")}
                </a>
            `;
    });


    searchingQuestion(data);
    saveSelectedQuestionOnLocalStorage();

}


/* SAVE SELECTED QUESTION ON LOCAL STORAGE */
function saveSelectedQuestionOnLocalStorage() {

    document.querySelectorAll("a").forEach(a => {

        a.addEventListener("click", () => {
            console.log("SELECTED QUESTION ON LS: ", a.textContent)
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

        //saveSelectedQuestionOnLocalStorage();

    })
}







/* --------------- FROM HERE AND FORWARD, THE DOM BEHAVIOR STARTS ------------------ */

document.addEventListener("DOMContentLoaded", function () {

    fetch(url_interview_data)
        .then((res) => res.json())
        .then((json) => {

            //Evaluate first to not have andy indexes duplicated
            data = [
                ...new Map(json.lines.map(item => [item.question, item])).values()
            ];
            data = data;


            console.log(data)
            console.log("ORIGINAL DATA: ", data);

            switch (displayScreen) {
                case "history":
                    screenType.innerText = "History";
                    console.log(history_arr);
                    displayAll(history_arr)
                    break;

                case "simpleSearch":
                    displayAll(data);
                    break;

                case "My Favorites":
                    console.log(data.filter(item => item.favorite))
                    screenType.innerText = displayScreen;
                    displayAll(
                        
                        data.filter(item => item.favorite)
                        /* This creates a new array containing only objects 
                        where:
                        item.favorite === true */
                        
                    );
            }



            
            saveSelectedQuestionOnLocalStorage();

        });




});
