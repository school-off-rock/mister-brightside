import React from 'react'

import Touchable from 'react-native-platform-touchable'
import glamorous from 'glamorous-native'
import { FONTS } from '../../../../constants/theme'
import { hasText } from '../../../../config/functions'

const ButtonContainer = glamorous.view(({ containerColor }, theme) => ({
  borderRadius: theme.borderRadius,
  overflow: 'hidden',
  elevation: containerColor === 'none' ? 0 : 4,
}))

const ButtonWrap = glamorous.view(({ containerColor = 'primary' }, theme) => ({
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.colors[containerColor],
  paddingVertical: theme.button.verticalSpacing,
  paddingHorizontal: theme.button.horizontalSpacing,
}))

const ButtonText = glamorous.text(({ textColor }, theme) => ({
  color: hasText(textColor) ? textColor : theme.colors.background.onPrimary,
  ...FONTS.style.primaryButton,
}))

export function ButtonContained({
  children,
  onPress,
  style,
  color,
  textColor,
}) {
  const upperCaseText = hasText(children) ? children.toUpperCase() : children
  return (
    <ButtonContainer containerColor={color} style={style}>
      <Touchable
        onPress={onPress}
        foreground={Touchable.SelectableBackground()}
      >
        <ButtonWrap containerColor={color}>
          <ButtonText textColor={textColor}>{upperCaseText}</ButtonText>
        </ButtonWrap>
      </Touchable>
    </ButtonContainer>
  )
}
