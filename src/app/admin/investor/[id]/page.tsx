"use client";

import { InvestorDetail } from "@/components/admin/investors/InvestorDetail";

export default function InvestorPage({ params }: { params: { id: string } }) {
  return <InvestorDetail investorId={params.id} />;
}
