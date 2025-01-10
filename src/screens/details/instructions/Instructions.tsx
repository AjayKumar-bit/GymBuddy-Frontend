import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { translate } from '@locales'
import { enableLayoutAnimation, layoutAnimation } from '@utils'

import { styles } from './instructions.styles'

interface IInstructionsProps {
  /** data: is a required prop that gives exercise instruction data */
  data: Array<string>
}

const Instructions = (props: IInstructionsProps) => {
  const { data } = props
  const [isExpanded, SetIsExpended] = useState(false)

  enableLayoutAnimation()

  const toggleInstructionVisibility = () => {
    layoutAnimation()
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
      <Text style={styles.title}>{translate('screens.details.instructions')}</Text>
      <View style={styles.instructionsContainer}>
        <Text style={styles.instruction}>
          <Text style={styles.instructionNumber}>{1}. </Text>
          {data[0]}
        </Text>
        {isExpanded && renderRestInstruction()}
        <TouchableOpacity onPress={toggleInstructionVisibility} style={styles.expanderContainer}>
          <Text style={styles.expanderText}>
            {isExpanded
              ? translate('screens.details.show_less')
              : translate('screens.details.show_more')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Instructions
