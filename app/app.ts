import $ = require('jquery');
const SockJS = require('sockjs-client');

declare let Stomp : any;

$.ready.then( ()=> {
  connect_ws();
});

function randomString(len: number, charSet?: string) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}

function connect_ws() {
  const sessionId = randomString(20);
  const sockjs = new SockJS('/websocket', [], {
    sessionId: ()=> {
      return sessionId;
    }
  });
  const stompClient = Stomp.over(sockjs);
  stompClient.connect({ contestId:1, 'tenant': 'ata', type: 'client' }, (frame:any) => {
    console.log(frame);
    setupSockjs(stompClient);
    setwebsocket(sessionId);
  }, (err: string)=> {
    console.log(err);
  });
}

function setwebsocket(id: string) {
  $.ajax({
    type: "POST",
    url: "/client/setwebsocket",
    data: {sessionId: id},
    success: function(d) {
      console.log(d);
    },
    dataType:"json"
  });
}

function setupSockjs(stompClient: any) {
  stompClient.subscribe('/user/queue/test', (msg: string)=> {
    console.log(msg);
  });
  stompClient.subscribe('/topic/test-*', (msg: string)=> {
    console.log(msg);
  });
}

if ((<any>module).hot) {
  (<any>module).hot.accept();
}

