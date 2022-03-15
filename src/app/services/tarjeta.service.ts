import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

   private ActualizarFormulario = new BehaviorSubject<TarjetaCredito>({} as any);
   
   guardarTarjeta(tarjeta:TarjetaCredito):Observable<TarjetaCredito>{

      return this.http.post<TarjetaCredito>(this.myAppUrl + this.myApiUrl,tarjeta);
   }
   //Listar tarjetas
   obtenerTarjetas(){
     this.http.get(this.myAppUrl + this.myApiUrl).toPromise()
                  .then(data =>{
                   this.list = data as TarjetaCredito[];
                  })
   }

   //Eliminar tarjeta
   eliminarTarjeta(id:number):Observable<TarjetaCredito> {

    return this.http.delete<TarjetaCredito>(this.myAppUrl + this.myApiUrl + id);
   }
   

   actualizar(tarjeta:TarjetaCredito){
     this.ActualizarFormulario.next(tarjeta);
   }

   //Para pasar la data al formulario de tarjeta para su actualizacion
   obtenerTarjeta$():Observable<TarjetaCredito>{
    return this.ActualizarFormulario.asObservable();
   }

   //Actualizar tarjeta
   actualizarTarjeta(id:number, tarjeta:TarjetaCredito):Observable<TarjetaCredito>{

    return this.http.put<TarjetaCredito>(this.myAppUrl + this.myApiUrl + id, tarjeta);

   }
}
  