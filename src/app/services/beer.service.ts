import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import BeerInfo from "../interfaces/beerInfo";

@Injectable()
export class BeerService {

    constructor(private http: HttpClient){
        console.log('BeerService constructor');
    }

    getBeers(queryString){

        console.log('BeerService initBannerList is called : ', queryString);
        const BASE_API_URL = environment.beerService.BASE_URL;

        return this.http.get<Array<BeerInfo>>(BASE_API_URL, {
            headers : new HttpHeaders({ 'Content-Type': 'application/json' }),
            params : queryString
        });
    }
}
