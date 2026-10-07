/**
 * Global SVG filters, referenced from CSS (`filter: url(#crayon)`) and from
 * the pet drawing (`filter="url(#wobble)"`).
 */
export function SvgDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
      <defs>
        {/* slightly wobbly, hand-drawn lines */}
        <filter id="wobble" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* crayon / pencil stroke: rough edges plus a waxy, grainy fill */}
        <filter id="crayon" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="2" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="5" xChannelSelector="R" yChannelSelector="G" result="rough" />
          <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="7" result="grain" />
          <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  3.6 0 0 0 -0.9" result="grainMask" />
          <feComposite in="rough" in2="grainMask" operator="in" />
        </filter>
        {/* waxy crayon fill: wobbly edges, streaky strokes and paper grain showing through */}
        <filter id="crayon-fill" x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" seed="5" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="16" xChannelSelector="R" yChannelSelector="G" result="rough" />
          <feTurbulence type="fractalNoise" baseFrequency="0.9 0.06" numOctaves="2" seed="9" result="streaks" />
          <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="1" seed="2" result="grain" />
          <feBlend in="streaks" in2="grain" mode="multiply" result="texture" />
          <feColorMatrix in="texture" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  3.4 0 0 0 -0.45" result="mask" />
          <feComposite in="rough" in2="mask" operator="in" />
        </filter>
        <filter id="crayon-2" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="11" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="7" xChannelSelector="G" yChannelSelector="R" result="rough" />
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" result="grain" />
          <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  3.4 0 0 0 -1.1" result="grainMask" />
          <feComposite in="rough" in2="grainMask" operator="in" result="speckled" />
          <feComponentTransfer in="speckled">
            <feFuncA type="linear" slope="0.75" />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
  );
}
