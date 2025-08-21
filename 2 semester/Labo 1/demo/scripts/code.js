const setup = () => {
    let lblCursus = document.getElementById("lblCursus");
   lblCursus.addEventListener("click", change)

     // neem deze element btnSend
     let btnSend = document.getElementById("btnSend");
   btnSend.addEventListener("click", show);


}

const show = () => {
    let txtName = document.getElementById("txtName");

    if (txtName.value !== "") {
        alert("jouw naam is " + txtName.value);
        console.log("jouw naam is" + txtName.value);
        console.log(`jouw naam is ${txtName.value}`);

    }
}
const change = () => {
    let lblCursus = document.getElementById("lblCursus");
    lblCursus.className = "cursus";

}

window.addEventListener("load", setup);