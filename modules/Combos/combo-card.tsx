import * as React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface ComboCardProps {
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
}

const ComboCard: React.FC<ComboCardProps> = ({
  name,
  price,
  description,
  image,
  stock,
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow p-0">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://placehold.co/600x400";
          }}
        />
      </div>

      <CardHeader className="p-4">
        <h3 className="text-lg font-semibold truncate">{name}</h3>
        <p className="text-sm text-muted-foreground truncate">{description}</p>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <div className="flex justify-between items-center">
          <span className="text-primary font-bold">
            {price.toLocaleString()} VND
          </span>
          <span className="text-sm text-muted-foreground">Stock: {stock}</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0" />
    </Card>
  );
};

export default ComboCard;
