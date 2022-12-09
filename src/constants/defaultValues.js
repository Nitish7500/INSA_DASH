import data from "data/notifications";
import { getCurrentUser } from "helpers/Utils";

export const UserRole = {
  Admin: 1,
  Executive: 0,
};

export const tinyMceApiKey = '0sj8gdgjk9z142gxzuv3f5t0meq0q6gxvuowe0avsommw26a';

export const adminStatusChangePasswords =  {
  'Shilpa Mam': '1234',
  'Ruchi Mam': '9876',
  'Bhavana': '0000',
}

export const awsUrl= 'https://staging-insa.s3.ap-south-1.amazonaws.com/';
/* 
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden"
*/
export const defaultMenuType = 'menu-default';

export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = 'en';
export const localeOptions = [
  { id: 'en', name: 'English - LTR', direction: 'ltr' },
  { id: 'es', name: 'Español', direction: 'ltr' },
  { id: 'enrtl', name: 'English - RTL', direction: 'rtl' },
];

export const firebaseConfig = {
  apiKey: 'AIzaSyBBksq-Asxq2M4Ot-75X19IyrEYJqNBPcg',
  authDomain: 'gogo-react-login.firebaseapp.com',
  databaseURL: 'https://gogo-react-login.firebaseio.com',
  projectId: 'gogo-react-login',
  storageBucket: 'gogo-react-login.appspot.com',
  messagingSenderId: '216495999563',
};

// export const currentUser = {
//   id: 1,
//   title: data.userType,
//   img: '/assets/img/profiles/user.png',
//   // date: 'Last seen today 15:24',
//   role: UserRole.Admin,
// };

export const currentUser = getCurrentUser();

export const adminRoot = '/app';
export const authRoot = '/user/login';
export const buyUrl = '/';
export const searchPath = `${adminRoot}/pages/miscellaneous/search`;
export const servicePath = 'https://api.stage.insurancesamadhan.com';
export const agentApiPath = 'https://agentapi.stage.insurancesamadhan.com';
export const apiEndpoints = {
  login:"/admin/login",
  createToken: '/createToken'
}


export const themeColorStorageKey = '__theme_selected_color';
export const isMultiColorActive = false;
export const defaultColor = 'dark.blueyale';
export const isDarkSwitchActive = true;
export const defaultDirection = 'ltr';
export const themeRadiusStorageKey = '__theme_radius';
export const isAuthGuardActive = true;
export const colors = [
  'bluenavy',
  'blueyale',
  'blueolympic',
  'greenmoss',
  'greenlime',
  'purplemonster',
  'orangecarrot',
  'redruby',
  'yellowgranola',
  'greysteel',
];
