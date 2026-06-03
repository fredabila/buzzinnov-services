import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Buzz Innovations Services';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#020617', // slate-950
          backgroundImage: 'radial-gradient(circle at -10% -10%, rgba(37, 99, 235, 0.4) 0%, transparent 50%), radial-gradient(circle at 110% 110%, rgba(6, 182, 212, 0.4) 0%, transparent 50%)',
          padding: '80px',
        }}
      >
        {/* Glassmorphism Card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            height: '100%',
            width: '100%',
            padding: '60px',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '40px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Header / Logo */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="https://www.buzzinnovations.co.uk/brand/buzzchat-site-logo.png"
              alt="Logo"
              style={{ width: '80px', height: '80px', marginRight: '24px' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '42px', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em', lineHeight: 1 }}>
                BuzzInnovations
              </span>
              <span style={{ fontSize: '20px', fontWeight: 600, color: '#94a3b8', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '6px' }}>
                Services
              </span>
            </div>
          </div>
          
          {/* Main Copy */}
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 'auto' }}>
            <div
              style={{
                fontSize: '96px',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                color: '#f8fafc',
                lineHeight: 1.05,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span>Engineering</span>
              <span style={{ color: '#0ea5e9' }}>Digital Excellence</span>
            </div>
            
            <div style={{ fontSize: '32px', color: '#cbd5e1', fontWeight: 500, marginTop: '24px', maxWidth: '800px', lineHeight: 1.4 }}>
              Bespoke web platforms, intuitive UI/UX, and robust digital ecosystems.
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
