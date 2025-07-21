import React from "react";

function Footer() {
  return (
    <footer className="mt-12 py-6 bg-white text-center text-sm text-gray-500">
      &copy; {new Date().getFullYear()} GiftShop. All rights reserved.
    </footer>
  );
}

export default Footer;
