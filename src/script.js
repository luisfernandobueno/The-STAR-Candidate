
/* ------------------------- GLOBAL VARIABLES ------------------------- */

/* URL FOR ACTUAL LEARNING */
const url_interview_data = "https://getpantry.cloud/apiv1/pantry/3892fc79-3651-48dd-aa62-75da3e708be7/basket/STAR Candidate App";
//const url_interview_data = "src/data.json"
//const url_interview_data = "https://luisfernandobueno.github.io/json/db.json"
//const url_interview_data = "https://api.npoint.io/facb5749d433f9be2b92"

localStorage.setItem("url_interview_data", url_interview_data);


/* HEADER SECTION */
const currentScreenLocation = document.getElementById("currentScreenLocation");

const edit_btn = document.getElementById("edit_btn");

/* DELETE ALERT */
const toggleDeleteAlert_btn = document.getElementById("toggleDeleteAlert_btn");
const deleteData_alert = document.getElementById("deleteData_alert");
const deleteDataAccepted_btn = document.getElementById("deleteDataAccepted_btn");

/* CATEGORIES AND TEXT AREAS */
const categoriesSection = document.querySelectorAll(".category");
const turningTheTextAreasEditable_array = document.querySelectorAll(".editable");
const question = document.getElementById("question");
const explanation = document.getElementById("explanation");
const answer = document.getElementById("answer");
const example = document.getElementById("example");
const stylingButtonsSection = document.getElementById("stylingButtonsSection");
const favorite_btn = document.getElementById("favorite_btn");

/* FOOTER SECTION */
const navBar = document.getElementById("navBar");
const addNewData_btn = document.getElementById("addNewData_btn");
const arrowBack_btn = document.getElementById("arrowBack_btn");

const submitSection = document.getElementById("submitSection");

/* DARKMODE */
let darkmode = localStorage.getItem('darkmode')
const themeSwitch = document.getElementById('theme-switch')


let indexOfQuestionSearched = localStorage.getItem("indexOfQuestionSearched");
let currentIndex_jsonData;
let randomQuestion = {};
let newDataToSubmitOnline = {}
let editDeleteOrAddNew;
let editing = true;
let topic;
let history_arr = [];
let currentIndex_historyArray;
let originalData = { lines: {} };




/* ------------------------- FUNCTIONS ------------------------- */




const enableDarkmode = () => {
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')
}

const disableDarkmode = () => {
    document.body.classList.remove('darkmode')
    localStorage.setItem('darkmode', null)
}

if (darkmode === "active") enableDarkmode()

function darkmodeState() {
    darkmode = localStorage.getItem('darkmode')
    darkmode !== "active" ? enableDarkmode() : disableDarkmode()
    sectionCategoriesBehavior(history_arr[currentIndex_historyArray].topic);
}

themeSwitch.addEventListener("click", () => {
    darkmodeState()
})

function initialDarkmode() {
    darkmode = localStorage.getItem("darkmode");
    removePreviousCategory();
}








function removePreviousCategory() {



    const deleteCategory = document.querySelectorAll(".category");
    deleteCategory.forEach(e => {


        let darkmodeStatus = localStorage.getItem("darkmode")


        switch (darkmode) {
            case "active":
                e.style.backgroundColor = "var(--base-color)";
                e.classList.remove("shadow")
                break;

            case "null":
                e.style.backgroundColor = "var(--base-color)";
                break;
        }

    })
}


function themeLight(topic, darkmode) {
    if (darkmode === 'active') { return };
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

        default:
            document.getElementById("Encouragement").style.backgroundColor = "#FFDC92";
            break;
    }

}

function themeDark(topic, darkmode) {
    if (darkmode === 'null') { return };
    switch (topic) {
        case "Recruiter":
            document.getElementById("Recruiter").style.backgroundColor = "#004b81";
            break;

        case "Candidate":
            document.getElementById("Candidate").style.backgroundColor = "#287400";
            break;

        case "Advice":
            document.getElementById("Advice").style.backgroundColor = "#ffd57b";
            break;

        case "Encouragement":
            document.getElementById("Encouragement").style.backgroundColor = "#9b00ca";
            break;

        default:
            document.getElementById("Encouragement").style.backgroundColor = "#9b00ca";
            break;
    }

}

