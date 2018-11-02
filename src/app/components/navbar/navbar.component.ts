import {Component, OnInit, HostListener} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
    selector: 'app-navbar',
    styleUrls: ['navbar.component.css'],
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {

    constructor(private router: Router, private route: ActivatedRoute,){
        console.log("NavbarComponent constructor is called");
    }

    ngOnInit(){
        console.log("NavbarComponent ngOnInit is called");
    }
}
