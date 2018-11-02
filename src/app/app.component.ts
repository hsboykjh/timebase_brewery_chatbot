import { Component } from '@angular/core';
import {BeerService} from "./services/beer.service";
import {BotService} from "./services/bot.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [BeerService, BotService]
})
export class AppComponent {}
