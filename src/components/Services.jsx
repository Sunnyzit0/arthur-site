import { servicos } from '../data';

export default function Services() {
  return (
    <section id="servicos">
      <h2><span className="num">02.</span> serviços</h2>
      <div className="grid four">
        {servicos.map((s) => (
          <div className="service" key={s.titulo}>
            <h3>{s.titulo}</h3>
            <p>{s.texto}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
