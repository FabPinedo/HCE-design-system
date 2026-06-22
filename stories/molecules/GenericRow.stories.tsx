import type { Meta, StoryObj } from "@storybook/react"
import { Box, Table, TableBody, TableContainer, Typography } from "@mui/material"
import { GenericRow, type GenericColumn } from "../../src/molecules/GenericRow/GenericRow"
import { ClinicalStatusIcon } from "../../src/molecules/ClinicalStatusIcon/ClinicalStatusIcon"
import type { ClinicalIconStatus } from "../../src/molecules/ClinicalStatusIcon/ClinicalStatusIcon"
import { UiBloodTestIcon, UiConversationIcon, UiPrescriptionIcon, UiXRaysIcon } from "../../src/atoms/Icon/SvgIconsUiKit"


type DemoPatientRow = {
  id: string
  priority: string
  box: string
  patient: string
  age: string
  doctor: string
  lab: ClinicalIconStatus
  img: ClinicalIconStatus
  indication: ClinicalIconStatus
  interconsult: ClinicalIconStatus
  attentionDate: string
  attentionHour: string
  waitingTime: string
  selected?: boolean
}

const clinicalBlue = "#003B8E"
const rowBg = "#E8EEF6"
const rowAlternate = "#FFFFFF"
const textBlue = "#003B8E"

const textSx = {
  fontFamily: "Arial, sans-serif",
  fontSize: "14px",
  fontWeight: 500,
  color: textBlue,
  whiteSpace: "nowrap",
}

const priorityBadge = (value: string) => (
  <Box
    sx={{
      width: 32,
      height: 28,
      borderRadius: "6px",
      backgroundColor: "#A72222",
      color: "#FFFFFF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 700,
      fontSize: "15px",
    }}
  >
    {value}
  </Box>
)

const boxBadge = (value: string) => (
  <Box
    sx={{
      minWidth: 72,
      height: 32,
      borderRadius: "6px",
      border: `2px solid ${clinicalBlue}`,
      color: clinicalBlue,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "15px",
      fontWeight: 500,
      backgroundColor: "#FFFFFF",
    }}
  >
    {value}
  </Box>
)


const waitingTimeBadge = (value: string) => (
  <Box
    sx={{
      width: 150,
      height: 32,
      borderRadius: "7px",
      border: "1px solid #79A879",
      backgroundColor: "#EAF4EA",
      color: "#6D9B6D",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      fontWeight: 700,
      fontFamily: "monospace",
    }}
  >
    {value}
  </Box>
)

const columns: GenericColumn<DemoPatientRow>[] = [
  {
    key: "priority",
    width: 86,
    align: "center",
    render: (row) => priorityBadge(row.priority),
  },
  {
    key: "box",
    width: 88,
    align: "center",
    render: (row) => boxBadge(row.box),
  },
  {
    key: "patient",
    width: 245,
    align: "center",
    render: (row) => (
      <Typography sx={textSx}>
        {row.patient}
      </Typography>
    ),
  },
  {
    key: "age",
    width: 58,
    align: "center",
    render: (row) => (
      <Typography sx={textSx}>
        {row.age}
      </Typography>
    ),
  },
  {
    key: "doctor",
    width: 245,
    align: "center",
    render: (row) => (
      <Typography sx={textSx}>
        {row.doctor}
      </Typography>
    ),
  },
   {
    key: "lab",
    width: 78,
    align: "center",
    render: (row) => (
      <ClinicalStatusIcon
        status ={row.lab}
        icon={UiBloodTestIcon}
        tooltipLabel={`Laboratorio: ${row.lab}`}
      />
    ),
  },
  {
    key: "img",
    width: 78,
    align: "center",
     render: (row) => (
      <ClinicalStatusIcon
        status ={row.lab}
        icon={UiXRaysIcon}
        tooltipLabel={`Laboratorio: ${row.img}`}
      />
    ),
  },
  {
    key: "indication",
    width: 78,
    align: "center",
    render: (row) => (
      <ClinicalStatusIcon
        status ={row.lab}
        icon={UiPrescriptionIcon}
        tooltipLabel={`Laboratorio: ${row.indication}`}
      />
    ),
  },
  {
    key: "interconsult",
    width: 78,
    align: "center",
     render: (row) => (
      <ClinicalStatusIcon
        status ={row.lab}
        icon={UiConversationIcon}
        tooltipLabel={`Laboratorio: ${row.interconsult}`}
      />
    ),
  },
  {
    key: "attentionDate",
    width: 120,
    align: "center",
    render: (row) => (
      <Typography sx={textSx}>
        {row.attentionDate}
      </Typography>
    ),
  },
  {
    key: "attentionHour",
    width: 108,
    align: "center",
    render: (row) => (
      <Typography sx={textSx}>
        {row.attentionHour}
      </Typography>
    ),
  },
  {
    key: "waitingTime",
    width: 160,
    align: "center",
    render: (row) => waitingTimeBadge(row.waitingTime),
  },
]

const mockRow: DemoPatientRow = {
  id: "1",
  priority: "I",
  box: "TP08",
  patient: "Patricia J.",
  age: "45 a",
  doctor: "Henry Vidal Sanchez",
  lab: "ok",
  img: "alert",
  indication: "empty",
  interconsult: "empty",
  attentionDate: "01/01/2024",
  attentionHour: "15:03",
  waitingTime: "00:15:00",
}
const meta: Meta = {
  title:      "Molecules/GenericRow",
  tags:       ["autodocs"],
  parameters: { layout: "fullscreen" },
}
export default meta

export const Default: StoryObj = {
  render: () => (
    <TableContainer
      sx={{
        width: "fit-content",
        border: "1px solid #D7E0EC",
        borderTop: "none",
        overflow: "hidden",
      }}
    >
      <Table
        sx={{
          borderCollapse: "collapse",
          tableLayout: "fixed",
        }}
      >
        <TableBody>
          <GenericRow
            data={mockRow}
            columns={columns}
            colors={{
              defaultBg: rowBg,
              alternateBg: rowAlternate,
              hoverBg: "#DDE7F3",
              selectedBg: "#DDE7F3",
              selectedBorder: clinicalBlue,
              borderBottom: "1px solid #E2EAF4",
            }}
          />
        </TableBody>
      </Table>
    </TableContainer>
  ),
}