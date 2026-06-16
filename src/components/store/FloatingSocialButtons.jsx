import React from 'react';

const WHATSAPP_NUMBER = '213770662425';
const TELEGRAM_USERNAME = 'infopc_sba';
const INSTAGRAM_USERNAME = 'infopc.sba';

export default function FloatingSocialButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-center">
      {/* WhatsApp */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Bonjour%20INFO%20PC%20SBA%2C%20j%27ai%20une%20question%20sur%20vos%20produits.`}
        target="_blank"
        rel="noopener noreferrer"
        title="WhatsApp"
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        style={{ backgroundColor: '#25D366' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="white" className="w-7 h-7">
          <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.668 4.61 1.832 6.5L4 29l7.7-1.8A12.94 12.94 0 0016 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.97 0-3.82-.523-5.42-1.44l-.386-.23-4.572 1.068 1.09-4.462-.25-.4A9.96 9.96 0 016 15c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.49-7.52c-.3-.15-1.776-.876-2.051-.976-.275-.1-.475-.15-.675.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.266-.467-2.41-1.485-.892-.794-1.494-1.775-1.669-2.075-.175-.3-.019-.462.131-.61.135-.134.3-.35.45-.524.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.524-.075-.15-.675-1.625-.924-2.225-.243-.585-.49-.505-.675-.514-.175-.009-.375-.011-.575-.011s-.524.075-.8.375c-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.117 3.23 5.126 4.527.717.309 1.276.494 1.713.633.72.228 1.374.196 1.89.119.577-.086 1.776-.726 2.027-1.426.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z"/>
        </svg>
      </a>

      {/* Telegram */}
      <a
        href={`https://t.me/${TELEGRAM_USERNAME}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Telegram"
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        style={{ backgroundColor: '#229ED9' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="white" className="w-7 h-7">
          <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm6.917 9.617l-2.37 11.17c-.175.79-.636 .985-1.287.61l-3.562-2.625-1.719 1.655c-.19.19-.35.35-.717.35l.254-3.612 6.581-5.945c.286-.254-.062-.396-.443-.142l-8.132 5.118-3.503-1.095c-.762-.238-.777-.762.159-1.127l13.685-5.277c.634-.23 1.189.142.854 1.12z"/>
        </svg>
      </a>

      {/* Instagram */}
      <a
        href={`https://instagram.com/${INSTAGRAM_USERNAME}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Instagram"
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      </a>
    </div>
  );
}