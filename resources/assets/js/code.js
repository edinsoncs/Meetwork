/**
 * Edinson Carranza Saldaña @FullStack
 */

'use strict'


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


/**
 * [send new message in backend]
 * @return {[type]} [description]
 */
let send_message_chat = () => {

    let txt_chat = getId('message_chat');
    let driver_chat = getId('driver_chat');
    let user_chat = getId('user_chat');

    fetch('/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                message: th.getAttribute('data-id'),
                driver: driver_chat,
                user: user_chat
            })
        }).then(r => r.json())
        .then(data => {
        	console.log(data);
        });
}