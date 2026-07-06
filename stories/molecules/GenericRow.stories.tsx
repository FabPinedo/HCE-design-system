import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography } from "@mui/material"
import { GenericRow } from "../../src/molecules/GenericRow/GenericRow"
import type { GenericTableColumn } from "../../src/molecules/GenericCell/GenericCell"
import { PriorityBadge, type PriorityLevel } from "../../src/atoms/PriorityBadge/PriorityBadge"
import { BoxBadge } from "../../src/atoms/BoxBadge/BoxBadge"
import { Table, TableBody } from "@mui/material"
import type { ClinicalIconStatus } from "@hce/design-system"



interface MonitorRow {
  id: string
  priority: PriorityLevel
  box: {
    label?: string
    stage: "ESPERA" | "SALA_D" | "BOX_ASIGNADO"
    color: 'green' | 'yellow' | 'red' | null;
  }
  document_number: string
  document_number_masked: string | null
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
  attention_id: string | "none"
  waiting_time_box_minutes: string
  waiting_time_box_color: 'green' | 'yellow' | 'red' | null;
  waiting_time_physician_minutes: string;
  waiting_time_physician_color:'green' | 'yellow' | 'red' | null;
  attentionDate: string
  attentionHour: string
  dischargeDate: string
  dischargeHour: string
  has_discharge: boolean
  row_alert_color?: string | null
  is_vip?: boolean
}

const canReadTriage = true
const canEditBox = true
const canReadHce = true
const canReadInfo = true

const columns: GenericTableColumn<MonitorRow>[] = [
   {
    key: "priority",
    header: "Prioridad",
    type: "priority",
    field: "priority",
    width: 70,
    align: "center",
    clickable: true,
    disabledGetter: () => !canReadTriage,
    onClick: (row) => {
      console.log("Abrir triaje en modo lectura:", row)
    },
  },
  {
    key: "box",
    header: "Box",
    type: "box",
    field: "box",
    width: 80,
    align: "center",
    clickable: true,
    disabledGetter: () => !canEditBox,
    onClick: (row, value) => {
      const box = value as MonitorRow["box"]

      if (box.stage === "ESPERA") {
        console.log(
          "Paciente aún no cuenta con atención. Comunicarse con Counter.",
          row,
        )
        return
      }

      if (box.stage === "SALA_D") {
        console.log("Abrir modal de asignación de box:", row)
        return
      }

      console.log("Abrir modal de cambio de box:", row)
    },
  },
  {
    key: "document",
    header: "N.Documento",
    type: "text",
    width: 100,
    valueGetter: (row) =>
      row.is_vip ? row.document_number_masked : row.document_number,
    boldGetter: (row) => row.has_discharge,
  },
  {
    key: "patient",
    header: "Paciente",
    type: "patient-name",
    width: 180,
    clickable: true,
    valueGetter: (row) =>
      row.is_vip ? row.patient_name_masked : row.patient_name,
    disabledGetter: (row) => !canReadHce || !row.physician_assigned,
    boldGetter: (row) => row.has_discharge,
    onClick: (row) => {
      console.log("Abrir HCE:", row)
    },
    cellSx: {
      padding: "0 12px",
    },
  },
  {
    key: "age",
    header: "Edad",
    type: "text",
    field: "age",
    width: 55,
    align: "center",
    boldGetter: (row) => row.has_discharge,
  },
  {
    key: "sex",
    header: "Sexo",
    type: "text",
    field: "sex",
    width: 55,
    align: "center",
    boldGetter: (row) => row.has_discharge,
  },
  {
    key: "doctor",
    header: "Médico",
    type: "text",
    field: "physician_name_display",
    width: 160,
    boldGetter: (row) => row.has_discharge,
  },
  {
    key: "lab",
    header: "Lab",
    type: "clinical-status",
    field: "lab",
    clinicalIcon: "lab",
    width: 50,
    align: "center",
  },
  {
    key: "img",
    header: "Img",
    type: "clinical-status",
    field: "img",
    clinicalIcon: "img",
    width: 50,
    align: "center",
  },
  {
    key: "indication",
    header: "Indc. Med.",
    type: "clinical-status",
    field: "indication",
    clinicalIcon: "indication",
    width: 50,
    align: "center",
  },
  {
    key: "interconsult",
    header: "Interc.",
    type: "clinical-status",
    field: "interconsult",
    clinicalIcon: "interconsult",
    width: 50,
    align: "center",
  },
  {
    key: "attentionCode",
    header: "Atención",
    type: "attention-code",
    field: "attention_id",
    width: 90,
  },
  // {
  //   key: "waitingBoxTime",
  //   header: "T. espera BOX",
  //   type: "waiting-time",
  //   field: "waiting_time_box_minutes",
  //   colorField: "waiting_time_box_color",
  //   width: 120,
  //   align: "center",
  // },
  {
    key: "info",
    header: "Info",
    type: "info-button",
    width: 50,
    align: "center",
    clickable: true,
    disabledGetter: (row) => !canReadInfo || row.box.stage === "ESPERA",
    onClick: (row) => {
      console.log("Abrir información adicional:", row)
    },
  },
]

