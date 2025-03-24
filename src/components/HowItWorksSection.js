export default function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      title: 'Describe tu proyecto / Describe your project',
      description: 'Cuéntanos qué necesitas y te conectamos con los mejores profesionales / Tell us what you need and we\'ll connect you with the best pros',
    },
    {
      number: 2,
      title: 'Recibe ofertas / Get quotes',
      description: 'Compara precios y perfiles de profesionales verificados / Compare prices and profiles from verified professionals',
    },
    {
      number: 3,
      title: 'Elige y contrata / Hire with confidence',
      description: 'Selecciona el mejor profesional para tu proyecto / Select the best professional for your project',
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">
          Cómo Funciona / How It Works
        </h2>
        <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 text-center">
              <div className="w-20 h-20 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">{step.number}</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}