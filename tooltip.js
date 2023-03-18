// handle positioning (BIG)

import addGlobalEventListener from './utils/globalEventListener'
const TOOLTIP_PADDING = 10

const tooltipContainer = document.createElement('div')
tooltipContainer.classList.add('tooltip-container')
document.body.append(tooltipContainer)

addGlobalEventListener('mouseover', '[data-tooltip]', (e) => {
  const tooltip = createTooltipElement(e.target.dataset.tooltip)
  tooltipContainer.append(tooltip)
  positionTooltip(tooltip, e.target)

  e.target.addEventListener(
    'mouseleave',
    (e) => {
      tooltip.remove()
    },
    { once: true }
  )
})

function createTooltipElement(text) {
  const tooltip = document.createElement('div')
  tooltip.classList.add('tooltip')
  tooltip.innerText = text

  return tooltip
}

function positionTooltip(tooltip, element) {
  const tooltipRect = tooltip.getBoundingClientRect()
  const elementRect = element.getBoundingClientRect()

  tooltip.style.left = `${
    elementRect.left - tooltipRect.width / 2 + elementRect.width / 2
  }px`

  tooltip.style.top = `${
    elementRect.top - TOOLTIP_PADDING - tooltipRect.height
  }px`

  const bounds = isOutOfBounds(tooltip)

  if (bounds.left) {
    repositionTooltip(tooltip, element, 'right')
  } else if (bounds.right) {
    repositionTooltip(tooltip, element, 'left')
  } else if (bounds.top) {
    repositionTooltip(tooltip, element, 'bottom')
  } else if (bounds.bottom) {
    // position to top
  }
}

function repositionTooltip(tooltip, element, positionTo) {
  // also take in direction
  const tooltipRect = tooltip.getBoundingClientRect()
  const elementRect = element.getBoundingClientRect()

  if (positionTo === 'right') {
    tooltip.style.left = `${elementRect.right + TOOLTIP_PADDING}px`
    tooltip.style.top = `${
      elementRect.top - tooltipRect.height / 2 + elementRect.height / 2
    }px`
  } else if (positionTo === 'left') {
    tooltip.style.left = `${
      elementRect.left - 32 - tooltipRect.width - TOOLTIP_PADDING
    }px`
    tooltip.style.top = `${elementRect.top - elementRect.height / 2}px`
  } else if (positionTo === 'bottom') {
    tooltip.style.top = `${elementRect.bottom + TOOLTIP_PADDING}px`
  }
}

function isOutOfBounds(element) {
  const elementRect = element.getBoundingClientRect()
  const containerRect = tooltipContainer.getBoundingClientRect()
  // console.log('element', elementRect)
  // console.log('container', containerRect)

  return {
    top: elementRect.top <= containerRect.top,
    right: elementRect.right >= containerRect.right,
    bottom: elementRect.bottom >= containerRect.bottom,
    left: elementRect.left <= containerRect.left
  }
}
