import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { imagenLogo } from './fileBase64';

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaLaboralService {

  constructor() { }

  generatePDF(objectSendData: any, patientData: any) {
    const doc = new jsPDF();
    const fileLogo = imagenLogo; // 📌 Imagen en base64

    // 📌 Definir header en cada página
    const header = () => {
      const pageWidth = doc.internal.pageSize.width;

      // 📌 Agregar logo en la esquina superior izquierda
      doc.addImage(fileLogo, 'PNG', 10, 10, 30, 30); // (imagen, formato, x, y, width, height)

      // 📌 Texto del nombre de la empresa (centrado)
      const companyName = "Viva 1A IPS S.A.";
      const companyNIT = "NIT: 900219120-2";

      doc.setFontSize(16);
      const textWidth = doc.getTextWidth(companyName);
      doc.text(companyName, (pageWidth / 2) - (textWidth / 2), 15);

      // 📌 NIT (centrado debajo del nombre)
      doc.setFontSize(12);
      const nitWidth = doc.getTextWidth(companyNIT);
      doc.text(companyNIT, (pageWidth / 2) - (nitWidth / 2), 25);

      // 📌 Línea separadora
      doc.line(10, 40, 200, 40);
    };

    // 📌 Aplicar header en cada página usando `didDrawPage`
    autoTable(doc, {
      didDrawPage: (data) => {
        header();
      }
    }
    );

    // 📌 Posicionar el título más abajo para que no se superponga con el header
    let y = 50; // Mover el título hacia abajo después del header

    // 📌 Título del PDF
    doc.setFontSize(18);
    doc.text('Historia Clínica Laboral', (doc.internal.pageSize.width / 2) - (doc.getTextWidth('Historia Clínica Laboral') / 2), y);

    doc.setFontSize(12);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 160, y);

    doc.line(10, y + 5, 200, y + 5); // Línea bajo el título

    // 📌 Ajustar `startY` de la tabla para que no se superponga con el título
    let startY = y + 15; // Dejamos un espacio adecuado después del título
    // 📌 Sección de Identificación

    const pageWidth = doc.internal.pageSize.width;
    const titleWidth = doc.getTextWidth('Identificación');
    doc.setFontSize(14);
    // doc.text('Identificación', 10, startY);
    doc.text('Identificación', (pageWidth / 2) - (titleWidth / 2), startY);
    doc.setFontSize(10);

    const patientInfo = [
      ['Nombre:', `${patientData.Nombres} ${patientData.Apellidos}`],
      ['Tipo Documento:', patientData.TipoDocumento],
      ['Número Documento:', patientData.NumeroDocumento],
      ['Fecha Nacimiento:', patientData.FechaNacimientoFormatted],
      ['Edad:', patientData.Edad],
      ['Sexo:', patientData.Sexo],
      ['Estado Civil:', patientData.EstadoCivil],
      ['Grupo Sanguíneo:', patientData.GrupoSanguineo],
      ['Dirección:', patientData.Direccion],
      ['Teléfono:', patientData.Telefono],
      ['Correo Electrónico:', patientData.CorreoElectronico],
      ['Nivel Educativo:', patientData.NivelEducativo],
      ['Empresa:', patientData.Empresa],
      ['Cargo Aspirado:', patientData.CargoAspirado],
    ];

    autoTable(doc, {
      startY: startY + 10,
      head: [['Item', 'Descripción']],
      body: patientInfo,
      theme: 'plain',  // Usamos el tema 'plain' para personalizar completamente la tabla.
      styles: {
        fontSize: 10,               // Tamaño de la fuente
        cellPadding: 4,             // Espaciado de las celdas
        lineWidth: 0.1,             // Grosor de las líneas
        lineColor: [169, 169, 169], // Color gris para las líneas (RGB)
      },
      headStyles: {
        fillColor: [200, 200, 200], // Gris claro para los encabezados
        textColor: [0, 0, 0],        // Color de texto en los encabezados (negro)
        fontSize: 10,                // Tamaño de la fuente de los encabezados
        fontStyle: 'bold',           // Estilo de fuente para los encabezados
      },
      bodyStyles: {
        fillColor: [245, 245, 245], // Gris muy claro para las celdas del cuerpo
        textColor: [0, 0, 0],
        fontSize: 10,               // Color de texto (negro)
      },
      didDrawPage: (data) => {
        header();
      }
    });



    // y = 30;

        y = (doc as any).lastAutoTable.finalY + 90; // 📌 Obtener la posición final de la tabla anterior

    // doc.addPage();
    //  y = 30;

    /*
    (method) HistoriaClinicaLaboralService.generateTable(doc: jsPDF, title: string, data: any[], headers: string[], keys: string[]): void
    */

    const generateTable = (doc: jsPDF, title: string, data: any[], headers: string[], keys: string[], isFirstPage: boolean) => {
      if (!data || data.length === 0) return;

      let y = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY + 10 : 30;
      doc.setFontSize(12);

      // 📌 Centrar título de la tabla
      const pageWidth = doc.internal.pageSize.width;
      const titleWidth = doc.getTextWidth(title);
      doc.text(title, (pageWidth / 2) - (titleWidth / 2), y);

      y += 5; // Espacio entre el título y la tabla
      // const tableData = data.map((item) => keys.map((key) => item[key] || '-'));
      // Convertir valores booleanos a "Si" o "No"
      const tableData = data.map((item) =>
        keys.map((key) => typeof item[key] === 'boolean' ? (item[key] ? 'Si' : 'No') : item[key] || '-')
      );

      autoTable(doc, {
        startY: y + 5,
        head: [headers],
        body: tableData,
        theme: 'plain',  // Usamos el tema 'plain' para personalizar completamente la tabla.
        styles: {
          fontSize: 10,               // Tamaño de la fuente
          cellPadding: 4,             // Espaciado de las celdas
          lineWidth: 0.1,             // Grosor de las líneas
          lineColor: [169, 169, 169], // Color gris para las líneas (RGB)
        },
        headStyles: {
          fillColor: [200, 200, 200], // Gris claro para los encabezados
          textColor: [0, 0, 0],        // Color de texto en los encabezados (negro)
          fontSize: 9,                // Tamaño de la fuente de los encabezados
          fontStyle: 'bold',           // Estilo de fuente para los encabezados
        },
        bodyStyles: {
          fillColor: [245, 245, 245], // Gris muy claro para las celdas del cuerpo
          textColor: [0, 0, 0],
          fontSize: 8,               // Color de texto (negro)
        },
      });
    }

// 📌 Reiniciar la posición Y en la nueva página
//  y = 50; // Posición inicial en la segunda página (ajustada para dejar espacio al header)

    // doc.text('Datos de la Historia Clínica Laboral', (doc.internal.pageSize.width / 2) - (doc.getTextWidth('Datos de la Historia Clínica Laboral') / 2), 90);
    // 📌 Generar tablas para los arrays
    generateTable(doc, 'Antecedentes', objectSendData.antecedentes, ['Código', 'Nombre', 'Ampliación', 'Codigo Gineco', 'Nombre Gineco'], ['codigo', 'nombre_antecedente', 'ampliacion', 'codigoGineco', 'nombre_antecedente_gineco'], true); 
    y = (doc as any).lastAutoTable.finalY + 10;

    generateTable(doc, 'Antecedentes Familiares', objectSendData.antecedentesFamiliares, ['Parentesco', 'Patología'], ['parentezco', 'patologia'], false);
    y = (doc as any).lastAutoTable.finalY + 10;

    generateTable(doc, 'Antecedentes Ocupacionales', objectSendData.antecedentesOcupacionales, ['Empresa', 'Biologico', 'Fisico', 'Biomecanico', 'Quimico', 'Condicion', 'Psicosocial', 'Cargo', 'Antiguedad', 'Epp'], ['Empresa', 'Biologico', 'Fisico', 'Biomecanico', 'Quimico', 'Condicion', 'Psicosocial', 'Cargo', 'Antiguedad', 'Epp'], false);
    y = (doc as any).lastAutoTable.finalY + 10;

    generateTable(doc, 'Enfermedades Laborales', objectSendData.enfermedadesLaborales, ['Empresa', 'Tipo', 'Diagnóstico', 'Fecha', 'PCl', 'Porcentaje', 'Ampliacion'], ['empresa', 'eloAoT', 'diagnostico', 'fechaOcurrencia', 'radPcl', 'porcentaje', 'ampliacion'], false);
    y = (doc as any).lastAutoTable.finalY + 10;

    generateTable(doc, 'Habitos', objectSendData.habitos,
      ['Cigarro', 'Frec Cigarro', 'Alcohol', 'Frec Alcohol', 'PsicoActivas', 'Frec Psico', 'Act Fisica', 'Frec Fisica'],
      ['swCigarro', 'frecuenciaCigarro', 'swAlcohol', 'frecuenciaAlcohol', 'swPsicoActivas', 'frecuenciaPsicoActivas', 'swActividadFisica', 'frecuenciaActividad'], false);
    y = (doc as any).lastAutoTable.finalY + 10;

    // 📌 Sección de Revisión por Sistemas
    // doc.setFontSize(12);
    // doc.text('Revisión de Sistemas', 10, y);

    // 📌 Centrar título de la tabla
    const pageWidthSistemas = doc.internal.pageSize.width;
    const titleWidthSistemas = doc.getTextWidth('Revisión de Sistemas');
    doc.text('Revisión de Sistemas', (pageWidthSistemas / 2) - (titleWidthSistemas / 2), y);

    y += 5;

    const revisionSistemaInfo = [
      ['Órgano Sentidos:', objectSendData.revisionSistemas[0]?.swOrganoSentidos ? 'Alterado' : 'Normal'],
      ['Amp Órg. Sentidos:', objectSendData.revisionSistemas[0]?.ampliacionOrganoSentidos || '-'],
      ['Cardiovascular:', objectSendData.revisionSistemas[0]?.swCardiovascular ? 'Alterado' : 'Normal'],
      ['Amp Cardiovascular:', objectSendData.revisionSistemas[0]?.ampliacionCardiovascular || '-'],
      ['Respiratorio:', objectSendData.revisionSistemas[0]?.swRespiratorio ? 'Alterado' : 'Normal'],
      ['Amp Respiratorio:', objectSendData.revisionSistemas[0]?.ampliacionRespiratorio || '-'],
      ['Gastrointestinal:', objectSendData.revisionSistemas[0]?.swGastroIntestinal ? 'Alterado' : 'Normal'],
      ['Amp Gastrointestinal:', objectSendData.revisionSistemas[0]?.ampliacionGastroIntestinal || '-'],
      ['Osteomuscular:', objectSendData.revisionSistemas[0]?.swOsteoMuscular ? 'Alterado' : 'Normal'],
      ['Amp Osteomuscular:', objectSendData.revisionSistemas[0]?.ampliacionOsteoMuscular || '-'],
      ['Otro:', objectSendData.revisionSistemas[0]?.swOtro ? 'Alterado' : 'Normal'],
      ['Amp Otro:', objectSendData.revisionSistemas[0]?.ampliacionOtro || '-'],
    ];

    autoTable(doc, {
      startY: y,
      head: [['Item', 'Descripción']],
      body: revisionSistemaInfo,
      theme: 'plain',  // Usamos el tema 'plain' para personalizar completamente la tabla.
      styles: {
        fontSize: 10,               // Tamaño de la fuente
        cellPadding: 4,             // Espaciado de las celdas
        lineWidth: 0.1,             // Grosor de las líneas
        lineColor: [169, 169, 169], // Color gris para las líneas (RGB)
      },
      headStyles: {
        fillColor: [200, 200, 200], // Gris claro para los encabezados
        textColor: [0, 0, 0],        // Color de texto en los encabezados (negro)
        fontSize: 10,                // Tamaño de la fuente de los encabezados
        fontStyle: 'bold',           // Estilo de fuente para los encabezados
      },
      bodyStyles: {
        fillColor: [245, 245, 245], // Gris muy claro para las celdas del cuerpo
        textColor: [0, 0, 0],
        fontSize: 10,               // Color de texto (negro)
      },

    });

    y = (doc as any).lastAutoTable.finalY + 10;

    // Tabla para "Antecedentes Inmunológicos"
    generateTable(doc, 'Antecedentes Inmunológicos', objectSendData.antecedentesInmuno,
      ['Vacuna Tétanos', 'Dosis Tétanos', 'Vacuna Hepatitis', 'Dosis Hepatitis', 'Vacuna COVID-19', 'Dosis COVID-19'],
      ['swVacunaTetanos', 'numDosisVacunaTetanos', 'swVacunaHepatitis', 'numDosisVacunaHepatitis',
        'swVacunaCovid19', 'numDosisVacunaCovid19'], false
    );

    y = (doc as any).lastAutoTable.finalY + 10;


    // 📌 Sección de Examen Fisico
    // doc.setFontSize(12);
    // doc.text('Examen Fisico', 10, y);
    const pageWidthExamenFisico = doc.internal.pageSize.width;
    const titleWidthExamenFisico = doc.getTextWidth('Examen Fisico');
    doc.text('Examen Fisico', (pageWidthExamenFisico / 2) - (titleWidthExamenFisico / 2), y);

    y += 5;
    const examenFisicoInfo = [
      ['Tension Diastolica:', objectSendData.examenFisico[0]?.tensionArterialDiastolica || '-'],
      ['Tension Sistolica:', objectSendData.examenFisico[0]?.tensionArterialSistolica || '-'],
      ['Frecuencia Cardiaca:', objectSendData.examenFisico[0]?.frecuenciaCardiaca || '-'],
      ['Frecuencia Respiratoria:', objectSendData.examenFisico[0]?.frecuenciaRespiratoria || '-'],
      ['Temperatura:', objectSendData.examenFisico[0]?.temperatura || '-'],
      ['Saturación O2:', objectSendData.examenFisico[0]?.saturacion02 || '-'],
      ['Peso:', objectSendData.examenFisico[0]?.peso || '-'],
      ['Talla:', objectSendData.examenFisico[0]?.talla || '-'],
      ['Color Piel:', objectSendData.examenFisico[0]?.colorPiel || '-'],
      ['Estado Hidratacion:', objectSendData.examenFisico[0]?.estadoHidratacion || '-'],
      ['Perimetro:', objectSendData.examenFisico[0]?.perimetro || '-'],
      ['Glucometria:', objectSendData.examenFisico[0]?.glucometria || '-'],
      ['Valoracion General:', objectSendData.revisionSistemas[0]?.swValoracionGeneral ? 'Alterado' : 'Normal'],
      ['Amp Valoracion General:', objectSendData.revisionSistemas[0]?.swValoracionGeneral || '-'],
      ['OrofaringeYcuello:', objectSendData.revisionSistemas[0]?.swOrofaringeYcuello ? 'Alterado' : 'Normal'],
      ['Amp OrofaringeYcuello:', objectSendData.revisionSistemas[0]?.orofaringeYcuello || '-'],
      ['Piel:', objectSendData.revisionSistemas[0]?.swPiel ? 'Alterado' : 'Normal'],
      ['Amp Piel:', objectSendData.revisionSistemas[0]?.Piel || '-'],
      ['CardioRespiratorio:', objectSendData.revisionSistemas[0]?.swCardioRespiratorio ? 'Alterado' : 'Normal'],
      ['Amp CardioRespiratorio:', objectSendData.revisionSistemas[0]?.CardioRespiratorio || '-'],
      ['Mamas:', objectSendData.revisionSistemas[0]?.swMamas ? 'Alterado' : 'Normal'],
      ['Amp Mamas:', objectSendData.revisionSistemas[0]?.Mamas || '-'],
      ['Abdomen:', objectSendData.revisionSistemas[0]?.swAbdomen ? 'Alterado' : 'Normal'],
      ['Amp Abdomen:', objectSendData.revisionSistemas[0]?.Abdomen || '-'],
      ['Genitales:', objectSendData.revisionSistemas[0]?.swGenitales ? 'Alterado' : 'Normal'],
      ['Amp Genitales:', objectSendData.revisionSistemas[0]?.Genitales || '-'],
      ['Extremidades:', objectSendData.revisionSistemas[0]?.swExtremidades ? 'Alterado' : 'Normal'],
      ['Amp Extremidades:', objectSendData.revisionSistemas[0]?.Extremidades || '-'],
      ['Neurologico:', objectSendData.revisionSistemas[0]?.swNeurologico ? 'Alterado' : 'Normal'],
      ['Amp Neurologico:', objectSendData.revisionSistemas[0]?.Neurologico || '-'],
      ['sistemaCardiovascular:', objectSendData.revisionSistemas[0]?.swsistemaCardiovascular ? 'Alterado' : 'Normal'],
      ['Amp sistemaCardiovascular:', objectSendData.revisionSistemas[0]?.sistemaCardiovascular || '-'],
      ['sistemaRespiratorio:', objectSendData.revisionSistemas[0]?.swsistemaRespiratorio ? 'Alterado' : 'Normal'],
      ['Amp sistemaRespiratorio:', objectSendData.revisionSistemas[0]?.sistemaRespiratorio || '-'],

    ];

    autoTable(doc, {
      startY: y,
      head: [['Item', 'Descripción']],
      body: examenFisicoInfo,
      theme: 'plain',  // Usamos el tema 'plain' para personalizar completamente la tabla.
      styles: {
        fontSize: 10,               // Tamaño de la fuente
        cellPadding: 4,             // Espaciado de las celdas
        lineWidth: 0.1,             // Grosor de las líneas
        lineColor: [169, 169, 169], // Color gris para las líneas (RGB)
      },
      headStyles: {
        fillColor: [200, 200, 200], // Gris claro para los encabezados
        textColor: [0, 0, 0],        // Color de texto en los encabezados (negro)
        fontSize: 10,                // Tamaño de la fuente de los encabezados
        fontStyle: 'bold',           // Estilo de fuente para los encabezados
      },
      bodyStyles: {
        fillColor: [245, 245, 245], // Gris muy claro para las celdas del cuerpo
        textColor: [0, 0, 0],
        fontSize: 10,               // Color de texto (negro)
      },
    });

    y = (doc as any).lastAutoTable.finalY + 10;

    // 📌 Sección de Examen Fisico
    // doc.setFontSize(12);
    // doc.text('Anexo Osteo Muscular', 10, y);

    const pageWidthAnexoOsteoMuscular = doc.internal.pageSize.width;
    const titleWidthAnexoOsteoMuscular = doc.getTextWidth('Anexo Osteo Muscular');
    doc.text('Anexo Osteo Muscular', (pageWidthAnexoOsteoMuscular / 2) - (titleWidthAnexoOsteoMuscular / 2), y);

    y += 5;

    const anexoOsteoMuscularInfo = [
      ['OsteoMuscular:', objectSendData.anexoOsteoMuscular[0]?.swOsteoMuscular ? 'Alterado' : 'Normal'],
      ['Amp OsteoMuscular:', objectSendData.anexoOsteoMuscular[0]?.OsteoMuscular || '-'],
      ['Marcha:', objectSendData.anexoOsteoMuscular[0]?.swMarcha ? 'Alterado' : 'Normal'],
      ['Amp Marcha:', objectSendData.anexoOsteoMuscular[0]?.Marcha || '-'],
      ['MMSS:', objectSendData.anexoOsteoMuscular[0]?.swMMSS ? 'Alterado' : 'Normal'],
      ['Amp MMSS:', objectSendData.anexoOsteoMuscular[0]?.MMSS || '-'],
      ['MMII:', objectSendData.anexoOsteoMuscular[0]?.swMMII ? 'Alterado' : 'Normal'],
      ['Amp MMII:', objectSendData.anexoOsteoMuscular[0]?.MMII || '-'],
      ['Columna:', objectSendData.anexoOsteoMuscular[0]?.swColumna ? 'Alterado' : 'Normal'],
      ['Amp Columna:', objectSendData.anexoOsteoMuscular[0]?.Columna || '-'],
      ['Fuerza:', objectSendData.anexoOsteoMuscular[0]?.swFuerza ? 'Alterado' : 'Normal'],
      ['Amp Fuerza:', objectSendData.anexoOsteoMuscular[0]?.Fuerza || '-'],
      ['Flexibilidad:', objectSendData.anexoOsteoMuscular[0]?.swFlexibilidad ? 'Alterado' : 'Normal'],
      ['Amp Flexibilidad:', objectSendData.anexoOsteoMuscular[0]?.Flexibilidad || '-'],
    ];

    autoTable(doc, {
      startY: y,
      head: [['Item', 'Descripción']],
      body: anexoOsteoMuscularInfo,
      theme: 'plain',  // Usamos el tema 'plain' para personalizar completamente la tabla.
      styles: {
        fontSize: 10,               // Tamaño de la fuente
        cellPadding: 4,             // Espaciado de las celdas
        lineWidth: 0.1,             // Grosor de las líneas
        lineColor: [169, 169, 169], // Color gris para las líneas (RGB)
      },
      headStyles: {
        fillColor: [200, 200, 200], // Gris claro para los encabezados
        textColor: [0, 0, 0],        // Color de texto en los encabezados (negro)
        fontSize: 10,                // Tamaño de la fuente de los encabezados
        fontStyle: 'bold',           // Estilo de fuente para los encabezados
      },
      bodyStyles: {
        fillColor: [245, 245, 245], // Gris muy claro para las celdas del cuerpo
        textColor: [0, 0, 0],
        fontSize: 10,               // Color de texto (negro)
      },
    });

    y = (doc as any).lastAutoTable.finalY + 10;

    // // 📌 Agregar Análisis y Recomendaciones
    // y = (doc as any).autoTable.previous ? (doc as any).autoTable.previous.finalY + 10 : 30;


    // doc.setFontSize(12);
    // doc.text('Análisis:', 10, y);
    // doc.setFontSize(10);
    // doc.text(objectSendData.txtAnalisis, 10, y + 5);

    // 📌 Agregar Análisis como una tabla
    y = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY + 10 : 30;
    doc.setFontSize(12);

    const pageWidthAnalisis = doc.internal.pageSize.width;
    const titleWidthAnalisis = doc.getTextWidth('Analisis');
    doc.text('Analisis', (pageWidthAnalisis / 2) - (titleWidthAnalisis / 2), y);

    y += 5;
    // Crear una tabla para Análisis
    const analisisInfo = [
      [objectSendData.txtAnalisis || '-'], // Si no hay análisis, mostrar '-'
    ];

    autoTable(doc, {
      startY: y,
      head: [['Descripción']], // Encabezado de la tabla
      body: analisisInfo,
      theme: 'plain', // Usamos el tema 'plain' para personalizar completamente la tabla.
      styles: {
        fontSize: 10, // Tamaño de la fuente
        cellPadding: 4, // Espaciado de las celdas
        lineWidth: 0.1, // Grosor de las líneas
        lineColor: [169, 169, 169], // Color gris para las líneas (RGB)
      },
      headStyles: {
        fillColor: [200, 200, 200], // Gris claro para los encabezados
        textColor: [0, 0, 0], // Color de texto en los encabezados (negro)
        fontSize: 10, // Tamaño de la fuente de los encabezados
        fontStyle: 'bold', // Estilo de fuente para los encabezados
      },
      bodyStyles: {
        fillColor: [245, 245, 245], // Gris muy claro para las celdas del cuerpo
        textColor: [0, 0, 0],
        fontSize: 10, // Color de texto (negro)
      },
    });


    // 📌 Agregar Análisis como una tabla
    y = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY + 10 : 30;
    doc.setFontSize(12);

    const pageWidthRecomendaciones = doc.internal.pageSize.width;
    const titleWidthRecomendaciones = doc.getTextWidth('Recomendaciones');
    doc.text('Recomendaciones', (pageWidthRecomendaciones / 2) - (titleWidthRecomendaciones / 2), y);

    y += 5;

    // Crear una tabla para Análisis
    const recomendacionesInfo = [
      [objectSendData.txtRecomendaciones || '-'], // Si no hay análisis, mostrar '-'
    ];

    autoTable(doc, {
      startY: y,
      head: [['Descripción']], // Encabezado de la tabla
      body: recomendacionesInfo,
      theme: 'plain', // Usamos el tema 'plain' para personalizar completamente la tabla.
      styles: {
        fontSize: 10, // Tamaño de la fuente
        cellPadding: 4, // Espaciado de las celdas
        lineWidth: 0.1, // Grosor de las líneas
        lineColor: [169, 169, 169], // Color gris para las líneas (RGB)
      },
      headStyles: {
        fillColor: [200, 200, 200], // Gris claro para los encabezados
        textColor: [0, 0, 0], // Color de texto en los encabezados (negro)
        fontSize: 10, // Tamaño de la fuente de los encabezados
        fontStyle: 'bold', // Estilo de fuente para los encabezados
      },
      bodyStyles: {
        fillColor: [245, 245, 245], // Gris muy claro para las celdas del cuerpo
        textColor: [0, 0, 0],
        fontSize: 10, // Color de texto (negro)
      },
    });

    y = (doc as any).lastAutoTable.finalY + 10; // Actualizar la posición Y después de la tabla

    
    // 📌 Agregar Análisis como una tabla
    y = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY + 10 : 30;
    doc.setFontSize(12);

    const pageWidthVigencias = doc.internal.pageSize.width;
    const titleWidthVigencias = doc.getTextWidth('Vigencias');
    doc.text('Vigencias', (pageWidthVigencias / 2) - (titleWidthVigencias / 2), y);

    y += 5;

    // Crear una tabla para Análisis
    const vigenciasInfo = [
      [objectSendData.txtVigencias || '-'], // Si no hay análisis, mostrar '-'
    ];

    autoTable(doc, {
      startY: y,
      head: [['Descripción']], // Encabezado de la tabla
      body: vigenciasInfo,
      theme: 'plain', // Usamos el tema 'plain' para personalizar completamente la tabla.
      styles: {
        fontSize: 10, // Tamaño de la fuente
        cellPadding: 4, // Espaciado de las celdas
        lineWidth: 0.1, // Grosor de las líneas
        lineColor: [169, 169, 169], // Color gris para las líneas (RGB)
      },
      headStyles: {
        fillColor: [200, 200, 200], // Gris claro para los encabezados
        textColor: [0, 0, 0], // Color de texto en los encabezados (negro)
        fontSize: 10, // Tamaño de la fuente de los encabezados
        fontStyle: 'bold', // Estilo de fuente para los encabezados
      },
      bodyStyles: {
        fillColor: [245, 245, 245], // Gris muy claro para las celdas del cuerpo
        textColor: [0, 0, 0],
        fontSize: 10, // Color de texto (negro)
      },
    });

  // 📌 Agregar Análisis como una tabla
  y = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY + 10 : 30;
  doc.setFontSize(12);

  const pageWidthInclusion = doc.internal.pageSize.width;
  const titleWidthInclusion = doc.getTextWidth('Inclusion');
  doc.text('Inclusion', (pageWidthInclusion / 2) - (titleWidthInclusion / 2), y);

  y += 5;

  // Crear una tabla para Análisis
  const inclusionInfo = [
    [objectSendData.txtInclusion || '-'], // Si no hay análisis, mostrar '-'
  ];

  autoTable(doc, {
    startY: y,
    head: [['Descripción']], // Encabezado de la tabla
    body: inclusionInfo,
    theme: 'plain', // Usamos el tema 'plain' para personalizar completamente la tabla.
    styles: {
      fontSize: 10, // Tamaño de la fuente
      cellPadding: 4, // Espaciado de las celdas
      lineWidth: 0.1, // Grosor de las líneas
      lineColor: [169, 169, 169], // Color gris para las líneas (RGB)
    },
    headStyles: {
      fillColor: [200, 200, 200], // Gris claro para los encabezados
      textColor: [0, 0, 0], // Color de texto en los encabezados (negro)
      fontSize: 10, // Tamaño de la fuente de los encabezados
      fontStyle: 'bold', // Estilo de fuente para los encabezados
    },
    bodyStyles: {
      fillColor: [245, 245, 245], // Gris muy claro para las celdas del cuerpo
      textColor: [0, 0, 0],
      fontSize: 10, // Color de texto (negro)
    },
  });

  // y = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY + 10 : 30;

  // 📌 Sección de Datos del Profesional
y = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY + 10 : 30; // Posición inicial después de la última tabla
doc.setFontSize(12);

// 📌 Título "Datos del Profesional"
const pageWidthDatosDelProfesional = doc.internal.pageSize.width;
const titleWidthDatosDelProfesional = doc.getTextWidth('Datos del Profesional');
doc.text('Datos del Profesional', (pageWidthDatosDelProfesional / 2) - (titleWidthDatosDelProfesional / 2), y);
y += 5; // Espacio entre el título y la tabla

// 📌 Crear la tabla de Datos del Profesional
const DatosProfesionalInfo = [
  ['NumDocumento:', objectSendData.txtNumDocumento || '-'],
  ['Nombre Profesional:', objectSendData.txtNombreProfesional || '-'],
  ['Registro Medico:', objectSendData.txtRegistroMedico || '-'],
  ['Fecha Nacimiento:', objectSendData.FechaNacimientoFormatted || '-'],
  ['Licencia:', objectSendData.txtLicencia || '-'],
];

autoTable(doc, {
  startY: y, // Usar la posición actual de `y` para colocar la tabla justo debajo del título
  head: [['Item', 'Descripción']], // Encabezado de la tabla
  body: DatosProfesionalInfo,
  theme: 'plain', // Usamos el tema 'plain' para personalizar completamente la tabla.
  styles: {
    fontSize: 10, // Tamaño de la fuente
    cellPadding: 4, // Espaciado de las celdas
    lineWidth: 0.1, // Grosor de las líneas
    lineColor: [169, 169, 169], // Color gris para las líneas (RGB)
  },
  headStyles: {
    fillColor: [200, 200, 200], // Gris claro para los encabezados
    textColor: [0, 0, 0], // Color de texto en los encabezados (negro)
    fontSize: 10, // Tamaño de la fuente de los encabezados
    fontStyle: 'bold', // Estilo de fuente para los encabezados
  },
  bodyStyles: {
    fillColor: [245, 245, 245], // Gris muy claro para las celdas del cuerpo
    textColor: [0, 0, 0],
    fontSize: 10, // Color de texto (negro)
  },
});

y = (doc as any).lastAutoTable.finalY + 10; // Actualizar la posición Y después de la tabla

    // 📌 Guardar el PDF
    doc.save(`Informe_${patientData.NumeroDocumento}.pdf`);
  }

}
