/**
 * Footer.jsx
 *
 * Description:
 * Renders the website footer, including a support message, Apple logo,
 * and a list of legal or informational footer links.
 *
 * Data:
 * - footerLinks (imported from constants): Array of { label, link } objects
 *   used to dynamically render the list of footer links.
 *
 * Example usage:
 * <Footer />
 */

import { footerLinks } from "../constants/index.js";

const Footer = () => {
  return (
    <footer>
      {/* Info section with customer support message and logo */}
      <div className="info">
        <p>
          More ways to shop: Find an Apple Store or other retailer near you. Or
          call 000800 040 1966.
        </p>
        <img src="/logo.svg" alt="Apple logo" />
      </div>

      <hr />

      {/* Footer bottom links and copyright */}
      <div className="links">
        <p>Copyright © 2024 Apple Inc. All rights reserved.</p>

        <ul>
          {footerLinks.map(({ label, link }) => (
            <li key={label}>
              <a href={link}>{label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
export default Footer;
