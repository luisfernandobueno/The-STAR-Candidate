
// GLOBAL VARIABLES;

const url_interview_data = "https://github.com/luisfernandobueno/json/blob/700bd6dd500a961c42c04bff93aceddaed826641/api";


const contentEditableArray = document.querySelectorAll(".editable");
const question = document.getElementById("question");
const explanation = document.getElementById("explanation");
const answer = document.getElementById("answer");
const example = document.getElementById("example");
const topic = document.getElementById("topic");

let randomQuestion;






// FUNCTIONS;

function sectionEditableContent(randomQuestion) {

    question.innerText = randomQuestion.question;
    explanation.innerHTML = randomQuestion.explanation;
    answer.innerHTML = randomQuestion.answer;
    example.innerHTML = randomQuestion.example;
    topic.innerHTML = randomQuestion.topic;

}



function showDataOnScreen(data) {

    let randomIndex = Math.floor(Math.random() * data.length);

    /* Why this works:
    Math.random() → gives something like 0.37482
    Multiply by data.length → scales it to your array size
    Math.floor() → converts it into a valid integer index (0 to length-1)
    */

    randomQuestion = data[randomIndex];
    console.log(randomQuestion)
    /*- Keep in mind that that behaviour must be avoided if we're comming 
    back from just editing.In that case it should show the same data as before.
    */

    sectionEditableContent(randomQuestion);

    /* 
    Save the question on localStorage to coninue where you left every time. Useful 
    when you edit and need to come back to the same question showing the new data, for example. 
    */

    /* localStorage.setItem("currentQuestion", randomQuestion.question); */
}



function showNextData(data) {
    /* showNextData_btn = document.getElementById("showNextData_btn");
    showNextData_btn.addEventListener("click", () => {

        - Add here the behaviour for showing the next data in the array
        - Se necesita un bucle for each para iterar en todos los indices del array
        - Al llamar nuevamente a la funcion showDataOnScreen, la misma lo hace actualmente
        sólo por el indice data[0] del array. Arreglar dicha función.      
       

        showDataOnScreen(data);
    }); */



    // TAKES BUTTONS "BACK" AND "NEXT" TO SHOW NEXT RANDOM DATA
    document.querySelectorAll(".showNextAndPreviousData_btn").forEach(btn => {
        btn.addEventListener("click", () => {
            showDataOnScreen(data);
        })
    })
}



function toggleButtonsVisibilityAndEditableAreas() {

    // Toggle: alternar entre estados.
    document.querySelectorAll(".manipulatingInformation").forEach(btn => {

        btn.addEventListener("click", () => {

            // Toggle all buttons
            document.querySelectorAll("button").forEach(b => {
                b.hidden = !b.hidden;
            });

            // Toggle editable state
            contentEditableArray.forEach(c => {

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


            visibilityOFAlertDeleteData();

        });
    });
}


function visibilityOFAlertDeleteData() {

            // DELETE BUTTON BEHAVIOUR: IT TOGGLES ALERT VISIBILITY 
            const toggleDeleteAlert_btn = document.getElementById("toggleDeleteAlert_btn");
            toggleDeleteAlert_btn.addEventListener("click", () => {

                showHideDeleteAlert();

            })



            // CANCELLING DELETE:
            const doNotDeleteData_btn = document.getElementById("doNotDeleteData_btn");
            doNotDeleteData_btn.addEventListener("click", () => {

                showHideDeleteAlert();

            });



            // CONFIRMATION FOR DELETING CURRENT DATA:
            const deleteDataAccepted_btn = document.getElementById("deleteDataAccepted_btn");
            deleteDataAccepted_btn.addEventListener("click", () => {

                document.querySelectorAll("button").forEach(b => {
                    b.hidden;
                });

                showHideDeleteAlert();
                showDataOnScreen(data);
            });
}


function showHideDeleteAlert() {
    const alertDeleteData_Section = document.getElementById("alertDeleteData_Section");
    alertDeleteData_Section.hidden = !alertDeleteData_Section.hidden;
}



function uploadingNewData() {


    // BEHAVIOR FOR THE "CANCEL" BUTTON
    const cancelChanges_btn = document.getElementById("cancelChanges_btn");
    cancelChanges_btn.addEventListener("click", () => {
        sectionEditableContent(randomQuestion);
    });


    // BEHAVIOR FOR THE "SAVE" BUTTON
    const addNew_btn = document.getElementById("creatingNewData_btn");
    addNew_btn.addEventListener("click", () => {
        console.log("addNew_btn onClick");

        console.log(randomQuestion);

        contentEditableArray.forEach(c => {
            c.innerHTML = "";
        });
    });
}



function savingNewDataOnline() {

    /* FIRST: 
    Save the new data just created or modified into an object
    */

    let saveChanges_btn = document.getElementById("saveChanges_btn");
    saveChanges_btn.addEventListener("click", () => {

        let newDataToUploadOnline = {
            question: question.innerHTML,
            explanation: explanation.innerHTML,
            answer: answer.innerHTML,
            example: example.innerHTML,
            topic: topic.innerHTML,
            edition: false,
        };

        console.log(`SAVING CHANGES: ${newDataToUploadOnline}`);

        sectionEditableContent(newDataToUploadOnline);
        // Still needs to actually send the data to JSONBin to store it there.

    }
    )



    /* SECOND:
    You're gonna save that object into the array: 
        - If you already have an index (because youre just editing), overwrite that data with the new one.
        - If you don't have an index (because youre adding new data), push the info at the end of the array.
    */

    /* THIRD:
    POST the array using fetch to get it back online   */

}





/* --------------- FROM HERE AND FORWARD, THE DOM BEHAVIOUR STARTS ------------------ */

document.addEventListener("DOMContentLoaded", function () {
    let dataSavedOnLocalStorage = localStorage.getItem("data_JSONBin");

    /* - The lines above are meant to bring back the last data that was uploaded to JSONBin.
    In case of the API being offline or some other issues, localStorage has the latest 
    most recent updates to show.
    
    - Still needed to figure out how to use it in case the JSONBin data is unreachable.
 
    - There's still the need of using STRINGIFY somewher with localStorage, but don't 
    remember if it's with setItem or now with getItem.
    */


    fetch("data.json")
        .then((res) => res.json())
        .then((json) => {
            data = json.lines;
            console.log(data)


            // SAVE DATA ON LOCALSTORAGE
            // localStorage.setItem("data_JSONBin", data);


            // CALL THE FUNCTIONS TO EXECUTE THE PROGRAM
            showDataOnScreen(data);
            showNextData(data);
            toggleButtonsVisibilityAndEditableAreas();
            uploadingNewData();


            // SAVE NEW DATA ONLINE - JSONBIN
            savingNewDataOnline()



            /* If the data is undefined, bring from the local json
                        
            if (url_interview_data === undefined) {
             fetch("data.json")
                .then(res => res.json())
                .then(json => {
                    console.log(json);
                    data = json.lines;
                    console.log(data);
                    showDataOnScreen(data);
                }
                ) 
            */

        });
});
