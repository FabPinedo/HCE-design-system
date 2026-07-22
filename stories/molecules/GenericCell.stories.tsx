import type { Meta, StoryObj } from '@storybook/react'
import { GenericCell, UiCloseIcon, type ClinicalIconStatus, type PriorityLevel } from '@hce/design-system'
import { Box } from "@mui/material"
import { useState } from 'react'


interface ExampleRow {
  id: string
  priority: PriorityLevel
  box: {
    label?: string
    stage: "ESPERA" | "SALA_D" | "BOX_ASIGNADO"
    color: 'green' | 'yellow' | 'red' | null;
  }
  document_number: string
  document_number_masked: string | null,
  patient_name:  string
  patient_name_masked: string | null
  age: string
  sex: "M" | "F"
  physician_assigned: boolean
  physician_name_display:  string
  lab: ClinicalIconStatus
  img: ClinicalIconStatus
  indication: ClinicalIconStatus
  interconsult: ClinicalIconStatus
  attention_status: string | "none"
  status: string
  waiting_time_box_minutes: string
  waiting_time_box_color: 'green' | 'yellow' | 'red' | null;
  waiting_time_physician_minutes: string;
  waiting_time_physician_color:'green' | 'yellow' | 'red' | null;
  attentionDate: string
  attentionHour: string
  dischargeDate: string
  dischargeHour: string
  has_discharge: boolean
  row_alert_color?: boolean
  is_vip?: boolean
}

const baseRow: ExampleRow = {
  id: "1",
  priority: 1,
  box: {
    label: "TP08",
    stage: "BOX_ASIGNADO",
    color: null,
  },
  document_number: "87654321",
  document_number_masked:null,
  row_alert_color: false,
  patient_name:  "Patricia Jiménez",
  patient_name_masked:null,
  age: "45 a",
  sex: "F",
  physician_name_display: "Henry Vidal Sánchez",
  physician_assigned: true,
  lab: "ok",
  img: "urgent",
  indication: "urgent",
  interconsult: "alert",
  attention_status: "E097382",
  status: "Administrado",
  waiting_time_box_minutes: "00:22:00",
  waiting_time_box_color: null,
  waiting_time_physician_minutes: "00:2:00",
  waiting_time_physician_color: "green",
  attentionDate: "01/01/2024",
  attentionHour: "15:03",
  dischargeDate: "-",
  dischargeHour: "-",
  has_discharge: false,
  is_vip: false,


}

const meta: Meta<typeof GenericCell> = {
  title: 'Molecules/GenericCell',
  component: GenericCell,
  tags: ['autodocs'],
   decorators: [
    (Story) => (
      <Box sx={{ width: 220, p: 2 }}>
        <Story />
      </Box>
    ),
  ],
}


export default meta

type Story = StoryObj<typeof GenericCell<ExampleRow>>

export const Priority: Story = {
  args: {
    row: baseRow,
    
    column: {
      key: "priority",
      header: "Prioridad",
      type: "priority",
      field: "priority",
      clickable: true,
      align: "center",
      onClick: (row, value) => {
        console.log("Prioridad click:", { row, value })
      },
    },
  }
}

export const BoxWaiting: Story = {
  args: {
    row: {
      ...baseRow,
      box: {
        stage: "ESPERA",
        color: null,
      },
    },
    
    column: {
       
      key: "priority",
      header: "Prioridad",
      type: "priority",
      field: "priority",
      clickable: true,
      align: "center",
      disabledGetter: () => true,
      onClick: (row, value) => {
        console.log("No debería ejecutarse:", { row, value })
      },
    }
  },
}


export const BoxSalaDGreen: Story = {
  args: {
    row: {
      ...baseRow,
      box: {
        stage: "SALA_D",
        color: "green",
      },
    },
    column: {
      key: "box",
      header: "Box",
      type: "box",
      field: "box",
      clickable: true,
      align: "center",
      disabledGetter: () => false,
      onClick: (row, value) => {
        console.log("Abrir modal asignación BOX:", { row, value })
      },
    },
  },
}


