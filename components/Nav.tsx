const navLinks = [
  { href: '#mission', label: 'Mission' },
  { href: '#what', label: 'What We Do' },
  { href: '#vision', label: 'Vision' },
  { href: '#scaling', label: 'Scaling' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  return (
    <>
      <div className="hero-logo mono">TWOLABS</div>
      <nav className="hero-nav">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    </>
  );
}
