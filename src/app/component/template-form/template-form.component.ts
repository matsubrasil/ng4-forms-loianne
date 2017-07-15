import { Component, OnInit } from '@angular/core';

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

  constructor() { }

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

  onSubmit(form) {
    console.log( 'submit', form );

    // console.log( 'usuario', this.usuario );
  }
}