function sectionCategoriesBehavior(topic) {

    removePreviousCategory();

    topic = topic.trim(); // trim() takes away any pre and post spaces that the variable have

    let getDarkmode = localStorage.getItem("darkmode")

    themeDark(topic, getDarkmode);
    themeLight(topic, getDarkmode)
}



function categorySelector() {

    categoriesSection.forEach(cat => {
        cat.style.pointerEvents = "auto";

        cat.addEventListener("click", () => {
            //console.log(cat.innerHTML);
            //removePreviousCategory()
            topic = cat.innerHTML
            sectionCategoriesBehavior(topic);
        });
    });
}

function disableCategorySelector() {
    categoriesSection.forEach(cat => {
        cat.style.pointerEvents = "none";
    });
}


/* Finds the text areas where the info is gonna be displayed on the HTML
and pastes there the corresponding data to finally be shown on screen*/
function areaWhereTheTextIsGonnaBeShown(randomQuestion) {
    //console.log(data[currentIndex_jsonData])
    document.getElementById("areaWhereTheTextIsGonnaBeShown").scrollTo({
        top: 0,
        behavior: "smooth"

    });



    question.innerHTML = randomQuestion.question;
    explanation.innerHTML = randomQuestion.explanation;
    answer.innerHTML = randomQuestion.answer;
    example.innerHTML = randomQuestion.example;


    favorite_btn.classList.toggle(
        "active",
        randomQuestion.favorite === true
    );


    //localStorage.removeItem("indexOfQuestionSearched");
    //console.log("FINAL INDEX BEING SHOWN ON  SCREEN: ", currentIndex_jsonData);

    sectionCategoriesBehavior(randomQuestion.topic)
}


/* Chooses a random index from the array and passes that one to the function that displays
the text on screen, so it shows specifically the info in that particular index of the array */
function showTextOnUserScreen(dataToBeDisplayed) {


    currentIndex_jsonData = Math.floor(Math.random() * data.length);


    randomQuestion = data[currentIndex_jsonData];
    //currentIndex_jsonData = data.currentIndex_jsonData;
    //console.log("FUNCTION: SHOW TEXT ON USER SCREEN: ", randomQuestion)
    //console.log("FIRST INDEX WHEN JUST ENTERING THE WEBSITE: ", currentIndex_jsonData)
    areaWhereTheTextIsGonnaBeShown(randomQuestion);

    history_arr.push(randomQuestion);
    currentIndex_historyArray = history_arr.length - 1;
    //backArrowFunction()

}


function favoriteState() {
    favorite_btn.classList.toggle("active");

    data[currentIndex_jsonData].favorite =
        favorite_btn.classList.contains("active");

    console.log(data[currentIndex_jsonData]);

    fetchPost(data);
}


function moveForward() {
    arrowForwardBtn(data)
}
function arrowForwardBtn(data) {
    const arrowForward_btn = document.getElementById("arrowForward_btn");

    //arrowForward_btn.addEventListener("click", () => {

    /* Clean all the divs categories to white */
    if (currentIndex_historyArray === history_arr.length - 1) {

        // We're on the latest question.
        // Right arrow should generate a new one.
        showTextOnUserScreen(data);

    } else {

        currentIndex_historyArray++;
        areaWhereTheTextIsGonnaBeShown(history_arr[currentIndex_historyArray]);
    }

    enableArrowBack()
    //})
}



function backArrowFunction() {
    //arrowBack_btn.addEventListener("click", () => {

    // This line makes the counter go backwards every time you click.
    currentIndex_historyArray = (currentIndex_historyArray - 1 + history_arr.length) % history_arr.length;

    areaWhereTheTextIsGonnaBeShown(history_arr[currentIndex_historyArray])
    enableArrowBack();
    //})
}



function enableArrowBack() {
    arrowBack_btn.disabled = currentIndex_historyArray === 0;
}



