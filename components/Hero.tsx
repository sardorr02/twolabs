import Nav from './Nav';

export default function Hero() {
  return (
    <section className="hero">
      <Nav />
      <div className="container">
        <h1 className="tagline reveal">
          Training Data for<br />Agricultural Robotics
        </h1>
        <p className="subline reveal reveal-delay-1">
          We capture what robots need to learn.
        </p>
        <p className="subline-secondary reveal reveal-delay-2">
          Building the foundational datasets that teach machines to work alongside us in the fields.
        </p>
      </div>
    </section>
  );
}
