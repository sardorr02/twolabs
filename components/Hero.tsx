import Nav from './Nav';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="hero">
      <Nav />
      <div className="container">
        <h1 className="hero-headline reveal">
          TRAINING DATA FOR<br />
          <span className="hero-headline-green">AGRICULTURAL ROBOTICS</span>
        </h1>
        <p className="subline reveal reveal-delay-1">
          Building the foundational datasets that teach machines to work alongside us in the fields.
        </p>
        <div className="backed-by reveal reveal-delay-2">
          <span>Backed by</span>
          <Image 
            src="/yc-logo.png" 
            alt="Y Combinator" 
            width={150} 
            height={30}
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
    </section>
  );
}
