// src/app/profile/page.js
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [professional, setProfessional] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const userResponse = await fetch('/api/check-auth', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!userResponse.ok) {
          throw new Error('No autenticado / Not authenticated');
        }
        const userData = await userResponse.json();
        setUser(userData.user);

        const proResponse = await fetch('/api/professionals');
        const professionals = await proResponse.json();
        const userPro = professionals.find((pro) => pro.email === userData.user.email);
        setProfessional(userPro);
      } catch (err) {
        setError(err.message);
        if (err.message === 'No autenticado / Not authenticated') {
          router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (loading) {
    return (
      <section className="py-20 px-6 bg-gray-50 min-h-screen">
        <div className="container mx-auto text-center">
          <p className="text-lg">Cargando perfil... / Loading profile...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-6 bg-gray-50 min-h-screen">
        <div className="container mx-auto text-center">
          <p className="text-lg text-red-600">Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8">
          Mi Perfil / My Profile
        </h1>
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Información del Usuario / User Information</h2>
          <p><strong>Nombre / Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>

          {professional ? (
            <>
              <h2 className="text-2xl font-semibold mt-6 mb-4">
                Perfil de Profesional / Professional Profile
              </h2>
              <p><strong>Profesión / Profession:</strong> {professional.profession}</p>
              <p><strong>Teléfono / Phone:</strong> {professional.phone || 'No proporcionado / Not provided'}</p>
              <p><strong>Área de Trabajo / Work Area:</strong> {professional.area}</p>
              <button
                className="mt-4 bg-primary text-white px-4 py-2 rounded-button hover:bg-opacity-90 transition-colors"
                onClick={() => router.push('/join-as-pro')}
              >
                Editar Perfil / Edit Profile
              </button>
            </>
          ) : (
            <p className="mt-4">
              No eres un profesional registrado. ¿Quieres unirte?{' '}
              <Link href="/join-as-pro" className="text-primary hover:underline">
                Regístrate como profesional / Join as a Pro
              </Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}