const baseRow: MonitorRow = {
  id: "1",
  priority: 1,
    box: {
    label: "TP08",
    stage: "BOX_ASIGNADO",
    color: null,
  },
  document_number: "87654321",
  document_number_masked:null,
  
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
  attention_id: "E097382",
  waiting_time_box_minutes: "00:22:00",
  waiting_time_box_color: null,
  waiting_time_physician_minutes: "00:2:00",
  waiting_time_physician_color: "green",
  attentionDate: "01/01/2024",
  attentionHour: "15:03",
  dischargeDate: "-",
  dischargeHour: "-",
  has_discharge: false,
  row_alert_color: null ,
  is_vip: false,

  
}


const meta: Meta<typeof GenericRow<MonitorRow>> = {
  title: "Molecules/GenericRow",
  component: GenericRow,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Table>
        <TableBody>
          <Story />
        </TableBody>
      </Table>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof GenericRow<MonitorRow>>

export const DefaultAssignedDoctor: Story = {
  args: {
    row: baseRow,
    index: 0,
    columns,
    rowAlertGetter: (row) => row.row_alert_color === 'red',
  },
}

export const WaitingWithoutAttention: Story = {
  args: {
    row: {
      ...baseRow,
      id: "2",
      priority: 2,
      box: {
        stage: "ESPERA",
        color: null,
      },
      physician_assigned: false,
      physician_name_display: "Adulto",
      attention_id: "none",
      waiting_time_box_minutes: "-",
      waiting_time_box_color: null,
    },
    index: 0,
    columns,
    rowAlertGetter: (row) => row.row_alert_color === "red",
  },
}


export const SalaDWithoutBoxAssigned: Story = {
  args: {
    row: {
      ...baseRow,
      id: "3",
      priority: 2,
      box: {
        stage: "SALA_D",
        color: "yellow",
      },
      physician_assigned: false,
      physician_name_display: "Pediátrico",
      age: "10 d",
      attention_id: "E097382",
      waiting_time_box_minutes: "00:20:00",
      waiting_time_box_color: "yellow",
    },
    index: 1,
    columns,
    rowAlertGetter: (row) => row.row_alert_color === "red",
  },
}


export const AlertWaitingDoctorMoreThanFiveMinutes: Story = {
  args: {
    row: {
      ...baseRow,
      id: "4",
      box: {
        label: "TP08",
        stage: "BOX_ASIGNADO",
        color: null,
      },
      physician_assigned: false,
      physician_name_display: "Adulto",
      waiting_time_physician_minutes: "00:07:00",
      row_alert_color: "red",
    },
    index: 0,
    columns,
    rowAlertGetter: (row) => row.row_alert_color === "red",
  },
}


export const DischargedPatient: Story = {
  args: {
    row: {
      ...baseRow,
      id: "5",
      dischargeDate: "01/01/2024",
      dischargeHour: "18:30",
      has_discharge: true,
    },
    index: 1,
    columns,
    rowAlertGetter: (row) => row.row_alert_color === "red",
  },
}


export const VipPatient: Story = {
  args: {
    row: {
      ...baseRow,
      id: "6",
      document_number_masked: "87XXXXXX",
      patient_name_masked: "PaXXXXXXXXXXXX",
      is_vip: true,
    },
    index: 0,
    columns,
    rowAlertGetter: (row) => row.row_alert_color === "red",
  },
}

export const WithoutMacPermissionForPatient: Story = {
  args: {
    row: baseRow,
    index: 0,
    columns: columns.map((column) =>
      column.key === "patient"
        ? {
            ...column,
            disabledGetter: () => true,
            onClick: () => {
              console.log("No debería ejecutarse por MAC")
            },
          }
        : column,
    ),
    rowAlertGetter: (row) => row.row_alert_color === "red",
  },
}

export const WithoutMacPermissionForBox: Story = {
  args: {
    row: baseRow,
    index: 0,
    columns: columns.map((column) =>
      column.key === "box"
        ? {
            ...column,
            disabledGetter: () => true,
            onClick: () => {
              console.log("No debería abrir box por MAC")
            },
          }
        : column,
    ),
    rowAlertGetter: (row) => row.row_alert_color === "red",
  },
}

export const WithoutMacPermissionForInfo: Story = {
  args: {
    row: baseRow,
    index: 0,
    columns: columns.map((column) =>
      column.key === "info"
        ? {
            ...column,
            disabledGetter: () => true,
            onClick: () => {
              console.log("No debería abrir info por MAC")
            },
          }
        : column,
    ),
    rowAlertGetter: (row) => row.row_alert_color === "red",
  },
}