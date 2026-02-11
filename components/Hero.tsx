import Nav from './Nav';

export default function Hero() {
  return (
    <section className="hero">
      <Nav />
      <div className="container">
        <div className="label reveal">
          TRAINING DATA FOR AGRICULTURAL ROBOTICS
        </div>
        <h1 className="tagline reveal reveal-delay-1">
          We capture what<br />robots need to learn.
        </h1>
        <p className="subline reveal reveal-delay-2">
          Building the foundational datasets that teach machines to work alongside us in the fields.
        </p>
        <div className="location reveal reveal-delay-3">
          <span className="location-dot" />
          San Francisco, CA
        </div>
      </div>
    </section>
  );
}
