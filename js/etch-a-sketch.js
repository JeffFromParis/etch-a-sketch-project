const grid = document.querySelector('#grid');
const initSizeOfGrid = 16;
const changeSizeBtn = document.querySelector('#changeSize');
const resetColorsBtn = document.querySelector('#resetColors');

let displayGridFlag=0;
const displayGridBox = document.querySelector('#displayGrid');
const displayGridValue = displayGridBox.getAttribute("value");
if (displayGridValue=="active") displayGridFlag=1;


let color='#'+Math.floor(Math.random()*16777215).toString(16); //default first color

//when loading the page is a 16x16 grid
gridEdition(16);
eventListenerGeneration();


/***************************************************************
applies the grid or not (used when generating a new grid)
****************************************************************/
function applyDisplayGrid(){

    if(displayGridFlag){
        console.log('Grid must be displayed');
        boxes.forEach(item => {
            item.setAttribute("class","gridOn");
        });
    }else{
        console.log('Grid must be hidden');
        boxes.forEach(item =>{
            item.setAttribute("class","gridOff");
        });
    }

}

/***************************************************************
remove the border of the components of the grid
****************************************************************/
function switchAndApplyDisplayGrid(){

    if(displayGridFlag){
        console.log('Hiding the grid');
        boxes.forEach(item => {
            item.removeAttribute("class",".gridOn");
            item.setAttribute("class","gridOff");
        });
        displayGridFlag=0;
    }else{
        console.log('Displaying the grid');
        boxes.forEach(item =>{
            item.removeAttribute("class","gridOff");
            item.setAttribute("class","gridOn");
        });
        displayGridFlag=1;
    }
}

/***************************************************************
Remove the existing grid and create a new one with the parameter
@param size : number of elements in a row (and in a column since the grid is a square)
****************************************************************/
function gridEdition(size){

    //we need first to remove the existing boxes of the grid
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }

    grid.style.cssText= "grid-template: repeat("+size+", 1fr)/repeat("+size+", 1fr)";

    let boxToAdd="";
    const numberOfBoxes=size*size;

    for (var i=0;i<numberOfBoxes;i++){
        boxToAdd=document.createElement('div');
        boxToAdd.setAttribute("class","box");
        boxToAdd.setAttribute("id",i);
        grid.appendChild(boxToAdd);
    }

    //resetting the grid display value to 1
    displayGrid=1;

    boxes = document.querySelectorAll('#grid .box');
    eventListenerGenerationForBoxes();

    applyDisplayGrid();
}

/***************************************************************
Applying the events listeners
****************************************************************/
function eventListenerGeneration(){

    //when the user clicks the changeSize Button
    changeSizeBtn.addEventListener('click',changeSize);

    //when the user clicks the reset Color button
    resetColorsBtn.addEventListener('click',resetColor);

    //when the user clicks the reset Color button
    displayGridBox.addEventListener('click',switchAndApplyDisplayGrid);

    eventListenerGenerationForBoxes();

}

/***************************************************************
There is a special function for the boxes since they can be destroyed and rebuild
****************************************************************/
function eventListenerGenerationForBoxes(){
    //when the mouse moves onto one of the boxes
    boxes.forEach(item=> {
        item.addEventListener('mouseover',applyColor);
    })
}

/***************************************************************
Applying the color to the elements of the grid
****************************************************************/
function applyColor(){
    let id=this.getAttribute("id");
    this.style.cssText="background-color: "+color;
    color='#'+Math.floor(Math.random()*16777215).toString(16);
}

/***************************************************************
create a new grid with a different size
****************************************************************/
function changeSize(){
    console.log('changing the size');

    let newSize=prompt("Enter the size of the grid (between 1 and 100): ","16");

    if (newSize == null || newSize == "") {
        alert("User cancelled the prompt.");
    } else if(isNaN(newSize)){
        alert("You must enter a number");
    } else if (newSize<1 || newSize>100){
        alert("Enter a number between 1 and 100.");
    }else {
        gridEdition(newSize);
    }

}

/***************************************************************
reset the colors ofall the blocks to white
****************************************************************/
function resetColor(){
    console.log('resetting the colors');
    boxes.forEach(item =>{
        item.style.cssText="background-color: white";
    });
}
