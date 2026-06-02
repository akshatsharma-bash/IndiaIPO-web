import React from "react";
import ServicePageLayout from "./ServiceLayout";
import ServiceContent from "./ServiceContent";
import { servicesData } from "@/data/servicesData";

const IpoAdvisory = () => {
  const slug = "ipo-advisory-services";
  const service = servicesData.find(s => s.slug === slug);
  if (!service) return null;

  return (
    <ServicePageLayout slug={slug}>
      <ServiceContent service={service} />
    </ServicePageLayout>
  );
};

export default IpoAdvisory;
