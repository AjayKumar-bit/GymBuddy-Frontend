import React from 'react'
import { Text, View } from 'react-native'

import { observer } from 'mobx-react-lite'

import { GBButton, GBModal } from '@components'
import { ApiStatusPreset } from '@constants'
import { translate } from '@locales'
import { Colors } from '@theme'

import { styles } from './exerciseModal.styles'

interface IExerciseModalProps {
  /** closeModal : is a required prop that trigger to close modal */
  closeModal: () => void
  /** exerciseName : is an optional prop that gives name of exercise  */
  exerciseName?: string
  /** onDeletePress : is a required prop that trigger to on delete button press */
  onDeletePress: () => void
}

const ExerciseModal = observer((props: IExerciseModalProps) => {
  const { closeModal, exerciseName, onDeletePress } = props

  return (
    <GBModal isModalVisible onCloseModal={closeModal} styles={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.header}>{translate('screens.planner.delete_confirmation')}</Text>
        <Text style={styles.exerciseName}>{exerciseName}</Text>
        <View style={styles.buttonContainer}>
          <GBButton
            containerCustomStyles={[styles.button, styles.leftButton]}
            onPress={closeModal}
            title={translate('common.cancel')}
          />
          <GBButton
            apiStatusPreset={ApiStatusPreset.DeleteExercise}
            containerCustomStyles={[styles.button, styles.deleteButton]}
            loaderColor={Colors.DeleteButton}
            loaderStyles={styles.loader}
            onPress={onDeletePress}
            title={translate('common.delete')}
          />
        </View>
      </View>
    </GBModal>
  )
})

export default ExerciseModal