/* SWITCHING STATES FOR BUTTONS AND TEXT AREAS: 
- THOSE BUTTONS THAT ARE INITIALLY HIDDEN WILL APPEAR ON SCREEN WHEN THE VISIBLES ARE CLICKED, AND THESE LAST ONES WILL HIDE ACCORDINGLY */
function switchVisibilityOrEditableState() {

    // Toggle: alternar entre estados.
    document.querySelectorAll(".switchVisibilityOrEditableState").forEach(btn => {

        btn.addEventListener("click", () => {



            // Toggle all buttons
            document.querySelectorAll(".hiddenBehavior").forEach(b => {
                b.hidden = !b.hidden;
            });



            // Toggle editable state
            turningTheTextAreasEditable();
        });
    });
}



/* TEXT AREAS WILL SWITCH BETWEEN EDITABLE OR NOT DEPENDING IF YOU'RE ADDING NEW DATA OR EDITING EXISTING ONE */
function turningTheTextAreasEditable() {
    turningTheTextAreasEditable_array.forEach(c => {
        c.contentEditable =
            c.contentEditable === "true"
                ? "false"
                : "true";

        /* is basically shorthand for:
        
        if (c.contentEditable === "true") {
            c.contentEditable = "false";
        } else {
            c.contentEditable = "true";
        }
        */
    });
}



/* IT HANDLES ALERT AND ITS BUTTONS */
function visibilityOFAlertDeleteData() {

    // DELETE BUTTON BEHAVIOR: IT TOGGLES ALERT VISIBILITY 

    toggleDeleteAlert_btn.addEventListener("click", () => {
        currentScreenLocation.innerHTML = "Delete"


        editDeleteOrAddNew = "delete";

        




        console.log("question to be deleted: ", history_arr[currentIndex_historyArray].question)
        //turningTheTextAreasEditable()

    });


    behaviorForButtonsDeleteAndCancelInsideTheAlertDelete();
}



function behaviorForButtonsDeleteAndCancelInsideTheAlertDelete() {
    // BEHAVIOR FOR "DELETE" BUTTON INSIDE THE ALERT TO EFFECTIVELY DELETE DATA:
    deleteDataAccepted_btn.addEventListener("click", () => {
        const togglesDeleteEdit = document.getElementById("togglesDeleteEdit")
        submitSection.classList.add("hidden");
        //togglesDeleteEdit.classList.add("")

        
        currentScreenLocation.innerHTML = "Home"
        
        //disableCategorySelector();

         turningTheTextAreasEditable_array.forEach(c => {
        c.contentEditable = "false";

        
    });


        //console.log("INDEX BEING FINALY DELETED: ", currentIndex_jsonData)

        /* IN HERE: => MAKE AN HTTP DELETE REQUEST */
        data.splice(currentIndex_jsonData, 1);

        history_arr.splice(currentIndex_historyArray, 1);
        data = data;

        alert("DATA PERMANENTLY DELETED. CHECK THE CONSOLE FOR MORE INFO")


        fetchPost(data);


        document.querySelectorAll("button").forEach(b => {
            b.hidden;
        });

        
        showTextOnUserScreen(data);
        arrowForwardBtn(history_arr);
        arrowBack_btn(history_arr);

    });


    // BEHAVIOR FOR "CANCEL" BUTTON INSIDE THE ALERT TO CANCEL THE DELETE:
    const doNotDeleteData_btn = document.getElementById("doNotDeleteData_btn");
    doNotDeleteData_btn.addEventListener("click", () => {
        //submitSection.classList.remove("hidden");
        delete_btn.classList.remove("hidden");
        currentScreenLocation.innerHTML = "Home"
        

    });
}


/* GO TO "EDIT DATA" SCREEN */


