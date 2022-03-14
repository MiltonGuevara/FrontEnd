import { Component, OnInit } from '@angular/core';
//Modulos para trabajar con los formularios
import{FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/tarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {

  form: FormGroup;
  
  constructor(private formBuilder:FormBuilder, 
              private tarjetaService:TarjetaService,
              private toastr:ToastrService) { 

    this.form = this.formBuilder.group({
      id:0,
      titular:['', [Validators.required]],
      numeroTarjeta:['',[Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion:['',[Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv:['',[Validators.required, Validators.maxLength(6), Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
  }

  guardarTarjeta(){
    
    const tarjeta:TarjetaCredito={
     titular:this.form.get('titular')?.value,
     nunTarjeta:this.form.get('numeroTarjeta')?.value,
     fechaExpiracion:this.form.get('fechaExpiracion')?.value,
     cvv:this.form.get('cvv')?.value

    }  
    this.tarjetaService.guardarTarjeta(tarjeta).subscribe(data =>{
        this.toastr.show('Registro agregado', 'La terjeta fue agregada');
        this.form.reset();
    })
   this.tarjetaService.obtenerTarjetas();
  }

}
