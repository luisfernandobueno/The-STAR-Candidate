
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

/* FOOTER SECTION */
const navBar = document.getElementById("navBar");
const addNewData_btn = document.getElementById("addNewData_btn");
const submitSection = document.getElementById("submitSection");


let currentIndex;
let randomQuestion = {};

let newDataToSubmitOnline = {}
let editDeleteOrAddNew;
let editing = true;
let topic;




/* ------------------------- FUNCTIONS ------------------------- */

/* IF THE SCREEN WIDTH IS LESS THAN 210PX, ONLY THE CURRENT CATEGORY WILL BE SHOWN ON SCREEN */
function updateCategories(topic) {
    if (window.innerWidth < 210) {
        console.log("SCREEN SIZE < 210");

        categoriesSection.forEach((category) => {
            console.log(category.id);
            console.log(topic)

            if (category.id !== topic) {
                category.hidden = true;
            } else {
                category.hidden = false;
            }
        });

    } else {
        categoriesSection.forEach((category) => {
            category.hidden = false;
        });
    }
}



function removePreviousCategory() {
    const deleteCategory = document.querySelectorAll(".category");
    deleteCategory.forEach(e => {
        e.style.backgroundColor = "rgb(243, 243, 243)";
        e.classList.remove("shadow")
        //console.log(e)
    })
}



function sectionCategoriesBehavior(topic) {
    updateCategories(topic);
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

    sectionCategoriesBehavior(randomQuestion.topic)

    question.innerHTML = randomQuestion.question;
    explanation.innerHTML = randomQuestion.explanation;
    answer.innerHTML = randomQuestion.answer;
    example.innerHTML = randomQuestion.example;

    localStorage.removeItem("searchedQuestion");
    console.log("FINAL INDEX BEING SHOWN ON  SCREEN: ", currentIndex)
}



/* Chooses a random index from the array and passes that one to the function that displays
the text on screen, so it shows specifically the info in that particular index of the array */
function showTextOnUserScreen(dataToBeDisplayed) {


    currentIndex = Math.floor(Math.random() * data.length);


    randomQuestion = data[currentIndex];
    //currentIndex = data.currentIndex;
    console.log("FUNCTION: SHOW TEXT ON USER SCREEN: ", randomQuestion)
    console.log("FIRST INDEX WHEN JUST ENTERING THE WEBSITE: ", currentIndex)
    areaWhereTheTextIsGonnaBeShown(randomQuestion);
}



/* Takes both: Back & Next Buttons and applies the same behavior for both of them:
To show a random index data to the user screen. */
function displayTheNextTextOnScreen(data) {


    document.querySelectorAll(".showNextAndPreviousData_btn").forEach(btn => {
        btn.addEventListener("click", () => {
            console.log("CURRENT INDEX OF THE ARRAY: ", currentIndex);

            /* Clean all the divs categories to white */


            showTextOnUserScreen(data);

        })
    })
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
        console.log("INDEX TO BE DELETED: ", currentIndex)
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


        console.log("INDEX BEING FINALY DELETED: ", currentIndex)

        /* IN HERE: => MAKE AN HTTP DELETE REQUEST */
        originalData.lines.splice(currentIndex, 1);
        data = originalData.lines;
        alert("DATA PERMANENTLY DELETED. CHECK THE CONSOLE FOR MORE INFO")






        fetchPut(originalData);







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
        navBar.classList.add("hidden");
        currentScreenLocation.innerText = "Edit"
        editDeleteOrAddNew = "edit";
        //console.log(editDeleteOrAddNew)
        editing = true;
        //console.log("EDITING DATA RIGHT NOW? ", editing)
        console.log("INDEX BEING EDITED: ", currentIndex);
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
    //let currentIndex = currentIndex;


    /*              - SECOND:
                Replace the data into the array        */

    /* console.log("CURRENT INDEX: ", currentIndex)

    console.log("DATA PREVIOUS EDITING: ", data[currentIndex].question) */


    data[currentIndex] = newDataToSubmitOnline;


    /* console.log("DATA AFTER EDITING: ", data[currentIndex].question)
    console.log("FULL ARRAY AFTER EDITING: ", data); */
    //console.log(data[currentIndex].question)
    originalData.lines[currentIndex] = newDataToSubmitOnline;
    //console.log("ORIGINAL DATA: ", originalData)


    /*      - THIRD:
                 Call to the fetch Put(originalData); function with the updated array       
     */



    console.log("SUBMITTING EDITED DATA RIGHT NOW!!! ")
    console.log("Exiting the editing data function right now")

    fetchPut(originalData);
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
    originalData.lines.push(newDataToSubmitOnline);


    console.log("DATA AFTER CREATING NEW DATA: ", originalData.lines[originalData.lines.length - 1])
    console.log("ORIGINAL DATA: ", originalData);
    console.log("SUBMITTING NEW DATA RIGHT NOW!!! ");


    navBar.classList.remove("hidden");
    fetchPut(originalData);
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
        areaWhereTheTextIsGonnaBeShown(data[currentIndex]);
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

        navBar.classList.remove("hidden");
        currentScreenLocation.innerHTML = "Home";
        delete_btn.classList.remove("hidden");

        console.log("WHAT ARE YOU CURRENTLY SUBMITING? - ", editDeleteOrAddNew);
        console.log("INDEX OF THE ARRAY WHEN SUBMITTIN: ", currentIndex);
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
function fetchPut(originalData) {

    console.log("Currently inside the FETCH PUT function right now")


    fetch(url_interview_data, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(originalData)
    })
        .then(response => {
            console.log("Status:", response.status);
            return response.json();
        })
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error(error);
        });


    console.log("Exiting the FETCH PUT  function right now")
}


/* SHOW THE SEARCH SECTION INTO THE SCREEN */
function lastSearchedQuestion(searchedQuestion) {
    const question = data.find(e => e.question === searchedQuestion);

    if (question) {
        currentIndex = data.indexOf(question);

        console.log("SEARCHING FOR SEARCHED QUESTION:", question.question);
        console.log("INDEX OF SEARCHED QUESTION:", currentIndex);

        areaWhereTheTextIsGonnaBeShown(question);
    }
}




/* --------------- FROM HERE AND FORWARD, THE DOM BEHAVIOR STARTS ------------------ */

document.addEventListener("DOMContentLoaded", function () {

    fetch(url_interview_data)
        .then((res) => res.json())
        .then((json) => {
            originalData = json;
            //console.log("Recieved Data: ", originalData)
            data = json.lines;
            //console.log(data)


            /* SAVE DATA ON LOCALSTORAGE:
            For the purpose of always having it up to date in case the api is not working right*/
            const searchedQuestion = localStorage.getItem("searchedQuestion");
            //console.log(`localStorage.getItem("searchedQuestion"):   `, searchedQuestion);



            // CALL THE FUNCTIONS TO EXECUTE THE PROGRAM
            showTextOnUserScreen(data);
            displayTheNextTextOnScreen(data);
            switchVisibilityOrEditableState();
            editDataScreen();
            goToAddNewScreen();
            visibilityOFAlertDeleteData();
            lastSearchedQuestion(searchedQuestion);


        });
});
