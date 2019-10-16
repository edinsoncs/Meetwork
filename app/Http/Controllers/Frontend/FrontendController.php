<?php

namespace App\Http\Controllers\Frontend;
use App\Http\Controllers\Controller;
use BotMan\BotMan\BotMan;
use Illuminate\Http\Request;
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

        $botman->listen();

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
