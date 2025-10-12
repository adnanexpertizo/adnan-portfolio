import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function AskModal({ openModal, setOpenModal }: any) {
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent>
        {/* ✅ Accessibility: Add DialogHeader + Title */}
        <DialogHeader>
          <DialogTitle>Download CV</DialogTitle>
          <DialogDescription>
            You’re about to download Adnan Rafiq’s latest CV.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 text-center">
          <p className="text-sm text-gray-500">
            Would you like to proceed with downloading your CV?
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              const link = document.createElement("a")
              link.href = "/Adnan-Rafiq-CV.pdf"
              link.download = "Adnan-Rafiq-CV.pdf"
              link.click()
              setOpenModal(false)
            }}
          >
            Download CV
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
