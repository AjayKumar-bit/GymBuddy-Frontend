import React from 'react'
import { Modal, View } from 'react-native'

interface IGBModalProps {
  /** children: is a required prop that gives react node to render in modal */
  children: React.ReactNode
  /** isModalVisible: is a required prop that shows whether modal is visible or not */
  isModalVisible: boolean
  /** onCloseModal: is a required prop that trigger on close of modal */
  onCloseModal: () => void
}

const GBModal = (props: IGBModalProps) => {
  const { children, isModalVisible, onCloseModal } = props
  const onRequestClose = () => {
    onCloseModal()
  }
  return (
    <Modal
      animationType="slide"
      transparent
      visible={isModalVisible}
      onRequestClose={onRequestClose}>
      <View>{children}</View>
    </Modal>
  )
}

export default GBModal
