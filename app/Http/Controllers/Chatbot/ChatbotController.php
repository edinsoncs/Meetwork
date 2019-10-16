<?php

namespace App\Http\Controllers\Chatbot;
use App\Http\Controllers\Controller;
use BotMan\BotMan\BotMan;
use App\Conversations\ConversationBot;
use Illuminate\Http\Request;

class ChatbotController extends Controller
{
    /**
     * Loaded through routes/botman.php
     * @param  BotMan $bot
     */
    

    public function startConversation(BotMan $bot)
    {
        $bot->startConversation(new ConversationBot());
    }


}
