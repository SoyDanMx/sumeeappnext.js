// src/components/professional/TechnicianBanner.js
import Image from 'next/image';

export default function TechnicianBanner({ professional }) {
  return (
    <div className="relative h-64 w-full mb-8">
      {/* Banner del técnico */}
      <Image
        src="/technician-banner.jpg"
        alt={`Banner de ${professional.name}`}
        fill
        className="object-cover rounded-t-lg"
        priority
      />
      
      {/* Overlay con información */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
        <h1 className="text-2xl font-bold text-white">
          {professional.name}
        </h1>
        <p className="text-white/90">
          {professional.profession} ★ {professional.averageRating?.toFixed(1) || '5'}/5
        </p>
      </div>
    </div>
  );
}