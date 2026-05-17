import ServiceLayout from "@/components/service-layout"
import { ECOSYSTEM_DATA } from "@/data/ecosystem"

export default function JourneyPage() {
  return <ServiceLayout data={ECOSYSTEM_DATA.journey} />
}
