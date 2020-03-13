var SpeechRecognition = window.webkitSpeechRecognition;
var SpeechGrammarList = window.webkitSpeechGrammarList;

var grammar='#JSGF V1.0;';   
var recognition = new SpeechRecognition();
var speechRecognitionGrammarList = new SpeechGrammarList();
speechRecognitionGrammarList.addFromString(grammar,1);
recognition.grammars= speechRecognitionGrammarList;
recognition.lang = 'en-US';

var Textbox = $('#textbox');
var instructions = $('instructions');

var Content = '';

recognition.continuous = true;

recognition.onresult = function(event) {

  var current = event.resultIndex;

  var transcript = event.results[current][0].transcript;
 
    Content += transcript;
    Textbox.val(Content);

 if(transcript.toLowerCase() == 'chat'){
window.open('gauge.html','_self');
} 

 if(transcript.toLowerCase() == 'pi'){
window.open('pie.html','_self');
}

 if(transcript.toLowerCase() == 'reader'){
window.open('radar.html','_self');
}

};

recognition.onstart = function() { 
  instructions.text('Voice recognition is ON.');
}

recognition.onspeechend = function() {
  instructions.text('No activity.');
}

recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    instructions.text('Try again.');  
  }
}

$('#start-btn').on('click', function(e) {
  if (Content.length) {
    Content += ' ';
  }
  recognition.start();
});

Textbox.on('input', function() {
  Content = $(this).val();
})