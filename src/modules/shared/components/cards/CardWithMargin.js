import glamorous from 'glamorous-native'
import { Card } from '../Card'

export const CardWithMargin = glamorous(Card)((props, theme) => ({
  borderRadius: theme.borderRadius,
  margin: theme.module.bit,
}))
