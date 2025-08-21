const setup = () => {
	gemeentenOpslaan();
}
const gemeentenOpslaan = () => {

	let promptResult = "";

	while(promptResult !== 'stop'){

		promptResult = window.prompt("Geef een gemeente op:", "");

		if(promptResult !== 'stop'){
			let select = document.getElementById("gemeentes");
			let option = document.createElement("option");
			option.text = promptResult;
			option.value = promptResult;
			select.add(option);
		}
	}
}
window.addEventListener("load", setup);