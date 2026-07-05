
/* ------------------------- GLOBAL VARIABLES ------------------------- */

/* URL FOR ACTUAL LEARNING */
const url_interview_data = "https://getpantry.cloud/apiv1/pantry/3892fc79-3651-48dd-aa62-75da3e708be7/basket/STAR Candidate App";

/* URL FOR DEVELOPING */
//const url_interview_data = "https://getpantry.cloud/apiv1/pantry/3892fc79-3651-48dd-aa62-75da3e708be7/basket/my-new-basket-name";
localStorage.setItem("url_interview_data", url_interview_data);


/* HEADER SECTION */
const currentScreenLocation = document.getElementById("currentScreenLocation");
const edit_btn = document.getElementById("edit_btn");
const delete_btn = document.getElementById("delete");

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


const searchedQuestion = localStorage.getItem("searchedQuestion");
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


function removePreviousCategory() {
    const deleteCategory = document.querySelectorAll(".category");
    deleteCategory.forEach(e => {
        e.style.backgroundColor = "rgb(243, 243, 243)";
        e.classList.remove("shadow")
        //console.log(e)
    })
}



function sectionCategoriesBehavior(topic) {

    removePreviousCategory();


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

    }
}



/* Finds the text areas where the info is gonna be displayed on the HTML
and pastes there the corresponding data to finally be shown on screen*/
function areaWhereTheTextIsGonnaBeShown(randomQuestion) {
    //console.log(data[currentIndex_jsonData])
    document.getElementById("areaWhereTheTextIsGonnaBeShown").scrollTo({
        top: 0,
        behavior: "smooth"

    });

    sectionCategoriesBehavior(randomQuestion.topic)

    question.innerHTML = randomQuestion.question;
    explanation.innerHTML = randomQuestion.explanation;
    answer.innerHTML = randomQuestion.answer;
    example.innerHTML = randomQuestion.example;


    favorite_btn.classList.toggle(
        "active",
        randomQuestion.favorite === true
    );


    localStorage.removeItem("searchedQuestion");
    //console.log("FINAL INDEX BEING SHOWN ON  SCREEN: ", currentIndex_jsonData);

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


}


function favoriteState() {
    favorite_btn.classList.toggle("active");

    data[currentIndex_jsonData].favorite =
        favorite_btn.classList.contains("active");

    console.log(data[currentIndex_jsonData]);

    fetchPut(data);
}


function arrowForwardBtn(data) {

    const arrowForward_btn = document.getElementById("arrowForward_btn");


    arrowForward_btn.addEventListener("click", () => {
        //console.log("CURRENT INDEX OF THE ARRAY: ", currentIndex_jsonData);

        /* Clean all the divs categories to white */


        //console.log(currentIndex_historyArray)

        if (currentIndex_historyArray === history_arr.length - 1) {
            // We're on the latest question.
            // Right arrow should generate a new one.
            showTextOnUserScreen(data);
            //console.log("history_arr: ", history_arr);
        } else {
            currentIndex_historyArray++;
            areaWhereTheTextIsGonnaBeShown(history_arr[currentIndex_historyArray]);

            //console.log("history_arr: ", history_arr);
        }

        enableArrowBack()
    })
}

function backArrowBtn() {


    arrowBack_btn.addEventListener("click", () => {
        //console.log("arrow Back Clickedd")

        // This line makes the counter go backwards every time you click.
        currentIndex_historyArray = (currentIndex_historyArray - 1 + history_arr.length) % history_arr.length;

        console.log(currentIndex_historyArray)
        console.log(history_arr[currentIndex_historyArray].question);
        areaWhereTheTextIsGonnaBeShown(history_arr[currentIndex_historyArray])
        enableArrowBack();
    })
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
        console.log(editDeleteOrAddNew)
        console.log("INDEX TO BE DELETED: ", currentIndex_jsonData)
        delete_btn.classList.add("hidden");
        submitSection.classList.add("hidden");


        console.log("submitSectionHidden")
        //turningTheTextAreasEditable()

    });


    behaviorForButtonsDeleteAndCancelInsideTheAlertDelete();
}



function behaviorForButtonsDeleteAndCancelInsideTheAlertDelete() {
    // BEHAVIOR FOR "DELETE" BUTTON INSIDE THE ALERT TO EFFECTIVELY DELETE DATA:
    deleteDataAccepted_btn.addEventListener("click", () => {
        submitSection.classList.remove("hidden");
        navBar.classList.remove("hidden");
        delete_btn.classList.remove("hidden");
        currentScreenLocation.innerHTML = "Home"
        stylingButtonsSection.classList.add("hidden");
        favorite_btn.classList.remove("hidden");




        console.log("INDEX BEING FINALY DELETED: ", currentIndex_jsonData)

        /* IN HERE: => MAKE AN HTTP DELETE REQUEST */
        data.splice(currentIndex_jsonData, 1);
        history_arr.splice(currentIndex_jsonData, 1);
        data = data;
        alert("DATA PERMANENTLY DELETED. CHECK THE CONSOLE FOR MORE INFO")






        fetchPut(data);







        document.querySelectorAll("button").forEach(b => {
            b.hidden;
        });

        removeEditableState();
        showTextOnUserScreen(data);

    });


    // BEHAVIOR FOR "CANCEL" BUTTON INSIDE THE ALERT TO CANCEL THE DELETE:
    const doNotDeleteData_btn = document.getElementById("doNotDeleteData_btn");
    doNotDeleteData_btn.addEventListener("click", () => {
        submitSection.classList.remove("hidden");
        delete_btn.classList.remove("hidden");
        currentScreenLocation.innerHTML = "Edit"


    });
}



