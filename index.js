
if( 'webkitSpeechRecognition' in window) {
    //speech recognition stuff here
    let speechRecognition = new webkitSpeechRecognition();
    speechRecognition.continuous = false;
    // INterim results are the results that are not final
    speechRecognition.interimResults = true;
    speechRecognition.lang = document.querySelector('#select_dialect').value;
    speechRecognition.onstart = () => {
        document.getElementById('p').style.display= "block";
    };
    speechRecognition.onend = () => {
        document.getElementById('p').style.display = "none"
    }
    speechRecognition.onError = () => {
        document.getElementById('p').style.display = "none"
    }


    let final_transcript = "";
    speechRecognition.onresult = (event) => {
          // Create the interim transcript string locally because we don't want it to persist like final transcript
          let interim_transcript = ""
          for(let i = event.resultIndex; i < event.results.length; ++i){
                // If the result item is Final, add it to Final Transcript, Else add it to Interim transcript
                if(event.results[i].isFinal) {
                   final_transcript += event.results[i][0].transcript; 
                } else {
                    interim_transcript += event.results[i][0].transcript;
                }  
          }
          document.querySelector('#final').innerHTML = final_transcript;
          document.querySelector('#interim').innerHTML = interim_transcript;
    };
    // Set the onClick property of the start button
  document.querySelector("#start").onclick = () => {
    // Start the Speech Recognition
    speechRecognition.start();
  };
  document.querySelector('#erase').onclick = () => {
    document.querySelector('#final').innerHTML = ""
    document.querySelector('#interim').innerHTML = ""
  }
  // Set the onClick property of the stop button
  document.querySelector("#stop").onclick = () => {
    // Stop the Speech Recognition
    speechRecognition.stop();
  };
    
}else{
    console.log('Speech Recognition not available on your browser');
}