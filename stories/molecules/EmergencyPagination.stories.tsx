import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { EmergencyPagination, injectHceTokens } from "@hce/design-system"

interface summaryContent{

  label:string
  value:number

}

injectHceTokens()

function PaginationDemo({ summary, pages, viewChip = true }: { summary: summaryContent[]; pages: number, viewChip?:boolean }) {
  const [page, setPage] = useState(1)
  return (
    <EmergencyPagination
      summary={summary}
      currentPage={page}
      totalPages={pages}
      onPageChange={setPage}
      viewChip={viewChip}
    />
  )
}


const summaryExample1: summaryContent[]  = [
{  label: 'pacientes' ,
   value: 103
  
  },

  {  label: 'pacientes de alta' ,
   value: 12
  
  },

  {  label: 'pacientes totales' ,
   value: 115
  
  },

]

const summaryExample2: summaryContent[]  = [
{  label: 'pacientes' ,
   value: 13
  
  },

  {  label: 'pacientes de alta' ,
   value: 2
  
  },

  {  label: 'pacientes totales' ,
   value: 15
  
  },

]


const meta: Meta = {
  title:      "Molecules/EmergencyPagination",
  tags:       ["autodocs"],
  parameters: { layout: "fullscreen" },
}
export default meta

export const Default: StoryObj = {
  render: () => <PaginationDemo summary={summaryExample1} pages={13} />,
}

export const PocasPaginas: StoryObj = {
  render: () => <PaginationDemo summary={summaryExample2} pages={2} />,
}

export const SinCasillasGenericas: StoryObj = {
  render: () => <PaginationDemo summary={summaryExample2} pages={2} viewChip={false}/>,
}
