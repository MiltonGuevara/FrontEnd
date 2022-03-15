import { Component, OnDestroy, OnInit } from '@angular/core';
//Modulos para trabajar con los formularios
import{FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TarjetaCredito } from 'src/app/models/tarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit, OnDestroy {

  form: FormGroup;
  suscription:Subscription;
  tarjeta:TarjetaCredito;
  idTarjeta: any = 0;

  constructor(private formBuilder:FormBuilder,  private tarjetaService:TarjetaService, private toastr:ToastrService) { 

    this.form = this.formBuilder.group({
      id:0,
      titular:['', [Validators.required]],
      numeroTarjeta:['',[Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion:['',[Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv:['',[Validators.required, Validators.maxLength(6), Validators.minLength(3)]]
    });
  }

  //Se subscribe para recibir la informacion de la tarjeta
  ngOnInit(): void {
     this.suscription = this.tarjetaService.obtenerTarjeta$().subscribe(data=>{ console.log(data);
      this.tarjeta = data;

      //llenar el formulario
      this.form.patchValue({
        titular:this.tarjeta.titular,
        numeroTarjeta:this.tarjeta.nunTarjeta,
        fechaExpiracion:this.tarjeta.fechaExpiracion,
        cvv:this.tarjeta.cvv

      });
      this.idTarjeta = this.tarjeta.id;
    });
  }

  agregar(){
    const tarjeta:TarjetaCredito={
      titular:this.form.get('titular')?.value,
      nunTarjeta:this.form.get('numeroTarjeta')?.value,
      fechaExpiracion:this.form.get('fechaExpiracion')?.value,
      cvv:this.form.get('cvv')?.value
 
     }  
     this.tarjetaService.guardarTarjeta(tarjeta).subscribe(data =>{
         this.toastr.success('Registro agregado', 'La terjeta fue agregada');
         this.form.reset();
         this.tarjetaService.obtenerTarjetas();
     })

  }


  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  guardarTarjeta(){
    
    if(this.idTarjeta === 0 ){
        this.agregar();
    }
    else{
      this.editar();
    }
  
  }


  editar(){
    const tarjeta:TarjetaCredito={
      id:this.tarjeta.id,
      titular:this.form.get('titular')?.value,
      nunTarjeta:this.form.get('numeroTarjeta')?.value,
      fechaExpiracion:this.form.get('fechaExpiracion')?.value,
      cvv:this.form.get('cvv')?.value
 
     }  
     this.tarjetaService.actualizarTarjeta(this.idTarjeta, tarjeta).subscribe(data =>{
      this.toastr.success('Registro actualizado', 'La terjeta fue actualizada');
      this.form.reset();
      this.tarjetaService.obtenerTarjetas();
      this.idTarjeta=0;
     });

  }

}
