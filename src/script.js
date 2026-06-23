
/* ------------------------- GLOBAL VARIABLES ------------------------- */


// https://luisfernandobueno.github.io/json/jipapp.json
const url_interview_data = "https://getpantry.cloud/apiv1/pantry/3892fc79-3651-48dd-aa62-75da3e708be7/basket/my-new-basket-name";


const toggleDeleteAlert_btn = document.getElementById("toggleDeleteAlert_btn");
const deleteData_alert = document.getElementById("deleteData_alert");
const submitSection = document.getElementById("submitSection");
const deleteDataAccepted_btn = document.getElementById("deleteDataAccepted_btn");

const addNewData_btn = document.getElementById("addNewData_btn");

const currentScreenLocation = document.getElementById("currentScreenLocation");
const categoriesSection = document.querySelectorAll(".category");
const turningTheTextAreasEditable_array = document.querySelectorAll(".editable");
const question = document.getElementById("question");
const explanation = document.getElementById("explanation");
const answer = document.getElementById("answer");
const example = document.getElementById("example");
let randomIndex;
let randomQuestion = {};

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



function sectionCategoriesBehavior() {
    updateCategories(topic);

    

    switch (topic) {
        case "Recruiter":
            document.getElementById("Recruiter").style.backgroundColor = "rgb(68, 196, 255)";
            document.getElementById("Recruiter").classList.add("shadow");
            break;

        case "Candidate":
            document.getElementById("Candidate").style.backgroundColor = "greenyellow";
            document.getElementById("Candidate").classList.add("shadow");
            break;

        case "Advice":
            document.getElementById("Advice").style.backgroundColor = "rgb(255, 255, 124)";
            document.getElementById("Advice").classList.add("shadow");
            break;

        case "Encouragement":
            document.getElementById("Encouragement").style.backgroundColor = "rgb(255, 164, 104)";
            document.getElementById("Encouragement").classList.add("shadow");
            break;
    }
}



/* Finds the text areas where the info is gonna be displayed on the HTML
and pastes there the corresponding data to finally be shown on screen*/
function areaWhereTheTextIsGonnaBeShown(randomQuestion) {

    console.log("CURRENT INDEX OF THE ARRAY: ", randomIndex);

    //console.log(randomQuestion.topic);

    topic = randomQuestion.topic;
    sectionCategoriesBehavior();

    question.innerHTML = randomQuestion.question;
    explanation.innerHTML = randomQuestion.explanation;
    answer.innerHTML = randomQuestion.answer;
    example.innerHTML = randomQuestion.example;
}



/* Chooses a random index from the array and passes that one to the function that displays
the text on screen, so it shows specifically the info in that particular index of the array */
function showTextOnUserScreen(dataToBeDisplayed) {


    randomIndex = Math.floor(Math.random() * data.length);
    /* Why this works:
    Math.random() → gives something like 0.37482
    Multiply by data.length → scales it to your array size
    Math.floor() → converts it into a valid integer index (0 to length-1)
    */

    randomQuestion = data[randomIndex];
    currentID = data.randomIndex;
    //console.log("FUNCTION: SHOW TEXT ON USER SCREEN: ", randomQuestion)
    areaWhereTheTextIsGonnaBeShown(randomQuestion);
}



