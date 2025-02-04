import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
@Component({
  selector: 'app-concepto-ocupacional',
  standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ToggleSwitchModule, InputTextModule, ButtonModule,RadioButtonModule],
  templateUrl: './concepto-ocupacional.component.html',
  styleUrl: './concepto-ocupacional.component.css'
})
export class ConceptoOcupacionalComponent implements OnInit{
  conceptoForm!: FormGroup;

    @Output() conceptoOutput = new EventEmitter<any>();
    constructor(
      private fb: FormBuilder
    ) { }
  

  ngOnInit() {
    return this.conceptoForm = this.fb.group({
      radConceptoIngreso: [''],
      radRetiro: [''],
      radPostIncapacidad:['']
    });
  }
  
    onSubmit(){
      this.conceptoOutput.emit(this.conceptoForm.value);
    }

}
