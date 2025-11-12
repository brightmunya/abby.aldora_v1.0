import { SnackbarProvider } from "notistack"

export default function IntegrationNotistack() {
  return <SnackbarProvider maxSnack={3}></SnackbarProvider>
}
