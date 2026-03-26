
// ==============================|| Loader ||============================== //

export default function Loader() {
  return (
    <>
      <style>{`
        .loader-overlay {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 2001;
          width: 100%;
          height: 4px;
          background: rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }

        .loader-bar {
          width: 30%;
          height: 100%;
          background: linear-gradient(90deg, #1976d2, #42a5f5);
          animation: loader-slide 1s ease-in-out infinite;
        }

        @keyframes loader-slide {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(150%);
          }
          100% {
            transform: translateX(300%);
          }
        }
      `}</style>
      <div className="loader-overlay">
        <div className="loader-bar" />
      </div>
    </>
  );
}
