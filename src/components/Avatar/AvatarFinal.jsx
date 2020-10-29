import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const baseStyles = 'rounded-full'
const sizes = {
  xs: 5,
  sm: 6,
  md: 8,
  lg: 10,
  xl: 12
}

export const Avatar = (props) => {
  const { firstName, lastName, imageSrc, size } = props
  const baseClass = `${baseStyles} h-${sizes[size]} w-${sizes[size]}`
  const altText = `${firstName} ${lastName} photo`

  if (imageSrc) {
    return (
      <img
        className={classNames(baseClass)}
        src={imageSrc}
        alt={altText}
      />
    )
  }

  return (
    <div
      className={classNames(
        baseClass,
        'text-white bg-gray-500 flex justify-center items-center',
        { 'text-sm': ['xs', 'sm', 'md'].indexOf(size) !== -1 }
      )}
      src={imageSrc}
      aria-label={altText}
    >
      {firstName.slice(0, 1)}{lastName.slice(0, 1)}
    </div>
  )
}


Avatar.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  imageSrc: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']).isRequired,
}

Avatar.defaultProps = {
  size: 'md',
}
