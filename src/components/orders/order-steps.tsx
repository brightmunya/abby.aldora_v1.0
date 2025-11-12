import React from "react"
import { Card, CardContent } from "../ui/card"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"

export default function OrderSteps({ activeStep }: { activeStep: number }) {
  const steps = ["Received", "Production", "Dispatch"]

  return (
    <Card>
      <CardContent>
        <Stepper activeStep={activeStep - 1}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {}
            const labelProps: {
              optional?: React.ReactNode
            } = {}

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
      </CardContent>
    </Card>
  )
}
