
var firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
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