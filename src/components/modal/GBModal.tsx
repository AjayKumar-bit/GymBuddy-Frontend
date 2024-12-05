import React from 'react'
import { GestureResponderEvent, Modal, Pressable, StyleProp, View, ViewStyle } from 'react-native'

interface IGBModalProps {
  /** children: is a required prop that gives react node to render in modal */
  children: React.ReactNode
  /** isModalVisible: is a required prop that shows whether modal is visible or not */
  isModalVisible: boolean
  /** onCloseModal: is a required prop that trigger on close of modal */
  onCloseModal: () => void
  /** styles: is an optional prop that give styles to child component */
  styles?: StyleProp<ViewStyle>
}

const GBModal = (props: IGBModalProps) => {
  const { children, isModalVisible, onCloseModal, styles = {} } = props

  const onBackDropPress = (event: GestureResponderEvent) => {
    if (event.target === event.currentTarget) {
      onCloseModal()
    }
  }

  return (
    <Modal animationType="slide" transparent visible={isModalVisible} onRequestClose={onCloseModal}>
      <Pressable style={styles} onPress={onBackDropPress}>
        <View>{children}</View>
      </Pressable>
    </Modal>
  )
}

export default GBModal
