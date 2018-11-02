import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { ModalDirective } from 'ngx-bootstrap/modal';
import {Subscription} from "rxjs/Subscription";
import {BeerService} from "../../services/beer.service";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {FlashMessagesService} from "angular2-flash-messages";
import chat from "../../interfaces/chat";
import {BotService} from "../../services/bot.service";
import BeerInfo from "../../interfaces/beerInfo";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'app-home',
    styleUrls: ['home.container.css'],
    templateUrl: 'home.container.html'
})

export class HomeContainerComponent implements OnInit, OnDestroy {

    @ViewChild('detailModal') detailModal: ModalDirective;
    showDetailModal(): void {
        this.detailModal.show();
    }

    hideDetailModal(): void {
        this.detailModal.hide();
    }

    public chatHistory: Array<chat> = [];
    public beerInfoList: Array<BeerInfo>;
    public selectedBeerInfo;

    private chatBotServiceEventObservable: any;


    constructor( private router: Router, private route: ActivatedRoute, private beerService: BeerService, private botService: BotService, private spinnerService: Ng4LoadingSpinnerService, private flashMessagesService: FlashMessagesService){
    }


    ngOnInit() {
        console.log("HomeContainerComponent ngOnInit is called");

        this.initBotService();
        this.initBot();
    }

    ngOnDestroy(){
        if(this.chatBotServiceEventObservable){
            this.chatBotServiceEventObservable.unsubscribe();
        }
    }

    initBotService(){
        this.chatBotServiceEventObservable = this.botService.getChatBotEventObservable().subscribe(
            chat => {
                console.log('getChatBotEventObservable : ', chat);
                this.chatHistory.push(chat);
            },
            error => {
                console.log('getChatBotEventObservable error : ', error);
            },
            () => {
                console.log('getChatBotEventObservable completed');
            }
        );
    }

    initBot(){
        const today = new Date();
        this.botService.init(today);
    }

    getBeerInfo(queryString){
        this.spinnerService.show();

        this.beerService.getBeers(queryString).subscribe(
            results => {
                this.spinnerService.hide();
                this.beerInfoList = results;
                console.log('beerInfoList : ', this.beerInfoList);
            },
            error => {
                this.spinnerService.hide();
                console.log('error : ', error);
                this.flashMessagesService.show(`Error: ${error.error.error}. ${error.error.message}`, { cssClass: 'alert-danger' , timeout: 5000 });
            },
            () => {
                console.log('searchHouses completed');
            }
        );
    }

    createNewChat(newChat: chat){
        this.chatHistory.push(newChat);
    }

    createAnswer(answer){
        this.createNewChat({
            id : 'human',
            text : answer,
            type : 'normal',
            completed : true,
            createdAt : new Date()
        });

        this.botService.setAnswers(answer);
        const queryString = this.botService.getConditions();
        console.log('createAnswer : ', queryString);
        this.getBeerInfo(queryString);
    }

    selectBeer(beerInfo){
        console.log('selectBeer : ', beerInfo);
        this.selectedBeerInfo = beerInfo;
        this.showDetailModal();
    }
}
