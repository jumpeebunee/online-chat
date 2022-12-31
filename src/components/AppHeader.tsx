import '../styles/components/appHeader.scss';
import { Link } from "react-router-dom"

const AppHeader = () => {
  return (
    <header className="header">
      <div className="container header__container">
        <Link to="/">
          <svg width="134" height="26" viewBox="0 0 134 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_122_13)">
            <path d="M20.5833 0H5.41667C2.42512 0 0 2.37563 0 5.30612V20.6939C0 23.6244 2.42512 26 5.41667 26H20.5833C23.5749 26 26 23.6244 26 20.6939V5.30612C26 2.37563 23.5749 0 20.5833 0Z" fill="white"/>
            <path d="M4.95972 17.5102V16.3412L9.17034 10.6869H4.96395V9.02042H11.8194V10.1894L7.60882 15.8438H11.8152V17.5102H4.95972ZM13.1006 17.5102V9.02042H15.1953V12.428H18.6103V9.02042H20.7008V17.5102H18.6103V14.0985H15.1953V17.5102H13.1006Z" fill="#222222"/>
            </g>
            <path d="M45.1094 16.4453V18H37.2109V16.4453H45.1094ZM44.9297 7.83594L37.9375 18H36.625V16.7578L43.6406 6.625H44.9297V7.83594ZM44.2031 6.625V8.1875H36.6719V6.625H44.2031ZM54.3281 11.375V12.9297H48.2891V11.375H54.3281ZM48.7734 6.625V18H46.8125V6.625H48.7734ZM55.8359 6.625V18H53.8828V6.625H55.8359ZM60.2656 6.625V18H58.3047V6.625H60.2656ZM71.4375 12.1875V16.5312C71.276 16.7448 71.0234 16.9792 70.6797 17.2344C70.3411 17.4844 69.8906 17.7005 69.3281 17.8828C68.7656 18.0651 68.0651 18.1562 67.2266 18.1562C66.513 18.1562 65.8594 18.0365 65.2656 17.7969C64.6719 17.5521 64.1589 17.1953 63.7266 16.7266C63.2995 16.2578 62.9688 15.6875 62.7344 15.0156C62.5 14.3385 62.3828 13.5677 62.3828 12.7031V11.9141C62.3828 11.0547 62.4896 10.2891 62.7031 9.61719C62.9219 8.9401 63.2344 8.36719 63.6406 7.89844C64.0469 7.42969 64.5365 7.07552 65.1094 6.83594C65.6875 6.59115 66.3411 6.46875 67.0703 6.46875C68.0026 6.46875 68.7734 6.625 69.3828 6.9375C69.9974 7.24479 70.4714 7.67188 70.8047 8.21875C71.138 8.76562 71.349 9.39062 71.4375 10.0938H69.5156C69.4531 9.69792 69.3307 9.34375 69.1484 9.03125C68.9714 8.71875 68.7161 8.47396 68.3828 8.29688C68.0547 8.11458 67.6276 8.02344 67.1016 8.02344C66.6484 8.02344 66.25 8.10938 65.9062 8.28125C65.5625 8.45312 65.276 8.70573 65.0469 9.03906C64.8229 9.3724 64.6536 9.77865 64.5391 10.2578C64.4245 10.737 64.3672 11.2839 64.3672 11.8984V12.7031C64.3672 13.3281 64.4323 13.8828 64.5625 14.3672C64.6979 14.8516 64.8906 15.2604 65.1406 15.5938C65.3958 15.9271 65.7057 16.1797 66.0703 16.3516C66.4349 16.5182 66.8464 16.6016 67.3047 16.6016C67.7526 16.6016 68.1198 16.5651 68.4062 16.4922C68.6927 16.4141 68.9193 16.3229 69.0859 16.2188C69.2578 16.1094 69.3906 16.0052 69.4844 15.9062V13.6484H67.1172V12.1875H71.4375ZM78.0391 8.14062L74.6406 18H72.5859L76.8672 6.625H78.1797L78.0391 8.14062ZM80.8828 18L77.4766 8.14062L77.3281 6.625H78.6484L82.9453 18H80.8828ZM80.7188 13.7812V15.3359H74.5312V13.7812H80.7188ZM91.3438 16.4453V18H85.6328V16.4453H91.3438ZM86.1797 6.625V18H84.2188V6.625H86.1797ZM101.414 12V12.625C101.414 13.4844 101.302 14.2552 101.078 14.9375C100.854 15.6198 100.534 16.2005 100.117 16.6797C99.7057 17.1589 99.2109 17.526 98.6328 17.7812C98.0547 18.0312 97.4141 18.1562 96.7109 18.1562C96.013 18.1562 95.375 18.0312 94.7969 17.7812C94.224 17.526 93.7266 17.1589 93.3047 16.6797C92.8828 16.2005 92.5547 15.6198 92.3203 14.9375C92.0911 14.2552 91.9766 13.4844 91.9766 12.625V12C91.9766 11.1406 92.0911 10.3724 92.3203 9.69531C92.5495 9.01302 92.8724 8.43229 93.2891 7.95312C93.7109 7.46875 94.2083 7.10156 94.7812 6.85156C95.3594 6.59635 95.9974 6.46875 96.6953 6.46875C97.3984 6.46875 98.0391 6.59635 98.6172 6.85156C99.1953 7.10156 99.6927 7.46875 100.109 7.95312C100.526 8.43229 100.846 9.01302 101.07 9.69531C101.299 10.3724 101.414 11.1406 101.414 12ZM99.4531 12.625V11.9844C99.4531 11.349 99.3906 10.7891 99.2656 10.3047C99.1458 9.8151 98.9661 9.40625 98.7266 9.07812C98.4922 8.74479 98.2031 8.49479 97.8594 8.32812C97.5156 8.15625 97.1276 8.07031 96.6953 8.07031C96.263 8.07031 95.8776 8.15625 95.5391 8.32812C95.2005 8.49479 94.9115 8.74479 94.6719 9.07812C94.4375 9.40625 94.2578 9.8151 94.1328 10.3047C94.0078 10.7891 93.9453 11.349 93.9453 11.9844V12.625C93.9453 13.2604 94.0078 13.8229 94.1328 14.3125C94.2578 14.8021 94.4401 15.2161 94.6797 15.5547C94.9245 15.888 95.2161 16.1406 95.5547 16.3125C95.8932 16.4792 96.2786 16.5625 96.7109 16.5625C97.1484 16.5625 97.5365 16.4792 97.875 16.3125C98.2135 16.1406 98.5 15.888 98.7344 15.5547C98.9688 15.2161 99.1458 14.8021 99.2656 14.3125C99.3906 13.8229 99.4531 13.2604 99.4531 12.625ZM107.102 15.9219L110.094 6.625H112.258L108.18 18H106.719L107.102 15.9219ZM104.336 6.625L107.305 15.9219L107.711 18H106.242L102.18 6.625H104.336ZM115.492 6.625V18H113.531V6.625H115.492ZM122.328 6.625L117.719 12.1016L115.094 14.8828L114.75 12.9375L116.625 10.625L119.938 6.625H122.328ZM120.219 18L116.477 12.6094L117.828 11.2734L122.547 18H120.219ZM128.07 8.14062L124.672 18H122.617L126.898 6.625H128.211L128.07 8.14062ZM130.914 18L127.508 8.14062L127.359 6.625H128.68L132.977 18H130.914ZM130.75 13.7812V15.3359H124.562V13.7812H130.75Z" fill="white"/>
            <defs>
            <clipPath id="clip0_122_13">
            <rect width="26" height="26" fill="white"/>
            </clipPath>
            </defs>
          </svg>
        </Link>
        <button className='header__btn'>Выйти</button>
      </div>
    </header>
  )
}

export default AppHeader