import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { IDiagnosticosInterface } from './interfaces/IDiagnosticosInterface';
import { DiagnosticosService } from './diagnosticos.service';

@Component({
  selector: 'app-diagnosticos',
  standalone: true,
  imports: [SelectModule, CommonModule, ReactiveFormsModule, DialogModule,
    SelectModule, InputTextModule, ButtonModule, TableModule, CardModule, TextareaModule],
  templateUrl: './diagnosticos.component.html',
  styleUrl: './diagnosticos.component.css'
})
export class DiagnosticosComponent implements OnInit {
  diagnosticos: IDiagnosticosInterface[] = [];
  diagnosticosAdd: IDiagnosticosInterface[] = [];
  cols!: any[];
  diagnosticosForm!: FormGroup;

  @Output() diagnosticosOutPut = new EventEmitter<any>();

  constructor(
    private diagnosticosService: DiagnosticosService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: "Codigo", header: "Codigo" },
      { field: "Descripcion", header: "Descripcion" },
    ];
    this.loadDiagnoses();
    this.initForm();
  }

  initForm(): FormGroup {
    return this.diagnosticosForm = this.fb.group({
      diagnostico: ['', Validators.required],
      ampliacion: ['', Validators.required],
      antecedentesGineco: ['']
    });
  }


  loadDiagnoses() {
    this.diagnosticosService.getDiagnosticos().subscribe({
      next: (data) => {
        const mapDiagnoses = data?.resultado[0].map((item: IDiagnosticosInterface) => {
          return {
            ...item,
            label: item.Codigo + ' - ' + item.Descripcion,
          }
        })
        this.diagnosticos = mapDiagnoses;
      },
      error: (error) => {
        console.error('Error al obtener los aspirantes', error);
      },
      complete: () => {
        console.log('La solicitud de aspirantes ha sido completada.');
      }
    });
  }

  addDiagnose() {
    const diagnosed = this.diagnosticosForm?.get('diagnostico')?.value;
    console.log(diagnosed)
    this.diagnosticosAdd.push(diagnosed);
  }

  onSubmit(){}

}
