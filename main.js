import { item_list } from "./loadItems.js";

$(".items").hide();
const rebirth_list = item_list.filter((item) => {return item.dlc === "Rebirth"})
const afterebirth_list = item_list.filter((item) => {return item.dlc === "Afterbirth"})
const afterebirth_plus_list = item_list.filter((item) => {return item.dlc === "Afterbirth+"})
const repentance_list = item_list.filter((item) => {return item.dlc === "Repentance"})

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
            $("#tick").show();
            $("#cross").hide();
        } else {
            $("#tick").hide();
            $("#cross").show();
        }
        $("#next").show();
        $("#submit").hide();
    });

    $("#next").click(function(){
        $("#tick").hide();
        $("#cross").hide();
        $("#next").hide();
        $("#submit").show();
        $(".item").first().remove();
        $("h3").remove();
        $("#item_name").val('');
        nextItem()
    });
    
});

// Quiz

let item_index
let item_selected
nextItem()

function nextItem() {
    item_index = Math.floor(Math.random() * item_list.length) + 1;
    item_selected = item_list[item_index]
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
