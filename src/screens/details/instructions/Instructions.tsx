import React, { useState } from 'react'
import { LayoutAnimation, Platform, Text, TouchableOpacity, UIManager, View } from 'react-native'

import { styles } from './instructions.styles'

interface IInstructionsProps {
  /** data: is a required prop that gives exercise instruction data */
  data: Array<string>
}

const Instructions = (props: IInstructionsProps) => {
  const { data } = props
  const [isExpanded, SetIsExpended] = useState(false)

  if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }

  const toggleInstructionVisibility = () => {
    // TODO: need to check why LayoutAnimation not working.
    LayoutAnimation.configureNext({
      duration: 250,
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    })
    SetIsExpended(prev => !prev)
  }

  const renderRestInstruction = () =>
    data.map((instruction, index) => (
      <Text key={instruction} style={styles.instruction}>
        <Text style={styles.instructionNumber}>{index + 2}. </Text>
        {instruction}
      </Text>
    ))

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Instructions</Text>
      <View style={styles.instructionsContainer}>
        <Text style={styles.instruction}>
          <Text style={styles.instructionNumber}>{1}. </Text>
          {data[0]}
        </Text>
        {isExpanded && renderRestInstruction()}
        <TouchableOpacity onPress={toggleInstructionVisibility} style={styles.expanderContainer}>
          <Text style={styles.expanderText}>{isExpanded ? 'Show Less' : 'Show More'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Instructions
