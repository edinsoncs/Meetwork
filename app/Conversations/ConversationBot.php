<?php

namespace App\Conversations;

use Illuminate\Foundation\Inspiring;
use BotMan\BotMan\Messages\Incoming\Answer;
use BotMan\BotMan\Messages\Outgoing\Question;
use BotMan\BotMan\Messages\Outgoing\Actions\Button;
use BotMan\BotMan\Messages\Conversations\Conversation;

class ConversationBot extends Conversation
{
    /**
     * First question
     */
    public function askReason()
    {
        $question = Question::create("Que necesitas reservar en tu proxima reunion? ")
            ->fallback('Unable to ask question')
            ->callbackId('ask_reason')
            ->addButtons([
                Button::create('Restaurantes')->value('restaurantes'),
                Button::create('Cafes')->value('cafes'),
                Button::create('Bares')->value('bares'),
                Button::create('Locales')->value('locales')
            ]);

        $this->ask($question, function (Answer $answer) {

            $service = json_decode(file_get_contents(storage_path() . '/json/json.json'), true);
            if($answer->getValue() == 'restaurantes'){
                $this->say('Te muestro a continuación nuestros lugares a reservar en: ' . $answer->getValue(), self::findService($service, $answer->getValue()));
            }
            
            else if($answer->getValue() == 'cafes'){
                $this->say('Te muestro a continuación nuestros lugares a reservar en: ' . $answer->getValue(), self::findService($service, $answer->getValue()));
            }

            else if($answer->getValue() == 'bares'){
                 $this->say('Te muestro a continuación nuestros lugares a reservar en: ' . $answer->getValue(), self::findService($service, $answer->getValue()));
            }

            else if($answer->getValue() == 'locales'){
                $this->say('Disculpanos, estamos agregando mas servicios, muy pronto tendremos locales a tu disposición, gracias, te ayudo en algo mas?');
            } else {
                $this->say('No seleccionaste ninguna respuesta correcta');
            }


        });

    }

    /**
     * Start the conversation
     */
    public function run()
    {
        $this->askReason();
    }



    /**
     * [findService description]
     * @param  [type] $list   [description]
     * @param  [type] $select [description]
     * @return [type]         [description]
     */
    public function findService($list, $select){

        foreach ($list as $key) {
            if($key['type'] == $select){
               return $key;            
            }
        }
    }
}
