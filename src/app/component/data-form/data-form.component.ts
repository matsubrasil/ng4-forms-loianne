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
      email:  [ null, [ Validators.required, Validators.email ] ]
    });
  }

  onSubmit() {
    console.log( 'form', this.formulario.value );

    this.http.post( 'https://httpbin.org/post',
                    JSON.stringify( this.formulario.value ) )
      .map( res => res.json())
      .subscribe( dados => {

        console.log( 'dados', dados );

        // reseta o formulario
        // this.formulario.reset();
        this.resetar();

      },
      (error: any) => alert( 'erro' ) );
  }

  resetar() {
    this.formulario.reset();
  }
}
