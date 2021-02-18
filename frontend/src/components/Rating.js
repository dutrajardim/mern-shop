import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const Rating = ({ value, text, color }) => {
  return (
    <div className='rating'>
      {_.range(0, 5).map((n) => (
        <span key={n}>
          <i
            style={{ color }}
            className={
              value >= 1 + n
                ? 'fas fa-star'
                : value >= 0.5 + n
                ? 'fas fa-start-half-alt'
                : 'far fa-star'
            }
          ></i>
        </span>
      ))}
      <span>{text && text}</span>
    </div>
  )
}

Rating.defaultProps = {
  color: '#f8e825',
}

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
}

export default Rating
