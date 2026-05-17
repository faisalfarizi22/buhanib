import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Building2, User, Mail, Briefcase, Phone, Users, ChevronDown, Check } from "lucide-react";
import { FormData } from "../_types";

interface LeadCaptureStepProps {
  formData: FormData;
  onChange: (data: Partial<FormData>) => void;
  onNext: (e: React.FormEvent) => void;
  onPrev: () => void;
}

const EMPLOYEE_OPTIONS = [
  { value: "< 5", label: "< 5 Karyawan" },
  { value: "5 - 19", label: "5 - 19 Karyawan" },
  { value: "20 - 99", label: "20 - 99 Karyawan" },
  { value: "100 - 499", label: "100 - 499 Karyawan" },
  { value: "500+", label: "500+ Karyawan" },
];

export function LeadCaptureStep({ formData, onChange, onNext, onPrev }: LeadCaptureStepProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const inputClass =
    "w-full bg-white border border-black/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#0A1A3A] transition-all font-medium text-black placeholder:text-black/20";
  const labelClass =
    "flex items-center gap-2 text-[10px] font-medium tracking-widest text-black/60 mb-2.5 uppercase";

  return (
    <motion.div
      key="lead"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="w-full max-w-4xl px-6 py-12 flex flex-col items-center"
    >
      <div className="mb-12 text-center">
        <h2 className="text-5xl font-light text-[#0A1A3A] mb-4">Profil Organisasi</h2>
        <p className="text-black/40 text-sm font-medium tracking-wide">
          Berikan informasi dasar untuk personalisasi laporan diagnostik tim Anda.
        </p>
      </div>

      <form
        onSubmit={onNext}
        className="bg-white p-8 md:p-12 rounded-[40px] border border-black/[0.03] shadow-[0_20px_60px_rgba(0,0,0,0.06)] w-full max-w-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-12">
          <div className="space-y-1">
            <label className={labelClass}>
              <User size={14} className="text-[#D4AF37]" /> Nama Lengkap *
            </label>
            <input
              required
              type="text"
              placeholder="Contoh: Budi Santoso"
              value={formData.name}
              onChange={(e) => onChange({ name: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>
              <Briefcase size={14} className="text-[#D4AF37]" /> Jabatan *
            </label>
            <input
              required
              type="text"
              placeholder="Contoh: CEO / HR Director"
              value={formData.role}
              onChange={(e) => onChange({ role: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="space-y-1">
            <label className={labelClass}>
              <Building2 size={14} className="text-[#D4AF37]" /> Nama Perusahaan *
            </label>
            <input
              required
              type="text"
              placeholder="Nama PT / Instansi"
              value={formData.company}
              onChange={(e) => onChange({ company: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>
              <Users size={14} className="text-[#D4AF37]" /> Jumlah Karyawan *
            </label>
            <div className="relative">
              <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`${inputClass} cursor-pointer flex items-center justify-between group hover:border-black/30`}
              >
                <span className={formData.employees ? "text-black" : "text-black/20"}>
                  {formData.employees ? EMPLOYEE_OPTIONS.find(o => o.value === formData.employees)?.label : "Pilih skala perusahaan..."}
                </span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""} text-black/20 group-hover:text-black/40`} />
              </div>

              <AnimatePresence>
                {isDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-[100]" onClick={() => setIsDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.98 }}
                      className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-black/[0.06] shadow-2xl z-[101] overflow-hidden"
                    >
                      <div className="p-2 max-h-[240px] overflow-y-auto">
                        {EMPLOYEE_OPTIONS.map((opt) => {
                          const isSelected = formData.employees === opt.value;
                          return (
                            <div
                              key={opt.value}
                              onClick={() => {
                                onChange({ employees: opt.value });
                                setIsDropdownOpen(false);
                              }}
                              className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
                                isSelected 
                                  ? "bg-[#0A1A3A] text-white" 
                                  : "hover:bg-black/[0.03] text-black/60 hover:text-black"
                              }`}
                            >
                              <span className="text-sm font-medium">{opt.label}</span>
                              {isSelected && <Check size={14} className="text-white" />}
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="space-y-1">
            <label className={labelClass}>
              <Mail size={14} className="text-[#D4AF37]" /> Email Profesional *
            </label>
            <input
              required
              type="email"
              placeholder="email@perusahaan.com"
              value={formData.email}
              onChange={(e) => onChange({ email: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>
              <Phone size={14} className="text-[#D4AF37]" /> WhatsApp Aktif *
            </label>
            <input
              required
              type="tel"
              placeholder="0812xxxx"
              value={formData.whatsapp}
              onChange={(e) => onChange({ whatsapp: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onPrev}
            className="px-8 h-14 border border-black/10 rounded-xl text-[11px] font-medium tracking-widest text-black/40 hover:bg-black/5 transition-all uppercase flex items-center gap-2"
          >
            <ArrowLeft size={14} /> Kembali
          </button>
          <button
            type="submit"
            className="flex-1 h-14 bg-[#0A1A3A] text-white rounded-xl text-[11px] font-medium tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3 uppercase shadow-lg shadow-black/10"
          >
            Lanjut ke Instruksi <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </motion.div>
  );
}

