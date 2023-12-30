// Your script here.
const msg = new SpeechSynthesisUtterance();
  let voices = [];
  const voicesDropdown = document.querySelector('[name="voice"]');
  const rateInput = document.querySelector('[name="rate"]');
  const pitchInput = document.querySelector('[name="pitch"]');
  const textInput = document.querySelector('[name="text"]');
  const speakButton = document.querySelector('#speak');
  const stopButton = document.querySelector('#stop');

  // Fetch available voices
  function populateVoices() {
    voices = speechSynthesis.getVoices();
    voicesDropdown.innerHTML = voices
      .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
      .join('');
  }

  // Set voice for the SpeechSynthesisUtterance
  function setVoice() {
    const selectedVoice = voices.find(voice => voice.name === voicesDropdown.value);
    msg.voice = selectedVoice;
  }

  // Start speaking
  function startSpeaking() {
    setVoice();
    msg.text = textInput.value;
    msg.rate = parseFloat(rateInput.value);
    msg.pitch = parseFloat(pitchInput.value);
    speechSynthesis.speak(msg);
  }

  // Stop speaking
  function stopSpeaking() {
    speechSynthesis.cancel();
  }

  // Event listeners
  speechSynthesis.addEventListener('voiceschanged', populateVoices);
  voicesDropdown.addEventListener('change', setVoice);
  speakButton.addEventListener('click', startSpeaking);
  stopButton.addEventListener('click', stopSpeaking);

  // Populate voices on page load
  populateVoices();
