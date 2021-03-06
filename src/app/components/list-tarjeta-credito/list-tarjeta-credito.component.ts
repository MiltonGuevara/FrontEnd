import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/tarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-list-tarjeta-credito',
  templateUrl: './list-tarjeta-credito.component.html',
  styleUrls: ['./list-tarjeta-credito.component.css']
})
export class ListTarjetaCreditoComponent implements OnInit {

  constructor(public tarjetaService:TarjetaService,
              public toastr:ToastrService) { }

  ngOnInit(): void {

    this.tarjetaService.obtenerTarjetas();
  }
  //elimnar tarjeta
  eliminarTarjeta(id:number | any){
    if(confirm('Esta seguro de que deseas elminar la tarjeta?')){
      this.tarjetaService.eliminarTarjeta(id).subscribe(data=>{
        this.toastr.warning('Registro eliminado', 'La tarjeta fue eliminada')
        this.tarjetaService.obtenerTarjetas();
      })
    }
  }

  editar(tarjeta:TarjetaCredito){
      this.tarjetaService.editar(tarjeta);
  }
}
