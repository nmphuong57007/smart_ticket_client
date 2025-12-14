"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import type {
  ProductItem,
  SelectedCombo,
} from "@/api/interfaces/product-interface";

interface MovieDetailComboProps {
  combos: ProductItem[];
  onComboChange: (selected: SelectedCombo[]) => void;
}

export default function MovieDetailCombo({
  combos,
  onComboChange,
}: MovieDetailComboProps) {
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const handleChange = (id: number, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] ?? 0;
      const next = Math.max(0, current + delta);

      const updated = { ...prev, [id]: next };

      const selected: SelectedCombo[] = combos
        .filter((c) => updated[c.id] > 0)
        .map((c) => ({
          id: c.id,
          name: c.name,
          price: c.price,
          qty: updated[c.id],
        }));

      onComboChange(selected);
      return updated;
    });
  };

  return (
    <section className="mt-8 space-y-4">
      <h2 className="text-xl font-semibold">Chọn Combo - Đồ Ăn - Đồ Uống</h2>

      {/* 🔥 TẤT CẢ COMBO ĐỀU CUỘN DỌC */}
      <div className="max-h-100 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        <div className="grid gap-4 md:grid-cols-2">
          {combos.map((combo) => {
            const qty = quantities[combo.id] ?? 0;

            return (
             <Card key={combo.id} className="overflow-hidden p-3">
            <div className="flex gap-4">

              {/* === ẢNH BÊN TRÁI — KHUNG CỨNG === */}
              <div className="relative w-[90px] h-[120px] rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={combo.image}
                  alt={combo.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* === NỘI DUNG BÊN PHẢI === */}
              <CardContent className="flex flex-col justify-between p-0 flex-grow">
                <div>
                  <p className="text-base font-semibold md:text-lg">
                    {combo.name}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {combo.description}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="font-semibold text-primary">
                    {combo.price.toLocaleString("vi-VN")}đ
                  </span>

                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleChange(combo.id, -1)}
                    >
                      -
                    </Button>

                    <span className="w-8 text-center">{qty}</span>

                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleChange(combo.id, 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>

            );
          })}
        </div>
      </div>
    </section>
  );
}
