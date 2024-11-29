import { types } from 'mobx-state-tree'

import { ToastPreset } from '@constants'

interface ISetValidationToastDataParams {
  isVisible: boolean
  message: string
  preset: ToastPreset
}

const ValidationToastData = types.model('ValidationToastData', {
  isVisible: types.boolean,
  message: types.string,
  preset: types.enumeration([ToastPreset.Error, ToastPreset.Info, ToastPreset.Success]),
})

const ViewStore = types
  .model('ViewStore', {
    validationToastData: ValidationToastData,
  })
  .actions(self => {
    const setValidationToastData = (params: ISetValidationToastDataParams) => {
      if (self.validationToastData.isVisible) {
        self.validationToastData = {
          isVisible: false,
          message: '',
          preset: ToastPreset.Info,
        }
      }
      self.validationToastData = { ...params }
    }
    return {
      setValidationToastData,
    }
  })

export { ViewStore }
