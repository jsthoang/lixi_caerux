var baseUrl = "./";
function addNotification(notification) {
    let textHtmlNotify = [];
    notification.forEach((item) => {
        textHtmlNotify.push(`<li><div class="thumb"><img src="assets/images/icon_gift.svg" alt=""></div><p>${item}</p></li>`);
    });

    document.querySelector(".notification").innerHTML = textHtmlNotify.join("");
}

const user = JSON.parse(localStorage.getItem("user"));
if (user) {
    const user_json = { email: user.email, password: user.password };
    fetch(`${baseUrl}list-staff`, {
        method: "GET",
    })
        .then((response) => response.json())
        .then(async (listStaff) => {
            let indexEmail = listStaff.findIndex((item) => {
                if (item.email === user.email) return item;
            });

            if (indexEmail === -1) {
                $("#login").show();
            } else {
                $("#timesSpin")[0].innerHTML = user.timesSpin;
                await fetch(`${baseUrl}gift`)
                    .then((response) => response.json())
                    .then(async (dataNotification) => {
                        let notification = [];
                        if (!dataNotification) dataNotification = [];
                        dataNotification.reverse().forEach((item, i) => {
                            if (i < 6) {
                                if (item.gift.search(".000") !== -1) {
                                    notification.push(`${item.name} đã trúng lì xì trị giá ${item.gift}VNĐ !!!`);
                                } else {
                                    notification.push(`${item.name} đã trúng phần thưởng bất ngờ!!!`);
                                }
                            }
                        });
                        addNotification(notification);
                    });
            }
        });
} else {
    $("#login").show();
}

$(document).ready(function () {
    // localStorage.clear();
    check_login();
    user_name_logout();
    get_user();
    get_prizes();

    async function get_prizes() {
        var prizes = await $.ajax({
            type: "GET",
            url: `${baseUrl}prize`,
            data: "data",
            dataType: "json",
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
            success: function (response) {},
        });

        localStorage.setItem("prizes", JSON.stringify(prizes));
    }

    async function get_user() {
        // var listStaff = await $.ajax({
        //     type: "GET",
        //     url: `${baseUrl}list-staff`,
        //     data: "data",
        //     dataType: "json",
        //     success: function (response) {},
        // });

        await handle();
    }
    function handle() {
        $("#login #form_contact").validate({
            rules: {
                email: {
                    required: true,
                    email: true,
                },
                password: {
                    required: true,
                },
            },
            highlight: function (element, errorClass) {
                $(element).closest(".check-validate").addClass("has-error");
            },
            unhighlight: function (element, errorClass) {
                $(element).closest(".check-validate").removeClass("has-error");
            },
        });

        $("#formValidate .btn_submit").click(async function (e) {
            e.preventDefault();
            if ($("#form_contact").valid()) {
                let email = $("#email")[0].value;
                let password = $("#password")[0].value;
                let spinTime = 0;
                let login_input = { email: email, password: password };
                if (!email) {
                    console.log("email not empty");
                    return;
                }
                const data_user = await $.ajax({
                    type: "POST",
                    url: `${baseUrl}list-staff`,
                    data: login_input,
                    dataType: "json",
                    success: function (response) {},
                });
                const listStaff = [data_user.user];
                localStorage.setItem("accessToken", data_user.token.accessToken);
                let accessToken = localStorage.getItem("accessToken");
                let check = checkEmail(email, password, listStaff);
                if (check.checkEmail) {
                    $("#login").hide();
                    var audio_main = document.querySelector("#audio_main");
                    audio_main.play();
                    $("#timesSpin")[0].innerHTML = check.user.timesSpin;

                    await fetch(`${baseUrl}gift`, {
                        headers: {
                            "Content-type": "application/json",
                            Authorization: "Bearer " + localStorage.getItem("accessToken"),
                        },
                    })
                        .then((response) => response.json())
                        .then(async (dataNotification) => {
                            let notification = [];
                            if (!dataNotification) dataNotification = [];
                            dataNotification.reverse().forEach((item, i) => {
                                if (i < 6) {
                                    if (item.gift.search(".000") !== -1) {
                                        notification.push(`${item.name} đã trúng lì xì trị giá ${item.gift}VNĐ !!!`);
                                    } else {
                                        notification.push(`${item.name} đã trúng phần thưởng bất ngờ!!!`);
                                    }
                                }
                            });
                            addNotification(notification);
                        });
                } else {
                    alert("Email hoặc password không hợp lệ!!!");
                    $("#email")[0].value = "";
                    $("#password")[0].value = "";
                    $("#email")[0].focus();
                }
            } else {
                $(".error").each(function () {
                    if ($(this).text() != "") {
                        $("html, body").animate(
                            {
                                scrollTop: $(this).offset().top - 300,
                            },
                            1000
                        );
                        return false;
                    }
                });
            }
        });

        function checkEmail(email, password, listStaff) {
            let checkEmail = false;
            let user = {};
            let index = listStaff.findIndex((item) => {
                if (item.email === email && item.password === password) return item;
            });

            if (index !== -1) {
                checkEmail = true;
                user = listStaff[index];
            }

            localStorage.setItem("user", JSON.stringify(user));
            let gifts = JSON.parse(localStorage.getItem("gifts"));
            check_login();
            user_name_logout();
            if (!gifts) gifts = [];

            let indexCheckGift;
            indexCheckGift = gifts.findIndex((gift) => {
                if (gift.email === user.email) return gift;
            });

            if (indexCheckGift !== -1) {
                user.timesSpin = 0;
            }
            return { checkEmail, user };
        }
    }
});
// Check logged in
function check_login() {
    let user = localStorage.getItem("user");
    if (user != null) {
        $("#log_out_btn").show();
    }
    $(".log_out_btn").click(function () {
        $(this).hide();
        localStorage.clear();
        location.reload();
    });
}
// Get user name for logout btn
function user_name_logout() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user == null) {
        $(".user").hide();
        return;
    }
    $(".user").css("display", "flex");
    $(".user >span").text(user.name);
    $(".user >span").attr("ttip", `Lượt quay: ${user.timesSpin}`);
    $("#timesSpin").text(user.timesSpin);
}
