$("body").css({
    "background-color": "black"
})
$(".table").css({
    "width": "200px",
    "height": "200px",
    "position": "relative",
    "margin": "0 auto"
})
$(".table img").css({
    "width": "100%",
    "height": "100%",
    "display": "block"
})
$(".table .mask").css({
    "width": "100px",
    "height": "100px",
    "background-color": "rgba(0,0,245,0.5)",
    "display": "none",
    "position": "absolute",
    "top": "0px",
    "left": "0px",
    "z-index": "999",
    "pointer-events": "none"
})
$(".doon").css({
    "width": "300px",
    "height": "300px",
    "background-color": "lightblue",
    "overflow": "hidden",
    "position": "relative",
    "display": "none",
    "margin": "0 auto"
})
$(".doon img").css({
    "width": "200%",
    "height": "200%",
    "display": "block",
    "position": "absolute",
    "top": 0,
    "left": 0,
    "display": "none"
})

$(".table").mousemove(function () {
    $(".doon").show();
    $(".mask").show();
    $(".doon img").show();
    var x = event.offsetX - 100 / 3;
    var y = event.offsetY - 100 / 3;
    if (x > 100) {
        x = 100;
    }
    if (x < 0) {
        x = 0;
    }
    if (y > 100) {
        y = 100;
    }
    if (y < 0) {
        y = 0;
    }
    $(".mask").css({
        left: x,
        top: y,
    })
    $(".doon img").css({
        left: -3 * x,
        top: -3 * y,
    })
})
$(".table").mouseleave(function () {
    $(".doon").hide();
    $(".mask").hide();
    $(".doon img").hide();
})