import ServiceLayout from "@/components/service-layout"
import { ECOSYSTEM_DATA } from "@/data/ecosystem"

export default function LabPage() {
  return <ServiceLayout data={ECOSYSTEM_DATA.lab} />
}
