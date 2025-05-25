
function startUp() {
    printLine('Welcome to my terminal portfolio!');
    printLine('Type "help" and press ENTER.');
    printPrompt();
}

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
    const existingCursor = document.getElementById('cursor');
    if (existingCursor) {
        existingCursor.remove();
    }
}

function printPrompt() {

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
    // const cursor = document.getElementById('cursor');
    if (!cursor) {
        console.log("Error on getting cursor");
        return;
    }
    // Move cursor position after the prompt text
    cursor.style.left = `${textWidth}px`;
    cursor.style.top = `${terminal.scrollHeight - 25}px`;

    // Only append cursor if it's not already in the terminal
    terminal.appendChild(cursor);
}

function handleCommand(cmd) {
    switch (cmd.trim()) {
        case 'help':
            printLine('Commands: help, about, projects, resume');
            printPrompt();
            break;
        case 'about':
            printLine('I’m a C++ Robotic developer.');
            printPrompt();
            break;
        case 'projects':
            printLine('- franka RL IK simulator');
            printPrompt();
            break;
        case 'resume':
            printLine('Download: resume.pdf');
            printPrompt();
            break;
        case 'clear':
            terminal.innerText = "";
            startUp();
        case '':
            // ignore empty
            break;
        default:
            printLine(`Unknown command: ${cmd}`);
            printPrompt();
    }
}


const terminal = document.getElementById("terminal");
const inputBuffer = document.getElementById("inputBuffer");
const cursor = document.getElementById('cursor');

let cmdBuffer = '';

startUp();

terminal.addEventListener('keydown', (e) => {
    const key = e.key;
    if (key.length === 1) {
        // regular character
        cmdBuffer += key;
        terminal.innerText += key;
        moveCursorToEnd();
    } else if (key === 'Backspace') {
        if (cmdBuffer.length) {
            cmdBuffer = cmdBuffer.slice(0, -1);
            terminal.innerText = terminal.innerText.slice(0, -1);
        }
        moveCursorToEnd();
    } else if (key === 'Enter') {
        handleCommand(cmdBuffer);
        cmdBuffer = '';
    }

});

terminal.focus();