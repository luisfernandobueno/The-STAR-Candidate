
/* ------------------------- GLOBAL VARIABLES ------------------------- */

const url_interview_data = localStorage.getItem("url_interview_data");
const inputSearch = document.getElementById("inputSearch");
const displayAllQuestions = document.getElementById("displayAllQuestions");
const displayScreen = localStorage.getItem("displayScreen");
const history_arr = JSON.parse(
    localStorage.getItem("history_arr")
);
let screenType = document.getElementById("screenType");

const categoriesSection = document.querySelectorAll(".category");


/* ------------------------- FUNCTIONS ------------------------- */

function removePreviousCategory() {
    const deleteCategory = document.querySelectorAll(".category");
    deleteCategory.forEach(e => {
        e.style.backgroundColor = "rgb(243, 243, 243)";
        e.classList.remove("shadow")
        //console.log(e)
    })
}



function sectionCategoriesBehavior(topic) {

    

    topic = topic.trim(); // trim() takes away any pre and post spaces that the variable have
    console.log(topic);

    switch (topic) {
        case "Recruiter":
            document.getElementById("Recruiter").style.backgroundColor = "#BDE3FF";
            break;

        case "Candidate":
            document.getElementById("Candidate").style.backgroundColor = "#CFFFB5";
            break;

        case "Advice":
            document.getElementById("Advice").style.backgroundColor = "#FBF291";
            break;

        case "Encouragement":
            document.getElementById("Encouragement").style.backgroundColor = "#FFDC92";
            break;

        case "Keep It Up":
            document.getElementById("Encouragement").style.backgroundColor = "#FFDC92";
            break;
    }
}



/* FILTER DATA BY TOPIC */
function filterByTopic(data) {
    //let filteredData = data.lines;
    let categoriesSelected = [];

    categoriesSection.forEach(cat => {
        cat.addEventListener("click", () => {
            const index = categoriesSection.indexOf(cat.innerText);

            // If index in array detele, else add it.
            if (
            index !== -1) {
                 categoriesSection.splice(index, 1)
                removePreviousCategory()
            } else {
                 categoriesSection.push(cat.innerText);
                sectionCategoriesBehavior(cat.innerText);
            }
            
        });
    });



    // Apply search filter
    /* const searchTerm = inputSearch.value.toLowerCase();
    if (searchTerm) {
        filteredData = filteredData.filter(item => item.question.toLowerCase().includes(searchTerm));
    }
 */


    
    displayAll(filteredData);
}



/* DISPLAY ALL THE QUESTIONS ON SCREEN */
function displayAll(questionsToBeDisplayed) {

    questionsToBeDisplayed.forEach(e => {

        displayAllQuestions.innerHTML += `
                <a href="index.html" class="searchQuestion">
                    ${e.question.replace(/<[^>]*>/g, "")}
                </a>
            `;
    });


    searchingQuestion(questionsToBeDisplayed);
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
function searchingQuestion(questionsToBeDisplayed) {
    inputSearch.addEventListener('keyup', () => {

        displayAllQuestions.innerHTML = '';
        const texto = inputSearch.value.toLowerCase();

        for (let index of questionsToBeDisplayed) {
            let typedQuestion = index.question.toLowerCase();

            if (typedQuestion.indexOf(texto) !== -1) {
                displayAllQuestions.innerHTML += `
                        <a href="index.html" class="searchQuestion">${index.question}</a>
                        `
            }
        }

        saveSelectedQuestionOnLocalStorage();

    })
}



function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle('show')
}


function displayScreenFunction(displayScreen) {
    switch (displayScreen) {
        /* case "history":
            screenType.innerText = "History";
            console.log(history_arr);
            displayAll(history_arr)
            break; */

        case "Search":
            screenType.innerText = displayScreen;
            displayAll(data);
            break;

        case "Favorites":
            console.log(data.filter(item => item.favorite))
            screenType.innerText = displayScreen;
            displayAll(

                data.filter(item => item.favorite)
                /* This creates a new array containing only objects 
                where:
                item.favorite === true */

            );
    }
}




let darkmode = localStorage.getItem('darkmode')
const themeSwitch = document.getElementById('theme-switch')

const enableDarkmode = () => {
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')
}

const disableDarkmode = () => {
    document.body.classList.remove('darkmode')
    localStorage.setItem('darkmode', null)
}

if (darkmode === "active") enableDarkmode()

themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode')
    darkmode !== "active" ? enableDarkmode() : disableDarkmode()
})

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

            displayScreenFunction(displayScreen)
            //filterByTopic()

        });
});
