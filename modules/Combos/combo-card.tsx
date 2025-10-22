import React from "react";

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
    <div className="combo-card border rounded-lg shadow-md p-4">
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-cover rounded-md"
      />
      <div className="mt-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600 text-sm mt-2">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-primary font-bold">
            {price.toLocaleString()} VND
          </span>
          <span className="text-sm text-gray-500">Stock: {stock}</span>
        </div>
      </div>
    </div>
  );
};

export default ComboCard;
