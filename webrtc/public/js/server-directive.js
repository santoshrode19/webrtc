'use strict';
$nvc.directive('serverVideo', [ '$sce','LxDialogService','$state', 'LxNotificationService','$location','$window', function($sce,$state,LxDialogService, $window, LxNotificationService,$location) {
return {
restrict: 'E',
templateUrl: 'partials/server.directive.html',
link: function(s, e, a) {
s.statusMsg = 'Loading..',
s.id = '',
s.localStream = '',
s.isDisabled = false,
//startSelfVideo();
s.isCalling=false;
s.callInProgress = false;
setTimeout(function() {
//LxDialogService.open('statusModal');
s.statusMsg = 'Contacting Peer Server...';
}, 0);
// Request video stream
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

  // New peer connection with our heroku server
  var peer = new Peer({　
   host: 'webrtc-santosh.herokuapp.com',
  secure: true,
  port: 443,
  debug: 3,
  config: {'iceServers': [
{url:'stun:stun4.l.google.com:19302'},
{
url: 'turn:192.158.29.39:3478?transport=udp',
credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
username: '28224511:1379330808'
},
{
url: 'turn:192.158.29.39:3478?transport=tcp',
credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
username: '28224511:1379330808'
}
]},
  timeout:500000,
  allow_discovery:true,
  //key:'o7cxezbojniv0a4i'
  });


peer.on('open', function(id) {
s.id = id;
s.statusMsg = 'Connected to Peer Server...';
s.statusMsg = 'Streaming local video...';
//LxDialogService.close('statusModal');
});



// Listen to incoming calls
peer.on('call', function(call) {
// ask the user if he wants to answer the call
// THIS DOES SHOW THE PEER VIDEO STREAM
// FOR THE CALL INITIATOR
// WHY!!!!???

//LxDialogService.open('answerCall');
//s.answer = function() {
initSelfVideo(function() {
call.answer(s.localStream);
handleCall(call);
//LxDialogService.close('answerCall');
});
//}
 /*s.reject = function() {
     LxNotificationService.info('Call Rejected');
     call.close();
     LxDialogService.close('answerCall');
 }*/
});
peer.on('error', function(err) {
s.error = err;
console.error(err);
});


// startCall function
s.startCall = function() {

//if ($event.which === 13) {

s.isDisabled = true;
initSelfVideo(function() {

//handleCall(peer.call(s.peerId, s.localStream));
//alert(" peer id  "+s.peerId);
handleCall(peer.call(s.peerId, s.localStream));

});
//}
};


//end call function
s.endCall = function() {
  s.callInProgress.close();
  s.callInProgress = false;
//  s.$window.location.reload();
  //s.$state.reload();
};


// initSelfVideo
function initSelfVideo(cb) {
navigator.getUserMedia({
audio: true,
video: true
}, function(stream) {
s.localStream = stream;
s.localVdoURL = $sce.trustAsResourceUrl(URL.createObjectURL(stream));
cb();
}, function() {
s.error = 'Unable to access your camera, Please try again';
});
}


//init local video Streaming
function startSelfVideo() {
navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
navigator.getUserMedia({
audio: true,
video: true
}, function(stream) {
s.localStream = stream;
s.localVdoURL = $sce.trustAsResourceUrl(URL.createObjectURL(stream));
}, function() {
s.error = 'Unable to access your camera, Please try again';
});
}


//handdle call
function handleCall(call) {

  //console.log(" call data "+simpleStringify(call));
/*if (s.callInProgress) {
s.callInProgress.close();
}*/
s.isCalling=call;
call.on('stream', function(peerStream) {
s.peerVdoURL = $sce.trustAsResourceUrl(URL.createObjectURL(peerStream));
s.$apply();
});
s.callInProgress = call;
}


 // convert json
function simpleStringify (object){
    var simpleObject = {};
    for (var prop in object ){
        if (!object.hasOwnProperty(prop)){
            continue;
        }
        if (typeof(object[prop]) == 'object'){
            continue;
        }
        if (typeof(object[prop]) == 'function'){
            continue;
        }
        simpleObject[prop] = object[prop];
    }
    return JSON.stringify(simpleObject); // returns cleaned up JSON
};


}
};
}])