/* Takes both: Back & Next Buttons and applies the same behavior for both of them:
To show a random index data to the user screen. */
function displayTheNextTextOnScreen(data) {



    document.querySelectorAll(".showNextAndPreviousData_btn").forEach(btn => {
        btn.addEventListener("click", () => {

            /* Clean all the divs categories to white */
            const deleteCategory = document.querySelectorAll(".category");
            deleteCategory.forEach(e => {
                e.style.backgroundColor = "rgb(243, 243, 243)";
                e.classList.remove("shadow")
                //console.log(e)
            })

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

        showHideDeleteAlert();

        console.log("submitSectionHidden")
        turningTheTextAreasEditable()

    });


    behaviorForButtonsDeleteAndCancelInsideTheAlertDelete();
}



function behaviorForButtonsDeleteAndCancelInsideTheAlertDelete() {
    // BEHAVIOR FOR "DELETE" BUTTON INSIDE THE ALERT TO EFFECTIVELY DELETE DATA:
    deleteDataAccepted_btn.addEventListener("click", () => {
        let currentID = randomQuestion.id;
        console.log(currentID);
        console.log(randomQuestion.question)


        /* IN HERE: => MAKE AN HTTP DELETE REQUEST */

        /* fetch(`${url_interview_data}`, {
                method: "DELETE"
            });  */




        document.querySelectorAll("button").forEach(b => {
            b.hidden;
        });
        turningTheTextAreasEditable();
        deleteData_alert.hidden = !deleteData_alert.hidden;
        //submitSection.hidden = !submitSection.hidden
        showTextOnUserScreen(data);

    });


    // BEHAVIOR FOR "CANCEL" BUTTON INSIDE THE ALERT TO CANCEL THE DELETE:
    const doNotDeleteData_btn = document.getElementById("doNotDeleteData_btn");
    doNotDeleteData_btn.addEventListener("click", () => {
        turningTheTextAreasEditable();

        showHideDeleteAlert();
    });
}



/* HIDES AND SHOWS THE DELETE ALERT ON SCREEN */
function showHideDeleteAlert() {
    deleteData_alert.hidden = !deleteData_alert.hidden;

}



/* GO TO "ADD NEW" SCREEN */
function goToAddNewScreen() {
    const delete_btn = document.getElementById("delete");

    /* Text areas go empty on click the "Add New"" button */
    addNewData_btn.addEventListener("click", () => {
        delete_btn.hidden;
        currentScreenLocation.innerHTML = "Add New";

        turningTheTextAreasEditable_array.forEach(c => {
            c.innerHTML = "";
        });

        editing = false;
        console.log("EDITING DATA RIGHT NOW? ", editing)

    });
}


/* THIS FUNCTION EVALUATES WHETHER ALL TEXT AREAS ARE EMPTY OR NOT */
function areAllTextAreasEmpty() {
    for (const div of turningTheTextAreasEditable_array) {
        if (div.textContent.trim() !== "") {
            return false;
        }
    }

    return true;
}


/* THIS FUNCTION EVALUATES WHETHER IF ITS EDITING OR NOT */
function isItEditingDataRightNow() {
    console.log("- !!! ENTERING THE isItEditingDataRightNow? FUNCTION RIGHT NOW !!! -")


    if (editing) {
        console.log("EDITING DATA RIGHT NOW? ", editing)

        /* Add here block of code if it is editing:
            - FIRST: 
                    
                    - If at least 1 text area is not empty, then save data








        -------------------------------------------------------------------------------------
            - FIRST: 
                    Find the specific index in where the new data will be replaced 
            - SECOND:
                    Replace the data into the array
            - THIRD:
                    Call to the submittingNewDataOnline() function with the updated array       
        */

    } else {
        console.log(`EDITING DATA RIGHT NOW? , ${editing} - CURRENTLY SUBMITTING NEW ONE`)
        return
    }
}



/* SAVES THE TEXTS INTO AN OBJECT. THEN, SUBMITS IT ONLINE */
function submittingNewDataOnline() {

    const submitChanges_btn = document.getElementById("submitChanges_btn");
    const cancelChangesDoNotSubmit_btn = document.getElementById("cancelChangesDoNotSubmit_btn");

    /* On click, the "Cancel" button turns the screen back to what it looked like */
    cancelChangesDoNotSubmit_btn.addEventListener("click", () => {
        currentScreenLocation.innerHTML = "Home";
        areaWhereTheTextIsGonnaBeShown(randomQuestion);
    });











    /* ACTUALLY HITTING THE SUBMIT BUTTON */
    submitChanges_btn.addEventListener("click", () => {
        currentScreenLocation.innerHTML = "Home";
        console.log("textAreasEmpty: ", areAllTextAreasEmpty());

        /*  - For each text area === empty => is not editing => return.  */
        if (areAllTextAreasEmpty()) {

            areaWhereTheTextIsGonnaBeShown(randomQuestion);
            alert("CANCELING SUBMITTING FOR ALL EMPTY TEXT AREAS");
            console.log("CANCELING SUBMITTING FOR ALL EMPTY TEXT AREAS");
            return

        };

        console.log("SUBMITTING FOR AT LEAST 1 TEXT AREA FILLED")
        isItEditingDataRightNow();



        /* FIRST: Save the new data just created or just edited into an object */
        let newDataToSubmitOnline = {
            // id: randomQuestion.id,
            question: question.innerHTML,
            explanation: explanation.innerHTML,
            answer: answer.innerHTML,
            example: example.innerHTML,
            // topic: topic.innerHTML ??????
            edition: false,
        };



        if (editing) {


            /*  FIRST: Find the specific index in where the new data will be replaced  */

            console.log("CURRENT INDEX OF THE ARRAY: ", randomIndex)
            console.log("DATA PREVIOUS BEING EDITED: ", randomQuestion)

            /*              - SECOND:
                        Replace the data into the array
            */
            let currentIndex = randomIndex;
            console.log("currentIndex = ", currentIndex)
            console.log(data);
            console.log(data[currentIndex])
            data[currentIndex] = newDataToSubmitOnline;
            console.log(data[currentIndex])
            /*      - THIRD:
                         Call to the submittingNewDataOnline() function with the updated array       
             */
            // data.lines[currentIndex] = newDataToSubmitOnline;
            console.log("ORIGINAL DATA: ", originalData)
            console.log(originalData.lines[currentIndex])


            fetch(url_interview_data, {
                method: "PUT",
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



            console.log("SUBMITTING EDITED DATA RIGHT NOW!!! ", editing)
            console.log("NEW DATA UPLOADED ONLINE: ", newDataToSubmitOnline)

            return



        }
        console.log(`SUBMITTING EDITED DATA RIGHT NOW? , ${editing} - CURRENTLY SUBMITTING NEW ONE`)








        //console.log("EDITING CURRENT DATA: ", editing);
        // console.log("INDEX of element being currently edited: ", data.randomIndex)




        //console.log("SAVING CHANGES:", newDataToSubmitOnline);



        /* SECOND:
            You're gonna save that object into the array: 
                - If you already have an index (because you're just editing), overwrite that data with the new one.
                - If you don't have an index (because you're adding new data), push the info at the end of the array.
          */




        /*  FROM HERE -> POST (FETCH) THE DATA TO BE SUBMITTED  */
        /*   THIRD: POST the array using fetch to get it back online  */

        fetch(url_interview_data, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                lines: [
                    {
                        question: question.innerHTML,
                        explanation: explanation.innerHTML,
                        answer: answer.innerHTML,
                        example: example.innerHTML,
                    }
                ]
            })
        });






        console.log("NEW DATA UPLOADED ONLINE: ", newDataToSubmitOnline)


        editing = true;
        console.log("GETTING OUT OF THE submittingNewDataOnline FUNCTION RIGHT NOW!!! ", editing);


        areaWhereTheTextIsGonnaBeShown(newDataToSubmitOnline);
    }
    )
}








/* --------------- FROM HERE AND FORWARD, THE DOM BEHAVIOR STARTS ------------------ */

document.addEventListener("DOMContentLoaded", function () {
    

    fetch(url_interview_data)
        .then((res) => res.json())
        .then((json) => {
            originalData = json;
            data = json.lines;
            console.log(data)



            /* SAVE DATA ON LOCALSTORAGE:
            For the purpose of always having it up to date in case the api is not working right*/ 
            



            // CALL THE FUNCTIONS TO EXECUTE THE PROGRAM
            showTextOnUserScreen(data);

            displayTheNextTextOnScreen(data);
            switchVisibilityOrEditableState();
            goToAddNewScreen();
            visibilityOFAlertDeleteData();
            submittingNewDataOnline()


        });
});
