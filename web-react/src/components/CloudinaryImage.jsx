import React from 'react'
import { Cloudinary } from '@cloudinary/url-gen'
import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react'

import { thumbnail, fill } from '@cloudinary/url-gen/actions/resize'
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity'
import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn'

const CloudinaryImage = ({ src, large, ...rest }) => {
  const getPublicId = (url) => {
    if (!url) {
      return
    }
    return url.replace(
      'https://res.cloudinary.com/firstlovecenter/image/upload/',
      ''
    )
  }

  const size = large && 'large'

  const dimensions = {
    height: large ? 300 : 150,
    width: large ? 300 : 150,
  }

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'firstlovecenter',
    },
  })
  const image = cld.image(getPublicId(src))

  switch (size) {
    case 'large':
      image.resize(
        fill()
          .width(dimensions.width)
          .height(dimensions.height)
          .gravity(focusOn(FocusOn.face()))
      )
      break
    default:
      image.resize(
        thumbnail()
          .width(dimensions.width)
          .height(dimensions.height)
          .zoom(0.7)
          .gravity(focusOn(FocusOn.face()))
      )
      break
  }

  return (
    <div>
      <AdvancedImage
        cldImg={image}
        plugins={[
          lazyload({ rootMargin: '10px 20px 10px 30px', threshold: 0.25 }),
          placeholder({ mode: 'blur' }),
        ]}
        {...rest}
      />
    </div>
  )
}

export default CloudinaryImage