export const BoxSalaDYellow: Story = {
  args: {
    row: {
      ...baseRow,
      box: {
        stage: "SALA_D",
        color: "yellow",
      },
    },
    column: {
      key: "box",
      header: "Box",
      type: "box",
      field: "box",
      clickable: true,
      align: "center",
      onClick: (row, value) => {
        console.log("Box amarillo:", { row, value })
      },
    },
  },
}


export const BoxSalaDRed: Story = {
  args: {
    row: {
      ...baseRow,
      box: {
        stage: "SALA_D",
        color: "red",
      },
    },
    column: {
      key: "box",
      header: "Box",
      type: "box",
      field: "box",
      clickable: true,
      align: "center",
      onClick: (row, value) => {
        console.log("Box rojo:", { row, value })
      },
    },
  },
}


export const BoxAssigned: Story = {
  args: {
    
    row: {
      ...baseRow,
      box: {
        label: "TP08",
        stage: "BOX_ASIGNADO",
        color: null,
      },
    },
    column: {
      key: "box",
      header: "Box",
      type: "box",
      field: "box",
      clickable: true,
      align: "center",
      onClick: (row, value) => {
        console.log("Abrir modal cambio BOX:", { row, value })
      },
    },
  },
}

export const PatientClickable: Story = {
  args: {
    row: baseRow,
    column: {
      key: "patient",
      header: "Paciente",
      type: "patient-name",
      field: "patient_name",
      clickable: true,
      disabledGetter: (row) => !row.physician_assigned,
      onClick: (row, value) => {
        console.log("Paciente click:", { row, value })
      },
    },
  },
}

export const PatientNotClickable: Story = {
  args: {
    row: {
      ...baseRow,
      physician_name_display: "Adulto",
      physician_assigned: false,
    },
    column: {
      key: "patient",
      header: "Paciente",
      type: "patient-name",
      field: "patient_name",
      clickable: true,
      disabledGetter: (row) => !row.physician_assigned,
      onClick: (row, value) => {
        console.log("No debería abrir HCE:", { row, value })
      },
    },
  },
}

export const PatientWithoutMacPermission: Story = {
  args: {
    row: baseRow,
    column: {
      key: "patient",
      header: "Paciente",
      type: "patient-name",
      field: "patient_name",
      clickable: true,
      disabledGetter: () => true,
      onClick: (row, value) => {
        console.log("No debería ejecutarse por MAC:", { row, value })
      },
    },
  },
}

export const PatientNameVIP: Story = {
  args: {
    row: {
      ...baseRow,
      patient_name: "JUANA KARINA ROJAS MENDOZA",
      patient_name_masked: "JUXXX XXXXXX XXXXXXX",
      is_vip: true,
    },
    column: {
      key: "patient_name",
      header: "Paciente",
      type: "patient-name",
      clickable: false,
      valueGetter: (row) =>
        row.is_vip ? row.patient_name_masked : row.patient_name,
    },
  },
}

export const DocumentNormal: Story = {
  args: {
    row: baseRow,
    column: {
      key: "document",
      header: "N.Documento",
      type: "text",
      field: "document_number",
    },
  },
}

export const DocumentVIP: Story = {
  args: {
    row: {
      ...baseRow,
      document_number: "87654321",
      document_number_masked: "87XXXXXX",
      is_vip: true,
    },
    column: {
      key: "document",
      header: "N.Documento",
      type: "text",
      valueGetter: (row) =>
        row.is_vip ? row.document_number_masked : row.document_number,
    },
  },
}

export const DoctorAssigned: Story = {
  args: {
    row: baseRow,
    column: {
      key: "doctor",
      header: "Médico",
      type: "text",
      field: "physician_name_display",
    },
  },
}

export const DoctorAdultWithoutAssignedDoctor: Story = {
  args: {
    row: {
      ...baseRow,
      physician_assigned: false,
      physician_name_display: "Adulto",
    },
    column: {
      key: "doctor",
      header: "Médico",
      type: "text",
      field: "physician_name_display",
    },
  },
}

