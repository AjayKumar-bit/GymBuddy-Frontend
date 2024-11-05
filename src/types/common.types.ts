import { RouteName } from '@constants'

export interface INavigation {
  goBack: () => void
  navigate: (routeName: RouteName) => void
}
