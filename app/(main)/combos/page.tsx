import React, { Suspense } from "react";
import ComboContainer from "@/modules/Combos/combo-container";

export default function CombosPage() {
  return (
    <Suspense fallback={<div className="py-12 text-center">Đang tải...</div>}>
      <ComboContainer />
    </Suspense>
  );
}
