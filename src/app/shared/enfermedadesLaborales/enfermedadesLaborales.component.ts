import { CommonModule } from '@angular/common';
import { Component, OnInit, Output,EventEmitter, } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DiagnosticosService } from '@shared/diagnosticos/diagnosticos.service';
import { IDiagnosticosInterface } from '@shared/diagnosticos/interfaces/IDiagnosticosInterface';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
// import { IAntecedentesGinecoIntreface, IAntecedentesIntreface } from './interfaces/IAntecedentesIntreface';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-enfermedades-laborales',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DialogModule,
    SelectModule, InputTextModule, ButtonModule, TableModule, CardModule, TextareaModule],
  templateUrl: './enfermedadesLaborales.component.html',
  styleUrl: './enfermedadesLaborales.component.css'
})

export class EnfermedadesLaboralesComponent implements OnInit {
  // antecedentes: IAntecedentesIntreface[] = [];
  // antecedentesGineco: IAntecedentesGinecoIntreface[] = [];
  antecedentesAspirante: any[] = [];
  cols!: any[];
  selectedRow!: any;
  selectedEditRow!: any;
  editMode: boolean = false;
  isGineco: boolean = false;
  showForm = false;
  antecedentesForm!: FormGroup;
  eloAoTOptions: any[] = [
    {label: 'Accidente', value: 'Accidente'},
    {label: 'Enfermedad', value: 'Enfermedad'}
  ];
  diagnosticos: IDiagnosticosInterface[] = [];

  @Output() enfermedadesLaboralesOutPut = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private diagnosticosService: DiagnosticosService,
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: "empresa", header: "Empresa" },
      { field: "eloAoT", header: "El o At" },
      { field: "diagnostico", header: "Diagnostico" },
      { field: "fechaOcurrencia", header: "Fecha Ocurrencia" },
      { field: "radPcl", header: "Calificacion PCL" },
      { field: "porcentaje", header: "Porcentaje" },
      { field: "ampliacion", header: "Ampliacion" },
    ];
    this.initForm();
    this.loadDiagnoses();
  }

  initForm(): FormGroup {
    return this.antecedentesForm = this.fb.group({
      Empresa: ['', Validators.required],
      eloAoT: ['', Validators.required],
      diagnostico: ['', Validators.required],
      fechaOcurrencia: ['', Validators.required],
      radPcl:[null],
      porcentaje:['', Validators.required],
      ampliacion:['', Validators.required],
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

  onfilter(event:any){
    console.log(event)
    const value = event?.filter
    if(value.length === 2){
      this.diagnosticosService.getDiagnosticosByParam(value).subscribe({
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
      console.error('Error al obtener los diagnosticos', error);
        },
        complete: () => {
          console.log('La solicitud de diagnosticos ha sido completada.');
      }
      });
    }
  }

  showDialog(state: boolean) {
    if (state === false) {
      this.selectedRow = null;
      this.editMode = false;
      this.selectedEditRow = null;
      this.antecedentesForm.reset();
    }
    this.showForm = state;
  }

  addAntecedente() {
    this.showDialog(true)
  }

  editAntecedente(rowData: any) {
    console.log(rowData);
    this.selectedRow = rowData;
    this.selectedEditRow = rowData;

    // Buscar el diagnóstico correspondiente en la lista de diagnósticos
    const selectedDiagnostico = this.diagnosticos.find(diag => 
      diag.Codigo + ' - ' + diag.Descripcion === rowData.diagnostico
    );

    this.antecedentesForm.patchValue({
      Empresa: rowData.empresa,
      eloAoT: this.eloAoTOptions.find(opt => opt.value === rowData.eloAoT),
      diagnostico: selectedDiagnostico,
      fechaOcurrencia: rowData.fechaOcurrencia,
      radPcl: rowData.radPcl,
      porcentaje: rowData.porcentaje,
      ampliacion: rowData.ampliacion
    });
    
    this.showDialog(true);
    this.editMode = true;
  }

  deleteAntecedente(rowData: any) {
    const index = this.antecedentesAspirante.findIndex(item => 
      item?.index === rowData?.index
    );

    if (index !== -1) {
      this.antecedentesAspirante.splice(index, 1);
      this.enfermedadesLaboralesOutPut.emit(this.antecedentesAspirante);
    }
  }

  onSubmit() {
    const indexLength = this.antecedentesAspirante.length;
    let obj = {};

    obj = {
      empresa: '',
      eloAoT: '',
      diagnostico: '',
      fechaOcurrencia: '',
      radPcl: '',
      porcentaje: '',
      ampliacion: '',
      index: 0
    };

    // Obtener el diagnóstico seleccionado
    const selectedDiagnostico = this.antecedentesForm?.get('diagnostico')?.value;
    const diagnosticoString = selectedDiagnostico ? selectedDiagnostico.Codigo + ' - ' + selectedDiagnostico.Descripcion : '';

    if (this.editMode) {
      const index = this.antecedentesAspirante.findIndex(item =>
        item.index === this.selectedEditRow.index
      );

      if (index !== -1) {
        obj = {
          empresa: this.antecedentesForm?.get('Empresa')?.value,
          eloAoT: this.antecedentesForm?.get('eloAoT')?.value?.value,
          diagnostico: this.antecedentesForm?.get('diagnostico')?.value,
          fechaOcurrencia: this.antecedentesForm?.get('fechaOcurrencia')?.value,
          radPcl: this.antecedentesForm?.get('radPcl')?.value,
          porcentaje: this.antecedentesForm?.get('porcentaje')?.value,
          ampliacion: this.antecedentesForm?.get('ampliacion')?.value,
          index: this.selectedEditRow.index
        };

        this.antecedentesAspirante[index] = obj;
        this.enfermedadesLaboralesOutPut.emit(this.antecedentesAspirante);
        this.showDialog(false);
        this.antecedentesForm.reset();
      }
    } else {
      obj = {
        empresa: this.antecedentesForm?.get('Empresa')?.value,
        eloAoT: this.antecedentesForm?.get('eloAoT')?.value?.value,
        diagnostico: this.antecedentesForm?.get('diagnostico')?.value?.label,
        fechaOcurrencia: this.antecedentesForm?.get('fechaOcurrencia')?.value,
        radPcl: this.antecedentesForm?.get('radPcl')?.value,
        porcentaje: this.antecedentesForm?.get('porcentaje')?.value,
        ampliacion: this.antecedentesForm?.get('ampliacion')?.value,
        index: indexLength
      };
      
      this.antecedentesAspirante.push(obj);
      this.showDialog(false);
      this.antecedentesForm.reset();
      this.enfermedadesLaboralesOutPut.emit(this.antecedentesAspirante);
    }
  }
}
