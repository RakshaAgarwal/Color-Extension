const btn = document.querySelector('.color-picker__button');
const value = document.querySelector('.color-picker__value');
const box = document.querySelector('.color-picker__box');
btn.addEventListener('click', async()=>{
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: colorPicker
    }, async(selectedColor)=>{
       const color = selectedColor[0].result? selectedColor[0].result.sRGBHex: ""
  value.innerHTML=color;
  box.style.backgroundColor = color;
    });
});

async function colorPicker(){
    try {
        const eyeDropper = new EyeDropper();
        return await eyeDropper.open();
        
    } catch (error) {
        console.log(error)
    }
}