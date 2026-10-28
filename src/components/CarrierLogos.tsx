/**
 * Optically calibrated inline SVG carrier marks for 8 major U.S. auto insurers:
 * Allstate, GEICO, Progressive, State Farm, The Hartford, USAA, AAA, and Farmers Insurance.
 * Tight viewBox bounds and balanced heights keep every mark crisp and well-proportioned on mobile.
 */

export function AllstateLogo() {
  return (
    <svg
      viewBox="2 6 116 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Allstate"
      className="h-[22px] min-[380px]:h-[24px] sm:h-[26px] max-w-full w-auto shrink-0"
    >
      <ellipse
        cx="16"
        cy="18"
        rx="12"
        ry="9.5"
        stroke="#0B4F9F"
        strokeWidth="2"
        fill="#FAF6EE"
      />
      <path
        d="M9.8 15.2C9.7 19.2 12 22.5 16 23.1C20 22.5 22.3 19.2 22.2 15.2"
        stroke="#0B4F9F"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12.4 13.9C12.7 17.1 14.1 19.4 16 19.9C17.9 19.4 19.3 17.1 19.6 13.9"
        stroke="#0B4F9F"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <text
        x="34"
        y="24.5"
        fill="#0D2544"
        fontFamily="Plus Jakarta Sans, Manrope, sans-serif"
        fontWeight="800"
        fontSize="20"
        letterSpacing="-0.5"
      >
        Allstate
      </text>
    </svg>
  );
}

export function GeicoLogo() {
  return (
    <svg
      viewBox="3 5 118 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="GEICO"
      className="h-[17px] min-[380px]:h-[19px] sm:h-[21px] max-w-full w-auto shrink-0"
    >
      <path
        d="M8 6H24C26.5 6 28 7.5 28 10V11.5H22.5V10.5H10.5V19.5H22.5V16.5H16.5V12.8H28V20C28 22.5 26.5 24 24 24H8C5.5 24 4 22.5 4 20V10C4 7.5 5.5 6 8 6Z"
        fill="#0B4383"
      />
      <path
        d="M32 6H51V10.2H38V12.9H49.5V16.9H38V19.8H51.5V24H32V6Z"
        fill="#0B4383"
      />
      <path d="M55.5 6H62V24H55.5V6Z" fill="#0B4383" />
      <path
        d="M70.5 6H86.5C89 6 90.5 7.5 90.5 10V12H84.5V10.5H72.5V19.5H84.5V18H90.5V20C90.5 22.5 89 24 86.5 24H70.5C68 24 66.5 22.5 66.5 20V10C66.5 7.5 68 6 70.5 6Z"
        fill="#0B4383"
      />
      <path
        d="M98.5 6H115.5C118 6 119.5 7.5 119.5 10V20C119.5 22.5 118 24 115.5 24H98.5C96 24 94.5 22.5 94.5 20V10C94.5 7.5 96 6 98.5 6ZM100.5 10.5V19.5H113.5V10.5H100.5Z"
        fill="#0B4383"
      />
    </svg>
  );
}

export function ProgressiveLogo() {
  return (
    <svg
      viewBox="4 7 136 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Progressive"
      className="h-[19px] min-[380px]:h-[21px] sm:h-[23px] max-w-full w-auto shrink-0"
    >
      <text
        x="72"
        y="24"
        textAnchor="middle"
        fill="#0B57B8"
        fontFamily="Plus Jakarta Sans, Manrope, sans-serif"
        fontWeight="800"
        fontStyle="italic"
        fontSize="17.8"
        letterSpacing="0.4"
      >
        PROGRESSIVE
      </text>
    </svg>
  );
}

export function StateFarmLogo() {
  return (
    <svg
      viewBox="5 8 132 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="State Farm"
      className="h-[20px] min-[380px]:h-[22px] sm:h-[24px] max-w-full w-auto shrink-0"
    >
      <ellipse
        cx="17.5"
        cy="13.5"
        rx="4.8"
        ry="3.1"
        stroke="#C22720"
        strokeWidth="2.1"
      />
      <ellipse
        cx="12.3"
        cy="20.4"
        rx="4.8"
        ry="3.1"
        stroke="#C22720"
        strokeWidth="2.1"
      />
      <ellipse
        cx="22.7"
        cy="20.4"
        rx="4.8"
        ry="3.1"
        stroke="#C22720"
        strokeWidth="2.1"
      />
      <text
        x="33"
        y="23.5"
        fill="#0D2544"
        fontFamily="Plus Jakarta Sans, Manrope, sans-serif"
        fontWeight="800"
        fontSize="18.5"
        letterSpacing="-0.4"
      >
        State Farm
      </text>
    </svg>
  );
}

