import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-anexo-enfasis-osteomuscular',
  standalone: true,
   imports: [CommonModule, ReactiveFormsModule, ToggleSwitchModule, InputTextModule, ButtonModule],
  templateUrl: './anexo-enfasis-osteomuscular.component.html',
  styleUrl: './anexo-enfasis-osteomuscular.component.css'
})
export class AnexoEnfasisOsteomuscularComponent implements OnInit{
  anexoForm!: FormGroup;

    @Output() anexoOutput = new EventEmitter<any>();
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

        swOsteoMuscular:[false],
        OsteoMuscular: ['Normal'],
  
        swMarcha:[false],
        Marcha : ['Normal'],
  
        swMMSS:[false],
        MMSS: ['Normal'],
  
        swMMII:[false],
        MMII: ['Normal'],
  
        swColumna:[false],
        Columna: ['Normal'],
  
        swFuerza:[false],
        Fuerza: ['Normal'],

        swFlexibilidad:[false],
        Flexibilidad: ['Normal'],
      });
    }
  
    onSubmit(){
      this.anexoOutput.emit(this.anexoForm.value);
    }

}
