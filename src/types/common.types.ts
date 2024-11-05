import { RouteName } from '@constants'

export interface INavigation {
  goBack: () => void
  navigate: (routeName: RouteName) => void
  // TODO: type of action will get updated later
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: (action: any) => void
}
