// Simple footer component displaying current year and copyright
function Footer() {
  return (
    <footer className="site-footer">
      <p>&copy; {new Date().getFullYear()} Newzly. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
