const CONTACT_EMAIL = 'team@twolabs.ai';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">TWOLABS</div>
        <div className="footer-info">
          <span>San Francisco, CA</span>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </div>
      </div>
      <div className="footer-line">
        © {currentYear} TWOLABS — Training Data for Agricultural Robotics
      </div>
    </footer>
  );
}
