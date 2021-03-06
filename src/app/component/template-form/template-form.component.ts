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

  consultaCEP( cep , formulario ) {
    console.log( 'cep', cep );
    cep = cep.replace(/\D/g, '');
    console.log( 'cep', cep );
    if (cep !== '') {
      const validacep = /^[0-9]{8}$/;
      if ( validacep.test( cep ) ) {

        this.resetaFormulario( formulario );

        this.http.get( `//viacep.com.br/ws/${cep}/json/` )
          .map( dados => dados.json() )
          .subscribe( (dados) => {
            // console.log( 'endereco', dados );
            this.populaDadosFormulario( dados, formulario );
          });
      } else {
        // cep é inválido.
        alert('Formato de CEP inválido.');
        formulario.form.reset();
      }
    }
  }

  populaDadosFormulario( dados , formulario ) {

    /*
      formulario.setValue({
          nome: formulario.value.nome,
          email: formulario.value.email,
          endereco: {
            rua: dados.logradouro,
            cep: dados.cep,
            numero: '' ,
            complemento: dados.complemento ,
            bairro: dados.bairro,
            cidade: dados.localidade,
            estado: dados.uf
          }
        }
      );
    */

    formulario.form.patchValue({
      endereco: {
        cep: dados.cep,
        rua: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
  }

  resetaFormulario( formulario ) {
    formulario.form.patchValue({
      endereco: {
          cep: null,
          rua: null,
          numero: null,
          complemento: null,
          bairro: null,
          cidade: null,
          estado: null
        }
    });
  }
  onSubmit(formulario) {
    console.log( 'submit', formulario );

    // console.log( 'usuario', this.usuario );

    this.http.post( 'https://httpbin.org/post', JSON.stringify( formulario.value ) )
      .map( res => res )
      .subscribe( res => {
        console.log( 'dados', res );
        formulario.form.reset();
      } );
  }
}
