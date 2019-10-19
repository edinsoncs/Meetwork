<?php

namespace App\Http\Controllers\Frontend;
use App\Orders;
use App\OrdersTime;
use App\OrdersInvitation;
use App\OrdersMessage;
use App\Http\Controllers\Controller;
use BotMan\BotMan\BotMan;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Conversations\ExampleConversation;
use App\Http\Controllers\Chatbot\ChatbotController;

class FrontendController extends Controller
{

    
    /**
     * [index Home Site]
     * @return [type] [description]
     */
    public function index()
    {
        return view('frontend.index');
    }

    /**
     * [newConversation description]
     * @param  Request $request [description]
     * @return [type]           [description]
     */
    public function newConversation(Request $re){

        $botman = resolve('botman');


        $botman->hears('hola', ChatbotController::class.'@startConversation');
        
        $botman->hears('hi|hello', function ($bot) {
            $bot->reply('Hola, aun no aprendo ingles!');
        });

        $botman->hears('priviet', function($bot){
            $bot->reply('Hola, aun no aprendo Ruso!');
        });

        $botman->hears('.*Servicio.* {service} {id}', function($bot, $service, $id){
            $service_select = self::findService($id);
            $bot->reply('Muy bien, has seleccionad correctamente: ' . $service, $service_select);
        });


        $botman->hears('Reservar', function($bot){
            $bot->reply('Felicidades, te falta muy poco para completar tu reservación: Ingresa tu fecha y horarios adicionales', array('step' => 2));
        });

        $botman->hears('Continuar', function($bot){
            $bot->reply('Para finalizar, invita a tus asistentes, ingresa un email a la ves', array('step' => 3));
        });

        $botman->hears('.*@.*', function($bot){
            $email = $bot->getMessage()->getText();
            if(filter_var($email, FILTER_VALIDATE_EMAIL)){
                $bot->reply('Invitado agregado', array('step' => 4));
            } else {
                $bot->reply('Ingresa un email correcto');
            }
        });

         $botman->hears('Finalizar', function($bot){
            $bot->reply('Felicidades, tu reservación se completo con éxito.', array('step' => 5));
        });

        $botman->listen();

    }


    public function saveConversation(Request $re){


        /**
         * [$ordersTime description]
         * @var OrdersTime
         */
        $ordersTime = new OrdersTime;
        $ordersTime->date_now = $re->get('date_start');
        $ordersTime->hour_start = $re->get('time_start');
        $ordersTime->hour_end = $re->get('time_end');
        $ordersTime->save();


        /**
         * [$orders description]
         * @var Orders
         */
        $orders = new Orders;
        $orders->user_id = 1426;
        $orders->place_id = $re->get('place_id');
        $orders->status = true;
        $orders->time_id = $ordersTime->id;

        $orders->save();

        foreach(json_decode($re->get('emails')) as $key) {
            $ordersInvitation = new OrdersInvitation;
            $ordersInvitation->email = $key;
            $ordersInvitation->order_id = $orders->id;
            $ordersInvitation->save();
        }


        foreach(json_decode($re->get('messages')) as $key) {
            $ordersInvitation = new OrdersMessage;
            $ordersInvitation->text = $key->txt;
            $ordersInvitation->order_id = $orders->id;
            $ordersInvitation->save();
        }


    }

    public function findService($id){
       $id_find = (int)filter_var($id, FILTER_SANITIZE_NUMBER_INT);
       $services = json_decode(file_get_contents(storage_path() . '/json/single.json'), true);
       foreach ($services as $key) {
           if($key['id'] == $id_find){
            return $key;
           }
       }
    }

}
