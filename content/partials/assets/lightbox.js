const portal = {
  create(el) {
    el.dataset.portal = true
    document.body.style.overflow = 'hidden'
    document.body.appendChild(el)
  },
  destroy(el) {
    document.querySelectorAll('[data-lightbox-expanded]').forEach(el => {
      el.style.opacity = 1
      delete el.dataset.lightboxExpanded
    })
    document.body.removeChild(el)
    document.body.style.overflow = 'auto'
  }
}
const px = number => `${number}px`

function lightbox(selector = "img", config) {
  const options = {
    backdropBg: 'rgb(0 0 0)',
    backdropOpacity: 0.96,
    ...config
  }
  const img = document.createElement('img')
  const wrapper = document.createElement('div')
  const backdrop = document.createElement('div')
  const dialog = document.createElement('div')
  wrapper.style.cssText = 'position:fixed;inset:0;overflow:auto'
  backdrop.style.cssText = `position:absolute;inset:0;background:${options.backdropBg};opacity:0;transition: opacity .2s linear`
  dialog.setAttribute('role', 'dialog')
  backdrop.style.setProperty('cursor', 'zoom-out')
  wrapper.appendChild(backdrop)
  wrapper.appendChild(dialog)
  backdrop.addEventListener('click', () => {
    backdrop.style.opacity = 0
    dialog.style.transform = `scale(1) translate(${px(dialog.dataset.translateX)},${px(dialog.dataset.translateY)})`
    setTimeout(() => {
      portal.destroy(wrapper)
    }, 400)
  })
  document.querySelectorAll(selector).forEach(el => {
    el.style.setProperty('cursor', 'zoom-in')
    el.addEventListener('click', (e) => {
      const { width, height, top, left } = e.target.getBoundingClientRect()
      const destination = {
        top: height >= window.innerHeight - 30 ? 200 : (window.innerHeight / 2) - (height / 2),
        left: (window.innerWidth / 2) - (width / 2)
      }
      dialog.style.position = 'relative'
      dialog.style.width = `min(90%, ${px(width)}`
      dialog.style.height = px(height)
      dialog.style.left = px(destination.left)
      console.log({ height, wh: window.innerHeight })
      dialog.style.top = px(destination.top)
      dialog.style.transition = 'transform .4s cubic-bezier(.5, 0, .5, 1)'
      const multiplier = {
        y: top <= destination.top ? -1 : 1,
        x: left <= destination.left ? -1 : 1
      }
      const delta = {
        y: top <= destination.top ? destination.top - top : top - destination.top,
        x: left <= destination.left ? destination.left - left : left - destination.left
      }
      dialog.style.transform = `translate(${px(multiplier.x * delta.x)}, ${px(multiplier.y * delta.y)})`
      dialog.dataset.translateY = multiplier.y * delta.y
      dialog.dataset.translateX = multiplier.x * delta.x
      const attrs = e.target.attributes
      for(i = 0; i < attrs.length; ++i) {
        img.setAttribute(attrs[i].name, attrs[i].value)
      }
      e.target.dataset.lightboxExpanded = true
      e.target.style.setProperty('opacity', 0)
      img.style.setProperty('cursor', 'auto')
      img.style.setProperty('width', '100%')
      dialog.appendChild(img)
      portal.create(wrapper)
      requestAnimationFrame(() => {
        dialog.style.transform = 'translateY(0) scale(1.15)'
        backdrop.style.opacity = options.backdropOpacity
      })
    })
  })
}
