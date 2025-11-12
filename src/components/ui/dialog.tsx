import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"

export default function FormDialog({
  children,
  title,
  description,
  show,
  handleClose
}: {
  children: React.ReactNode
  show: boolean
  title?: string
  description?: string
  handleClose: () => void
}) {
  return (
    <React.Fragment>
      <Dialog open={show} onClose={handleClose}>
        <div className="absolute top-2 right-2">
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>

        <DialogTitle borderRadius={8}>
          <div>{title}</div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="mb-4">{description}</DialogContentText>
          {children}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}
