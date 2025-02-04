import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-anexo-dermatologico',
  standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ToggleSwitchModule, InputTextModule, ButtonModule],
  templateUrl: './anexo-dermatologico.component.html',
  styleUrl: './anexo-dermatologico.component.css'
})
export class AnexoDermatologicoComponent implements OnInit{
  anexoForm!: FormGroup;

    @Output() anexoDermatologicoOutput = new EventEmitter<any>();
    constructor(
      private fb: FormBuilder
    ) { }
  
    ngOnInit(): void {
      this.initForm();
      // this.revisionSistemasForm.valueChanges.subscribe((value) => {
      //   if (this.revisionSistemasForm.valid) {
      //     this.revisionSistemaOutPut.emit(value);
      //   }
      // })
    }

    initForm(): FormGroup {
      return this.anexoForm = this.fb.group({

        Parametro: ['N/A'],
        swParametro:[false],
        ParametroObs: ['Normal'],
      });
    }
  
    onSubmit(){
      this.anexoDermatologicoOutput.emit(this.anexoForm.value);
    }

}
