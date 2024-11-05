import { CalendarDaysIcon, ClockIcon, HomeIcon, UserCircleIcon } from 'react-native-heroicons/solid'

import { Alarm, Home, Planner, Profile } from '@screens'

import { translate } from '../locales/i18n'

export enum RouteName {
  Default = 'Default',
  Alarm = 'Alarm',
  DefaultDrawer = 'DefaultDrawer',
  Home = 'Home',
  Planner = 'Planner',
  Profile = 'Profile',
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
    component: Alarm,
    icon: ClockIcon,
    name: translate('tab_data.alarm'),
  },
  {
    component: Profile,
    icon: UserCircleIcon,
    name: translate('tab_data.my_profile'),
  },
]
