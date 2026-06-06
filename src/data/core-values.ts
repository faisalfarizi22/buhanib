import React from "react";
import { Users, UserCheck, Target, TrendingUp, Compass } from "lucide-react";
import type { Locale } from "@/i18n/config";

export interface CoreValue {
  title: string;
  desc: string;
  icon: React.ReactElement;
  fullText: string;
}

export const CORE_VALUES: CoreValue[] = [
  {
    title: "Humanity",
    desc: "Menempatkan manusia sebagai inti dari setiap transformasi.",
    icon: React.createElement(Users, { size: 24, strokeWidth: 1.5 }),
    fullText:
      "Menempatkan manusia sebagai inti dari setiap transformasi, dengan menjunjung martabat, empati, pertumbuhan, dan hubungan yang bermakna. (Putting people at the heart of every transformation by valuing dignity, empathy, growth, and meaningful relationships.)",
  },
  {
    title: "Uncompromising Integrity",
    desc: "Menjaga kepercayaan melalui kejujuran dan perilaku etis.",
    icon: React.createElement(UserCheck, { size: 24, strokeWidth: 1.5 }),
    fullText:
      "Menjaga kepercayaan melalui kejujuran, konsistensi, tanggung jawab, dan perilaku etis dalam setiap keputusan dan hubungan. (Upholding trust through honesty, consistency, accountability, and ethical conduct in every decision and relationship.)",
  },
  {
    title: "Meaningful Impact",
    desc: "Menghadirkan transformasi yang memberikan dampak nyata.",
    icon: React.createElement(Target, { size: 24, strokeWidth: 1.5 }),
    fullText:
      "Menghadirkan transformasi yang memberikan dampak nyata, relevan, dan berkelanjutan bagi individu, organisasi, dan masa depan. (Creating transformation that delivers meaningful, relevant, and lasting impact for individuals, organizations, and the future.)",
  },
  {
    title: "Adaptive Growth",
    desc: "Terus belajar, berkembang, dan beradaptasi secara proaktif.",
    icon: React.createElement(TrendingUp, { size: 24, strokeWidth: 1.5 }),
    fullText:
      "Terus belajar, berkembang, dan beradaptasi secara proaktif untuk tetap relevan di tengah perubahan dunia yang cepat. (Continuously learning, evolving, and proactively adapting to stay relevant in a rapidly changing world.)",
  },
  {
    title: "Noble Excellence",
    desc: "Mengejar kualitas terbaik dengan standar tinggi.",
    icon: React.createElement(Compass, { size: 24, strokeWidth: 1.5 }),
    fullText:
      "Mengejar kualitas terbaik dengan standar yang tinggi, penguasaan yang mendalam, serta tujuan yang bermakna dan bernilai bagi sesama. (Pursuing excellence through high standards, deep mastery, and meaningful purpose that creates value for others.)",
  },
];

const CORE_VALUES_EN: CoreValue[] = [
  {
    title: "Humanity",
    desc: "Putting people at the heart of every transformation.",
    icon: React.createElement(Users, { size: 24, strokeWidth: 1.5 }),
    fullText: "Putting people at the heart of every transformation by valuing dignity, empathy, growth, and meaningful relationships.",
  },
  {
    title: "Uncompromising Integrity",
    desc: "Upholding trust through honesty and ethical conduct.",
    icon: React.createElement(UserCheck, { size: 24, strokeWidth: 1.5 }),
    fullText: "Upholding trust through honesty, consistency, accountability, and ethical conduct in every decision and relationship.",
  },
  {
    title: "Meaningful Impact",
    desc: "Creating transformation that delivers real impact.",
    icon: React.createElement(Target, { size: 24, strokeWidth: 1.5 }),
    fullText: "Creating transformation that delivers meaningful, relevant, and lasting impact for individuals, organizations, and the future.",
  },
  {
    title: "Adaptive Growth",
    desc: "Continuously learning, evolving, and adapting proactively.",
    icon: React.createElement(TrendingUp, { size: 24, strokeWidth: 1.5 }),
    fullText: "Continuously learning, evolving, and proactively adapting to stay relevant in a rapidly changing world.",
  },
  {
    title: "Noble Excellence",
    desc: "Pursuing the highest quality with high standards.",
    icon: React.createElement(Compass, { size: 24, strokeWidth: 1.5 }),
    fullText: "Pursuing excellence through high standards, deep mastery, and meaningful purpose that creates value for others.",
  },
];

export function getCoreValues(locale: Locale) {
  return locale === "en" ? CORE_VALUES_EN : CORE_VALUES;
}
