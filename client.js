// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:8001');

document.addEventListener("DOMContentLoaded", function(){
    const button = document.getElementById("sendButton");
    const input = document.getElementById("input")
    const user = document.getElementById("username")

    button.addEventListener('click', function(){
        let userName = user.value;
        if(userName = " ")
            userName = "ANON";
        const msg = {
            "from" :  userName,
            "msg" : input.value
        }
        socket.send(JSON.stringify(msg));
        input.value = "";
    })
})

// Connection opened
socket.addEventListener('open', function (event) {
    console.log("Connected");
});

// Listen for messages
socket.addEventListener('message', function (event) {
    const msg = JSON.parse(event.data);
    if(msg.from == "You")
        document.getElementById("list").insertAdjacentHTML("beforeend",` <li class="fw-bold text-end list-group-item">You: ${msg.msg}</li>`)
    else
        document.getElementById("list").insertAdjacentHTML("beforeend",` <li class="list-group-item">${msg.from}: ${msg.msg}</li>`)
});
