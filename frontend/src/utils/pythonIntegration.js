const player = document.getElementById('player');

const handleSuccess = function(stream) {
    player.srcObject = stream;
};

let constraints = {
  audio: true,
  video: true,
};

let audioSave = document.getElementById("audio")

navigator.mediaDevices.getUserMedia({ video: true }).then(handleSuccess);
navigator.mediaDevices.getUserMedia(constraints).then(function(mediaStream) {
    let mediaRecorder = new MediaRecorder(mediaStream);
    let chunks = [];
    mediaRecorder.start();
    mediaRecorder.ondataavailable = function(ev) {
        chunks.push(ev.data);
    }
    window.setInterval(
        () => {
            mediaRecorder.stop();
            let blob = new Blob(chunks, {'type' : 'audio/wav; codecs=FLAC'});
            chunks = [];
            let stream = window.URL.createObjectURL(blob);
            console.log('re-assigning stream', stream);
            console.log(stream);
            $.ajax({
                url :  "http://localhost:8444/?&src_language=it-IT&dst_language=en-US",
                type: 'POST',
                data: blob,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                 },
                contentType: false,
                processData: false,
                complete: function(r){
                    audioSave.src = r.responseText
                    audioSave.play();
                }
            });
            mediaRecorder.start();
        }
        , 5000
    );
})
.catch(err => {
console.log(err);
});
