
/* ------------------------- GLOBAL VARIABLES ------------------------- */

const url_interview_data = localStorage.getItem("url_interview_data");
const inputSearch = document.getElementById("inputSearch");
const displayAllQuestions = document.getElementById("displayAllQuestions");


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
            originalData = json;
            data = json.lines;
            console.log(data)
            console.log("ORIGINAL DATA: ", originalData);

            displayAll(originalData.lines);
            searchingQuestion();
            saveSelectedQuestionOnLocalStorage();

        });




});
