import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: Http
  ) { }

  ngOnInit() {

    // this.formulario = new FormGroup({
    //   nome: new FormControl( null ),
    //   email: new FormControl( null )
    // });

    this.formulario = this.formBuilder.group({

      nome: [ null, [ Validators.required, Validators.minLength( 3 ), Validators.maxLength( 20 ) ] ],
      email:  [ null, [ Validators.required, Validators.email ] ],

      endereco: this.formBuilder.group({

        cep: [ null, Validators.required ],
        numero: [ null, Validators.required ],
        complemento: [ null ],
        rua: [ null, Validators.required ],
        bairro: [ null, Validators.required ],
        cidade: [ null, Validators.required ],
        estado: [ null, Validators.required ]
      })
    });
  }

  onSubmit() {
    console.log( 'form', this.formulario );

    if ( this.formulario.valid ) {
      this.http.post( 'https://httpbin.org/post',
                    JSON.stringify( this.formulario.value ) )
      .map( res => res.json())
      .subscribe( dados => {

        console.log( 'dados', dados );

        // reseta o formulario
        // this.formulario.reset();
        // this.resetar();

        },
        (error: any) => alert( 'erro' )
      );
    } else {
      console.log( 'form invalido' );
      this.verificaValidacoesForm( this.formulario );
    }
  }


  verificaValidacoesForm( formGroup: FormGroup ) {
    Object.keys( formGroup.controls ).forEach( campo => {
        console.log( 'chave: ', campo );
        const controle = formGroup.get( campo );
        controle.markAsDirty();

        if ( controle instanceof FormGroup ) {
          this.verificaValidacoesForm( controle )
        }
      });
  }

  resetar() {
    this.formulario.reset();
  }

  verificaValidTouched( campo: string): boolean {
    return !this.formulario.get( campo ).valid && ( this.formulario.get( campo ).touched || this.formulario.get( campo ).dirty );
  }

  verificaEmailInvalido(): boolean {
    const campoEmail = this.formulario.get('email');
    if ( campoEmail.errors ) {
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  }

  aplicaCssErro( campo: string ) {

    // console.log( 'campo', campo );

    return {
      'has-error': this.verificaValidTouched( campo ),
      'has-feedback': this.verificaValidTouched( campo )
    }

  }

  consultaCEP( ) {
    let cep = this.formulario.get('endereco.cep').value;
    cep = cep.replace(/\D/g, '');
    console.log( 'cep', cep );
    if (cep !== '') {
      const validacep = /^[0-9]{8}$/;
      if ( validacep.test( cep ) ) {

        this.resetaFormulario();

        this.http.get( `//viacep.com.br/ws/${cep}/json/` )
          .map( dados => dados.json() )
          .subscribe( (dados) => {
            // console.log( 'endereco', dados );
            this.populaDadosFormulario( dados );
          });
      } else {
        // cep é inválido.
        alert('Formato de CEP inválido.');
        const nometemp = this.formulario.get('nome').value;
        const emailtemp = this.formulario.get('email').value;
        this.formulario.reset();
        this.formulario.get('nome').setValue( nometemp );
        this.formulario.get('email').setValue( emailtemp );
      }
    }
  }

  populaDadosFormulario( dados ) {
    console.log('popula dados');
    this.formulario.patchValue({
      endereco: {
        cep: dados.cep,
        rua: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
    this.formulario.get('nome').setValue('Loiane');
  }

  resetaFormulario() {
    this.formulario.patchValue({
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
}
