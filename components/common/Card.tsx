import React from 'react';
import { CardProps } from '../../interfaces';

const Card: React.FC<CardProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="border rounded-lg shadow-md p-4">
      <img src={imageUrl} alt={title} className="w-full h-40 object-cover rounded-t-lg" />
      <h3 className="text-lg font-bold mt-2">{title}</h3>
      <p className="text-gray-600 mt-1">{description}</p>
    </div>
  );
};

export default Card;
