import React from "react";
import { Users, UserCheck, Target, TrendingUp, Compass } from "lucide-react";

export interface CoreValue {
  num: string;
  title: string;
  desc: string;
  icon: React.ReactElement;
  fullText: string;
}

export const CORE_VALUES: CoreValue[] = [
  {
    num: "01",
    title: "Humanity",
    desc: "Menempatkan manusia sebagai inti dari setiap transformasi.",
    icon: React.createElement(Users, { size: 24, strokeWidth: 1.5 }),
    fullText:
      "Menempatkan manusia sebagai inti dari setiap transformasi, dengan menjunjung martabat, empati, pertumbuhan, dan hubungan yang bermakna. (Putting people at the heart of every transformation by valuing dignity, empathy, growth, and meaningful relationships.)",
  },
  {
    num: "02",
    title: "Uncompromising Integrity",
    desc: "Menjaga kepercayaan melalui kejujuran dan perilaku etis.",
    icon: React.createElement(UserCheck, { size: 24, strokeWidth: 1.5 }),
    fullText:
      "Menjaga kepercayaan melalui kejujuran, konsistensi, tanggung jawab, dan perilaku etis dalam setiap keputusan dan hubungan. (Upholding trust through honesty, consistency, accountability, and ethical conduct in every decision and relationship.)",
  },
  {
    num: "03",
    title: "Meaningful Impact",
    desc: "Menghadirkan transformasi yang memberikan dampak nyata.",
    icon: React.createElement(Target, { size: 24, strokeWidth: 1.5 }),
    fullText:
      "Menghadirkan transformasi yang memberikan dampak nyata, relevan, dan berkelanjutan bagi individu, organisasi, dan masa depan. (Creating transformation that delivers meaningful, relevant, and lasting impact for individuals, organizations, and the future.)",
  },
  {
    num: "04",
    title: "Adaptive Growth",
    desc: "Terus belajar, berkembang, dan beradaptasi secara proaktif.",
    icon: React.createElement(TrendingUp, { size: 24, strokeWidth: 1.5 }),
    fullText:
      "Terus belajar, berkembang, dan beradaptasi secara proaktif untuk tetap relevan di tengah perubahan dunia yang cepat. (Continuously learning, evolving, and proactively adapting to stay relevant in a rapidly changing world.)",
  },
  {
    num: "05",
    title: "Noble Excellence",
    desc: "Mengejar kualitas terbaik dengan standar tinggi.",
    icon: React.createElement(Compass, { size: 24, strokeWidth: 1.5 }),
    fullText:
      "Mengejar kualitas terbaik dengan standar yang tinggi, penguasaan yang mendalam, serta tujuan yang bermakna dan bernilai bagi sesama. (Pursuing excellence through high standards, deep mastery, and meaningful purpose that creates value for others.)",
  },
];
