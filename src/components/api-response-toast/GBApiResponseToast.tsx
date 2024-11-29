import React from 'react'

import { observer } from 'mobx-react-lite'

import { useStore } from '@stores'

import GBToast from '../toast/GBToast'

const GBApiResponseToast = observer(() => {
  const { viewStore } = useStore()
  const { validationToastData } = viewStore
  const { isVisible, message, preset } = validationToastData

  return <GBToast preset={preset} message={message} isVisible={isVisible} isApiResponseToast />
})

export default GBApiResponseToast
