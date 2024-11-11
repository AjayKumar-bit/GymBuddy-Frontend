/* eslint-disable @typescript-eslint/no-explicit-any */
import { RouteName } from '@constants'

export interface INavigation {
  goBack: () => void
  navigate: (routeName: RouteName, navigationParams?: any) => void
  // TODO: type of action will get updated later
  dispatch: (action: any) => void
}
