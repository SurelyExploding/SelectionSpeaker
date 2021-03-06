javascript:'READ SELECTED';
(function () {
    'use strict';
    var voices = window.speechSynthesis.getVoices();
    var sayit = function () {
        var msg = new SpeechSynthesisUtterance();
        msg.voice = voices[2];
        msg.voiceURI = 'native';
        msg.volume = 1;
        msg.rate = 1.15;
        msg.pitch = 0.7;
        msg.lang = 'en-GB';
        msg.onstart = function (event) {
            console.log('started');
        };
        msg.onend = function (event) {
            console.log('Finished in ' + event.elapsedTime + ' seconds.');
        };
        msg.onerror = function (event) {
            console.log('Errored ' + event);
        };
        msg.onpause = function (event) {
            console.log('paused ' + event);
        };
        msg.onboundary = function (event) {
            console.log('onboundary ' + event);
        };
        return msg;
    };
    var speekResponse = function (sel) {
        var text = addPauses(sel).textContent;
        window.speechSynthesis.cancel();
        var sentences = text.split('.');
        for (var i = 0; i < sentences.length; i++) {
            var toSay = sayit();
            toSay.text = sentences[i];
            window.speechSynthesis.speak(toSay);
        }
    };

    function addPauses(sel) {
        var el = document.createElement('div');
        el.appendChild(sel.getRangeAt(0).cloneContents());
        for (var i = 0; i < 10; i++) {
            addMissingDots(el);
        }
        return el;
    }

    function addMissingDots(el) {
        var els = el.querySelectorAll('p, li, ol, h1, h2, h3, h4, h5, h6, h7, div');
        for (var i = 0; i < els.length; i++) {
            var cont = els[i].textContent;
            if (cont.length && cont.substr(cont.length - 1) !== '.') {
                els[i].innerHTML += '.';
            }
        }
        return el;
    }
    speekResponse(window.getSelection());
})();