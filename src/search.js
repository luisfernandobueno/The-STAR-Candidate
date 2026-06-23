// https://luisfernandobueno.github.io/json/jipapp.json
const url_interview_data = "https://getpantry.cloud/apiv1/pantry/3892fc79-3651-48dd-aa62-75da3e708be7/basket/my-new-basket-name";
const searchBar = document.getElementById("searchBar");
const displayAllQuestions = document.getElementById("displayAllQuestions");


function displayAll(data) {

    data.forEach(e => {
        displayAllQuestions.innerHTML += `<li><a href='index.html'">${e.question}</a></li>`
        console.log(e.question)
    })
}




document.addEventListener("DOMContentLoaded", function () {
    let dataSavedOnLocalStorage = localStorage.getItem("data_JSONBin");

    fetch(url_interview_data)
        .then((res) => res.json())
        .then((json) => {
            originalData = json;
            data = json.lines;
            console.log(data)

            displayAll(data);

        });
});
