"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Download, Calendar, Building } from "lucide-react"
import Image from "next/image"

interface Certificate {
  title: string
  issuingBody: string
  year: string
  status: string
  category: string
  image: string
}

interface CertificateModalProps {
  certificate: Certificate | null
  isOpen: boolean
  onClose: () => void
}

export function CertificateModal({ certificate, isOpen, onClose }: CertificateModalProps) {
  if (!certificate) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex-1">
            <DialogTitle className="text-xl font-semibold text-balance pr-8">{certificate.title}</DialogTitle>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary">{certificate.category}</Badge>
              <Badge variant={certificate.status === "Active" ? "default" : "secondary"}>{certificate.status}</Badge>
            </div>
          </div>
          <div
            onClick={onClose}
            className="absolute right-4 hover:opacity-90 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-4 w-4" />
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Certificate Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center text-muted-foreground">
              <Building className="h-4 w-4 mr-2 text-primary" />
              <span className="text-sm font-medium">Issuing Body:</span>
              <span className="ml-2">{certificate.issuingBody}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2 text-primary" />
              <span className="text-sm font-medium">Year Issued:</span>
              <span className="ml-2">{certificate.year}</span>
            </div>
          </div>

          {/* Certificate Image */}
          <div className="relative bg-white rounded-lg p-4 shadow-sm border">
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-md">
              <Image
                src={certificate.image || "/placeholder.svg"}
                alt={`${certificate.title} Certificate`}
                fill
                className="object-contain transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Download Certificate
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
