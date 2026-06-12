
/* ------------------------- GLOBAL VARIABLES ------------------------- */



// https://luisfernandobueno.github.io/json/jipapp.json
const url_interview_data = "https://getpantry.cloud/apiv1/pantry/3892fc79-3651-48dd-aa62-75da3e708be7/basket/my-new-basket-name";


const toggleDeleteAlert_btn = document.getElementById("toggleDeleteAlert_btn");
const deleteData_alert = document.getElementById("deleteData_alert");
const submitSection = document.getElementById("submitSection");
const deleteDataAccepted_btn = document.getElementById("deleteDataAccepted_btn");
const cancelChangesDoNotSubmit_btn = document.getElementById("cancelChangesDoNotSubmit_btn");
const addNewData_btnHeader = document.getElementById("addNewData_btnHeader");


const behaviorForTextAreasForEditableContent_array = document.querySelectorAll(".editable");
const question = document.getElementById("question");
const explanation = document.getElementById("explanation");
const answer = document.getElementById("answer");
const example = document.getElementById("example");
let randomQuestion;





/* ------------------------- FUNCTIONS ------------------------- */




/* Finds the text areas where the info is gonna be displayed on the HTML
and pastes there the corresponding data to finally be shown on screen*/
function areaWhereTheTextIsGonnaBeShown(randomQuestion) {


    //console.log(randomQuestion.topic);

    switch (randomQuestion.topic) {

        case "Recruiter":
            document.getElementById("cat_1").style.backgroundColor = "rgb(55, 187, 248)";
            break;

        case "Candidate":
            document.getElementById("cat_2").style.backgroundColor = "greenyellow";
            break;

        case "Advice":
            document.getElementById("cat_3").style.backgroundColor = "rgb(255, 255, 85)";
            break;

        case "Encouragement":
            document.getElementById("cat_4").style.backgroundColor = "rgb(255, 164, 104)";
            break;
    }

    question.innerText = randomQuestion.question;
    explanation.innerHTML = randomQuestion.explanation;
    answer.innerHTML = randomQuestion.answer;
    example.innerHTML = randomQuestion.example;
}



/* Chooses a random index from the array and passes that one to the function that displays
the text on screen, so it shows specifically the info in that particular index of the array */
function showTextOnUserScreen(dataToBeDisplayed) {


    let randomIndex = Math.floor(Math.random() * data.length);

    /* Why this works:
    Math.random() → gives something like 0.37482
    Multiply by data.length → scales it to your array size
    Math.floor() → converts it into a valid integer index (0 to length-1)
    */

    randomQuestion = data[randomIndex];
    // console.log(randomQuestion)
    areaWhereTheTextIsGonnaBeShown(randomQuestion);
}



