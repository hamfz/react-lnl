import React from 'react'
import PropTypes from 'prop-types'
import { DateTime } from 'luxon'

import { Avatar } from '../Avatar/AvatarFinal'

const daysAgo = (date) => {
  const now = DateTime.local()
  const past = DateTime.fromJSDate(date)
  const diff = now.diff(past, 'days')
  return `${Math.max(Math.floor(diff.days), 1)}d`
}

export const ActivityCard = (props) => {
  const { avatarProps, title, message, date } = props

  return (
    <div
      className="flex flex-row items-start w-full p-3"
    >
      <div className="mr-4">
        <Avatar {...avatarProps} size="md" />
      </div>
      <div className="flex-grow text-base">
        <div className="flex flex-row justify-between">
          <h6 className="font-bold">
            {title}
          </h6>
          <span className="text-gray-600">
            {daysAgo(date)}
          </span>
        </div>
        <div className="text-gray-600">
          {message}
        </div>
      </div>
    </div>
  )
}

ActivityCard.propTypes = {
  avatarProps: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired
}
