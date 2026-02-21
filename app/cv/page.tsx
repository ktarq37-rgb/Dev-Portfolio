import type { Metadata } from "next";
import { CvPage } from "@/components/cv-page";

export const metadata: Metadata = {
  title: "Hassan - CV | Fullstack Web Developer",
  description:
    "Fullstack Web Developer specialized in building scalable web applications, SaaS platforms, and production-ready systems.",
};

export default function CV() {
  return <CvPage />;
}