export function HartfordLogo() {
  return (
    <svg
      viewBox="6 4 144 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="The Hartford"
      className="h-[25px] min-[380px]:h-[27px] sm:h-[29px] max-w-full w-auto shrink-0"
    >
      {/* Stag antler emblem */}
      <path
        d="M18 28.5V19.5M18 19.5L12.5 14.2M18 19.5L23.5 14.2M12.5 14.2L9.5 9.8M12.5 14.2L15 9.2M23.5 14.2L26.5 9.8M23.5 14.2L21 9.2"
        stroke="#8B2635"
        strokeWidth="1.95"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 29.2C14.5 27.6 21.5 27.6 25 29.2"
        stroke="#0D2544"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Cleanly separated stacked wordmark: THE above HARTFORD with 5.5px vertical clearance */}
      <text
        x="33.5"
        y="12.5"
        fill="#4E6078"
        fontFamily="Plus Jakarta Sans, Manrope, sans-serif"
        fontWeight="700"
        fontSize="7.6"
        letterSpacing="1.8"
      >
        THE
      </text>
      <text
        x="33"
        y="29"
        fill="#0D2544"
        fontFamily="Plus Jakarta Sans, Manrope, sans-serif"
        fontWeight="800"
        fontSize="15.2"
        letterSpacing="0.7"
      >
        HARTFORD
      </text>
    </svg>
  );
}

export function UsaaLogo() {
  return (
    <svg
      viewBox="8 8 92 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="USAA"
      className="h-[21px] min-[380px]:h-[23px] sm:h-[25px] max-w-full w-auto shrink-0"
    >
      <path
        d="M10 10.5L17.5 13.8L25 10.5V16.2C25 21.4 21.7 25.1 17.5 26.8C13.3 25.1 10 21.4 10 16.2V10.5Z"
        stroke="#0D2B52"
        strokeWidth="1.95"
        strokeLinejoin="round"
      />
      <path
        d="M13 15.2L17.5 17.4L22 15.2M14.2 19.2L17.5 20.8L20.8 19.2"
        stroke="#0D2B52"
        strokeWidth="1.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="32"
        y="24.2"
        fill="#0D2B52"
        fontFamily="Plus Jakarta Sans, Manrope, sans-serif"
        fontWeight="800"
        fontSize="19"
        letterSpacing="1.2"
      >
        USAA
      </text>
    </svg>
  );
}

export function AaaLogo() {
  return (
    <svg
      viewBox="10 5 94 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="AAA"
      className="h-[24px] min-[380px]:h-[26px] sm:h-[28px] max-w-full w-auto shrink-0"
    >
      <ellipse
        cx="54"
        cy="19.5"
        rx="41"
        ry="12"
        transform="rotate(-9 54 19.5)"
        stroke="#C22720"
        strokeWidth="2.05"
      />
      <path
        d="M84 11.4C93 11.8 100 13.9 101 17.2C102 20.5 95.5 24.2 84.5 26.6"
        stroke="#C22720"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <text
        x="52"
        y="24.5"
        textAnchor="middle"
        fill="#0B4383"
        fontFamily="Plus Jakarta Sans, Manrope, sans-serif"
        fontWeight="800"
        fontStyle="italic"
        fontSize="18.5"
        letterSpacing="0.8"
      >
        AAA
      </text>
    </svg>
  );
}

export function FarmersLogo() {
  return (
    <svg
      viewBox="6 8 122 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Farmers Insurance"
      className="h-[24px] min-[380px]:h-[26px] sm:h-[28px] max-w-full w-auto shrink-0"
    >
      <path
        d="M8 24C8 15.8 14.8 10 24 10C33.2 10 40 15.8 40 24H8Z"
        fill="#0B4383"
      />
      <path
        d="M24 12.5V19M17.5 14.5L21 19.5M30.5 14.5L27 19.5"
        stroke="#FAF6EE"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M19.5 18.5L24 21L28.5 18.5V23C28.5 25.2 26.5 26.8 24 27.5C21.5 26.8 19.5 25.2 19.5 23V18.5Z"
        fill="#C22720"
      />
      <text
        x="47"
        y="21"
        fill="#0D2544"
        fontFamily="Plus Jakarta Sans, Manrope, sans-serif"
        fontWeight="800"
        fontSize="14.5"
        letterSpacing="1.3"
      >
        FARMERS
      </text>
      <text
        x="47.5"
        y="30"
        fill="#C22720"
        fontFamily="Plus Jakarta Sans, Manrope, sans-serif"
        fontWeight="700"
        fontSize="7.6"
        letterSpacing="1.8"
      >
        INSURANCE
      </text>
    </svg>
  );
}
