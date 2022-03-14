import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TarjetaCredito } from '../models/tarjetaCredito';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
myAppUrl = 'https://localhost:44326/';
myApiUrl='api/TarjetaCredito/';
list:TarjetaCredito[];

  constructor(private http: HttpClient) {

   }

   guardarTarjeta(tarjeta:TarjetaCredito):Observable<TarjetaCredito>{

      return this.http.post<TarjetaCredito>(this.myAppUrl + this.myApiUrl,tarjeta);
   }
   obtenerTarjetas(){
     this.http.get(this.myAppUrl + this.myApiUrl).toPromise()
                  .then(data =>{
                   this.list = data as TarjetaCredito[];
                  })
   }
}