/* GO TO "EDIT DATA" SCREEN */
function editDataScreen() {
    edit_btn.addEventListener("click", () => {
        stylingButtonsSection.classList.remove("hidden");
        favorite_btn.classList.add("hidden");

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


        submittingNewDataOnline();
    });

}



/* GO TO "ADD NEW" SCREEN */
function goToAddNewScreen() {

    /* Text areas go empty on click the "Add New"" button */
    addNewData_btn.addEventListener("click", () => {
        stylingButtonsSection.classList.remove("hidden");
        favorite_btn.classList.add("hidden");


        delete_btn.classList.add("hidden");
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
        // topic: topic.innerHTML ??????
        edition: false,
    };



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

    fetchPut(data);
    areaWhereTheTextIsGonnaBeShown(newDataToSubmitOnline);
}



function creatingNewData() {

    /* Save the new data into an object */
    newDataToSubmitOnline = {

        question: question.innerHTML,
        explanation: explanation.innerHTML,
        answer: answer.innerHTML,
        example: example.innerHTML,
        // topic: topic.innerHTML ??????
        edition: false,
    };


    /* Push the new data into the array */
    data.push(newDataToSubmitOnline);
    history_arr.push(newDataToSubmitOnline);


    console.log("DATA AFTER CREATING NEW DATA: ", data[data.length - 1])
    console.log("ORIGINAL DATA: ", data);
    console.log("SUBMITTING NEW DATA RIGHT NOW!!! ");


    navBar.classList.remove("hidden");
    fetchPut(data);
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
        stylingButtonsSection.classList.add("hidden");
        favorite_btn.classList.remove("hidden");


        currentScreenLocation.innerHTML = "Home";
        delete_btn.classList.remove("hidden");
        navBar.classList.remove("hidden");
        editing = true;
        //console.log("CANCELING SUBMITTING CHANGES RIGHT NOW!!! ", editing)

        removeEditableState();
        areaWhereTheTextIsGonnaBeShown(randomQuestion);
    });



    /* ACTUALLY HITTING THE SUBMIT BUTTON */
    submitChanges_btn.addEventListener("click", () => {
        stylingButtonsSection.classList.add("hidden");
        favorite_btn.classList.remove("hidden");

        navBar.classList.remove("hidden");
        currentScreenLocation.innerHTML = "Home";
        delete_btn.classList.remove("hidden");

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
function fetchPut(data) {

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
function lastSearchedQuestion(searchedQuestion) {
    //console.log(searchedQuestion);

    // Takes a string and standardizes it so it can be compared reliably.
    const normalize = str =>
        str
            // Replace the literal HTML text "&nbsp;" with a normal space.
            .replace(/&nbsp;/gi, " ")

            // Replace actual non-breaking space characters (Unicode U+00A0)
            // with regular spaces.
            .replace(/\u00A0/g, " ")

            // Replace multiple consecutive whitespace characters
            // (spaces, tabs, newlines, etc.) with a single space.
            .replace(/\s+/g, " ")

            // Remove any spaces at the beginning and end of the string.
            .trim()

            // Convert everything to lowercase so capitalization is ignored.
            .toLowerCase();
    const result = data.find(
        item => normalize(item.question) === normalize(searchedQuestion)
    );


    //console.log(result)
    if (result) {
        currentIndex_jsonData = data.indexOf(result);

        //console.log("SEARCHING FOR SEARCHED QUESTION:", result.question);
        //console.log("INDEX OF SEARCHED QUESTION:", currentIndex_jsonData);
        history_arr[0] = result;
        //console.log("history_arr: ", history_arr);
        areaWhereTheTextIsGonnaBeShown(result);
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


            /* SAVE DATA ON LOCALSTORAGE:
            For the purpose of always having it up to date in case the api is not working right*/

            //console.log(`localStorage.getItem("searchedQuestion"):   `, searchedQuestion);



            // CALL THE FUNCTIONS TO EXECUTE THE PROGRAM
            showTextOnUserScreen(data);
            arrowForwardBtn(data);
            backArrowBtn();
            switchVisibilityOrEditableState();
            editDataScreen();
            goToAddNewScreen();
            visibilityOFAlertDeleteData();
            lastSearchedQuestion(searchedQuestion);


        });
});