function editDataScreen() {
    edit_btn.addEventListener("click", () => {
        favorite_btn.classList.toggle("hidden", true);   // Add the class
        edit();
        categorySelector();
    });

}
function edit() {
    stylingButtonsSection.classList.remove("hidden");
    favorite_btn.classList.toggle("hidden", true);   // Add the class
    //favorite_btn.classList.toggle("hidden", false);  // Remove the class


    navBar.classList.add("hidden");
    currentScreenLocation.innerText = "Edit"
    editDeleteOrAddNew = "edit";
    //console.log(editDeleteOrAddNew)
    editing = true;
    //console.log("EDITING DATA RIGHT NOW? ", editing)
    console.log("INDEX BEING EDITED: ", currentIndex_jsonData);
    turningTheTextAreasEditable_array.forEach(c => {
        //c.classList.add("px-3");
        c.classList.add('rounded-lg')
    });

    categorySelector();
    submittingNewDataOnline();
}


/* GO TO "ADD NEW" SCREEN */
function goToAddNewScreen() {

    /* Text areas go empty on click the "Add New"" button */
    addNewData_btn.addEventListener("click", () => {
        console.log("add new screen")
        stylingButtonsSection.classList.remove("hidden");
        favorite_btn.classList.add("hidden");


        toggleDeleteAlert_btn.classList.add("hidden");
        navBar.classList.add("hidden");
        currentScreenLocation.innerHTML = "Add New";
        editDeleteOrAddNew = "addNew";
        //console.log(editDeleteOrAddNew)

        turningTheTextAreasEditable_array.forEach(c => {
            c.innerHTML = "";
            c.classList.add("px-3");
            c.classList.add('rounded-lg')
        });

        editing = false;
        //console.log("EDITING DATA RIGHT NOW? ", editing)

        submittingNewDataOnline();
        categorySelector();
    });
}



/* THIS FUNCTION EVALUATES WHETHER IF ITS EDITING OR NOT */
function isItEditingDataRightNow() {

    console.log(" IS-IT-EDITING-DATA-RIGHT-NOW()   FUNCTION")

    /* If editing, replace in the array and update online. Otherwise, push the new data at the end of the array and update online */



    /* Save the new data into an object */
    newDataToSubmitOnline = {

        question: question.innerHTML,
        explanation: explanation.innerHTML,
        answer: answer.innerHTML,
        example: example.innerHTML,
        topic: topic, //data[currentIndex_jsonData].topic,
        favorite: data[currentIndex_jsonData].favorite,
    };


    console.log("newDataToSubmitOnline editing:", newDataToSubmitOnline)


    /*  FIRST: 
    Find the specific index in where the new data will be replaced  */
    //let currentIndex_jsonData = currentIndex_jsonData;


    /*              - SECOND:
                Replace the data into the array        */

    /* console.log("CURRENT INDEX: ", currentIndex_jsonData)

    console.log("DATA PREVIOUS EDITING: ", data[currentIndex_jsonData].question) */


    data[currentIndex_jsonData] = newDataToSubmitOnline;


    /* console.log("DATA AFTER EDITING: ", data[currentIndex_jsonData].question)
    console.log("FULL ARRAY AFTER EDITING: ", data); */
    //console.log(data[currentIndex_jsonData].question)
    data[currentIndex_jsonData] = newDataToSubmitOnline;
    history_arr[currentIndex_historyArray] = newDataToSubmitOnline;

    //console.log("ORIGINAL DATA: ", data)


    /*      - THIRD:
                 Call to the fetch Put(data); function with the updated array       
     */



    console.log("SUBMITTING EDITED DATA RIGHT NOW!!! ")
    console.log("Exiting the editing data function right now")

    fetchPost(data);
    areaWhereTheTextIsGonnaBeShown(newDataToSubmitOnline);
}



function creatingNewData() {

    /* Save the new data into an object */
    newDataToSubmitOnline = {

        question: question.innerHTML,
        explanation: explanation.innerHTML,
        answer: answer.innerHTML,
        example: example.innerHTML,
        topic: topic,
        favorite: false,
    };


    /* Push the new data into the array */
    data.push(newDataToSubmitOnline);
    history_arr.push(newDataToSubmitOnline);

    console.log("newDataToSubmitOnline creating new:", newDataToSubmitOnline)


    console.log("DATA AFTER CREATING NEW DATA: ", data[data.length - 1])
    console.log("ORIGINAL DATA: ", data);
    console.log("SUBMITTING NEW DATA RIGHT NOW!!! ");


    navBar.classList.remove("hidden");
    fetchPost(data);
    areaWhereTheTextIsGonnaBeShown(newDataToSubmitOnline);

}


