import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-habitos',
  imports: [CommonModule, ReactiveFormsModule, ToggleSwitchModule, InputTextModule, ButtonModule ],
  standalone: true,
  templateUrl: './habitos.component.html',
  styleUrl: './habitos.component.css'
})
export class HabitosComponent implements OnInit{
  habitosForm!: FormGroup;
  @Output() habitosOutPut = new EventEmitter<any>();
constructor(
    private fb: FormBuilder
  ) { }

ngOnInit(): void {
    this.initForm();
    // this.habitosForm.valueChanges.subscribe((value) => {
    //   if (this.habitosForm.valid) {
    //     this.habitosOutPut.emit(value);
    //   }
    // })
  }

  initForm(): FormGroup {
    return this.habitosForm = this.fb.group({
      swCigarro:[false],
      frecuenciaCigarro:[''],
      swAlcohol:[false],
      frecuenciaAlcohol:[''],
      swPsicoActivas:[false],
      frecuenciaPsicoActivas:[''],
      cualesPsicoActivas:[''],
      swActividadFisica:[false],
      frecuenciaActividad:[''],
      cualesActividad:[''],
      
    });
  }

  onSubmit(){
    this.habitosOutPut.emit(this.habitosForm.value);
  }
}