/* Takes both: Back & Next Buttons and applies the same behaviour for both of them:
To show a random index data to the user screen. */
function displayTheNextTextOnScreen(data) {



    document.querySelectorAll(".showNextAndPreviousData_btn").forEach(btn => {
        btn.addEventListener("click", () => {

            /* Clean all the divs categories to white */
            const deleteCategory = document.querySelectorAll(".category");
            deleteCategory.forEach(e => {
                e.style.backgroundColor = "white";
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
            behaviorForTextAreasForEditableContent();
        });
    });
}



/* TEXT AREAS WILL SWITCH BETWEEN EDITABLE OR NOT DEPENDING IF YOU'RE ADDING NEW DATA OR EDITING EXISTING ONE */
function behaviorForTextAreasForEditableContent() {
    behaviorForTextAreasForEditableContent_array.forEach(c => {
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
        disableSubmitAndCancelButtonsOnFooter()
        console.log("submitSectionHidden")
        behaviorForTextAreasForEditableContent()

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
        behaviorForTextAreasForEditableContent();
        deleteData_alert.hidden = !deleteData_alert.hidden;
        //submitSection.hidden = !submitSection.hidden
        showTextOnUserScreen(data);

    });


    // BEHAVIOR FOR "CANCEL" BUTTON INSIDE THE ALERT TO CANCEL THE DELETE:
    const doNotDeleteData_btn = document.getElementById("doNotDeleteData_btn");
    doNotDeleteData_btn.addEventListener("click", () => {
        behaviorForTextAreasForEditableContent();
        
        showHideDeleteAlert();
    });
}



/* HIDES AND SHOWS THE DELETE ALERT ON SCREEN */
function showHideDeleteAlert() {
    deleteData_alert.hidden = !deleteData_alert.hidden;
    
}



/* GO TO "ADD NEW" SCREEN */
function linkToScreenAddNew() {

    /* Text areas go empty on click the "Add New"" button */

    addNewData_btnHeader.addEventListener("click", () => {

        
        behaviorForTextAreasForEditableContent_array.forEach(c => {
            c.innerHTML = "";
            //console.log(c.id)
        });


        // IN HERE: UPLOAD THE DATA ONLINE
        

    });



    /* On click, the "Cancel" button turns the screen back to what it looked like */

    cancelChangesDoNotSubmit_btn.addEventListener("click", () => {
        deleteDataAccepted_btn.hidden;
        
        areaWhereTheTextIsGonnaBeShown(randomQuestion);
    });
}



/* SAVES THE TEXTS INTO AN OBJECT. THEN, SUBMITS IT ONLINE */
function submittingNewDataOnline() {

    /* FIRST: Save the new data just created or just edited into an object */

    let submitChanges_btn = document.getElementById("submitChanges_btn");
    submitChanges_btn.addEventListener("click", () => {
        //!toggleDeleteAlert_btn.hidden;
        disableSubmitAndCancelButtonsOnFooter();
        submitSection.hidden = !submitSection.hidden;


        let newDataToSubmitOnline = {
            // id: randomQuestion.id,
            question: question.innerHTML,
            explanation: explanation.innerHTML,
            answer: answer.innerHTML,
            example: example.innerHTML,
            // topic: topic.innerHTML ??????
            edition: false,
        };
        console.log("SAVING CHANGES:", newDataToSubmitOnline);



        // FROM HERE -> POST (FETCH) THE DATA TO BE SUBMITTED

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


        //console.log("NEW DATA UPLOADED ONLINE: ", newDataToSubmitOnline)




        /*

        SECOND:
            You're gonna save that object into the array: 
                - If you already have an index (because youre just editing), overwrite that data with the new one.
                - If you don't have an index (because youre adding new data), push the info at the end of the array.
            
            
        THIRD:
            POST the array using fetch to get it back online   

        */



        areaWhereTheTextIsGonnaBeShown(newDataToSubmitOnline);
         deleteData_alert.hidden = !deleteData_alert.hidden;

    }
    )
}






/* function displayAllQuestions(data) {
    // document.getElementById("searchBar")

    let displayAllQuestions = document.getElementById("displayAllQuestions");
    data.forEach(e => {
        displayAllQuestions.innerText = `<p>${e.question}</p>`
        console.log(e.question)
    })
} */


/* --------------- FROM HERE AND FORWARD, THE DOM BEHAVIOR STARTS ------------------ */

document.addEventListener("DOMContentLoaded", function () {
    let dataSavedOnLocalStorage = localStorage.getItem("data_JSONBin");

    fetch(url_interview_data)
        .then((res) => res.json())
        .then((json) => {
            data = json.lines;
            console.log(data)

            // SAVE DATA ON LOCALSTORAGE
            // localStorage.setItem("data_JSONBin", data);

            // CALL THE FUNCTIONS TO EXECUTE THE PROGRAM



            
                        showTextOnUserScreen(data);
                        displayTheNextTextOnScreen(data);
                        switchVisibilityOrEditableState();
                        linkToScreenAddNew();
                        visibilityOFAlertDeleteData();
                        submittingNewDataOnline()
            
                //displayAllQuestions(data);
            




        });
});
