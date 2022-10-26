/** Exercise 04 - API **/

// References: 
// The logic for line 21 is from: 
//      https://stackoverflow.com/questions/8900732/sort-objects-in-an-array-alphabetically-on-one-property-of-the-array


const url = 'https://restcountries.com/v3.1/all';


let writeData = (orderedData) => {
    myOl = document.getElementById("results");

    for (let i = 0; i < Object.keys(orderedData).length; i++) {
        const myLi = document.createElement("li");
        myLi.appendChild(document.createTextNode(orderedData[i]["name"]["common"] + ": " + orderedData[i]["population"]));
        myOl.appendChild(myLi);
    }
}


let getData = (url) => {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        orderedData = data.sort(function(a, b) { return a["name"]["common"].localeCompare(b["name"]["common"]) });

        for (let i = 0; i < Object.keys(orderedData).length; i++) 
            orderedData[i]["population"] = orderedData[i]["population"].toLocaleString('en-US');

        writeData(orderedData);
    })
    .catch(error => console.log(error));
}


getData(url);
