// components/ServiceCard.js
export default function ServiceCard({ service }) {
    return (
      <div className="service-card">
        <div className="badges">
          {service.verified && <span className="verified-badge">✔ Verificado</span>}
          {service.guarantee && <span className="guarantee-badge">Garantía</span>}
        </div>
        <h3>{service.name}</h3>
        <RatingStars rating={service.rating} />
        <p>{service.description}</p>
        <div className="pricing">
          <span>Desde ${service.startingPrice}</span>
          <StripeButton serviceId={service.id} />
        </div>
      </div>
    );
  }