
var firebaseConfig = {
    apiKey: "AIzaSyBcz83ZxET2IbHJ7SjT3juiChYpJyW21_M",
    authDomain: "acmhacksc.firebaseapp.com",
    databaseURL: "https://acmhacksc.firebaseio.com",
    projectId: "acmhacksc",
    storageBucket: "acmhacksc.appspot.com",
    messagingSenderId: "822135956634",
    appId: "1:822135956634:web:2f1729e8cb2b3d8224ab23"
};
var defaultProject = firebase.initializeApp(firebaseConfig);


var db = defaultProject.firestore();
var player = document.getElementById('player');

var handleSuccess = function (stream) {
    player.srcObject = stream;
};

let constraints = {
    audio: true,
    video: true,
};

let audioSave = document.getElementById("audio")

navigator.mediaDevices.getUserMedia({
    video: true
}).then(handleSuccess)
navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
        let mediaRecorder = new MediaRecorder(mediaStream);
        let chunks = [];
        mediaRecorder.start();
        mediaRecorder.ondataavailable = function (ev) {
            chunks.push(ev.data);
        }
        window.setInterval(
            () => {
                mediaRecorder.stop();
                let blob = new Blob(chunks, {
                    'type': 'audio/wav; codecs=FLAC'
                });
                chunks = [];
                let stream = window.URL.createObjectURL(blob);
                console.log('re-assigning stream', stream);
                console.log(stream);
                $.ajax({
                    url: "http://localhost:8444/?&src_language=it-IT&dst_language=en-US",
                    type: 'POST',
                    data: blob,
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    },
                    contentType: false,
                    processData: false,
                    complete: function (r) {
                        console.log('complete handler', stream);
                        if  (r.responseText != undefined) {
                            audioSave.src = r.responseText.split("\n")[0];
                            db.collection("ts").doc("current").set ({
                                text: r.responseText.split("\n")[1]
                            })
                            audioSave.play();
                            console.log(r.responseText);    
                        }
                    }
                });
                mediaRecorder.start();
            }, 5000
        );
    })
    .catch(err => {
        console.log(err);
    });