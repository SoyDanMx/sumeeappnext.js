// src/app/membership/confirmation/page.js
"use client"; // Esto debe ser lo primero en el archivo

import { Suspense, useState, useEffect } from 'react'; // Añade useState aquí
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

function ConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ... resto del código del componente
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}