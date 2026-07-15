
/* ------------------------- GLOBAL VARIABLES ------------------------- */

const url_interview_data = localStorage.getItem("url_interview_data");
const inputSearch = document.getElementById("inputSearch");
const displayAllQuestions = document.getElementById("displayAllQuestions");
const displayScreen = localStorage.getItem("displayScreen");
const history_arr = JSON.parse(
    localStorage.getItem("history_arr")
);
const screenType = document.getElementById("screenType");

const search_screen = document.getElementById("search_screen");
const favorites_screen = document.getElementById("favorites_screen")

const data = JSON.parse(localStorage.getItem("data"));
const categoriesSection = document.querySelectorAll(".category");




/* -------------DARK MODE --------------- */

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


function darkmodeState() {

    darkmode = localStorage.getItem('darkmode')
    darkmode !== "active" ? enableDarkmode() : disableDarkmode()
    sectionCategoriesBehavior(history_arr[currentIndex_historyArray].topic);
}


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


function goToDisplayAllScreen(goTo) {
    localStorage.setItem("displayScreen", goTo);
    localStorage.setItem(
        "history_arr",
        JSON.stringify(history_arr)
    );
    window.location.href = 'showAllQuestions.html'
}


/* DISPLAY ALL THE QUESTIONS ON SCREEN */
function displayAll(questionsToBeDisplayed) {
    let index = 0;
    
    questionsToBeDisplayed.forEach(e => {

        switch (displayScreen) {

            case "Search":
                displayAllQuestions.innerHTML += `
                <a id="${index}" href="index.html" class="searchQuestion">
                    ${e}
                </a>
            `;
                break;

            case "Favorites":
                if (e.favorite) {

                    displayAllQuestions.innerHTML += `
                        <a id="${index}" href="index.html" class="searchQuestion">
                            ${e.question.replace(/<[^>]*>/g, "")}
                        </a> `;
                    break
                }

        }

        index++;
    });


    searchingQuestion(questionsToBeDisplayed);
    saveSelectedQuestionOnLocalStorage();

}



/* SAVE SELECTED QUESTION ON LOCAL STORAGE */
function saveSelectedQuestionOnLocalStorage() {

    document.querySelectorAll("a").forEach(a => {

        a.addEventListener("click", () => {
            console.log("SELECTED QUESTION ON LS: ", a.textContent)
            console.log("SELECTED QUESTION ON LS: ", a.textContent)
            let selectedQuestion = a.textContent.trim()
            localStorage.setItem("searchedQuestion", selectedQuestion);
            localStorage.setItem("indexOfQuestionSearched", a.id);

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
                        <a id="${index}" href="index.html" class="searchQuestion">${index.question}</a>
                        `
            }
        }

        //saveSelectedQuestionOnLocalStorage();

    })
}



function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle('show')
}


function displayScreenFunction(displayScreen, data) {

    console.log(displayScreen);
    console.log("DATA ABOUT TO BE DISPLAYED!!!")
    switch (displayScreen) {

        case "Search":
            screenType.innerText = displayScreen;
            search_screen.disabled;
            console.log("Lenght data: ", data.length);
            displayAll(data.map(item => item.question));
            break;

        case "Favorites":

            screenType.innerText = displayScreen;

        console.log("Lenght data favorites: ", data.filter(item => item.favorite).length);
            displayAll(data
                /* This creates a new array containing only objects 
                where:
                item.favorite === true */

            );
    }
}






/* --------------- FROM HERE AND FORWARD, THE DOM BEHAVIOR STARTS ------------------ */

document.addEventListener("DOMContentLoaded", function () {
    console.log(url_interview_data)
    

            console.log("2nd url check: ", url_interview_data)

            //Evaluate first to not have andy indexes duplicated
           /*  data = 
                data.filter(item => item.question)
            ;
            data = data; */


            console.log(data)
            console.log("ORIGINAL DATA: ", data);

            displayScreenFunction(displayScreen, data)
            saveSelectedQuestionOnLocalStorage()


       
});
