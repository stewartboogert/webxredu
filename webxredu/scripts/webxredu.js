const videoSelect = document.querySelector('select#videoSource');

function getDevices() {
    navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);
}

function gotDevices(deviceInfos) {
    console.log('gotDevices', deviceInfos);

    for (let i = 0; i !== deviceInfos.length; ++i) {
        const deviceInfo = deviceInfos[i];
        if (deviceInfo.kind === 'videoinput') {
            const option = document.createElement('option');
            option.value = deviceInfo.deviceId;
            option.text = deviceInfo.label || `camera ${videoSelect.length + 1}`;
            videoSelect.appendChild(option);
        }
    }
}

function handleError(error) {
    console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

function startVideo() {
    const videoSource = videoSelect.value || undefined;
    console.log('start');
    const constraints = {
        audio: true,
        video: true
    };
    constraints['video'] = {deviceId: videoSource ? {exact: videoSource} : undefined};

    currentStream =
    document.getElementById("#c").srcObject =  navigator.mediaDevices.getUserMedia(constraints);
}

videoSelect.onchange = startVideo;

getDevices();