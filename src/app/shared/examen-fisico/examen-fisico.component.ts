import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-examen-fisico',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToggleSwitchModule, InputTextModule, ButtonModule],
  templateUrl: './examen-fisico.component.html',
  styleUrl: './examen-fisico.component.css'
})
export class ExamenFisicoComponent implements OnInit{
  examenFisico!: FormGroup;

  @Output() examenFisicoOutput = new EventEmitter<any>();
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
    return this.examenFisico = this.fb.group({
      tensionArterialDiastolica: ['', Validators.required],
      tensionArterialSistolica: ['', Validators.required],
      frecuenciaCardiaca: ['', Validators.required],
      frecuenciaRespiratoria: ['', Validators.required],
      temperatura: ['', Validators.required],
      saturacion02: ['', Validators.required],
      peso: ['', Validators.required],
      talla: ['', Validators.required],
      colorPiel: ['', Validators.required],
      estadoHidratacion: ['', Validators.required],
      perimetro: ['', Validators.required],
      presionMedia: [{value:0, disabled:true}, Validators.required],
      imc: [{value:0, disabled:true}, Validators.required],
      glucometria:['', Validators.required],

      swValoracionGeneral:[false],
      ValoracionGeneral: ['Normal'],

      swOrofaringeYcuello:[false],
      orofaringeYcuello : ['Normal'],

      swPiel:[false],
      Piel: ['Normal'],

      swCardioRespiratorio:[false],
      CardioRespiratorio: ['Normal'],

      swMamas:[false],
      Mamas: ['Normal'],

      swAbdomen:[false],
      Abdomen: ['Normal'],

      swGenitales:[false],
      Genitales: ['Normal'],

      swExtremidades:[false],
      Extremidades: ['Normal'],

      swNeurologico:[false],
      Neurologico:['Normal'],

      swsistemaCardiovascular:[false],
      sistemaCardiovascular: ['Normal'],

      swsistemaRespiratorio:[false],
      sistemaRespiratorio: ['Normal'],
    });
  }

  calcularImc(event:any){
    let talla = parseInt(event.target.value)
    let talla100 = talla/100
    let tallaCuadrado = talla100 * talla100
    let peso = this.examenFisico.get('peso')?.value
    let imc = peso / tallaCuadrado
    // this.examenFisico.get('imc')?.setValue(imc)
    const imcRedondeado = parseFloat(imc.toFixed(2)); // Redondear a dos decimales
    this.examenFisico.get('imc')?.setValue(imcRedondeado);
    // this.sendToSave()
  }

  calcularMedia(event:any){
    const tensionArterialDiastolica = parseInt(event.target.value)
    const sistolica = this.examenFisico.get('tensionArterialSistolica')?.value
    let tensionD2 = 2*sistolica
    let sumaTension = tensionD2 + tensionArterialDiastolica
    const pMedia = sumaTension/3
    // this.examenFisico.get('presionMedia')?.setValue(pMedia)
    const pMediaRedondeada = parseFloat(pMedia.toFixed(2)); // Redondear a dos decimales
    this.examenFisico.get('presionMedia')?.setValue(pMediaRedondeada);
    // this.sendToSave()
  }

  onSubmit(){
    this.examenFisicoOutput.emit(this.examenFisico.value);
  }
}
