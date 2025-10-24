/**
 * NavBar.jsx
 *
 * Description:
 * Renders the top navigation bar of the website.
 * Includes logo, dynamic navigation links, and buttons for search and cart.
 *
 * Data:
 * - navLinks (imported from constants): Array of { label } used to build nav menu
 *
 * Accessibility:
 * - Buttons and icons use descriptive alt text
 *
 * Example usage:
 * <NavBar />
 */

import { navLinks } from "../constants";

const NavBar = () => {
  return (
    <header>
      <nav>
        {/* Apple logo (left side) */}
        <img src="/logo.svg" alt="Apple logo" />

        {/* Navigation links */}
        <ul>
          {navLinks.map(({ label }) => (
            <li key={label}>
              <a href={label}>{label}</a>
            </li>
          ))}
        </ul>

        {/* Search and cart buttons (right side) */}
        <div className="flex-center gap-3">
          <button>
            <img src="/search.svg" alt="Search" />
          </button>
          <button>
            <img src="/cart.svg" alt="Cart" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
