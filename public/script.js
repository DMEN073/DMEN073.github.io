// function mouseHover(event) {
//     console.log("HI")
// }

// function generateButton() {
//     const button = document.getElementById("generateButton");
//     const container = document.getElementById("buttonContainer");
//     container.removeChild(button);

//     const newButton = document.createElement("button");
//     const maxButtonX = container.clientWidth - 100;
//     const maxButtonY = container.clientHeight - 50;

//     const randomXLoc = Math.floor(Math.random() * maxButtonX);
//     const randomYLoc = Math.floor(Math.random() * maxButtonY);
//     newButton.id = "generateButton";
//     newButton.textContent = `New Button ${count}`;
//     newButton.style.position = "absolute";
//     newButton.style.margin = "10px";
//     newButton.style.left = `${randomXLoc}px`;
//     newButton.style.top = `${randomYLoc}px`;
//     newButton.addEventListener("click", generateButton);
//     container.append(newButton);
//     count++;
// }

// function helloButton() {
//     console.log("hello button triggered")
//     fetch('http://localhost:9080/')
//         .then(response => response.text())
//         .then(data => {
//             const textResponse = document.getElementById("serverResponse");
//             textResponse.textContent = data;
//             console.log("Server response is ", data);
//         })

//         .catch(err => { console.log("Error server communication is  ", err); });

// }


function getTextWidth(text) {
    const span = document.createElement('span');
    span.style.visibility = 'hidden';
    span.style.whiteSpace = 'nowrap';
    span.textContent = text;
    document.body.appendChild(span);
    const width = span.offsetWidth;
    document.body.removeChild(span);
    return width;
}


function printLine(text = '') {
    // terminal.innerText += text + '\n';
    // terminal.scrollTop = terminal.scrollHeight;
    // Create a line and preserve HTML structure
    const line = `<div class="line">${text}</div>`;
    terminal.insertAdjacentHTML('beforeend', line);

    // Always scroll to bottom
    terminal.scrollTop = terminal.scrollHeight;
}

function printPrompt() {
    const existingCursor = document.getElementById('cursor');
    const existingBuffer = document.getElementById('inputBuffer');
    if (existingCursor) {
        existingCursor.remove();
    }
    if (existingBuffer) {
        existingBuffer.remove();
    }

    // Create a wrapper div for the prompt line

    const promptLine = document.createElement('div');
    promptLine.className = 'line';

    // Create the prompt symbol
    const prompt = document.createElement('span');
    prompt.textContent = '> ';

    // Create a new input buffer span
    const inputBuffer = document.createElement('span');
    inputBuffer.id = 'inputBuffer';

    // Create the cursor
    const cursor = document.createElement('span');
    cursor.id = 'cursor';
    cursor.textContent = ''; // or empty with blinking background

    // Append them in order
    promptLine.appendChild(prompt);
    promptLine.appendChild(inputBuffer);
    promptLine.appendChild(cursor);

    // Append the whole line to the terminal
    terminal.appendChild(promptLine);

    // Scroll to the bottom
    terminal.scrollTop = terminal.scrollHeight;
}

function moveCursorToEnd() {
    const promptLength = terminal.innerText.lastIndexOf('> ') + 2;
    const textWidth = getTextWidth(terminal.innerText.substring(0, promptLength));

    // Move cursor position after the prompt text
    cursor.style.left = `${textWidth}px`;
    cursor.style.top = `${terminal.scrollHeight - 25}px`;

    // Only append cursor if it's not already in the terminal
    if (!terminal.contains(cursor)) {
        terminal.appendChild(cursor);
    }
}

function handleCommand(cmd) {
    switch (cmd.trim()) {
        case 'help':
            printLine('Commands: help, about, projects, resume');
            break;
        case 'about':
            printLine('I’m a C++ & AI developer. I build high-performance demos in the browser.');
            break;
        case 'projects':
            printLine('- Physics simulator');
            printLine('- OpenCV filters in WASM');
            printLine('- Pathfinding visualizer');
            break;
        case 'resume':
            printLine('Download: resume.pdf');
            break;
        case '':
            // ignore empty
            break;
        default:
            printLine(`Unknown command: ${cmd}`);
    }
}


const terminal = document.getElementById("terminal");
const inputBuffer = document.getElementById("inputBuffer");
const cursor = document.getElementById('cursor');

let cmdBuffer = '';

let i = 0;
printLine('Welcome to my terminal portfolio!');
printLine('Type "help" and press ENTER.');
printLine();
printPrompt();

terminal.addEventListener('keydown', (e) => {
    e.preventDefault();
    const key = e.key;

    if (key.length === 1) {
        // regular character
        cmdBuffer += key;
        terminal.innerText += key;
    } else if (key === 'Backspace') {
        if (cmdBuffer.length) {
            cmdBuffer = cmdBuffer.slice(0, -1);
            terminal.innerText = terminal.innerText.slice(0, -1);
        }
    } else if (key === 'Enter') {
        terminal.innerText += '\n';
        handleCommand(cmdBuffer);
        cmdBuffer = '';
        printPrompt();
    }
    moveCursorToEnd();
});

terminal.focus();

// count = 0;
// document.getElementById("generateButton").addEventListener("click", generateButton);
// document.getElementById("helloButton").addEventListener("click", helloButton);