import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-header-info-paciente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './header-info-paciente.component.html',
  styleUrl: './header-info-paciente.component.css'
})
export class HeaderInfoPacienteComponent {
  formulario!: FormGroup;
  patients: any[] = [];
  @Input() patientFound!: any;
  patientDiagnosis!: any;
  tiposDeOrdenArray: any[] = [];

  constructor(
    // private utilService: UtilService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.setHeaderForm(this.patientFound)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['patientFound']) {
      console.log(this.patientFound)
      this.initForm();
      this.setHeaderForm(this.patientFound)
    }
  }

  initForm(): FormGroup {
    return this.formulario = this.fb.group({
      txtCodpac: [{ value: '', disabled: true }, Validators.required],
      txtNompac: [{ value: '', disabled: true }, Validators.required],
      txtFecnac: [{ value: '', disabled: true }, Validators.required],
      txtEdad: [{ value: '', disabled: true }, Validators.required],
      txtSexo: [{ value: '', disabled: true }, Validators.required],
      txtNro: [{ value: 9, disabled: true }, Validators.required],
      txtDirpac: [{ value: '', disabled: true }, Validators.required],
      txtTelpac: [{ value: '', disabled: true }, Validators.required],
      txtIngreso: [{ value: '', disabled: true }, Validators.required],
      txtEstadoCivil: [{ value: '', disabled: true }, Validators.required],
      txtEscolaridad: [{ value: '', disabled: true }, Validators.required],
      txtCargoAspirado: [{ value: '', disabled: true }, Validators.required],
      txtCorreoElectronico: [{ value: '', disabled: true }, Validators.required],
      txtGrupoS: [{ value: '', disabled: true }, Validators.required],
    })
  }

  setHeaderForm(patient: any) {
    let nombreCompleto = patient?.Nombres + " " + patient?.Apellidos;
    this.formulario.get("txtCodpac")?.setValue(patient?.NumeroDocumento);
    this.formulario.get("txtNompac")?.setValue(nombreCompleto);
    this.formulario.get("txtFecnac")?.setValue(patient?.FechaNacimientoFormatted);
    this.formulario.get("txtIngreso")?.setValue(patient?.FechaRegistroFormated);
    this.formulario.get("txtEdad")?.setValue(patient?.Edad);
    this.formulario.get("txtSexo")?.setValue(patient?.Sexo);
    this.formulario.get("txtDirpac")?.setValue(patient?.Direccion);
    this.formulario.get("txtTelpac")?.setValue(patient?.Telefono);
    this.formulario.get("txtEstadoCivil")?.setValue(patient?.EstadoCivil);
    this.formulario.get("txtEscolaridad")?.setValue(patient?.NivelEducativo);
    this.formulario.get("txtCargoAspirado")?.setValue(patient?.CargoAspirado);
    this.formulario.get("txtCorreoElectronico")?.setValue(patient?.CorreoElectronico);
    this.formulario.get("txtGrupoS")?.setValue(patient?.GrupoSanguineo);
  }
}
