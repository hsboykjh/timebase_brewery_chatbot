import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {Subject} from "rxjs/Subject";
import chat from "../interfaces/chat";

@Injectable()
export class BotService {

    // condition 1 : - they like light coloured beers (EBC <10) in the morning and dark beers (EBC > 30) in the evening
    // => morning(0h~12h) : ebc_lt=10; , afternoon(12h~18h) : No query conditions, evening(18h~22h) : ebc_gt=30, night(22h~24h) : No query conditions

    // condition 2 : - they like to drink bitter beers when running tax reports (IBU > 50)
    // => running tax reports : ibu_gt=50 , Not : No query conditions

    // condition 3 : - they like to drink high alcohol beers (ABV > 6%) on the weekend and low alcohol beers (ABV < 4%) during the week.
    // => Mon~Fri : abv_lt=4, Sat : abv_gt=6, Sun : No query conditions


    // PARAM	TYPE	DETAILS
    // abv_gt	number	Returns all beers with ABV greater than the supplied number
    // abv_lt	number	Returns all beers with ABV less than the supplied number
    // ibu_gt	number	Returns all beers with IBU greater than the supplied number
    // ibu_lt	number	Returns all beers with IBU less than the supplied number
    // ebc_gt	number	Returns all beers with EBC greater than the supplied number
    // ebc_lt	number	Returns all beers with EBC less than the supplied number
    // beer_name	string	Returns all beers matching the supplied name (this will match partial strings as well so e.g punk will return Punk IPA), if you need to add spaces just add an underscore (_).
    // yeast	string	Returns all beers matching the supplied yeast name, this performs a fuzzy match, if you need to add spaces just add an underscore (_).
    // brewed_before	date	Returns all beers brewed before this date, the date format is mm-yyyy e.g 10-2011
    // brewed_after	date	Returns all beers brewed after this date, the date format is mm-yyyy e.g 10-2011
    // hops	string	Returns all beers matching the supplied hops name, this performs a fuzzy match, if you need to add spaces just add an underscore (_).
    // malt	string	Returns all beers matching the supplied malt name, this performs a fuzzy match, if you need to add spaces just add an underscore (_).
    // food	string	Returns all beers matching the supplied food string, this performs a fuzzy match, if you need to add spaces just add an underscore (_).
    // ids	string (id|id|...)	Returns all beers matching the supplied ID's. You can pass in multiple ID's by separating them with a | symbol.

    private CHATBOT_EVENT_SUBJECT = new Subject<any>();

    private conditions = {
        page : 1,
        per_page : 25 // set default 10 items
    };

    constructor(){
        console.log('BotService constructor');
    }

    init(date: Date) {

        const day = date.getDay();
        const hour = date.getHours();
        console.log(day, hour);

        if(day>0 && day < 6){
            //Mon~Fri
            this.setConditions('week');
        }else if(day === 6 ){
            //Sat
            this.setConditions('weekend');
        }

        let greeting = '';

        if(hour < 12){
            greeting = "Good morning";
            this.setConditions('morning');
        }else if(hour < 18){
            greeting = "Good afternoon";
            //No query conditions
        }else if(hour < 22){
            greeting = "Good evening";
            this.setConditions('evening');
        }else{
            greeting = "Hello";
        }

        let messageList = [];
        messageList.push({
            id : 'bot',
            text : greeting,
            type : 'normal',
            completed : true,
            createdAt : date
        });

        messageList.push(
            {
                id : 'bot',
                text : "I am Timebase brewery.",
                type : 'normal',
                completed : true,
                createdAt : date
            }
        );

        messageList.push(
            {
                id : 'bot',
                text : "Nice to meet you.",
                type : 'normal',
                completed : true,
                createdAt : date
            }
        );

        messageList.push(
            {
                id : 'bot',
                text : "I would like to recommend you good bear.",
                type : 'normal',
                completed : true,
                createdAt : date
            }
        );

        messageList.push(
            {
                id : 'bot',
                text : "Are you running tax reports now?",
                type : 'question',
                completed : false,
                createdAt : date
            }
        );

        for(let index=0; index < messageList.length; index++){
            let self = this;
            setTimeout(function(){
                self.createMessage(messageList[index])
            }, 500*index);
        }
    }

    getConditions(){
        return this.conditions;
    }

    setConditions(condition){
        if(condition === 'morning'){
            this.conditions['ebc_lt']=10;
        }else if(condition === 'evening'){
            this.conditions['ebc_gt']=30;
        }else if(condition === 'week'){
            this.conditions['abv_lt']=4;
        }else if(condition === 'weekend'){
            this.conditions['abv_gt']=6;
        }else if(condition === 'tax'){
            this.conditions['ibu_gt']=50;
        }else{
            console.error("Invalid condition type : ", condition);
        }
    }

    getChatBotEventObservable(){
        return this.CHATBOT_EVENT_SUBJECT.asObservable();
    }

    createMessage(newChat: chat){
        // console.log("createMessage is called : ", newChat);
        this.CHATBOT_EVENT_SUBJECT.next(newChat);
    }

    setAnswers(answer){
        if(answer === 'yes'){
            this.setConditions('tax');
            this.createMessage({
                id : 'bot',
                text : "Too much work is not good for your health. So, How about having time to relax with these beer",
                type : 'normal',
                completed : true,
                createdAt : new Date()
            });
        }else{
            this.createMessage({
                id : 'bot',
                text : "Ok good it is good time to enjoy these beer",
                type : 'normal',
                completed : true,
                createdAt : new Date()
            });
        }
    }
}
