

const storeSliderValues = () => {
    let storeSlider = {};
    let storeSliderJson;

    storeSlider.red = parseInt(document.getElementById('sldRed').value);
    storeSlider.green = parseInt(document.getElementById('sldGreen').value);
    storeSlider.blue = parseInt(document.getElementById('sldBlue').value);

    storeSliderJson = JSON.stringify(storeSlider);
    localStorage.setItem('storeSlider', JSON.stringify(storeSlider));


};

const restoreSliderValues = () => {
    let storeSlider;
    let storeSliderJson = localStorage.getItem('storeSlider');

    if (storeSliderJson === undefined || storeSliderJson === null) {
        storeSlider = {
            red: 0,
            green: 0,
            blue: 0
        };
    } else{
            storeSlider = JSON.parse(storeSliderJson)

        document.getElementById('sldRed').value = storeSlider.red;
        document.getElementById('sldGreen').value = storeSlider.green;
        document.getElementById('sldBlue').value = storeSlider.blue;
    }


};

const storeSwatches = () => {
    // bouw een array met kleurinfo objecten
    let rgbColors = [];
    let swatches = document.getElementById("swatch");

    for(let i =1; i < swatches.length; i++){
        let rgb = {
            red: swatches[i].getAttribute("data-red"),
            green: swatches[i].getAttribute("data-green"),
            blue: swatches[i].getAttribute("data-blue")
        };
        rgbColors.push(rgb);
    }

    // bewaar array in local storage
    let jsonTEXT = JSON.stringify(rgbColors);
    localStorage.setItem('SwatchesStore', JSON.stringify(jsonTEXT));

};

const restoreSwatches = () => {
  jsonText = localStorage.getItem('SwatchesStore');
  if (jsonText != null)
  {
      let rgbColors = JSON.parse(jsonText);
      for(let i =  0; i < rgbColors.length; i++){
          let rgb = rgbColors[i];
          addSwatchComponent(rgb.red, rgb.green, rgb.blue);
      }
  }
};


