export function BrandMark({
  className = "",
  size = 36,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      <path
        d="M10 26.5 32 8l22 18.5V54H10V26.5Z"
        fill="none"
        stroke="#1B4D3E"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      <path
        d="M32 47C24 38 17 32 20 23c7 4 11 12 12 24Z"
        fill="#6AA334"
      />
      <path
        d="M32 47C32 34 31 23 32 17c7 8 7 18 0 30Z"
        fill="#8FD14A"
      />
      <path
        d="M32 47C40 38 47 32 44 23c-7 4-11 12-12 24Z"
        fill="#5FA035"
      />
    </svg>
  );
}

export function BrandWordmark({
  invert = false,
  withSub = false,
}: {
  invert?: boolean;
  withSub?: boolean;
}) {
  return (
    <span className={`wordmark${invert ? " wordmark--invert" : ""}`}>
      <span className="wordmark__name">
        <span className="wordmark__harvest">Harvest</span>
        <span className="wordmark__home">Home</span>
      </span>
      {withSub ? (
        <span className="wordmark__sub">Garden & Growing Supply</span>
      ) : null}
    </span>
  );
}

export function BrandLogo({
  invert = false,
  withSub = false,
  size = 36,
}: {
  invert?: boolean;
  withSub?: boolean;
  size?: number;
}) {
  return (
    <>
      <BrandMark size={size} className={invert ? "mark--invert" : ""} />
      <BrandWordmark invert={invert} withSub={withSub} />
    </>
  );
}
