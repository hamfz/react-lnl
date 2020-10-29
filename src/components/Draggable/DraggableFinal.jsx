import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export const Draggable = (props) => {
  const { onOrderChange, items, renderItem } = props
  const [orderedItems, setOrderedItems] = useState(items)
  const [draggingIndex, setDraggingIndex] = useState(null)
  const [draggingOver, setDraggingOver] = useState(null)


  const handleDragOver = (index, event) => {
    event.preventDefault()
    setDraggingOver(index)
  }
  const handleDragStart = (index, event) => {
    setDraggingIndex(index)
  }

  const handleDragEnd = (index, event) => {
    setDraggingIndex(null)
    setDraggingOver(null)
  }

  const handleDragDrop = (index, event) => {
    const draggingItem = orderedItems[draggingIndex]

    let nextOrderedItems = [...orderedItems]
    nextOrderedItems.splice(draggingIndex, 1)
    nextOrderedItems = [
      ...nextOrderedItems.slice(0, index),
      draggingItem,
      ...nextOrderedItems.slice(index, nextOrderedItems.length)
    ]

    setOrderedItems(nextOrderedItems)
    onOrderChange(nextOrderedItems)
  }

  return (
    <div>
      {orderedItems.map((item, index) => {
        return (
          <div
            key={index}
            draggable="true"
            onDragOver={(event) => handleDragOver(index, event)}
            onDragStart={(event) => handleDragStart(index, event)}
            onDragEnd={(event) => handleDragEnd(index, event)}
            onDrop={(event) => handleDragDrop(index, event)}
          >
            <div
              className={classNames(
                'hover:bg-gray-100 cursor-pointer select-none',
                {
                  'border-t-2 border-gray-600': draggingOver === index && index < items.length - 1 && index !== draggingIndex,
                  'border-b-2 border-gray-600': draggingOver === index && index === items.length - 1 && index !== draggingIndex
                }
              )}
            >
              {renderItem(item)}
            </div>
          </div>
        )
      })}
    </div>
  )
}

Draggable.propTypes = {
  onOrderChange: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired
}
