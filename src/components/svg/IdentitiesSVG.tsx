
export const IdentitiesSVG:React.FC<{active:boolean}> = ({active}) =>{
    const color = (active) ? "#3AA1FF": "#AFAEB4";
    return<svg width="28" height="16" viewBox="0 0 28 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.75 2.75009C15.75 2.51802 15.8421 2.29546 16.0062 2.13137C16.1703 1.96727 16.3929 1.87509 16.625 1.87509H27.125C27.357 1.87509 27.5796 1.96727 27.7437 2.13137C27.9078 2.29546 28 2.51802 28 2.75009C28 2.98215 27.9078 3.20471 27.7437 3.3688C27.5796 3.5329 27.357 3.62509 27.125 3.62509H16.625C16.3929 3.62509 16.1703 3.5329 16.0062 3.3688C15.8421 3.20471 15.75 2.98215 15.75 2.75009ZM27.125 7.12509H16.625C16.3929 7.12509 16.1703 7.21727 16.0062 7.38137C15.8421 7.54546 15.75 7.76802 15.75 8.00009C15.75 8.23215 15.8421 8.45471 16.0062 8.61881C16.1703 8.7829 16.3929 8.87509 16.625 8.87509H27.125C27.357 8.87509 27.5796 8.7829 27.7437 8.61881C27.9078 8.45471 28 8.23215 28 8.00009C28 7.76802 27.9078 7.54546 27.7437 7.38137C27.5796 7.21727 27.357 7.12509 27.125 7.12509ZM27.125 12.3751H19.25C19.0179 12.3751 18.7953 12.4673 18.6312 12.6314C18.4671 12.7955 18.375 13.018 18.375 13.2501C18.375 13.4822 18.4671 13.7047 18.6312 13.8688C18.7953 14.0329 19.0179 14.1251 19.25 14.1251H27.125C27.357 14.1251 27.5796 14.0329 27.7437 13.8688C27.9078 13.7047 28 13.4822 28 13.2501C28 13.018 27.9078 12.7955 27.7437 12.6314C27.5796 12.4673 27.357 12.3751 27.125 12.3751ZM11.9535 9.53134C12.822 8.86247 13.4592 7.93856 13.776 6.88919C14.0927 5.83982 14.0731 4.71762 13.7198 3.67998C13.3665 2.64234 12.6973 1.7413 11.806 1.10323C10.9147 0.465163 9.84609 0.12207 8.74995 0.12207C7.65382 0.12207 6.58517 0.465163 5.69389 1.10323C4.80261 1.7413 4.1334 2.64234 3.78011 3.67998C3.42682 4.71762 3.40718 5.83982 3.72394 6.88919C4.04069 7.93856 4.67796 8.86247 5.54636 9.53134C3.29105 10.4862 1.5137 12.4079 0.902297 14.7813C0.868902 14.9107 0.865563 15.0459 0.892534 15.1768C0.919506 15.3076 0.976073 15.4305 1.0579 15.5361C1.13972 15.6417 1.24464 15.7271 1.3646 15.7859C1.48456 15.8446 1.61638 15.8752 1.74995 15.8751H15.75C15.8835 15.8752 16.0154 15.8446 16.1353 15.7859C16.2553 15.7271 16.3602 15.6417 16.442 15.5361C16.5238 15.4305 16.5804 15.3076 16.6074 15.1768C16.6343 15.0459 16.631 14.9107 16.5976 14.7813C15.9862 12.4068 14.2089 10.4851 11.9535 9.53134Z" fill={`${color}`}/>
    </svg>
}