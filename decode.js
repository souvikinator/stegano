
console.log('>>decode.js::active');


const _decrypt_image_upload = document.getElementById('_decrypt_image');
const _canvas = document.getElementById('_hidden_msg_img');
const ctx = _canvas.getContext('2d');
const _decrypt_btn = document.getElementById('_decrypt_btn');
const msg_output = document.getElementById("hidden_msg_out");
const msg_out_txt= document.getElementById("output_text");

/*when an image is uploaded for decryption*/

//creating a new image object
var imageOBJ_dec = new Image();
imageOBJ_dec.onload = function () {
    let w = _canvas.width;
    let n_h = imageOBJ_dec.naturalHeight;
    let n_w = imageOBJ_dec.naturalWidth;
    //finding aspect ratio
    let aspect_ratio = n_w / n_h;
    let h = w / aspect_ratio;
    _canvas.height = h;

    //drawing image to canvas
    ctx.drawImage(imageOBJ_dec, 0, 0, w, h);
}

_decrypt_image_upload.addEventListener("change", function (event) {
    imageOBJ_dec.src = URL.createObjectURL(event.target.files[0]);
    if (_canvas.style.display === "none") {
        _canvas.style.display = "block";
    }
});

/*when extract message button is clicked */
_decrypt_btn.addEventListener('click', function (e) {

    if (_decrypt_image_upload.files.length <= 0) {
        alert("please upload an image");
        return false;
    }

    //get image data;
    var imgD = ctx.getImageData(0, 0, _canvas.width, _canvas.height);
    // console.log("data:\n",imgD);
    var unsanitisedMsg = Tools.seperate(imgD.data);
    let un = "undefined";
    var sanitisedMsg = unsanitisedMsg.slice(0, unsanitisedMsg.indexOf("$t3g0"));
    sanitisedMsg = sanitisedMsg.slice(un.length, sanitisedMsg.length);

    msg_out_txt.innerText += `\n ${sanitisedMsg}`;

    if (msg_output.style.display === "none") {
        msg_output.style.display = "block";
    }

});