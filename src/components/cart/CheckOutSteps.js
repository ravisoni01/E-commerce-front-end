import { Step, StepLabel, Stepper, Typography } from '@material-ui/core'
import { AccountBalance, LibraryAddCheck, LocalShipping } from '@material-ui/icons'
import React from 'react'

import './CheckOutSteps.css'

const CheckOutSteps = ({ activeStep }) => {
    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShipping />
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheck />
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalance />
        }
    ]

    const stepStyles = {
        boxSizing: "border-box"
    }
    return (
        <>
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
                {
                    steps.map((item, index) => (
                        <Step
                            key={index}
                            active={activeStep === index ? true : false}
                            completed={activeStep >= index ? true : false}
                        >
                            <StepLabel
                                icon={item.icon}
                                style={{ color: activeStep >= index ? "tomato" : "rgba(0,0,0,0.649)" }}
                            >
                                {item.label}
                            </StepLabel>
                        </Step>
                    ))
                }
            </Stepper>
        </>
    )
}

export default CheckOutSteps
