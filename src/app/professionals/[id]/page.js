// src/app/professionals/[id]/page.js
"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';

export default function ProfessionalProfile() {
  const [professional, setProfessional] = useState(null);
  const [hasMembership, setHasMembership] = useState(false);
  const [rating, setRating] = useState({ value: 0, comment: '' });
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Verificar si el usuario tiene un membership
        const token = Cookies.get('token');
        let membershipStatus = false;
        if (token) {
          const membershipResponse = await fetch('/api/check-membership', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const membershipData = await membershipResponse.json();
          membershipStatus = membershipData.hasMembership;
          setHasMembership(membershipData.hasMembership);
        }

        if (!membershipStatus) {
          setLoading(false);
          return;
        }

        // Obtener los datos del profesional
        const response = await fetch(`/api/professionals/${id}`);
        if (!response.ok) {
          throw new Error('Error al cargar el profesional');
        }
        const data = await response.json();
        setProfessional(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleRatingChange = (e) => {
    setRating({ ...rating, [e.target.name]: e.target.value });
  };

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    if (rating.value < 1 || rating.value > 5) {
      showNotification('La calificación debe estar entre 1 y 5 / Rating must be between 1 and 5', 'error');
      return;
    }

    try {
      const token = Cookies.get('token');
      if (!token) {
        showNotification('Debes iniciar sesión para calificar / You must log in to rate', 'error');
        router.push('/login');
        return;
      }

      const response = await fetch(`/api/professionals/${id}/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(rating),
      });

      if (response.ok) {
        showNotification('Calificación enviada con éxito / Rating submitted successfully');
        // Actualizar los datos del profesional para mostrar la nueva calificación
        const updatedResponse = await fetch(`/api/professionals/${id}`);
        const updatedData = await updatedResponse.json();
        setProfessional(updatedData);
        setRating({ value: 0, comment: '' });
      } else {
        const errorData = await response.json();
        showNotification(errorData.error || 'Error al enviar la calificación / Error submitting rating', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showNotification('Error al enviar la calificación / Error submitting rating', 'error');
    }
  };

  if (loading) {
    return (
      <section className="py-20 px-6 bg-gray-50 min-h-screen">
        <div className="container mx-auto text-center">
          <p className="text-lg">Cargando... / Loading...</p>
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

  if (!hasMembership) {
    return (
      <section className="py-20 px-6 bg-gray-50 min-h-screen">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-8">
            Perfil del Profesional / Professional Profile
          </h1>
          <p className="text-lg mb-4">
            Necesitas un membership para ver los detalles del profesional. / You need a membership to view the professional's details.
          </p>
          <Link href="/buy-membership">
            <button className="bg-primary text-white px-6 py-3 rounded-button hover:bg-opacity-90 transition-colors">
              Comprar Membership / Buy Membership
            </button>
          </Link>
        </div>
      </section>
    );
  }

  if (!professional) {
    return (
      <section className="py-20 px-6 bg-gray-50 min-h-screen">
        <div className="container mx-auto text-center">
          <p className="text-lg">Profesional no encontrado. / Professional not found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8">
          Perfil de {professional.name} / Profile of {professional.name}
        </h1>
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row items-center mb-6">
            {professional.photo ? (
              <Image
                src={professional.photo}
                alt={`Foto de ${professional.name}`}
                width={150}
                height={150}
                className="rounded-full object-cover mb-4 md:mb-0 md:mr-6"
              />
            ) : (
              <div className="w-36 h-36 bg-gray-200 rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6">
                <span className="text-gray-500">Sin foto</span>
              </div>
            )}
            <div>
              <h2 className="text-2xl font-semibold">{professional.name}</h2>
              <p className="text-gray-600">{professional.profession}</p>
              <div className="flex items-center mt-2">
                <span className="text-yellow-500">★</span>
                <span className="ml-1 text-gray-700">
                  {professional.averageRating || 'Sin calificaciones'}
                </span>
              </div>
            </div>
          </div>
          <p className="text-gray-600 mb-2"><strong>Email:</strong> {professional.email}</p>
          {professional.phone && <p className="text-gray-600 mb-2"><strong>Teléfono / Phone:</strong> {professional.phone}</p>}
          {professional.area && <p className="text-gray-600 mb-2"><strong>Área de Trabajo / Work Area:</strong> {professional.area}</p>}
          
          {/* Experiencia */}
          {professional.experience && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Experiencia / Experience</h3>
              <p className="text-gray-600">{professional.experience}</p>
            </div>
          )}

          {/* Áreas Trabajadas */}
          {professional.workedAreas && professional.workedAreas.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Áreas Donde Ha Trabajado / Areas Worked</h3>
              <ul className="list-disc list-inside text-gray-600">
                {professional.workedAreas.map((area, index) => (
                  <li key={index}>{area}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Galería de Trabajos */}
          {professional.workPhotos && professional.workPhotos.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Fotos de Trabajos / Work Photos</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {professional.workPhotos.map((photo, index) => (
                  <Image
                    key={index}
                    src={photo}
                    alt={`Trabajo ${index + 1} de ${professional.name}`}
                    width={300}
                    height={200}
                    className="rounded-lg object-cover"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Calificaciones */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Calificaciones / Ratings</h3>
            {professional.ratings.length === 0 ? (
              <p className="text-gray-600">Aún no hay calificaciones. / No ratings yet.</p>
            ) : (
              <div className="space-y-4">
                {professional.ratings.map((rating, index) => (
                  <div key={index} className="border-b pb-2">
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 text-gray-700">{rating.value}</span>
                      <span className="ml-2 text-gray-500">por / by {rating.user.name}</span>
                    </div>
                    {rating.comment && <p className="text-gray-600 mt-1">{rating.comment}</p>}
                    <p className="text-gray-500 text-sm">{new Date(rating.createdAt).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Formulario para calificar */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Califica a este Profesional / Rate this Professional</h3>
            <form onSubmit={handleRatingSubmit} className="space-y-4">
              <div>
                <label htmlFor="ratingValue" className="block text-sm font-medium text-gray-700 mb-1">
                  Calificación / Rating (1-5) *
                </label>
                <input
                  type="number"
                  id="ratingValue"
                  name="value"
                  min="1"
                  max="5"
                  value={rating.value}
                  onChange={handleRatingChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label htmlFor="ratingComment" className="block text-sm font-medium text-gray-700 mb-1">
                  Comentario / Comment (Opcional)
                </label>
                <textarea
                  id="ratingComment"
                  name="comment"
                  value={rating.comment}
                  onChange={handleRatingChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  rows="3"
                  placeholder="Escribe tu comentario aquí / Write your comment here"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white px-4 py-2 rounded-button hover:bg-opacity-90 transition-colors"
              >
                Enviar Calificación / Submit Rating
              </button>
            </form>
          </div>
        </div>

        {notification && (
          <div
            className="fixed top-4 right-4 max-w-sm w-full bg-white rounded-lg shadow-lg z-50"
            role="alert"
            aria-live="assertive"
          >
            <div
              className={`p-4 ${
                notification.type === 'error' ? 'bg-red-100' : 'bg-green-100'
              } rounded-lg flex justify-between items-center`}
            >
              <p
                className={`${
                  notification.type === 'error' ? 'text-red-800' : 'text-green-800'
                }`}
              >
                {notification.message}
              </p>
              <button
                onClick={() => setNotification(null)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Cerrar notificación"
              >
                <i className="ri-close-line"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}