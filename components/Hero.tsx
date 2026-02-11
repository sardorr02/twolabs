import Nav from './Nav';

export default function Hero() {
  return (
    <section className="hero">
      <Nav />
      <div className="container">
        <h1 className="hero-headline reveal">
          TRAINING DATA FOR<br />AGRICULTURAL ROBOTICS
        </h1>
        <p className="subline reveal reveal-delay-1">
          Building the foundational datasets that teach machines to work alongside us in the fields.
        </p>
      </div>
    </section>
  );
}
