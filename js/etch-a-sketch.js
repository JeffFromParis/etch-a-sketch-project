const grid = document.querySelector('#grid');
const initSizeOfGrid = 16;
const changeSizeBtn = document.querySelector('#changeSize');
const resetColorsBtn = document.querySelector('#resetColors');
const selectButton = document.querySelector("#colorChosen");
console.log('selectButton : ' + selectButton);

let displayGridFlag = 0;
const displayGridBox = document.querySelector('#displayGrid');
const displayGridValue = displayGridBox.getAttribute("value");
if (displayGridValue == "active") displayGridFlag = 1;


let color = '#' + Math.floor(Math.random() * 16777215).toString(16); //default first color
let randomFlag = 1;

//when loading the page is a 16x16 grid
gridEdition(16);
eventListenerGeneration();


/***************************************************************
applies the grid or not (used when generating a new grid)
****************************************************************/
function applyDisplayGrid() {

    if (displayGridFlag) {
        console.log('Grid must be displayed');
        boxes.forEach(item => {
            item.setAttribute("class", "gridOn");
        });
    } else {
        console.log('Grid must be hidden');
        boxes.forEach(item => {
            item.setAttribute("class", "gridOff");
        });
    }

}

/***************************************************************
remove the border of the components of the grid
****************************************************************/
function switchAndApplyDisplayGrid() {

    if (displayGridFlag) {
        console.log('Hiding the grid');
        boxes.forEach(item => {
            item.removeAttribute("class", ".gridOn");
            item.setAttribute("class", "gridOff");
        });
        displayGridFlag = 0;
    } else {
        console.log('Displaying the grid');
        boxes.forEach(item => {
            item.removeAttribute("class", "gridOff");
            item.setAttribute("class", "gridOn");
        });
        displayGridFlag = 1;
    }
}

/***************************************************************
Remove the existing grid and create a new one with the parameter
@param size : number of elements in a row (and in a column since the grid is a square)
****************************************************************/
function gridEdition(size) {

    //we need first to remove the existing boxes of the grid
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }

    grid.style.cssText = "grid-template: repeat(" + size + ", 1fr)/repeat(" + size + ", 1fr)";

    let boxToAdd = "";
    const numberOfBoxes = size * size;

    for (var i = 0; i < numberOfBoxes; i++) {
        boxToAdd = document.createElement('div');
        boxToAdd.setAttribute("class", "box");
        boxToAdd.setAttribute("id", i);
        boxToAdd.setAttribute("transparency", 0);
        grid.appendChild(boxToAdd);
    }

    //resetting the grid display value to 1
    displayGrid = 1;

    boxes = document.querySelectorAll('#grid .box');
    eventListenerGenerationForBoxes();

    applyDisplayGrid();
}

/***************************************************************
Applying the events listeners
****************************************************************/
function eventListenerGeneration() {

    //when the user clicks the changeSize Button
    changeSizeBtn.addEventListener('click', changeSize);

    //when the user clicks the reset Color button
    resetColorsBtn.addEventListener('click', resetColor);

    //when the user clicks the reset Color button
    displayGridBox.addEventListener('click', switchAndApplyDisplayGrid);

    eventListenerGenerationForBoxes();

}
/***************************************************************
There is a special function for the boxes since they can be destroyed and rebuild
****************************************************************/
function eventListenerGenerationForBoxes() {

    //when the mouse moves onto one of the boxes
    boxes.forEach(item => {
        item.addEventListener('mouseover', applyColor);
    })

}

/***************************************************************
Applying the color to the elements of the grid
****************************************************************/
function applyColor(evt) {
    
    let id = this.getAttribute("id");
    let coeff = this.getAttribute("transparency");

    if (evt.ctrlKey) {
        
        console.log('Ctrl key is pressed over the box ' + id);
        
        if (!randomFlag) {
            //in case the transparency is already at min (=opacity at max), nothing to do
            if (coeff >= 1) {
                console.log('coeff already at maximum for the box '+id);
                return;
            }
            color = generateNewColor(colorRange, coeff);
        }

        this.style.cssText = "background-color: " + color;
        if (randomFlag) {
            color = '#' + Math.floor(Math.random() * 16777215).toString(16); //generating a random color
        } else if (coeff < 1) {
            console.log('Transparency value of element '+id+' before change is ' + coeff);
            coeff = Math.round((parseFloat(coeff) + 0.1) * 10) / 10;
            this.setAttribute("transparency", coeff);
            console.log('Transparency value of element '+id+' after change is ' + this.getAttribute("transparency"));
        }
    }else if(evt.shiftKey){
        console.log('Shift key is pressed over the box ' + id);

        if(!randomFlag){
            //in case the transparency is already at maximum (=opacity at min), nothing to do
            if (coeff <= 0) {
                console.log('coeff already at minimum for the box '+id);
                return;
            }
            color = generateNewColor(colorRange, coeff);
        }

        this.style.cssText = "background-color: " + color;
        
        if(coeff > 0){
            console.log('Transparency value of element '+id+' before change is ' + coeff);
            coeff = Math.round((parseFloat(coeff) - 0.1) * 10) / 10;
            this.setAttribute("transparency", coeff);
            console.log('Transparency value of element '+id+' after change is ' + this.getAttribute("transparency"));
        }

    }
}


/***************************************************************
create a new grid with a different size
****************************************************************/
function changeSize() {
    console.log('changing the size');

    let newSize = prompt("Enter the size of the grid (between 1 and 100): ", "16");

    if (newSize == null || newSize == "") {
        alert("User cancelled the prompt.");
    } else if (isNaN(newSize)) {
        alert("You must enter a number");
    } else if (newSize < 1 || newSize > 100) {
        alert("Enter a number between 1 and 100.");
    } else {
        gridEdition(newSize);
    }

}

/***************************************************************
reset the colors ofall the blocks to white
****************************************************************/
function resetColor() {
    console.log('resetting the colors');
    boxes.forEach(item => {
        item.style.cssText = "background-color: white";
    });
}

/***************************************************************
this function is called when the user chooses a new color
****************************************************************/
function changeColor(event) {
    let newColorText = this.options[this.selectedIndex].text.toLowerCase();

    randomFlag = 0;
    if (newColorText == "random") {
        randomFlag = 1;
    } else {
        randomFlag = 0;
    }
    colorRange = newColorText;

    //resetting all the transparency values to 0.1
    boxes.forEach(item => {
        item.setAttribute('transparency', 0);
    })

    selectButton.setAttribute("class", newColorText);
}
 
/***************************************************************
transforming the text selected by the user into the correspondong color
****************************************************************/
function generateNewColor(range,coeff){
    switch (range) {
        case ("white"):
            color = "rgba(255,255,255," + coeff + ")";
            break;
        case ("black"):
            color = "rgba(0,0,0," + coeff + ")";
            break;
        case ("purple"):
            color = "rgba(148,0,211," + coeff + ")";
            break;
        case ("indigo"):
            color = "rgba(75,0,130," + coeff + ")";
            break;
        case ("blue"):
            color = "rgba(0,0,255," + coeff + ")";
            break;
        case ("green"):
            color = "rgba(0,255,0," + coeff + ")";
            break;
        case ("yellow"):
            color = "rgba(255,255,0," + coeff + ")";
            break;
        case ("orange"):
            color = "rgba(255,127,0," + coeff + ")";
            break;
        case ("red"):
            color = "rgba(255,0,0," + coeff + ")";
            break;
        default:
            console.log('Problemo');
    }
    return color;
}