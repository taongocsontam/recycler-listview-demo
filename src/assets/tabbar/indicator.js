import React from 'react'
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg'

/** indicator icon */
const IndicatorIcon = ({
  width = 24,
  height = 4,
  style = {}
}) => {
  return (
    <Svg style={style} width={`${width}`} height={`${height}`} viewBox="0 0 24 4" fill="none">
      <Path d="M0 0H24C24 2.20914 22.2091 4 20 4H4C1.79086 4 0 2.20914 0 0Z" fill="#6c99f5"/>
    </Svg>
  )
}

export default IndicatorIcon



