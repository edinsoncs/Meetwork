/**
 * Edinson Carranza Saldaña @FullStack
 */

'use strict'


window.axios.defaults.headers.common['X-CSRF-TOKEN'] = $('input[name="_token"]').val();


/**
 * 
 */
localStorage.setItem('open', true);
localStorage.setItem('place_id', 0);
localStorage.setItem('messages', true);
localStorage.setItem('date', true);
localStorage.setItem('time_start', true);
localStorage.setItem('time_end', true);
localStorage.setItem('emails', true);


/**
 * 
 */

var arr = [];
var arr_2 = [];


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

    var hour = new Date();


    /**
     * [theme description]
     * @type {String}
     */
    var theme = '<article class="chat__List--Robot mt-3">' +
        '<div class="time text-center mb-1">' +
        '<time class="timeago small text-muted" datetime="' + hour.toISOString() + '">July 17, 2008</time>' +
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
            '<a href="' + data[0].additionalParameters.url + '" target="_blank" class="link d-block  mt-2">' +
            'ver espacio' +
            '</a>' +
            '<a href="#" class="link d-block ml-5 mt-2" onclick="reservateStart(this);">' +
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


    if (data[0].additionalParameters.step === 2) {
        theme += '<article class="chat__List--Dates mt-3">' +
            '<form action="" class="form" id="formtime" autocomplete="off">' +
            '<div class="form-group col-12">' +
            '<label for="" class="text-muted small">' +
            'Fecha' +
            '</label>' +
            '<input required id="datetimepicker_date" class="form-control times__chat validate_1" type="text" placeholder="Fecha de la reserva">' +
            '</div>' +
            '<div class="form-group d-flex justify-content-between">' +
            '<div class="form__Iz col-5">' +
            '<label for="" class="text-muted small">' +
            'Hora de incio' +
            '</label>' +
            '<input required id="datetimepicker" class="form-control times__chat validate_2" type="text" placeholder="Inicio">' +
            '</div>' +
            '<div class="form__De col-5">' +
            '<label for="" class="text-muted small">' +
            'Hora fin' +
            '</label>' +
            '<input required id="datetimepicker2" class="form-control times__chat validate_3" type="text" placeholder="Fin">' +
            '</div>' +
            '</div>' +
            '<div class="text-center mt-4"><input type="submit" onclick="continueTime(this);" class="small btn btn-default border btn-sm" value="Continuar"></div>' +
            '</form>' +
            '</article>';

        applyPlugins();
    }

    if (data[0].additionalParameters.step === 4) {
        theme += '<div class="text-center mt-3"><button class="btn btn-default border btn-sm" onclick="finishService();">Finalizar</button></div>'
    }

    if (data[0].additionalParameters.step === 5) {
        theme += '<article class="chat__List--Offert mt-3">' +
            '<div class="image text-center">' +
            '<img src="assets/img/thank.svg" alt="">' +
            '</div>'
        '</article>';
    }


    $("#list__Chat").append(theme);
    $(".timeago").timeago();
    downChat();
    clearInputMessage();

}


const theme_2 = (txt) => {
    var hour = new Date();
    var theme = '<article class="chat__List--Robot mt-3 i--user">' +
        '<div class="time text-center mb-1">' +
        '<time class="timeago text-muted small " datetime="' + hour.toISOString() + '">July 17, 2008</time>' +
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

    var obj = {
        txt: txt
    }

    arr.push(obj);
    localStorage.setItem('messages', JSON.stringify(arr));

    getIdPlace(txt);
    getEmails(txt);
    $(".timeago").timeago();

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

function reservateStart() {
    getId('message_chat').value = 'Reservar';
    $("#form_meet_work").submit();
    downChat();
}

function continueTime(e) {

    $("#formtime").submit((e) => e.preventDefault());

    if (checkfield($('.validate_1')) == true) return;
    if (checkfield($('.validate_2')) == true) return;
    if (checkfield($('.validate_3')) == true) return;

    getId('message_chat').value = 'Continuar';
    $("#form_meet_work").submit();

    localStorage.setItem('date', getId('datetimepicker_date').value);
    localStorage.setItem('time_start', getId('datetimepicker').value);
    localStorage.setItem('time_end', getId("datetimepicker2").value);

    downChat();


}

function finishService() {

    getId('message_chat').value = 'Finalizar';
    $("#form_meet_work").submit();
    downChat();

    axios.post('/save', {
           place_id:  localStorage.getItem('place_id'),
           messages: localStorage.getItem('messages'),
           date_start: localStorage.getItem('date'),
           time_start: localStorage.getItem('time_start'),
           time_end: localStorage.getItem('time_end'),
           emails: localStorage.getItem('emails')
        })
        .then(function(response) {

            console.log(response.data);
        })
        .catch(function(error) {
            console.log(error);
        });

}

function getIdPlace(txt) {
    var str = txt;
    var n = str.split(':');
    var id = n[n.length - 1];
    if(Number(id)){
        localStorage.setItem('place_id', id);
    }
}

function getEmails(txt) {

    if (validateEmail(txt)) {
        arr_2.push(txt);
        localStorage.setItem('emails', JSON.stringify(arr_2));
    }
}


function applyPlugins() {
    setTimeout(() => {

        $("#datetimepicker_date").datetimepicker({
            datepicker: true,
            format: 'Y/m/d',
            timepicker: false
        });
        $('#datetimepicker').datetimepicker({
            datepicker: false,
            format: 'H:i'
        });
        $('#datetimepicker2').datetimepicker({
            datepicker: false,
            format: 'H:i'
        });

    }, 300);

}




function checkfield(champ) {
    var off = '',
        isit = false;
    for (var j = 0; j < champ.val().trim().split(' ').length; j++) {
        off += champ.val().split(' ')[j];
    }
    off.replace(' ', '');
    if (off.length == 0) isit = true;
    return isit;
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


jQuery.timeago.settings.strings = {
    prefixAgo: "hace",
    prefixFromNow: "dentro de",
    suffixAgo: "",
    suffixFromNow: "",
    seconds: "menos de un minuto",
    minute: "un minuto",
    minutes: "unos %d minutos",
    hour: "una hora",
    hours: "%d horas",
    day: "un día",
    days: "%d días",
    month: "un mes",
    months: "%d meses",
    year: "un año",
    years: "%d años"
};