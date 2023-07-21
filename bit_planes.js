
const orig = document.getElementById("canvas");
let input_data = 0;

function draw_bit_plane(number) {
    // const canvas = document.getElementById("canvas" + String(number));
    const canvas = document.createElement("canvas");

    canvas.height = orig.height;
    canvas.width = orig.width;

    let output_data = get_data(canvas)


    input_data.forEach((elem, index) => {


        let get_bit = (elem >> (8 - number)) & 1

        if (get_bit) {
            output_data[index] = 2 ** 8 - 1
        } else {
            output_data[index] = 0
        }

    })


    put_data(canvas, output_data);
    document.getElementById("planes").append(canvas)
}

window.onload = () => {
    draw(orig, input.files[0])
}


input.onchange = (e) => {
    draw(orig, e.target.files[0])
}

drop.ondragover = (e) => {
    e.preventDefault();
}

drop.ondrop = (e) => {
    e.preventDefault();

    draw(orig, e.dataTransfer.files[0])
}

function after_draw() {
    loading(true)
    document.getElementById("planes").innerHTML = ""
    setTimeout(after_draw_2, 1000)
}

function after_draw_2() {

    input_data = get_data(orig);

    for (let i = 1; i <= 8; i++) {
        draw_bit_plane(i)
    }

    loading(false)
}

function loading(state) {
    if (state) {
        document.getElementById("load").style.visibility = "visible";
        drop.style.visibility = "hidden";

    } else {
        document.getElementById("load").style.visibility = "hidden";
        drop.style.visibility = "visible";
    }
}
