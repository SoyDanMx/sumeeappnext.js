import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export default function TechnicianProfile({ params }) {
  const { id } = params;

  // Simulación de datos del técnico
  const technicians = {
    1: {
      id: 1,
      name: "Carlos Rodríguez",
      category: "Electricista",
      rating: 5,
      description:
        "Carlos tiene más de 10 años de experiencia como electricista, especializado en instalaciones domésticas e industriales. Ofrece servicios confiables y de alta calidad.",
      location: "Ciudad de México",
      reviews: [
        { user: "María G.", comment: "Excelente servicio, muy profesional.", rating: 5 },
        { user: "Juan P.", comment: "Rápido y eficiente, lo recomiendo.", rating: 4.5 },
      ],
    },
    2: {
      id: 2,
      name: "Ana María López",
      category: "Plomero",
      rating: 4,
      description:
        "Ana María es una plomera certificada con 8 años de experiencia. Soluciona problemas de tuberías y sistemas de agua con rapidez y eficacia.",
      location: "Ciudad de México",
      reviews: [
        { user: "Pedro R.", comment: "Gran trabajo, solucionó mi problema en minutos.", rating: 4 },
        { user: "Sofía M.", comment: "Muy profesional, pero llegó un poco tarde.", rating: 3.5 },
      ],
    },
    3: {
      id: 3,
      name: "Juan Pérez",
      category: "Redes WiFi",
      rating: 3,
      description:
        "Juan es un experto en configuración de redes WiFi y soluciones de conectividad. Puede optimizar tu red para un mejor rendimiento.",
      location: "Ciudad de México",
      reviews: [
        { user: "Luis T.", comment: "Buen servicio, pero podría mejorar la comunicación.", rating: 3 },
      ],
    },
  };

  const technician = technicians[id];

  if (!technician) {
    return (
      <main>
        <Header />
        <section className="py-20 px-6 bg-gray-50 min-h-screen">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-gray-800">Técnico no encontrado</h1>
            <p className="text-gray-600">
              Lo sentimos, no pudimos encontrar al técnico que estás buscando.
            </p>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Header />
      <section className="py-20 px-6 bg-gray-50 min-h-screen">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">{technician.name}</h1>
            <p className="text-xl text-primary mb-2">{technician.category}</p>
            <p className="text-gray-600 mb-4">Calificación: {technician.rating} estrellas</p>
            <p className="text-gray-600 mb-4">Ubicación: {technician.location}</p>
            <p className="text-gray-700 mb-8 leading-relaxed">{technician.description}</p>

            <button className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition-all duration-300 mb-8">
              Contactar / Contact
            </button>

            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Reseñas / Reviews</h2>
            {technician.reviews.length > 0 ? (
              <div className="space-y-6">
                {technician.reviews.map((review, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <p className="text-gray-800 font-semibold">{review.user}</p>
                    <p className="text-gray-600">Calificación: {review.rating} estrellas</p>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">Aún no hay reseñas para este técnico.</p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}