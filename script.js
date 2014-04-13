/* Changes speed to inputted number */
function speed(newSpeed) {
    var myVid = document.getElementById("pythonVid");
    myVid.playbackRate = newSpeed;
    $('#pbRate').html("Current Speed: " + newSpeed + "x");
}

/* Changes video to given source */
function setVid(videoSrc) {
    var myVid = document.getElementById('pythonVid');
    $(myVid).attr('src', videoSrc);

}

/* Shows the bottom right menus */
function getMenu(obj, toAdd) {
    var week = "#" + ($(obj).attr('id')).toString() + toAdd;

    $(week).removeClass("invisible").addClass("visible")
    $("#back" + toAdd.charAt(0)).addClass("visible").removeClass("invisible");
    $(".visible").show();
    $(".invisible").hide();
}

/* Handles what happens when a tab in the bottom right is clicked */
function tabClicked(obj, name) {

    var idName = "#" + name;
    name = name.charAt(0).toUpperCase() + name.substr(1);
    var code = name.charAt(0);
    if ($(obj).html().indexOf('Hide') < 0) {
        $("#comments").animate({ height: "100%" }, 500);
        $(".section").animate({ height: "0px" }, 500);
        $("#readingsTitle").html("Readings");
        $("#codecademyTitle").html("Codecademy");
        $("#tasksTitle").html("Tasks");
      
        $("#comments").animate({ height: "50%"}, 500);
        $(idName).animate({ height: "50%" }, 500);
        $(obj).html("Hide " + name);
        $(idName + "M div").removeClass("visible").addClass("invisible");
        $(".invisible").hide();
        $("#weeks" + code).show().animate({ marginLeft: "0px" }, 200);
      
    } else {
        $("#comments").animate({ height: "100%" }, 500);
        $(idName).animate({ height: "0px" }, 500);
        $(obj).html(name);
    }
}

$(document).ready(function () {

    /* Hides everything not meant to be seen */
    $(".invisible").hide();

    /* Gets window sizes */
    var winW = $(window).width();
    var winH = $(window).height();

    /* Puts all the materials in correct place */
    $("#materials").css("margin-left", ((winW * 0.85) - 70));

    /* Warning if Chrome not being used */
    if (navigator.userAgent.indexOf('Chrome') == -1) {
        $("#warningBox").show();
        $("div:not(#warningBox)").fadeTo(2000, 0.05);
        $('#warningBox').click(function () {
            $("#warningBox").hide();
            $("div:not(#warningBox)").fadeTo(2000, 1);
        });
    }

    /* If small window readjusting some sizes */
    if (winH <= 650) {
        $("#rec").css("font-size", "14px");
        $("#center video").css("height", "75%").css("width", "75%");
    } else if (winH <= 770) {
        $("#rec").css("font-size", "14px");
    } else {
        $("#rec").css("font-size", "16px");
        $("#center video").css("height", "100%").css("width", "100%");
    }

    /* When slider click video pannel shown */
    $('.slider').click(function () {
        $('.changeVideoPanel').slideToggle('slow');
    });

    /* Sends inputted link to set video function */
    $('#changeButton').click(function () {
        setVid($("#videoURL").val());
    });

    /* Checks inputted speed it a number and if it is sends it to change speed function
    else it alerts the user of their error*/
    $("#speedSubmit").click(function () {
        if (!isNaN(parseFloat($("#speedInput").val(), 10))) {
            speed(parseFloat($("#speedInput").val(), 10));
        } else {
            alert("Please input a number.")
        }
        $("#speedInput").val("").focus()
    });

    /* Saves the notes to downloads folder */
    $(".saveToPC").click(function () {
        var name = $("#fileName").val();
        var blob = new Blob([$("p.paper").text()], {
            type: "text/plain;charset=utf-8"
        });
        if (name == "") {
            name = "Python MOOC Notes";
        }
        saveAs(blob, (name + ".txt"));
    });

    /* For the menus in the bottom right corner */

    /* Open and closes all the tabs when clciked on */
    $(".tabTitle").click(function () {
        tabClicked(this, ((($(this).attr('id')).toString())).slice(0, -5));
    });

    /* For when the weeks displayed within reading material are clciked on */
    $(".weeksMenu div").click(function () {
        var id = "#" + $(this).parent().attr("id");
        $(id).animate({ marginLeft: "-=100%"}, 0, function () { $(id).hide(); });
        getMenu(this, id.charAt(6) + "m");
    });

    /* For whenever a back button is clciked */
    $(".back").click(function () {
        var id = "#" + $(this).attr("id")
        var parentID = $(this).parent().attr("id").slice(0, -1);

        $("#" + parentID + "M div").removeClass("visible").addClass("invisible");
        $(".invisible").hide();
        $("#weeks" + parentID.charAt(0).toUpperCase()).show().animate({ marginLeft: "0px" }, 750);
    });
});
