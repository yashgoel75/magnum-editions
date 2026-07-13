export default function Footer() {
  return (
    <footer className="magnum-footer">
      <div className="magnum-footer__top">
        <div className="magnum-footer__logo-section">
          <div className="magnum-footer__logo">MAGNUM</div>
          <a href="/" className="magnum-footer__link-underlined">
            Back to main site
          </a>
        </div>

        <div className="magnum-footer__links-section">
          <div className="magnum-footer__column">
            <h4>About</h4>
            <ul>
              <li><a href="#">Magnum Photos</a></li>
              <li><a href="#">Find Us</a></li>
            </ul>
          </div>
          <div className="magnum-footer__column">
            <h4>Help</h4>
            <ul>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Delivery &amp; Shipping</a></li>
              <li><a href="#">Cancellations, Returns &amp; Refunds</a></li>
              <li><a href="#">Customs Information</a></li>
            </ul>
          </div>
          <div className="magnum-footer__column">
            <h4>Policies</h4>
            <ul>
              <li><a href="#">T&amp;Cs</a></li>
            </ul>
          </div>
        </div>

        <div className="magnum-footer__signup-section">
          <h4>Sign up</h4>
          <p>Get the latest news and offers</p>
          <form className="magnum-footer__form">
            <input type="email" placeholder="Your E-mail" required />
            <button type="submit">SUBSCRIBE</button>
          </form>
        </div>
      </div>

      <hr className="magnum-footer__divider" />

      <div className="magnum-footer__middle">
        <div className="magnum-footer__currency">
          <label htmlFor="currency">Currency</label>
          <select id="currency" defaultValue="USD">
            <option value="USD">USD $</option>
            <option value="EUR">EUR €</option>
            <option value="GBP">GBP £</option>
          </select>
        </div>

        <div className="magnum-footer__socials">
          <p>Join Our Social Media</p>
          <div className="magnum-footer__social-icons">
            {/* X (Twitter) */}
            <a href="#" aria-label="X">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </a>
            {/* Facebook */}
            <a href="#" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            {/* Pinterest */}
            <a href="#" aria-label="Pinterest">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.195 0 7.45 2.99 7.45 6.985 0 4.175-2.63 7.535-6.286 7.535-1.228 0-2.383-.638-2.777-1.391l-.756 2.879c-.273 1.043-1.014 2.348-1.513 3.141 1.139.344 2.343.528 3.585.528 6.621 0 11.988-5.367 11.988-11.987C24.017 5.367 18.649 0 12.017 0z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            {/* TikTok */}
            <a href="#" aria-label="TikTok">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.22-1.15 4.33-2.95 5.75-1.92 1.51-4.5 2.12-6.85 1.55-2.52-.61-4.73-2.58-5.46-5.11-.79-2.75-.12-5.83 1.83-7.94 1.87-2.02 4.75-2.98 7.42-2.48v4.09c-1.1-.38-2.34-.33-3.38.16-1.13.54-1.99 1.6-2.18 2.83-.17 1.12.18 2.3.94 3.1 1.07 1.12 2.85 1.34 4.14.54 1.34-.84 2.1-2.4 2.13-3.99.04-4.88.01-9.77.02-14.65z"/>
              </svg>
            </a>
            {/* YouTube */}
            <a href="#" aria-label="YouTube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.083 0 12 0 12s0 3.917.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.872.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.917 24 12 24 12s0-3.917-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <hr className="magnum-footer__divider" />

      <div className="magnum-footer__bottom">
        <p>&copy; 2026 Magnum Photos.</p>
        
        <div className="poweredBy">
          <a
            href="https://play.fabulousmedia.in"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="FabulousMedia"
            className="creditLogo"
          >
            <img
              src="https://play.fabulousmedia.in/sitecredit/images/fabulousmedia.svg"
              alt="FabulousMedia"
            />
          </a>

          <div className="divider"></div>

          <a
            href="https://gocommercially.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GoCommercially"
            className="creditLogo"
          >
            <img
              src="https://play.fabulousmedia.in/sitecredit/images/gocommercially.svg"
              alt="GoCommercially"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
