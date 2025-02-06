import { Component, OnInit } from '@angular/core';
import { HeaderInfoPacienteComponent } from "../../shared/header-info-paciente/header-info-paciente.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { AnexoEnfasisOsteomuscularComponent } from '@shared/anexo-enfasis-osteomuscular/anexo-enfasis-osteomuscular.component';
import { AnexoPruebasVestibularesComponent } from '@shared/anexo-pruebas-vestibulares/anexo-pruebas-vestibulares.component';
import { AnexoDermatologicoComponent } from '@shared/anexo-dermatologico/anexo-dermatologico.component';
import { ConceptoOcupacionalComponent } from '@shared/concepto-ocupacional/concepto-ocupacional.component';
import { TextareaModule } from 'primeng/textarea';
import { DiagnosticosComponent } from '@shared/diagnosticos/diagnosticos.component';
import jsPDF from 'jspdf';
import { imagenLogo } from './fileBase64';
import { HistoriaClinicaLaboralService } from './historia-clinica-laboral.service';

@Component({
  selector: 'app-historia-clinica-laboral',
  standalone: true,
  imports: [HeaderInfoPacienteComponent, CommonModule, ReactiveFormsModule, DialogModule,
    SelectModule, InputTextModule, ButtonModule, TableModule, CardModule, AntecedentesComponent, AntecedentesFamiliaresComponent, EnfermedadesLaboralesComponent, AntecedentesOcupacionalesComponent, HabitosComponent, RevisionSistemasComponent, AntecedentesInmunologicosComponent, ExamenFisicoComponent, AnexoEnfasisOsteomuscularComponent, AnexoPruebasVestibularesComponent, AnexoDermatologicoComponent, ConceptoOcupacionalComponent, TextareaModule, DiagnosticosComponent],
  templateUrl: './historia-clinica-laboral.component.html',
  styleUrl: './historia-clinica-laboral.component.css'
})
export class HistoriaClinicaLaboralComponent implements OnInit {
  private logoBase64 = imagenLogo;
  aspirantes: any[] = [];
  cols!: any[];
  selectedRow!: any;
  showForm = false;
  patientFound!: any;
  hcForm!: FormGroup;
  antecedentesArray: any[] = []
  antecedentesFamiliaresArray: any[] = []
  antecedentesOcupacionalesArray: any[] = []
  enfemedadesLaboralesArray: any[] = []
  habitosObject: any[] = []
  revisionSistemasObject: any[] = []
  antecedentesInmunoObject: any[] = []
  examenFisicoObject: any[] = []
  anexoOsteoMuscularObject: any[] = []
  anexoVestibularObject: any[] = []
  ConceptosConceptualesObject: any[] = []

