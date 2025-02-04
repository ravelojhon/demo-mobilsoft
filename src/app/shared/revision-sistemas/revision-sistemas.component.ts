import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-revision-sistemas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToggleSwitchModule, InputTextModule, ButtonModule],
  templateUrl: './revision-sistemas.component.html',
  styleUrl: './revision-sistemas.component.css'
})
export class RevisionSistemasComponent implements OnInit{
  revisionSistemasForm!: FormGroup;

  @Output() revisionSistemaOutPut = new EventEmitter<any>();
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
    return this.revisionSistemasForm = this.fb.group({
      swOrganoSentidos: [false],
      ampliacionOrganoSentidos: ['Normal'],

      swCardiovascular: [false],
      ampliacionCardiovascular: ['Normal'],

      swRespiratorio: [false],
      ampliacionRespiratorio: ['Normal'],

      swGastroIntestinal: [false],
      ampliacionGastroIntestinal: ['Normal'],

      swOsteoMuscular: [false],
      ampliacionOsteoMuscular: ['Normal'],

      swOtro: [false],
      ampliacionOtro: ['Normal'],
     
    });
  }

  onSubmit(){
    this.revisionSistemaOutPut.emit(this.revisionSistemasForm.value);
  }
}