export const DoctorPediatricWithoutAssignedDoctor: Story = {
  args: {
    row: {
      ...baseRow,
      age: "10 d",
      physician_assigned: false,
      physician_name_display: "Pediátrico",
    },
    column: {
      key: "doctor",
      header: "Médico",
      type: "text",
      field: "physician_name_display",
    },
  },
}

export const SwitchButtonWithLabel: Story = {
  render: (args) => {
    const [row, setRow] = useState<ExampleRow>({
      ...baseRow,
      is_vip: true,
    })

    return (
      <GenericCell
        {...args}
        row={row}
        column={{
          key: "vip",
          header: "Paciente VIP",
          type: "switch",
          field: "is_vip",
          width: 180,
          align: "center",
          showSwitchLabel: true,
          switchLabelGetter: (_row, checked) => (checked ? "Sí" : "No"),
          onClick: (_row, checked) => {
            setRow((prev) => ({
              ...prev,
              is_vip: Boolean(checked),
            }))

            console.info("Cambio VIP:", {
              checked: Boolean(checked),
            })
          },
        }}
      />
    )
  },
}

export const SwitchButtonWithoutLabel: Story = {
    render: (args) => {
      const [row, setRow] = useState<ExampleRow>({
        ...baseRow,
        is_vip: false,
      })

      return (
        <GenericCell
          {...args}
          row={row}
          column={{
            key: "vip",
            header: "Paciente VIP",
            type: "switch",
            field: "is_vip",
            width: 120,
            align: "center",
            showSwitchLabel: false,
            onClick: (_row, checked) => {
              setRow((prev) => ({
                ...prev,
                is_vip: Boolean(checked),
              }))

              console.info("Cambio VIP sin label:", {
                checked: Boolean(checked),
              })
            },
          }}
        />
      )
    },
  }

export const ClinicalLabRequested: Story = {
  args: {
    row: {
      ...baseRow,
      lab: "ok",
    },
    column: {
      key: "lab",
      header: "Lab",
      type: "clinical-status",
      field: "lab",
      clinicalIcon: "lab",
      align: "center",
    },
  },
}

export const IconStatus: Story = {
  args: {
    row: {
      ...baseRow,
      lab: "ok",
      has_discharge: true,
    },
    column: {
       key: "has_discharge",
    header: "Deshacer alta",
    type: "icon",
    field: "has_discharge",
    icon: UiCloseIcon,
    iconSize: 10,
    width: 60,
    align: "center",
    clickable: true,
    disabledGetter: (row) => !row.has_discharge,
    colorGetter: (row) => (row.has_discharge ?  "#BD0000":"#A0A0A0" ),
    onClick: (row) => {
      console.info("Deshacer alta:", row)
    },
  },
}
}

export const IconStatusDisabled: Story = {
  args: {
    row: {
      ...baseRow,
      lab: "ok",
      has_discharge: false,
    },
    column: {
       key: "has_discharge",
    header: "Deshacer alta",
    type: "icon",
    field: "has_discharge",
    icon: UiCloseIcon,
    iconSize: 20,
    width: 80,
    align: "center",
    clickable: true,
    disabledGetter: (row) => !row.has_discharge,
    // colorGetter: (row) => (row.has_discharge ?  "#BD0000":"#A0A0A0" ),
    // onClick: (row) => {
    //   console.info("Deshacer alta:", row)
    // },
  },
}
}


export const StatusCell: Story = {
  args: {
    row: {
      ...baseRow,

      
    },
    column: {
      key: "status",
      header: "Estado",
      type: "tag",
      field: "status",
      width: 120,
      align: "center",
      colorGetter: (row) => {
        if (row.status === "Administrado") return "#5BAF22"
        if (row.status === "Pendiente") return "#BD0000"

        return "#6B7280"
      },
    },
  },
}


 
export const ClinicalImgInProgress: Story = {
  args: {
    row: {
      ...baseRow,
      img: "urgent",
    },
    column: {
      key: "img",
      header: "Img",
      type: "clinical-status",
      field: "img",
      clinicalIcon: "img",
      align: "center",
    },
  },
}

