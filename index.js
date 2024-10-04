const text = document.getElementById("mid1");
const dropzone = document.querySelector(".mid");

//////////////////////

// Stacks for undo and redo actions
let undoStack = [];
let redoStack = [];

// Save the current state of the text element (for undo/redo)
function saveState() {
    // Save the current state to the undoStack
    undoStack.push({
        textContent: text.innerText,
        fontStyle: text.style.fontStyle,
        fontWeight: text.style.fontWeight,
        textDecoration: text.style.textDecoration,
        fontSize: text.style.fontSize,
        left: text.style.left,
        top: text.style.top
    });

    // Clear the redoStack since new changes invalidate redo history
    redoStack = [];
}

// Restore a state from the undo or redo stack
function restoreState(state) {
    if (!state) {
        console.error("No state to restore!");
        return;
    }

    text.innerText = state.textContent;
    text.style.fontStyle = state.fontStyle;
    text.style.fontWeight = state.fontWeight;
    text.style.textDecoration = state.textDecoration;
    text.style.fontSize = state.fontSize;
    text.style.left = state.left;
    text.style.top = state.top;
}

// Undo function
function undo() {
    if (undoStack.length > 0) {
        // Save the current state to the redoStack before undoing
        redoStack.push({
            textContent: text.innerText,
            fontStyle: text.style.fontStyle,
            fontWeight: text.style.fontWeight,
            textDecoration: text.style.textDecoration,
            fontSize: text.style.fontSize,
            left: text.style.left,
            top: text.style.top
        });

        // Restore the last state from the undoStack
        const previousState = undoStack.pop();
        console.log("Undoing to state:", previousState); // Debug log
        restoreState(previousState);
    } else {
        console.warn("Undo stack is empty!");
    }
}

// Redo function
function redo() {
    if (redoStack.length > 0) {
        // Save the current state to the undoStack before redoing
        undoStack.push({
            textContent: text.innerText,
            fontStyle: text.style.fontStyle,
            fontWeight: text.style.fontWeight,
            textDecoration: text.style.textDecoration,
            fontSize: text.style.fontSize,
            left: text.style.left,
            top: text.style.top
        });

        // Restore the next state from the redoStack
        const nextState = redoStack.pop();
        console.log("Redoing to state:", nextState); // Debug log
        restoreState(nextState);
    } else {
        console.warn("Redo stack is empty!");
    }
}

//////////////////

text.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text", e.target.id);
});

dropzone.addEventListener("dragover", (e) => {
    e.preventDefault(); 
});
mid1

dropzone.addEventListener("drop", (e) => {mid1
    e.preventDefault();mid1

    const droppedElement = document.getElementById(e.dataTransfer.getData("text"));

    saveState();
    
    droppedElement.style.left = `${e.clientX - droppedElement.offsetWidth / 3}px`;
    droppedElement.style.top = `${e.clientY - droppedElement.offsetHeight / 3}px`;
});

////////////////////////////////////////


const inputElement = document.getElementById("textEnter");
function add(){
    saveState();
 text.innerText = inputElement.value;
}

///////////////////////////////

function italic(){
    saveState();
    text.style.fontStyle = 'italic';
}
function bold(){
    saveState();
    text.style.fontWeight = 'bold';
}
function underLine(){
    saveState();
    text.style.textDecoration = 'underline';
}

///////////////////////////////////////

let fontSize = 16;
function fontPlus(){
    saveState();
    fontSize += 1 ;
    text.style.fontSize = `${fontSize}px`;
    updateFontSizeDisplay()
}
function fontMinus(){
    saveState();
    fontSize -= 1 ;
    text.style.fontSize = `${fontSize}px`;
    updateFontSizeDisplay()
}

function updateFontSizeDisplay() {
    currentFontSizeDisplay.textContent = fontSize; // Update the text content with current font size
}

/////////////////////////////////////////

document.getElementById("undo").addEventListener("click", undo);
document.getElementById("redo").addEventListener("click", redo);