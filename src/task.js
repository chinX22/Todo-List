function get_data(){
    console.log("hpppp");
    let data = Array.from(document.querySelectorAll("form input")).reduce((acc, input) =>
    ({...acc,[input.id]: input.value }), {});
    return data;
}

function create_task(){
    console.log(get_data());
}

export {create_task};