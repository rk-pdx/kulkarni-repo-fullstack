/** Exercise 03 - Form **/

/**
 * Sources:
 *   1. https://getbootstrap.com/docs/4.3/components/forms/
 */

function handleFormSubmission () {
    const name = document.getElementById(`name`).value;
    const email = document.getElementById(`email`).value;
    
    if (name ===``) {
        console.log(`Name is required.`);
        return;
    }
    else if (email === ``) {
        console.log(`Email is required.`);
        return;
    }

    const customMsg = document.getElementById(`customMsg`).value;
    const newsletter = document.getElementById(`newsletter`).checked;
    
    console.log(`========= Form Submission =========`);
    console.log(`${name}`);
    console.log(`${email}`);
    console.log(`${customMsg}`);
    if (newsletter) console.log(`Yes, I would like to join the newsletter.`);
    else console.log(`No, thank you.`);
    
}

document.getElementById(`submit-btn`).addEventListener(`click`, event => { handleFormSubmission() });