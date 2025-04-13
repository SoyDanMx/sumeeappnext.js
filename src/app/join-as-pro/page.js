// src/app/join-as-pro/page.js
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function JoinAsPro() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profession: '',
    message: '',
    area: '',
    experience: '',
    workedAreas: '',
  });
  const [photo, setPhoto] = useState(null);
  const [workPhotos, setWorkPhotos] = useState([]);
  const [notification, setNotification] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleWorkPhotosChange = (e) => {
    setWorkPhotos(Array.from(e.target.files));
  };

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!formData.name || !formData.email || !formData.profession || !formData.area) {
      showNotification('Por favor completa los campos obligatorios / Please fill in the required fields', 'error');
      return;
    }

    if (!validateEmail(formData.email)) {
      showNotification('Por favor ingresa un correo electrónico válido / Please enter a valid email address', 'error');
      return;
    }

    try {
      // Subir la fotografía del profesional
      let photoUrl = null;
      if (photo) {
        const photoFormData = new FormData();
        photoFormData.append('files', photo);
        const photoResponse = await fetch('/api/upload', {
          method: 'POST',
          body: photoFormData,
        });
        if (!photoResponse.ok) {
          throw new Error('Error uploading photo');
        }
        const photoData = await photoResponse.json();
        photoUrl = photoData.filePaths[0];
      }

      // Subir las fotos de trabajos
      let workPhotoUrls = [];
      if (workPhotos.length > 0) {
        const workPhotosFormData = new FormData();
        workPhotos.forEach((file) => workPhotosFormData.append('files', file));
        const workPhotosResponse = await fetch('/api/upload', {
          method: 'POST',
          body: workPhotosFormData,
        });
        if (!workPhotosResponse.ok) {
          throw new Error('Error uploading work photos');
        }
        const workPhotosData = await workPhotosResponse.json();
        workPhotoUrls = workPhotosData.filePaths;
      }

      // Preparar los datos para enviar a la API
      const submitData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        profession: formData.profession,
        area: formData.area,
        photo: photoUrl,
        workPhotos: workPhotoUrls,
        workedAreas: formData.workedAreas ? formData.workedAreas.split(',').map(area => area.trim()) : [],
        experience: formData.experience || null,
      };

      const response = await fetch('/api/professionals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        showNotification('Datos enviados con éxito / Data submitted successfully');
        setFormData({ name: '', email: '', phone: '', profession: '', message: '', area: '', experience: '', workedAreas: '' });
        setPhoto(null);
        setWorkPhotos([]);
        setTimeout(() => router.push('/'), 2000);
      } else {
        const errorData = await response.json();
        showNotification(errorData.error || 'Error al enviar los datos / Error submitting data', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showNotification(`Error al enviar los datos: ${error.message} / Error submitting data: ${error.message}`, 'error');
    }
  };

  return (
    <section className="py-20 px-6 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8">
          Únete como Pro / Join as Pro
        </h1>
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre / Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Tu nombre / Your name"
                required
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo Electrónico / Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="tu@correo.com"
                required
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono / Phone (Opcional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Tu número de teléfono / Your phone number"
                aria-required="false"
              />
            </div>
            <div>
              <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-1">
                Profesión / Profession *
              </label>
              <input
                type="text"
                id="profession"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Tu profesión / Your profession"
                required
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
                Área de Trabajo o Alcaldía / Work Area or Municipality *
              </label>
              <input
                type="text"
                id="area"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Ej. Cuauhtémoc, Ciudad de México / Ex. Cuauhtémoc, Mexico City"
                required
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">
                Fotografía / Photo (Opcional)
              </label>
              <input
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                aria-required="false"
              />
            </div>
            <div>
              <label htmlFor="workPhotos" className="block text-sm font-medium text-gray-700 mb-1">
                Fotos de Trabajos / Work Photos (Opcional)
              </label>
              <input
                type="file"
                id="workPhotos"
                name="workPhotos"
                accept="image/*"
                multiple
                onChange={handleWorkPhotosChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                aria-required="false"
              />
            </div>
            <div>
              <label htmlFor="workedAreas" className="block text-sm font-medium text-gray-700 mb-1">
                Áreas Donde Has Trabajado / Areas Where You Have Worked (Opcional, separar por comas)
              </label>
              <input
                type="text"
                id="workedAreas"
                name="workedAreas"
                value={formData.workedAreas}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Ej. Coyoacán, Iztapalapa, Tlalpan / Ex. Coyoacán, Iztapalapa, Tlalpan"
                aria-required="false"
              />
            </div>
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                Experiencia / Experience (Opcional)
              </label>
              <textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                rows="5"
                placeholder="Describe tu experiencia / Describe your experience"
                aria-required="false"
              ></textarea>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Mensaje / Message (Opcional)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                rows="5"
                placeholder="Escribe tu mensaje aquí / Write your message here"
                aria-required="false"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white px-8 py-3 rounded-button hover:bg-opacity-90 transition-colors"
              aria-label="Enviar formulario para unirse como Pro"
            >
              Enviar / Submit
            </button>
          </form>
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