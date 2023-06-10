$(() => {
    var socket = io('http://localhost:8003');
    socket.on('connect', () => {
        var loader = new SocketIOFileUpload(socket);
        loader.listenOnInput(document.getElementById("fu"))
        loader.listenOnDrop(document.getElementById("drop"));
        $('#pconnect').show();
        $('#connect').click(() => {
           
            socket.emit('register', $('#dname').val());
        });
        $('#send').click(() => {
            socket.emit('chat', $('#msg').val());
        });
        $('#browse').click(() => {
            $('#fu').trigger('click');
        });
        $('#create').click(() => {
            socket.emit('createroom', $('#room').val());
            $('#room').val('');
        });
        $('#join').click(() => {
            socket.emit('addtoroom', $('#rooms').val());
           
        });
        socket.on('regsuccess', name => {
            //console.log(name);
            $("#hname").html('Username: ' +name);
            $('#pconnect').hide();
            $('#pchat').show();
        });
        socket.on('roomjoined', name =>{
            console.log(name)
            $("#rname").html(` Room: `+ name);
        });
        socket.on('userlist', names => {
            console.log(names);
            $('#users').empty(),
                names.forEach(n => {
                    $('#users').append(`<li>${n}</li>`);
                });
        });
        socket.on('roomlist', names => {
            //console.log(names);
            $('#rooms').empty(),
                names.forEach(n => {
                    $('#rooms').append(`<option>${n}</option>`);
                });
        });
        socket.on('message', m => {
            console.log(m)
            $('#messages').append(`<li>${m.from}: ${m.msg}</li>`);

        });
        socket.on('uploaded', m => {

            console.log(m);
            $('#files').append(`<figure>
                <img src="uploads/${m.type=='image' ? m.file: 'file.png'}" />
                <figcaption>Uploaded by ${m.from}</figcaption>
                <a target='_blank' href="uploads/${m.file}">Download</a>
            </figure>`);
        });
        loader.addEventListener("complete", function (event) {
            console.log(event.success);
            SnackBar({
                message: `${event.file.name} uploaded`,
                position: "bc"
            });
        });
    });
    
});