import React from 'react'
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg'

/** icon back */
const IconBack = ({
  width = 20,
  height = 20,
  color = 'black',
}) => {
  return (
    <Svg width={`${width}`} height={`${height}`} viewBox="0 0 20 20" fill="none">
      <Path d="M4.785 8.75003H20V11.25H4.785L11.49 17.955L9.7225 19.7225L0 10L9.7225 0.277527L11.49 2.04503L4.785 8.75003Z" fill="#3A4865"/>
    </Svg>
  )
}

export default IconBack
