const setup = () => {
	let btnVerzenden = document.getElementById('verzenden');
	btnVerzenden.addEventListener('click', onClick);
}

const onClick = () => {
	let txtText = document.getElementById('text');
	let tekst = txtText.value;

	let listTriagrams = document.getElementById("output");
	let triagrams = getTriagrams(tekst);

	let output = "";
	for (let i = 0; i < triagrams.length; i++) {
		output += "<li>" + triagrams[i] + "</li>";
	}

	listTriagrams.innerHTML = output;
}

const getTriagrams = (tekst) => {
	let result = [];
	let triagram;

	// Start iterating up to 3 characters from the end
	for (let i = 0; i < tekst.length - 3; i++) {
		triagram = tekst.slice(i, i + 3);
		result.push(triagram);
	}

	return result;
}

window.addEventListener("load", setup);
