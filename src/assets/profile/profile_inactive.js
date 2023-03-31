import React from 'react'
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg'

/** profile inactive icon */
const ProfileInActiveIcon = ({
  width = 24,
  height = 24,
  color = 'black',
}) => {
  return (
    <Svg width={`${width}`} height={`${height}`} viewBox="0 0 24 24" fill="none">
      <Path fill-rule="evenodd" clip-rule="evenodd" d="M17.294 7.29105C17.294 10.2281 14.9391 12.5831 12 12.5831C9.0619 12.5831 6.70601 10.2281 6.70601 7.29105C6.70601 4.35402 9.0619 2 12 2C14.9391 2 17.294 4.35402 17.294 7.29105ZM12 22C7.66237 22 4 21.295 4 18.575C4 15.8539 7.68538 15.1739 12 15.1739C16.3386 15.1739 20 15.8789 20 18.599C20 21.32 16.3146 22 12 22Z" fill="#677187"/>
    </Svg>
  )
}

export default ProfileInActiveIcon



 