/** Exercise 02 - Reverse **/

function reverse(container) {
    userInput = document.getElementById(`input`).value;

    if (userInput.toString().length != 8) {
        container.innerHTML =`Please enter an 8 digit number.`;
        container.style.color = `red`;
        return;
    }

    container.innerHTML = userInput + ` --> ` + Number(userInput.toString().split("").reverse().join(""));
    container.style.color = `green`;
}

document.getElementById(`reverse`).addEventListener(`click`, event => { reverse(document.getElementById(`own`)) });