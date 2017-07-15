import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {
  usuario: any = {
    nome: null,
    email: null
  }
  endereco: any;

  constructor(private http: Http ) { }

  ngOnInit() {
  }

  verificaValidTouched( campo ) {
    return !campo.valid && campo.touched;
  }

  aplicaCssErro( campo ) {

    // console.log( 'campo', campo );

    return {
      'has-error': this.verificaValidTouched( campo ),
      'has-feedback': this.verificaValidTouched( campo )
    }

  }

  consultaCEP( cep ) {
    console.log( 'cep', cep );
    cep = cep.replace(/\D/g, '');
    console.log( 'cep', cep );
    if (cep !== '') {
      const validacep = /^[0-9]{8}$/;
      if ( validacep.test( cep ) ) {
        this.http.get( `//viacep.com.br/ws/${cep}/json/` )
          .map( dados => dados.json() )
          .subscribe( (endereco) => {
            console.log( 'endereco', endereco );
          });
      }
    }
  }
  onSubmit(form) {
    console.log( 'submit', form );

    // console.log( 'usuario', this.usuario );
  }
}