/* EVALUATES WETHER THE TEXT AREAS ARE EMPTY OR NOT AND ACTS ACCORDINGLY */
function areTheTextAreasEmpty() {
    let emptyTextAreas = true;
    console.log("Are all text areas are empty? ", emptyTextAreas);


    /* Evaluate if all text areas are empty */
    turningTheTextAreasEditable_array.forEach(c => {
        if (c.innerHTML.trim() !== "") {
            emptyTextAreas = false;
        }
    });
    console.log("Are all text areas are empty? ", emptyTextAreas);


    /* If all text areas are empty, cancel the submitting and show an alert. Otherwise, proceed with the submission. */
    if (emptyTextAreas) {

        alert("CANCELING SUBMITTING FOR ALL EMPTY TEXT AREAS");
        navBar.classList.remove("hidden");
        areaWhereTheTextIsGonnaBeShown(data[currentIndex_jsonData]);
        console.log("CANCELING SUBMITTING CHANGES RIGHT NOW!!! ")

    } else {
        creatingNewData();
    }

}


/* TURN THE TEXT AREAS BACK TO NON EDITABLE SECTIONS */
function removeEditableState() {
    turningTheTextAreasEditable_array.forEach(c => {
        c.innerHTML = "";
        c.classList.remove("px-3");
        c.classList.remove('rounded-lg')
    });
}


/* SAVES THE TEXTS INTO AN OBJECT. THEN, SUBMITS IT ONLINE */
function submittingNewDataOnline() {

    console.log("FULL ARRAY PREVIOUSLY EDITING OR ADDING NEW: ", data);


    const submitChanges_btn = document.getElementById("submitChanges_btn");
    const cancelChangesDoNotSubmit_btn = document.getElementById("cancelChangesDoNotSubmit_btn");



    /* On click, the "CANCEL" BUTTON turns the screen back to what it looked like */
    cancelChangesDoNotSubmit_btn.addEventListener("click", () => {
        disableCategorySelector();
        stylingButtonsSection.classList.add("hidden");
        favorite_btn.classList.remove("hidden");

        currentScreenLocation.innerHTML = "Home";
        toggleDeleteAlert_btn.classList.remove("hidden");
        navBar.classList.remove("hidden");
        editing = true;
        //console.log("CANCELING SUBMITTING CHANGES RIGHT NOW!!! ", editing)
        
        sectionCategoriesBehavior(history_arr[currentIndex_historyArray].topic)
        removeEditableState();
        areaWhereTheTextIsGonnaBeShown(history_arr[currentIndex_historyArray]);

    });



    /* ACTUALLY HITTING THE SUBMIT BUTTON */
    submitChanges_btn.addEventListener("click", () => {
        stylingButtonsSection.classList.add("hidden");
        favorite_btn.classList.remove("hidden");
        disableCategorySelector();
        navBar.classList.remove("hidden");
        currentScreenLocation.innerHTML = "Home";
        


        console.log("WHAT ARE YOU CURRENTLY SUBMITING? - ", editDeleteOrAddNew);
        console.log("INDEX OF THE ARRAY WHEN SUBMITTIN: ", currentIndex_jsonData);
        switch (editDeleteOrAddNew) {
            case "addNew":
                /* Evaluate if all text areas are empty or not. If they are, cancel the submitting and show an alert.  */

                areTheTextAreasEmpty();
                break;

            case "edit":

                isItEditingDataRightNow();
                break;
        }


        removeEditableState();
        areaWhereTheTextIsGonnaBeShown(newDataToSubmitOnline);
        editing = true;
        console.log("GETTING OUT OF THE submittingNewDataOnline FUNCTION RIGHT NOW!!! ", editing);

    }
    )
}


