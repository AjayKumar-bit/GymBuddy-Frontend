import { HomeIcon, ClockIcon, UserCircleIcon, CalendarDaysIcon } from 'react-native-heroicons/solid'
import { Alarm, Home, Profile, Planner } from '@screens'
import { translate } from '../locales/i18n'

export const TAB_DATA = [
  {
    component: Home,
    icon: HomeIcon,
    name: translate('tab_data.home'),
  },
  {
    component: Planner,
    icon: CalendarDaysIcon,
    name: 'Planner',
  },
  {
    component: Alarm,
    icon: ClockIcon,
    name: 'Alarms',
  },
  {
    component: Profile,
    icon: UserCircleIcon,
    name: 'My Profile',
  },
]
