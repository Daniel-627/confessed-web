// app/loading.tsx
export default function Loading() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@600&display=swap');

        .loading-root {
          min-height: 100vh;
          background: #080f1a;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 24px;
          font-family: 'Barlow', sans-serif;
        }

        .loading-cross {
          font-size: 28px;
          color: #C9A94A;
          animation: pulse 1.8s ease-in-out infinite;
        }

        .loading-bars {
          display: flex;
          gap: 5px;
          align-items: flex-end;
          height: 20px;
        }

        .loading-bar {
          width: 3px;
          background: #C9A94A;
          border-radius: 2px;
          animation: bar 1.2s ease-in-out infinite;
        }

        .loading-bar:nth-child(1) { animation-delay: 0s;    height: 8px; }
        .loading-bar:nth-child(2) { animation-delay: .15s;  height: 14px; }
        .loading-bar:nth-child(3) { animation-delay: .3s;   height: 20px; }
        .loading-bar:nth-child(4) { animation-delay: .15s;  height: 14px; }
        .loading-bar:nth-child(5) { animation-delay: 0s;    height: 8px; }

        .loading-text {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .2em;
          color: rgba(201,169,74,0.4);
          text-transform: uppercase;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.95); }
          50%       { opacity: 1;   transform: scale(1.05); }
        }

        @keyframes bar {
          0%, 100% { transform: scaleY(0.4); opacity: 0.3; }
          50%       { transform: scaleY(1);   opacity: 1; }
        }
      `}</style>

      <div className="loading-root">
        <span className="loading-cross">✝</span>
        <div className="loading-bars">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="loading-bar" />
          ))}
        </div>
        <span className="loading-text">Confessed</span>
      </div>
    </>
  )
}
