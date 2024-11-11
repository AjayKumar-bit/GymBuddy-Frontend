import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { ArrowsPointingInIcon, ArrowsPointingOutIcon } from 'react-native-heroicons/solid'

import { GBFastImage, GBModal } from '@components'
import { Colors, Sizes } from '@theme'

import { styles } from './gifViewer.styles'

interface IGifViewerProps {
  /** gifUrl: is a required prop that gives gif url */
  gifUrl: string
  /** name: is a required prop that gives exercise name */
  name: string
}

const GifViewer = (props: IGifViewerProps) => {
  const { gifUrl, name } = props
  const [isModalVisible, setIsModalVisible] = useState(false)

  const imageStyles = isModalVisible ? styles.fullImage : styles.image

  const toggleModalVisibility = () => {
    setIsModalVisible(prev => !prev)
  }

  const renderGif = () => (
    <View>
      <GBFastImage source={{ uri: gifUrl }} imageStyles={imageStyles} />
      <Text style={styles.name}>{name}</Text>
      {isModalVisible ? (
        <ArrowsPointingInIcon
          color={Colors.Dark}
          onPress={toggleModalVisibility}
          size={Sizes.Size_32}
          style={styles.icon}
        />
      ) : (
        <ArrowsPointingOutIcon
          color={Colors.Dark}
          onPress={toggleModalVisibility}
          size={Sizes.Size_32}
          style={styles.icon}
        />
      )}
    </View>
  )

  return (
    <TouchableOpacity style={styles.container} onPress={toggleModalVisibility}>
      {renderGif()}
      <GBModal isModalVisible={isModalVisible} onCloseModal={toggleModalVisibility}>
        {renderGif()}
      </GBModal>
    </TouchableOpacity>
  )
}

export default GifViewer
