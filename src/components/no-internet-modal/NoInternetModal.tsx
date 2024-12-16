import { Text, View } from 'react-native'

import LottieView from 'lottie-react-native'

import { NoInternetLottie } from '@assets'
import { GBModal } from '@components'
import { translate } from '@locales'

import { styles } from './noInternetModal.styles'

const NoInternetModal = () => {
  return (
    <GBModal isModalVisible onCloseModal={() => {}} styles={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.header}>{translate('common.connect_error')}</Text>
        <LottieView source={NoInternetLottie} autoPlay style={styles.lottie} />
        <Text style={styles.header}>{translate('common.no_internet')}</Text>
      </View>
    </GBModal>
  )
}
export default NoInternetModal
