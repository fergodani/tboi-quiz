import { item_list } from "./loadItems.js";

$(".items").hide();
const rebirth_list = item_list.filter((item) => {return item.dlc === "Rebirth"})
const afterebirth_list = item_list.filter((item) => {return item.dlc === "Afterbirth"})
const afterebirth_plus_list = item_list.filter((item) => {return item.dlc === "Afterbirth+"})
const repentance_list = item_list.filter((item) => {return item.dlc === "Repentance"})
console.log("Total items: " + item_list.length)
function addItem(item) {
    var nuevoElemento = $("<div>");
    var toolTip = $("<span>").text(item.name) 
    toolTip.addClass("tooltip-text")
    switch (item.dlc) {
        case "Rebirth":
            let zeros = ""
            let id_string = item.id.toString()
            if (id_string.length === 1)
                zeros = "00"
            else if (id_string.length === 2)
                zeros = "0"
            nuevoElemento.addClass("item reb-itm-new re-itm" + zeros + item.id);
            break;
        case "Afterbirth":
            nuevoElemento.addClass("ab-itm-new item abn-itm" + item.id);
            break;
        case "Afterbirth+":
            nuevoElemento.addClass("ap-itm-new item apn-itm" + item.id);
            break;
        case "Repentance":
            nuevoElemento.addClass("item rep-item rep" + item.id);
            break;
    }
    nuevoElemento.append(toolTip);
    if (item.dlc === "Afterbirth+")
        $(".Afterbirthplus").append(nuevoElemento);
    else
        $("." + item.dlc).append(nuevoElemento);
}
rebirth_list.forEach((item) => {
    addItem(item)
})

afterebirth_list.forEach((item) => {
    addItem(item)
})

afterebirth_plus_list.forEach((item) => {
    addItem(item)
})
repentance_list.forEach((item) => {
    addItem(item)
})

let isShowing = false
$(document).ready(function(){

    $("#item_name").on("keypress", function(event) {
        if (event.which === 13 && $("#submit").is(":visible")) {
            $("#submit").click();
        } else if (event.which === 13 && $("#submit").is(":hidden")) {
            $("#next").click();
        }
    });

    $("#mostrar-btn").click(function(){
        if (isShowing) {
            $(".items").css("display", "none")
        } else {
            $(".items").css("display", "flex")
        }
        isShowing = !isShowing
    });

    $("#submit").click(function(){
        let input_text = $("#item_name").val();
        let real_name = $("<h3>").text(item_selected.name)
        real_name.css("font-weight", "bold")
        $("#quiz h2").after(real_name)
        if (input_text.toLowerCase() === item_selected.name.toLowerCase()) {
            $("#quiz .tick").show();
            $("#quiz .cross").hide();
        } else {
            $("#quiz .tick").hide();
            $("#quiz .cross").show();
        }
        $("#next").show();
        $("#submit").hide();
    });

    $("#next").click(function(){
        $(".tick").hide();
        $(".cross").hide();
        $("#next").hide();
        $("#submit").show();
        $(".item").first().remove();
        $("h3").remove();
        $("#item_name").val('');
        nextItem()
    });

    $("#next-images").click(function(){
        $(".tick").hide();
        $(".cross").hide();
        $("#next-images").hide();
        $("#images").empty();
        $("h3").remove();
        $("#item_name").val('');
        nextItems()
        $("#images a").click(function(){
            console.log($(this).attr("id"))
            if ($(this).attr("id") === item_selected.id) {
                $("#quiz-images .tick").show();
                $("#quiz-images .cross").hide();
            } else {
                $("#quiz-images .tick").hide();
                $("#quiz-images .cross").show();
            }
            $("#next-images").show();
        })
    });

    $("#quiz-name").click(function(){
        $("#go-back").show()
        $("#quiz").css("display", "flex")
        $("#quiz-name").css("display", "none")
        $("#quiz-image").css("display", "none")
        $("main > h2").css("display", "none")
        nextItem()
    });

    $("#quiz-image").click(function(){
        $("#go-back").show()
        $("#quiz-images").css("display", "flex")
        $("#quiz-name").css("display", "none")
        $("#quiz-image").css("display", "none")
        $("main > h2").css("display", "none") 
        nextItems()
        $("#images a").click(function(){
            console.log($(this).attr("id"))
            if ($(this).attr("id") === item_selected.id) {
                $("#quiz-images .tick").show();
                $("#quiz-images .cross").hide();
            } else {
                $("#quiz-images .tick").hide();
                $("#quiz-images .cross").show();
            }
            $("#next-images").show();
        })
    });
    
    $("#go-back").click(function() {
        $("#go-back").hide()
        $("#quiz").css("display", "none")
        $("#quiz h3").remove()
        $("#quiz div").remove()
        $("#quiz-images").css("display", "none")
        $("#images").empty()
        $("#quiz-images h3").remove()
        $("#quiz-name").show()
        $("#quiz-image").show()
        $(".tick").hide()
        $(".cross").hide()
        $("main > h2").css("display", "none")
    })
});

