import ServiceLayout from "@/components/service-layout"
import { ECOSYSTEM_DATA } from "@/data/ecosystem"

export default function PlayPage() {
  return <ServiceLayout data={ECOSYSTEM_DATA.play} />
}
