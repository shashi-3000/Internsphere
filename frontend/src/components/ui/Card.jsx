// src/components/ui/Card.jsx
import React from "react";

export default function Card({ icon: Icon, title, description }) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300 border border-white/20">
      {Icon && <Icon className="w-10 h-10 text-emerald-400 mb-4" />}
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  );
}