// Quiz

let item_index
let item_selected


function nextItem() {
    item_index = Math.floor(Math.random() * item_list.length);
    item_selected = item_list[item_index]
    console.log(item_index)
    drawItem(item_selected, "#quiz h2")
}

function drawItem(item, location) {
    var nuevoElemento = $("<div>");
    switch (item.dlc) {
        case "Rebirth":
            let zeros = ""
            let id_string = item.id.toString()
            if (id_string.length === 1)
                zeros = "00"
            else if (id_string.length === 2)
                zeros = "0"
            nuevoElemento.addClass("item reb-itm-new re-itm" + zeros + item.id);
            break;
        case "Afterbirth":
            nuevoElemento.addClass("ab-itm-new item abn-itm" + item.id);
            break;
        case "Afterbirth+":
            nuevoElemento.addClass("ap-itm-new item apn-itm" + item.id);
            break;
        case "Repentance":
            nuevoElemento.addClass("item rep-item rep" + item.id);
            break;
    }
    $(location).after(nuevoElemento);
}

function nextItems() {
    item_index = Math.floor(Math.random() * item_list.length);
    item_selected = item_list[item_index]
    let real_name = $("<h3>").text(item_selected.name)
    real_name.css("font-weight", "bold")
    $("#quiz-images h2").after(real_name)
    let index = 0
    let index_aux = 0;
    let item;
    let items = []
    items.push(item_selected)
    
    for (let i = 0; i < 3; i++) {
        index = Math.floor(Math.random() * item_list.length) + 1;
        while (containsId(items, index))
            index = Math.floor(Math.random() * item_list.length) + 1;
        index_aux = index
        item = item_list[index]
        items.push(item)
        //drawImage(item, "#images")
    }
    items.sort(comparacionAleatoria)
    items.forEach((item) => {
        drawImage(item, "#images")
    })
}

function containsId(items, id) {
    let contain = false
    items.forEach((item) => {
        if (item.id == id)
            contain = true
    })
    return contain
}

function drawImage(item, location) {
    var nuevoElemento = $("<a>");
    nuevoElemento.attr("id", item.id)
    nuevoElemento.addClass("image")
    switch (item.dlc) {
        case "Rebirth":
            let zeros = ""
            let id_string = item.id.toString()
            if (id_string.length === 1)
                zeros = "00"
            else if (id_string.length === 2)
                zeros = "0"
            nuevoElemento.addClass("item reb-itm-new re-itm" + zeros + item.id);
            break;
        case "Afterbirth":
            nuevoElemento.addClass("ab-itm-new item abn-itm" + item.id);
            break;
        case "Afterbirth+":
            nuevoElemento.addClass("ap-itm-new item apn-itm" + item.id);
            break;
        case "Repentance":
            nuevoElemento.addClass("item rep-item rep" + item.id);
            break;
    }
    $(location).append(nuevoElemento);
}

function comparacionAleatoria() {
    return Math.random() - 0.5;
  }
