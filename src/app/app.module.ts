import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';

//  App Containers
import {HomeContainerComponent} from './containers/home/home.container';

// component
import {FooterComponent} from './components/footer/footer.component';
import {NavbarComponent} from './components/navbar/navbar.component';

// services
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

// external Module
import {Ng4LoadingSpinnerModule} from 'ng4-loading-spinner';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {ModalModule} from 'ngx-bootstrap';

const appRoutes = [
    {path: '', component: HomeContainerComponent},
    {path: 'home', redirectTo: '', pathMatch: 'full'},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
];


@NgModule({
    declarations: [
        HomeContainerComponent,
        NavbarComponent,
        FooterComponent,
        AppComponent
    ],
    imports: [
        HttpClientModule,
        FormsModule,
        BrowserModule,
        ReactiveFormsModule,
        ModalModule.forRoot(),
        Ng4LoadingSpinnerModule.forRoot(),
        FlashMessagesModule,
        RouterModule.forRoot(appRoutes)
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {}
}