export const ClinicalIndicationRequested: Story = {
  args: {
    row: {
      ...baseRow,
      indication: "urgent",
    },
    column: {
      key: "indication",
      header: "Indc. Med.",
      type: "clinical-status",
      field: "indication",
      clinicalIcon: "indication",
      align: "center",
    },
  },
}

export const ClinicalInterconsultDone: Story = {
  args: {
    row: {
      ...baseRow,
      interconsult: "ok",
    },
    column: {
      key: "interconsult",
      header: "Interc.",
      type: "clinical-status",
      field: "interconsult",
      clinicalIcon: "interconsult",
      align: "center",
    },
  },
}

export const ClinicalEmptyStatus: Story = {
  args: {
    row: {
      ...baseRow,
      lab: null as unknown as ClinicalIconStatus,
    },
    column: {
      key: "lab",
      header: "Lab",
      type: "clinical-status",
      field: "lab",
      clinicalIcon: "lab",
      align: "center",
    },
  },
}

export const AttentionCodeCell: Story = {
  args: {
    row: baseRow,
    column: {
      key: "attentionCode",
      header: "Atención",
      type: "attention-code",
      field: "attention_status",
    },
  },
}

export const AttentionCodeNone: Story = {
  args: {
    row: {
      ...baseRow,
      attention_status: "none",
    },
    column: {
      key: "attentionCode",
      header: "Atención",
      type: "attention-code",
      field: "attention_status",
    },
  },
}

export const InfoButtonEnabled: Story = {
  args: {
    row: baseRow,
    column: {
      key: "info",
      header: "Info",
      type: "info-button",
      clickable: true,
      onClick: (row) => {
        console.log("Info click:", row)
      },
    },
  },
}

export const InfoButtonDisabledByBoxWaiting: Story = {
  args: {
    row: {
      ...baseRow,
      box: {
        stage: "ESPERA",
        color: null,
      },
    },
    column: {
      key: "info",
      header: "Info",
      type: "info-button",
      clickable: true,
      disabledGetter: (row) => row.box.stage === "ESPERA",
      onClick: (row) => {
        console.log("No debería abrir info:", row)
      },
    },
  },
}

export const InfoButtonDisabledByMac: Story = {
  args: {
    row: baseRow,
    column: {
      key: "info",
      header: "Info",
      type: "info-button",
      clickable: true,
      disabledGetter: () => true,
      onClick: (row) => {
        console.log("No debería abrir por MAC:", row)
      },
    },
  },
}

export const WaitingBoxTimeNormal: Story = {
  args: {
    row: baseRow,
    column: {
      key: "waitingBoxTime",
      header: "T. espera - BOX",
      type: "waiting-time",
      colorField: "waiting_time_box_color",
      field: "waiting_time_box_minutes",
      align: "center",
    },
  },
}

export const WaitingBoxTimeRed: Story = {
  args: {
    row: {
      ...baseRow,
      waiting_time_box_minutes: "00:35:00",
      waiting_time_box_color: "red",
    },
    column: {
      key: "waitingBoxTime",
      header: "T. espera - BOX",
      type: "waiting-time",
      colorField: "waiting_time_box_color",
      field: "waiting_time_box_minutes",
      align: "center",
    },
  },
}

export const WaitingPhysicianTimeGreen: Story = {
  args: {
    row: baseRow,
    column: {
      key: "waitingPhysicianTime",
      header: "T. espera médico",
      type: "waiting-time",
      colorField: "waiting_time_physician_color",
      field: "waiting_time_physician_minutes",
      align: "center",
    },
  },
}

export const TextBoldByDischarge: Story = {
  args: {
    row: {
      ...baseRow,
      has_discharge: true,
      patient_name: "Paciente Con Alta",
    },
    column: {
      key: "patient",
      header: "Paciente",
      type: "patient-name",
      field: "patient_name",
      boldGetter: (row) => row.has_discharge,
    },
  },
}
