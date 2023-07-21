



function add_alfa(data) {

    let res = [];

    for (let i = 0; i < data.length; i++) {
        res.push(data[i]);
        if ((i + 1) % 3 == 0) res.push(255);
    }


    return res


}

function remove_alfa(data) {
    data = data.filter((_, index) => {
        if ((index + 1) % 4 == 0) return false;

        return true;
    })

    return data
}

function draw(canvas, file) {
    const img = new Image()
    const context = canvas.getContext('2d');


    img.src = URL.createObjectURL(file);

    img.onload = () => {
        canvas.height = img.naturalHeight
        canvas.width = img.naturalWidth

        context.drawImage(img, 0, 0)

        after_draw();
    }
}

function get_data(canvas) {
    const context = canvas.getContext("2d");
    let data = context.getImageData(0, 0, canvas.width, canvas.height).data;
    data = remove_alfa(data)

    return data
}

function put_data(canvas, new_data) {
    new_data = add_alfa(new_data)

    const context = canvas.getContext("2d");
    let data = context.getImageData(0, 0, canvas.width, canvas.height);
    data.data.set(new_data)

    context.putImageData(data, 0, 0);
}