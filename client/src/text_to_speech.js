(() => {
    const message = new SpeechSynthesisUtterance();
    
    function onVoicesChanged(){
        const voices = speechSynthesis.getVoices();
        console.log(voices);
    }

    function run() {
        speechSynthesis.addEventListener('voiceschanged',onVoicesChanged);
    }
    run();
})();