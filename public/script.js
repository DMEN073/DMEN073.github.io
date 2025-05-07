function mouseHover(event) {
    console.log("HI")
}

function generateButton() {
    const button = document.getElementById("generateButton");
    const container = document.getElementById("buttonContainer");
    container.removeChild(button);

    const newButton = document.createElement("button");
    const maxButtonX = container.clientWidth - 100;
    const maxButtonY = container.clientHeight - 50;

    const randomXLoc = Math.floor(Math.random() * maxButtonX);
    const randomYLoc = Math.floor(Math.random() * maxButtonY);
    newButton.id = "generateButton";
    newButton.textContent = `New Button ${count}`;
    newButton.style.position = "absolute";
    newButton.style.margin = "10px";
    newButton.style.left = `${randomXLoc}px`;
    newButton.style.top = `${randomYLoc}px`;
    newButton.addEventListener("click", generateButton);
    container.append(newButton);
    count++;
}

function helloButton() {
    console.log("hello button triggered")
    fetch('http://localhost:9080/')
        .then(response => response.text())
        .then(data => { console.log("Server response is ", data); })

        .catch(err => { console.log("Error server communication is  ", err); });

}

count = 0;
document.getElementById("generateButton").addEventListener("click", generateButton);
document.getElementById("helloButton").addEventListener("click", helloButton);