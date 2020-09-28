import { ROLES } from './roles';

export const routes = [
  { key: "home", title: 'Home', roles: [ROLES.ACCOUNTANT, ROLES.ADMIN, ROLES.MANAGER, ROLES.OPERATIONS, ROLES.SALES] },
  { key: "dobavljaci", title: 'Dobavljaci', roles: [ROLES.OPERATIONS] },
  { key: "konsultanti", title: 'Konsultanti', roles: [ROLES.MANAGER] },
  { key: "uposlenici", title: 'Uposlenici', roles: [] },
  { key: "projekti", title: 'Projekti', roles: [ROLES.MANAGER] },
  { key: "tehnologije", title: 'Tehnologije', roles: [ROLES.MANAGER] },
  { key: "finansije", title: 'Finansije', roles: [] },  
  { key: "hardware", title: 'Hardware', roles: [ROLES.SALES] },
//   { key: "login", title: 'Login', roles: [ROLES.ACCOUNTANT, ROLES.ADMIN, ROLES.MANAGER, ROLES.OPERATIONS, ROLES.SALES] },
  { key: "registration", title: 'Registracija', roles: [ROLES.ADMIN] },
  { key: "izvjestaji", title: 'Izvjestaj', roles: [] },
];
