import { Component, OnInit } from '@angular/core';
import { HeaderInfoPacienteComponent } from "../../shared/header-info-paciente/header-info-paciente.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { AspirantesService } from '../aspirantes/aspirantes.service';
import { AntecedentesComponent } from '@shared/antecedentes/antecedentes.component';
import { AntecedentesFamiliaresComponent } from '@shared/antecedentesFamiliares/antecedentesFamiliares.component';
import { EnfermedadesLaboralesComponent } from '@shared/enfermedadesLaborales/enfermedadesLaborales.component';
import { AntecedentesOcupacionalesComponent } from '@shared/antecedentesOcupacionales/antecedentesOcupacionales.component';
import { HabitosComponent } from '@shared/habitos/habitos.component';
import { RevisionSistemasComponent } from '@shared/revision-sistemas/revision-sistemas.component';
import { AntecedentesInmunologicosComponent } from '@shared/antecedentes-inmunologicos/antecedentes-inmunologicos.component';
import { ExamenFisicoComponent } from '@shared/examen-fisico/examen-fisico.component';


@Component({
  selector: 'app-historia-clinica-laboral',
  standalone: true,
  imports: [HeaderInfoPacienteComponent, CommonModule, ReactiveFormsModule, DialogModule,
    SelectModule, InputTextModule, ButtonModule, TableModule, CardModule, AntecedentesComponent, AntecedentesFamiliaresComponent, EnfermedadesLaboralesComponent, AntecedentesOcupacionalesComponent, HabitosComponent, RevisionSistemasComponent, AntecedentesInmunologicosComponent,ExamenFisicoComponent],
  templateUrl: './historia-clinica-laboral.component.html',
  styleUrl: './historia-clinica-laboral.component.css'
})
export class HistoriaClinicaLaboralComponent implements OnInit {
  aspirantes: any[] = [];
  cols!: any[];
  selectedRow!: any;
  showForm = false;
  patientFound!: any;
  antecedentesArray: any[] = []
  antecedentesFamiliaresArray: any[] = []
  antecedentesOcupacionalesArray: any[] = []
  enfemedadesLaboralesArray: any[] = []
  habitosObject: any[] = []
  revisionSistemasObject: any[] = []
  antecedentesInmunoObject: any[] = []

  constructor(
    private aspiranteService: AspirantesService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: "Nombres", header: "Nombres" },
      { field: "Apellidos", header: "Apellidos" },
      { field: "TipoDocumento", header: "Tipo Documento" },
      { field: "NumeroDocumento", header: "Numero Documento" },
      { field: "FechaNacimientoFormatted", header: "Fecha Nacimiento" },
      { field: "Sexo", header: "Sexo" },
      { field: "EstadoCivil", header: "Estado Civil" },
      { field: "GrupoSanguineo", header: "Grupo Sanguineo" },
      { field: "Direccion", header: "Direccion" },
      { field: "Telefono", header: "Telefono" },
      { field: "CorreoElectronico", header: "Correo Electronico" },
      { field: "NivelEducativo", header: "Nivel Educativo" },
      { field: "CargoAspirado", header: "Cargo Aspirado" },
      { field: "Documentos", header: "Documentos" },
      { field: "Empresa", header: "Empresa Id" },
    ];
    this.loadAspirantes();
  }

  loadAspirantes() {
    this.aspiranteService.getAspirantes().subscribe({
      next: (data) => {
        this.aspirantes = data?.resultado[0];
      },
      error: (error) => {
        console.error('Error al obtener los aspirantes', error);
      },
      complete: () => {
        console.log('La solicitud de aspirantes ha sido completada.');
      }
    });
  }

  showDialog(state: boolean) {
    if (state === false) {
      this.selectedRow = null
    }
    this.showForm = state;
  }

  createHistoriaLaboral(aspirante: any) {
    this.selectedRow = aspirante;
    this.patientFound = aspirante;
    this.showDialog(true)
  }

  setform(type: string, value: any) {
    if (type === 'antecedentes') {
      this.antecedentesArray = value
    } else if (type === 'antecedentesFamiliares') {
      console.log(value)
      this.antecedentesFamiliaresArray = value
    } else if (type === 'antecedentesOcupacionales') {
      this.antecedentesOcupacionalesArray = value
    } else if (type === 'enfermedadesLaborales') {
      this.enfemedadesLaboralesArray = value
    } else if (type === 'habitos') {
      this.habitosObject = [value]
    } else if (type === 'revisionSistemas') {
      this.revisionSistemasObject = [value]
    } else if (type === 'antecedentesInmuno') {
      this.antecedentesInmunoObject = [value]
    }
  }
}
