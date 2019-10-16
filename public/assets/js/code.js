/**
 * Edinson Carranza Saldaña @FullStack
 */

'use strict'


window.axios.defaults.headers.common['X-CSRF-TOKEN'] = $('input[name="_token"]').val();


/**
 * [get id in document]
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
const getId = (id) => {
    return document.getElementById(id);
}

/**
 * [get class in document]
 * @param  {[type]} css [description]
 * @return {[type]}     [description]
 */
const getClass = (css) => {
    return document.getElementsByClassName(css);
}


const soundPlay = () => {
    getId('audio_chat').play();
}

const downChat = () => {
    $("#list__Chat").scrollTop($("#list__Chat")[0].scrollHeight).show();
}


/**
 * [Response theme user robot]
 * @return {[type]} [description]
 */
const theme_1 = (data) => {


    /**
     * [theme description]
     * @type {String}
     */
    var theme = '<article class="chat__List--Robot mt-3">' +
        '<div class="time text-center mb-1">' +
        '<span class="text-muted small">Hoy 16:36</span>' +
        '</div>' +
        '<div class="show d-flex align-items-start">' +
        '<div class="image mr-3">' +
        '<img src="assets/img/robot.svg" alt="" width="30">' +
        '</div>' +
        '<div class="description">' +
        '<p class="details m-0 p-2">' +
        data[0].text +
        '</p>' +
        '</div>' +
        '</div>' +
        '</article>';


    /**
     * [if description]
     * @param  {[type]} data[0].actions [description]
     * @return {[type]}                 [description]
     */
    if (data[0].actions) {

        var _link_a = '';
        data[0].actions.map((e, i, a) => {
            _link_a += '<a class="btn btn-primary m-1" href="#" data-val="' + e.value + '" onclick="selectService(this);">' + e.text + '</a>';
        });

        theme += '<div class="mt-3 btn-start-chat">' +
            _link_a +
            '</div>';

    }


    if (data[0].additionalParameters.id) {
        theme += '<article class="chat__List--Offert mt-3">' +
            '<div class="image text-center">' +
            '<img src="' + data[0].additionalParameters.image + '" alt="" width="250">' +
            '<div class="buttons__Offert d-flex justify-content-center">' +
            '<a href="#" class="link d-block  mt-2">' +
            'ver espacio' +
            '</a>' +
            '<a href="#" class="link d-block ml-5  mt-2">' +
            'reservar' +
            '</a>' +
            '</div>' +
            '</div>' +
            '</article>'
    }

    /**
     * [if description]
     * @param  {[type]} data[0].additionalParameters.type [description]
     * @return {[type]}                                   [description]
     */
    if (data[0].additionalParameters.type) {




        let items_service = data[0].additionalParameters.value;
        let slider = showService(items_service);

        theme += '<article class="chat__List--Offert mt-3">' +
            '<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">' +
            '<div class="carousel-inner">' +

            slider +

            '</div>' +
            '<a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">' +
            '<i class="fa fa-chevron-left" aria-hidden="true"></i>' +
            '<span class="sr-only">Previous</span>' +
            '</a>' +
            '<a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">' +
            '<i class="fa fa-chevron-right" aria-hidden="true"></i>' +
            '<span class="sr-only">Next</span>' +
            '</a>' +
            '</div>' +
            '</article>';
    }


    $("#list__Chat").append(theme);
    downChat();
    clearInputMessage();

}


const theme_2 = (txt) => {
    var theme = '<article class="chat__List--Robot mt-3 i--user">' +
        '<div class="time text-center mb-1">' +
        '<span class="text-muted small">Hoy 16:36</span>' +
        '</div>' +
        '<div class="show d-flex align-items-start justify-content-end">' +
        '<div class="description">' +
        '<p class="details m-0 p-2">' +
        txt +
        '</p>' +
        '</div>' +
        '</div>' +
        '</article>';
    $("#list__Chat").append(theme);
    downChat();
    clearInputMessage();
}

/**
 * [send new message in backend]
 * @return {[type]} [description]
 */
let send_message_chat = (e) => {

    e.preventDefault();

    let txt_chat = getId('message_chat').value;
    let driver_chat = getId('driver_chat').value;
    let user_chat = getId('user_chat').value;

    theme_2(txt_chat);

    axios.post('/new', {
            message: txt_chat,
            driver: driver_chat,
            user: user_chat
        })
        .then(function(response) {

            console.log(response.data);
            if (response.data.messages.length) {
                theme_1(response.data.messages);
            } else {
                theme_1(response.data.messages);
            }

            getId('message_chat').value = '';
            soundPlay();
        })
        .catch(function(error) {
            console.log(error);
        });
}


/**
 * [selectService description]
 * @param  {[type]} th [description]
 * @return {[type]}    [description]
 */
function selectService(th) {
    var val = th.getAttribute('data-val');
    getId('message_chat').value = val;
    $("#form_meet_work").submit();
}


/**
 * [showService description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function showService(data) {
    var first_theme = '';
    var second_theme = '';


    data.map((e, i, a) => {

        if (i < 3) {
            first_theme += '<article class="article__Offert text-center" onclick="selectNameService(this);" data-service="' + e.id + '" data-name="' + e.title + '">' +
                '<img src="' + e.image + '" alt="" width="100">' +
                '<span class="text text-muted small d-block">' +
                e.title +
                '</span>' +
                '</article>';

        } else if (i < 5) {
            second_theme += '<article class="article__Offert text-center" data-service="' + e.id + '">' +
                '<img src="' + e.image + '" alt="" width="100">' +
                '<span class="text text-muted small d-block">' +
                e.title +
                '</span>' +
                '</article>';
        }

    });

    var services = '<div class="carousel-item active"><div class="container__Offer d-flex justify-content-between" id="first_service">' + first_theme + '</div></div>' +
        '<div class="carousel-item"><div class="container__Offer d-flex justify-content-between" id="second_service">' + second_theme + '</div></div>';

    return services;

}



function selectNameService(th) {
    var val = th.getAttribute('data-name');
    var id = Number(th.getAttribute('data-service'));
    getId('message_chat').value = 'Servicio:' + ' ' + val + ' id:' + id;
    downChat();
}

function clearInputMessage() {
    getId('message_chat').value = '';
}