  constructor(
    private aspiranteService: AspirantesService,
    private fb: FormBuilder,
    private historiaClinicaService: HistoriaClinicaLaboralService
  ) {
  }

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
    this.initForm();
  }

  initForm(): FormGroup {
    return this.hcForm = this.fb.group({
      txtAnalisis: ['', Validators.required],
      txtRecomendaciones: ['', Validators.required],
      txtVigencias: ['', Validators.required],
      txtInclusion: ['', Validators.required],
      txtNombreProfesional: ['', Validators.required],
      txtNumDocumento: ['', Validators.required],
      txtRegistroMedico: ['', Validators.required],
      txtLicencia: ['', Validators.required],
      txtFirma: ['', Validators.required],
    });
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
      console.log(value)
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
    } else if (type === 'examenFisico') {
      this.examenFisicoObject = [value]
    } else if (type === 'anexoOsteoMuscular') {
      this.anexoOsteoMuscularObject = [value]
    } else if (type === 'anexoVestibulares') {
      this.anexoVestibularObject = [value]
    } else if (type === 'coneptoOcupacional') {
      this.ConceptosConceptualesObject = [value]
    }
  }

  onSubmit() {
    let objectSendData: any = {}
    objectSendData.txtAnalisis = this.hcForm.get('txtAnalisis')?.value
    objectSendData.txtRecomendaciones = this.hcForm.get('txtRecomendaciones')?.value
    objectSendData.txtVigencias = this.hcForm.get('txtVigencias')?.value
    objectSendData.txtInclusion = this.hcForm.get('txtInclusion')?.value
    objectSendData.txtNombreProfesional = this.hcForm.get('txtNombreProfesional')?.value
    objectSendData.txtNumDocumento = this.hcForm.get('txtNumDocumento')?.value
    objectSendData.txtRegistroMedico = this.hcForm.get('txtRegistroMedico')?.value
    objectSendData.txtLicencia = this.hcForm.get('txtLicencia')?.value
    objectSendData.txtFirma = this.hcForm.get('txtFirma')?.value
    objectSendData.antecedentes = this.antecedentesArray
    objectSendData.antecedentesFamiliares = this.antecedentesFamiliaresArray
    objectSendData.antecedentesOcupacionales = this.antecedentesOcupacionalesArray
    objectSendData.enfermedadesLaborales = this.enfemedadesLaboralesArray
    objectSendData.habitos = this.habitosObject
    objectSendData.revisionSistemas = this.revisionSistemasObject
    objectSendData.antecedentesInmuno = this.antecedentesInmunoObject
    objectSendData.examenFisico = this.examenFisicoObject
    objectSendData.anexoOsteoMuscular = this.anexoOsteoMuscularObject
    objectSendData.anexoVestibulares = this.anexoVestibularObject
    objectSendData.conceptoOcupacional = this.ConceptosConceptualesObject
    console.log(objectSendData);
    // Save logic here
  }

  exportToPDF() {
    let objectSendData: any = {}
    objectSendData.txtAnalisis = this.hcForm.get('txtAnalisis')?.value
    objectSendData.txtRecomendaciones = this.hcForm.get('txtRecomendaciones')?.value
    objectSendData.txtVigencias = this.hcForm.get('txtVigencias')?.value
    objectSendData.txtInclusion = this.hcForm.get('txtInclusion')?.value
    objectSendData.txtNombreProfesional = this.hcForm.get('txtNombreProfesional')?.value
    objectSendData.txtNumDocumento = this.hcForm.get('txtNumDocumento')?.value
    objectSendData.txtRegistroMedico = this.hcForm.get('txtRegistroMedico')?.value
    objectSendData.txtLicencia = this.hcForm.get('txtLicencia')?.value
    objectSendData.txtFirma = this.hcForm.get('txtFirma')?.value
    objectSendData.antecedentes = this.antecedentesArray
    objectSendData.antecedentesFamiliares = this.antecedentesFamiliaresArray
    objectSendData.antecedentesOcupacionales = this.antecedentesOcupacionalesArray
    objectSendData.enfermedadesLaborales = this.enfemedadesLaboralesArray
    objectSendData.habitos = this.habitosObject
    objectSendData.revisionSistemas = this.revisionSistemasObject
    objectSendData.antecedentesInmuno = this.antecedentesInmunoObject
    objectSendData.examenFisico = this.examenFisicoObject
    objectSendData.anexoOsteoMuscular = this.anexoOsteoMuscularObject
    objectSendData.anexoVestibulares = this.anexoVestibularObject
    objectSendData.conceptoOcupacional = this.ConceptosConceptualesObject

console.log(this.patientFound)
console.log(objectSendData)

const patientSend = {
  "AspiranteEmpleadoId": 4,
  "Nombres": "CARLOS MARIO",
  "Apellidos": "GELIZ VILARO",
  "TipoDocumento": "CC",
  "NumeroDocumento": "1144184001",
  "FechaNacimiento": "1998-02-05T00:00:00.000Z",
  "Sexo": "Masculino",
  "EstadoCivil": "Casado",
  "GrupoSanguineo": "O +",
  "Direccion": "CL 21 13D 31 BRR LOS LIBERTADORES  ",
  "Telefono": "3225939899",
  "CorreoElectronico": "joseparramabesoy@gmail.com",
  "NivelEducativo": "Profesional",
  "EmpresaId": 1,
  "CargoAspirado": "gerencia",
  "Documentos": "documento3",
  "FechaRegistro": "2025-02-02T15:14:57.437Z",
  "FechaNacimientoFormatted": "1998/02/05",
  "Empresa": "Tech Solutions S.A.S",
  "FechaRegistroFormated": "2025/02/02",
  "Edad": 27
}

const objectSend = {
  "txtAnalisis": "j",
  "txtRecomendaciones": "k",
  "txtVigencias": "l",
  "txtInclusion": "m",
  "txtNombreProfesional": "n",
  "txtNumDocumento": "ñ",
  "txtRegistroMedico": "o",
  "txtLicencia": "p",
  "txtFirma": "q",
  "antecedentes": [
      {
          "id": 1,
          "codigo": "ANT001",
          "nombre_antecedente": "PATOLÓGICOS",
          "estado": true,
          "ampliacion": "ffdffd",
          "id_antecedente_gineco": 0,
          "codigoGineco": null,
          "nombre_antecedente_gineco": null,
          "index": 1
      },
      {
          "id": 2,
          "codigo": "ANT002",
          "nombre_antecedente": "QUIRÚRGICOS",
          "estado": true,
          "ampliacion": "ffdfddf",
          "id_antecedente_gineco": 0,
          "codigoGineco": null,
          "nombre_antecedente_gineco": null,
          "index": 2
      },
      {
          "id": 7,
          "codigo": "ANT007",
          "nombre_antecedente": "GINECOOBSTÉTRICOS",
          "estado": true,
          "ampliacion": "fdfdfddffd",
          "id_antecedente_gineco": 1,
          "codigoGineco": "ANT001",
          "nombre_antecedente_gineco": "MENARQUIA",
          "index": 3
      }
  ],
  "antecedentesFamiliares": [
      {
          "parentezco": "fddffd",
          "patologia": "fdfdfd",
          "index": 1
      },
      {
          "parentezco": "dffdfd",
          "patologia": "fdffdfdfd",
          "index": 2
      }
  ],
  "antecedentesOcupacionales": [
      {
          "Empresa": "a",
          "Biologico": "a",
          "Fisico": "a",
          "Biomecanico": "a",
          "Quimico": "a",
          "Condicion": "a",
          "Psicosocial": "a",
          "Cargo": "a",
          "Antiguedad": "a",
          "Epp": "a",
          "index": 1
      },
      {
          "Empresa": "b",
          "Biologico": "b",
          "Fisico": "b",
          "Biomecanico": "b",
          "Quimico": "b",
          "Condicion": "b",
          "Psicosocial": "b",
          "Cargo": "b",
          "Antiguedad": "b",
          "Epp": "b",
          "index": 2
      }
  ],
  "enfermedadesLaborales": [
      {
          "empresa": "c",
          "eloAoT": "Accidente",
          "diagnostico": "A000 - COLERA DEBIDO A VIBRIO CHOLERAE O1, BIOTIPO CHOLERAE",
          "fechaOcurrencia": "2025-01-30",
          "radPcl": "Si",
          "porcentaje": "c",
          "ampliacion": "c",
          "index": 0
      },
      {
          "empresa": "d",
          "eloAoT": "Enfermedad",
          "diagnostico": "A050 - INTOXICACION ALIMENTARIA ESTAFILOCOCICA",
          "fechaOcurrencia": "2025-01-30",
          "radPcl": "Si",
          "porcentaje": "d",
          "ampliacion": "d",
          "index": 1
      }
  ],
  "habitos": [
      {
          "swCigarro": true,
          "frecuenciaCigarro": "e",
          "swAlcohol": false,
          "frecuenciaAlcohol": "",
          "swPsicoActivas": false,
          "frecuenciaPsicoActivas": "",
          "cualesPsicoActivas": "",
          "swActividadFisica": true,
          "frecuenciaActividad": "e",
          "cualesActividad": "e"
      }
  ],
  "revisionSistemas": [
      {
          "swOrganoSentidos": true,
          "ampliacionOrganoSentidos": "f",
          "swCardiovascular": false,
          "ampliacionCardiovascular": "Normal",
          "swRespiratorio": false,
          "ampliacionRespiratorio": "Normal",
          "swGastroIntestinal": false,
          "ampliacionGastroIntestinal": "Normal",
          "swOsteoMuscular": false,
          "ampliacionOsteoMuscular": "Normal",
          "swOtro": false,
          "ampliacionOtro": "Normal"
      }
  ],
  "antecedentesInmuno": [
      {
          "swVacunaTetanos": true,
          "numDosisVacunaTetanos": "g",
          "swVacunaHepatitis": false,
          "numDosisVacunaHepatitis": "",
          "swVacunaCovid19": false,
          "numDosisVacunaCovid19": ""
      }
  ],
  "examenFisico": [
      {
          "tensionArterialDiastolica": 120,
          "tensionArterialSistolica": 120,
          "frecuenciaCardiaca": 120,
          "frecuenciaRespiratoria": 120,
          "temperatura": 120,
          "saturacion02": 120,
          "peso": 120,
          "talla": 120,
          "colorPiel": "120",
          "estadoHidratacion": "120",
          "perimetro": 120,
          "glucometria": "1200",
          "swValoracionGeneral": true,
          "ValoracionGeneral": "h",
          "swOrofaringeYcuello": false,
          "orofaringeYcuello": "Normal",
          "swPiel": false,
          "Piel": "Normal",
          "swCardioRespiratorio": false,
          "CardioRespiratorio": "Normal",
          "swMamas": false,
          "Mamas": "Normal",
          "swAbdomen": false,
          "Abdomen": "Normal",
          "swGenitales": false,
          "Genitales": "Normal",
          "swExtremidades": false,
          "Extremidades": "Normal",
          "swNeurologico": false,
          "Neurologico": "Normal",
          "swsistemaCardiovascular": false,
          "sistemaCardiovascular": "Normal",
          "swsistemaRespiratorio": false,
          "sistemaRespiratorio": "Normal"
      }
  ],
  "anexoOsteoMuscular": [
      {
          "swOsteoMuscular": true,
          "OsteoMuscular": "i",
          "swMarcha": false,
          "Marcha": "Normal",
          "swMMSS": false,
          "MMSS": "Normal",
          "swMMII": false,
          "MMII": "Normal",
          "swColumna": false,
          "Columna": "Normal",
          "swFuerza": false,
          "Fuerza": "Normal",
          "swFlexibilidad": false,
          "Flexibilidad": "Normal"
      }
  ],
  "anexoVestibulares": [],
  "conceptoOcupacional": [
      {
          "radConceptoIngreso": "Apto para el Cargo",
          "radRetiro": "No Satisfactorio",
          "radPostIncapacidad": "Aplazado"
      }
  ]
}

    this.generatePDF(objectSend, patientSend);
  }

  generatePDF(objectSend:any, patientSend:any) {
    this.historiaClinicaService.generatePDF(objectSend, patientSend);
  }
}