/* SENDS THE DATA TO UPLOAD IT ONLINE */
function fetchPost(data) {

    originalData.lines = data;

    fetch(url_interview_data, {
        method: "POST", // ALWAYS USE POST!!!, DO NOT FUCKING CHANGE IT!!! if you use put, you end up duplicating the whole json
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(originalData)
    })
        .then(response => {
            console.log("Status:", response.status);
            return response.json();
        })
        .then(result => console.log(result))
        .catch(error => console.error(error));

    console.log("FINAL DATA AFTER FETCH")
    console.log(originalData)
}


/* SHOW THE SEARCH SECTION INTO THE SCREEN */
function lastSearchedQuestion() {

    if (indexOfQuestionSearched) {
        //console.log(searchedQuestion);
    console.log("index of question saved: ", localStorage.getItem("indexOfQuestionSearched"));
    
    history_arr[0] = data[indexOfQuestionSearched];
    currentIndex_jsonData = indexOfQuestionSearched;
    console.log(currentIndex_jsonData)
    console.log("history_arr: ", history_arr)
    //console.log(data)

    // Takes away any spaces or additional, unnecesaty digits that may fuck up the search later.
    /* const normalize = str =>
        str
            .replace(/&nbsp;/gi, " ")
            .replace(/\u00A0/g, " ")
            .replace(/\s+/g, " ")
            .trim()
            .toLowerCase();

    // Try an exact match first
    let result = data.find(
        item => normalize(item.question) === normalize(searchedQuestion)
    );

    console.log("result: - ", result);

    // If no exact match, find the most similar one
    if (!result || result === undefined) {
        const searchedWords = normalize(searchedQuestion).split(" ");

        result = data.reduce((best, current) => {
            const currentQuestion = normalize(current.question);

            const score = searchedWords.filter(word =>
                currentQuestion.includes(word)
            ).length;

            const bestScore = searchedWords.filter(word =>
                normalize(best.question).includes(word)
            ).length;

            return score > bestScore ? current : best;
        });
    }

    if (result) {
        currentIndex_jsonData = data.indexOf(result);

        history_arr[0] = result; */

        areaWhereTheTextIsGonnaBeShown(data[indexOfQuestionSearched]);
        localStorage.removeItem("indexOfQuestionSearched");
        console.log(localStorage.getItem("indexOfQuestionSearched"))
    //}
    }
    
}



function goToDisplayAllScreen(goTo) {
    localStorage.setItem("displayScreen", goTo);
    localStorage.setItem(
        "history_arr",
        JSON.stringify(history_arr)
    );
    window.location.href = 'showAllQuestions.html'
}


function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle('show')
}






/* --------------- FROM HERE AND FORWARD, THE DOM BEHAVIOR STARTS ------------------ */

document.addEventListener("DOMContentLoaded", function () {

    console.log(url_interview_data)


    fetch(url_interview_data)
        .then((res) => res.json())
        .then((json) => {

            console.log(json)
            console.log("iside fetch")
            //Evaluate first to not have andy indexes duplicated
            data = [
                ...new Map(json.lines.map(item => [item.question, item])).values()
            ];
            data = data;


            data.forEach(e => {
                if (e.topic === "Keep It Up" || e.topic === undefined) {
                    e.topic = "Encouragement";
                }
            });

            console.log(data);
            /* SAVE DATA ON LOCALSTORAGE:
            For the purpose of always having it up to date in case the api is not working right*/

            //console.log(`localStorage.getItem("searchedQuestion"):   `, searchedQuestion);


            console.log(url_interview_data)

            //darkmode !== "active" ? enableDarkmode() : disableDarkmode()

            // CALL THE FUNCTIONS TO EXECUTE THE PROGRAM
            showTextOnUserScreen(data);
            arrowForwardBtn(data);
            backArrowFunction();
            switchVisibilityOrEditableState();
            editDataScreen();
            goToAddNewScreen();
            visibilityOFAlertDeleteData();
            lastSearchedQuestion();

        })
        .then(response => {
            console.log("Status:", response.status);
            return response.json();
        })
        .then(result => console.log(result))
        .catch(error => console.error(error));
});
