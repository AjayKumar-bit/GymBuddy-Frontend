import { CalendarDaysIcon, ClockIcon, HomeIcon, UserCircleIcon } from 'react-native-heroicons/solid'

import { Home, Planner, Profile, Reminders } from '@screens'

import { translate } from '../locales/i18n'

export enum RouteName {
  Default = 'Default',
  DefaultDrawer = 'DefaultDrawer',
  Details = 'Details',
  Home = 'Home',
  Login = 'Login',
  Planner = 'Planner',
  Profile = 'Profile',
  Registration = 'Registration',
  Reminders = 'Reminders',
  Search = 'Search',
}

export const TAB_DATA = [
  {
    component: Home,
    icon: HomeIcon,
    name: translate('tab_data.home'),
  },
  {
    component: Planner,
    icon: CalendarDaysIcon,
    name: translate('tab_data.planner'),
  },
  {
    component: Reminders,
    icon: ClockIcon,
    name: translate('tab_data.alarm'),
  },
  {
    component: Profile,
    icon: UserCircleIcon,
    name: translate('tab_data.my_profile'),
  },
]
