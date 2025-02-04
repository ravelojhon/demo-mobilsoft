import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-anexo-pruebas-vestibulares',
  standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ToggleSwitchModule, InputTextModule, ButtonModule],
  templateUrl: './anexo-pruebas-vestibulares.component.html',
  styleUrl: './anexo-pruebas-vestibulares.component.css'
})
export class AnexoPruebasVestibularesComponent implements OnInit{
  anexoForm!: FormGroup;

    @Output() anexoPruebasOutput = new EventEmitter<any>();
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
      this.anexoPruebasOutput.emit(this.anexoForm.value);
    }

}
