$(document).ready(function () {
    // init
    send_request_m();

    $('.rkibooksmanage-form-control').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("rkibooksmanage-filter-apply").click();
        }
    });
});

// filter
$("#rkibooksmanage-filter-apply").click(function () {
    send_request_m();
});

// clear filter
$("#rkibooksmanage-filter-clear").click(function () {
    $(".rkimanage-filter").val("");
    send_request_m();
});

// register
$("#rki-user-register").click(function () {
    var email = $("#user-email").val(),
        fio = $("#user-fio").val(),
        user_type = $("#user-type").val(),
        pass = $("#user-pass").val();
    register_user(email, fio, user_type, pass);
});


function send_request_m(page = 0) {
    var filter = $(".rkimanage-filter")
        .map(function () {
            return this.id + "=" + $(this).val();
        })
        .get()
        .join('&');

    $.ajax({
        url: M.cfg.wwwroot + "/blocks/rkimanage/ajax.php?action=getlist&page=" + page + "&" + encodeURI(filter)
    }).done(function (data) {
        // set data
        $("#rki-user-list").html(data.html);
        $("#rki-user-list").scrollTop(0);

        // pagination
        $(".rkimanage-page").click(function () {
            send_request_m($(this).data('page'));
        });

        //set user block listener
        $(".rki-user-block").click(function () {
            $(this).hide();
            block_user($(this).data("id"));
        });

        //set user unblock listener
        $(".rki-user-unblock").click(function () {
            $(this).hide();
            unblock_user($(this).data("id"));
        });
    });
}

function block_user(id) {
    $.ajax({
        url: M.cfg.wwwroot + "/blocks/rkimanage/ajax.php?action=block_user&user_id=" + id
    }).done(function (data) {
        send_request_m();
    });
}

function unblock_user(id) {
    $.ajax({
        url: M.cfg.wwwroot + "/blocks/rkimanage/ajax.php?action=unblock_user&user_id=" + id
    }).done(function (data) {
        send_request_m();
    });
}

function register_user(email, fio, type, pass) {
    $.ajax({
        url: M.cfg.wwwroot + "/blocks/rkimanage/ajax.php?action=register_user"
            + "&email=" + email
            + "&fio=" + fio
            + "&user_type=" + type
            + "&pass=" + pass
    }).done(function (data) {
        alert(data.text);
        clear_registerform();
        send_request_m();
    });
}

function clear_registerform() {
    $("#user-email").val("");
    $("#user-fio").val("");
    $("#user-type").val(1);
    $("#user-pass").val("");
}
