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
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          backgroundImage: 'radial-gradient(circle at 25px 25px, #f1f5f9 2%, transparent 0%), radial-gradient(circle at 75px 75px, #f1f5f9 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 80px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            border: '1px solid rgba(226, 232, 240, 0.8)',
            borderRadius: '40px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
            <img
              src="https://www.buzzinnovations.co.uk/brand/buzzchat-site-logo.png"
              alt="Logo"
              style={{ width: '80px', height: '80px', marginRight: '24px' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '48px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1 }}>
                BuzzInnovations
              </span>
              <span style={{ fontSize: '24px', fontWeight: 600, color: '#64748b', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>
                Services
              </span>
            </div>
          </div>
          
          <div
            style={{
              fontSize: '84px',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              color: '#0f172a',
              textAlign: 'center',
              lineHeight: 1.1,
              marginBottom: '32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <span>Engineering the</span>
            <span style={{ color: '#2563eb' }}>Physical & Digital</span>
          </div>
          
          <div style={{ fontSize: '32px', color: '#64748b', fontWeight: 500, textAlign: 'center', maxWidth: '800px' }}>
            Bespoke web platforms, UI/UX design, and product innovation.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
