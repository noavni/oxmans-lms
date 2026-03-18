export default function OxLogo({ size = 40 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 55.35 39.75"
      width={size}
      height={size * (39.75 / 55.35)}
      aria-hidden
    >
      <defs>
        <linearGradient id="lg1" x1="42.82" y1="-3.1" x2="35.43" y2="22.97" gradientTransform="translate(0 34.96) scale(1 -1)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ef5195" />
          <stop offset="1" stopColor="#2b2f73" />
        </linearGradient>
        <linearGradient id="lg2" x1="14.27" y1="-1.28" x2="30.35" y2="18.13" gradientTransform="translate(0 34.96) scale(1 -1)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#57c5ce" />
          <stop offset="1" stopColor="#07659c" />
        </linearGradient>
        <linearGradient id="lg3" x1="24.39" y1=".68" x2="43.62" y2="-.25" gradientTransform="translate(0 34.96) scale(1 -1)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fdb515" />
          <stop offset=".77" stopColor="#ee2a24" />
        </linearGradient>
        <linearGradient id="lg4" x1="40.03" y1="11.74" x2="37.64" y2="27.51" gradientTransform="translate(1.34 33.61) scale(1 -1)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <linearGradient id="lg5" x1="15.31" y1="-10.46" x2="17.2" y2="12.68" gradientTransform="translate(1.34 33.61) scale(1 -1)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#231f20" />
        </linearGradient>
        <linearGradient id="lg6" x1="42.86" y1="8.97" x2="39.48" y2="7.68" gradientTransform="translate(1.34 33.61) scale(1 -1)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#231f20" />
        </linearGradient>
        <linearGradient id="lg7" x1="46.44" y1="12.93" x2="41.92" y2="42.77" gradientTransform="translate(1.34 33.61) scale(1 -1)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
      </defs>
      <g style={{ isolation: "isolate" }}>
        <path fill="url(#lg1)" d="M54.53,32.46l-10.44-15.47c-8.43-10.81-13.37-4.75-13.86-4.09h0l-.04.06.12.17h0l-.12-.17-.06.09,11.72,17.35h-14.74s1.91,9.07,12.11,9.35h11.45c1.73,0,3.32-.96,4.13-2.48.81-1.53.71-3.38-.25-4.81h-.02Z" />
        <path fill="url(#lg2)" d="M34.12,2.06c-.85-1.25-2.24-2.02-3.75-2.06h-.07c-1.49,0-2.92.74-3.8,1.98L4.08,33.41c-1.49,2.11-4.08,5.76-4.08,5.76,0,0,9.17,3.2,15.49-5.7l14.69-20.51.12.17h0l-.12-.17.04-.05h0c.51-.7,5.77-7.27,14.89,5.61L34.11,2.06h.01Z" />
        <path fill="url(#lg3)" d="M39.25,39.73h4.07c5.87,0-1.35-9.34-1.35-9.34h-14.82s1.91,9.07,12.11,9.34h0Z" />
        <path fill="url(#lg4)" style={{ mixBlendMode: "color-burn", opacity: 0.6, isolation: "isolate" }} d="M42.98,31.83l.15.11,9.12-3.04h0l-6.93-10.11c-9.72-13.94-15.12-5.83-15.12-5.83l11.8,17.47s.43.56,1,1.4h-.02Z" />
        <path fill="url(#lg5)" style={{ mixBlendMode: "screen", opacity: 0.5, isolation: "isolate" }} d="M30.37,0C28.91,0,27.39.72,26.5,1.98L4.08,33.41C2.59,35.52,0,39.17,0,39.17,0,39.17,6.43,39.82,12.74,30.92l10.43-15.63S32.06-.26,36.8,6.03c0,0-2.54-3.92-3.15-4.56C32.71.48,31.5,0,30.36,0h0Z" />
        <path fill="url(#lg6)" style={{ mixBlendMode: "screen", opacity: 0.3, isolation: "isolate" }} d="M54.52,32.46l-9.99-14.78c-4.19-5.62-7.77-7.44-10.65-6.99l13.22,19.71s7.22,9.35,1.35,9.35h2.19c1.73,0,3.32-.96,4.13-2.48.81-1.53.71-3.38-.25-4.81h0Z" />
        <polygon fill="url(#lg7)" style={{ mixBlendMode: "color-burn", opacity: 0.5, isolation: "isolate" }} points="45.8 19.35 45.8 19.36 50.39 26.15 45.8 19.35" />
      </g>
    </svg>
  );
}
