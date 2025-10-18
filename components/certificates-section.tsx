"use client";

import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  Calendar,
  Building,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { CertificateModal } from "./certificate-modal";
import certificatesData from "@/data/certificates.json";

export function CertificatesSection() {
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [permission, setPermission] = useState(false); // ✅ control permission state

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const [swiperReady, setSwiperReady] = useState(false);

  const handleViewCertificate = (cert: any) => {
    setSelectedCertificate(cert);
    setIsModalOpen(true);
  };

  useEffect(() => {
    setSwiperReady(true);
  }, []);

  return (
    <section id="certificates" className="py-20 bg-background overflow-hidden relative">
      <div className="container lg:px-36 md:px-16 px-4 mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-serif text-[20px] md:text-[26px] font-bold text-foreground mb-4">
            {certificatesData.title}
          </h2>
          <p className="text-[12px] md:text-[14px] text-muted-foreground md:max-w-2xl px-8 mx-auto">
            {certificatesData.subtitle}
          </p>
        </div>

        {/* ✅ Swiper Section */}
        {swiperReady && (
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              1000: { slidesPerView: 2, spaceBetween: 24 },
              1224: { slidesPerView: 3, spaceBetween: 28 },
            }}
            className="pb-20"
          >
            {certificatesData.certificates.map((cert, index) => (
              <SwiperSlide key={index}>
                <Card className="min-w-[310px] my-1 group transition-all duration-500 relative overflow-hidden border-2 border-border/80 hover:border-primary/60 bg-muted/40 shadow-lg hover:shadow-xl">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="p-2 bg-primary/10 rounded-lg mr-3 border border-primary/20">
                          <Award className="h-5 w-5 text-primary" />
                        </div>
                        <Badge variant="secondary" className="text-[12px] md:text-[14px]">
                          {cert.category}
                        </Badge>
                      </div>
                      <Badge
                        variant={cert.status === "Active" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {cert.status}
                      </Badge>
                    </div>
                    <CardTitle className="md:text-[14px] text-[12px] font-semibold group-hover:text-primary">
                      {cert.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 mb-6 flex justify-between">
                      <div className="flex items-center text-muted-foreground">
                        <Building className="h-4 w-4 mr-2" />
                        <span className="text-[12px]">{cert.issuingBody}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-[12px]">Issued {cert.year}</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-[12px] gap-2 border-2 border-border/80 hover:border-primary/60 hover:bg-primary hover:text-primary-foreground"
                      onClick={() => handleViewCertificate(cert)}
                    >
                      <Eye className="h-4 w-4" /> View Certificate
                    </Button>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* ✅ Navigation Buttons */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            ref={prevRef}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-border hover:bg-primary hover:text-white transition-all shadow-md"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            ref={nextRef}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-border hover:bg-primary hover:text-white transition-all shadow-md"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ✅ Custom Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        permission={permission}
      />
    </section>
  );
}
