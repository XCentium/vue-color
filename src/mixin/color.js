import tinycolor from 'tinycolor2'

function _colorChange (data, oldHue) {
  console.log('data is:', data)
  var alpha = data && data.a
  var color
  let nocolor = data === '#00000000' || (data.source === 'hex8' && data.hex8 === '#00000000')

  // hsl is better than hex between conversions
  if (data && data.hsl) {
    color = tinycolor(data.hsl)
  } else if (data && data.hex && data.hex.length > 0) {
    color = tinycolor(data.hex)
    // To preserve the passed in #FFFFFF00 value for toggling transparent color
  } else if (data && data.hex8 && data.hex8.toUpperCase() === '#FFFFFF00') {
    color = tinycolor(data.hex8)
    // To preserve the passed in #00000000 value for toggling no color
  } else if (nocolor) {
    if (data.hex8) {
      color = tinycolor(data.hex8)
    } else {
      color = tinycolor(data)
    }
  } else {
    color = tinycolor(data)
  }

  if (color && (color._a === undefined || color._a === null)) {
    color.setAlpha(alpha || 1)
  }

  var hsl = color.toHsl()
  var hsv = color.toHsv()

  if (hsl.s === 0) {
    hsv.h = hsl.h = data.h || (data.hsl && data.hsl.h) || oldHue || 0
  }

  /* --- comment this block to fix #109, may cause #25 again --- */
  // when the hsv.v is less than 0.0164 (base on test)
  // because of possible loss of precision
  // the result of hue and saturation would be miscalculated
  // if (hsv.v < 0.0164) {
  //   hsv.h = data.h || (data.hsv && data.hsv.h) || 0
  //   hsv.s = data.s || (data.hsv && data.hsv.s) || 0
  // }

  // if (hsl.l < 0.01) {
  //   hsl.h = data.h || (data.hsl && data.hsl.h) || 0
  //   hsl.s = data.s || (data.hsl && data.hsl.s) || 0
  // }
  /* ------ */

  return {
    hsl: hsl,
    hex: color.toHexString().toUpperCase(),
    hex8: color.toHex8String().toUpperCase(),
    rgba: color.toRgb(),
    hsv: hsv,
    oldHue: data.h || oldHue || hsl.h,
    source: data.source,
    a: data.a || color.getAlpha(),
    nocolor: nocolor
  }
}

export default {
  props: ['value'],
  data () {
    return {
      val: _colorChange(this.value)
    }
  },
  computed: {
    colors: {
      get () {
        return this.val
      },
      set (newVal) {
        this.val = newVal
        this.$emit('input', newVal)
      }
    },
    colorDetails () {
      return this.flexColorSettings
    }
  },
  watch: {
    value (newVal) {
      this.val = _colorChange(newVal)
    }
  },
  methods: {
    colorChange (data, oldHue) {
      this.oldHue = this.colors.hsl.h
      this.colors = _colorChange(data, oldHue || this.oldHue)
    },
    isValidHex (hex) {
      return tinycolor(hex).isValid()
    },
    simpleCheckForValidColor (data) {
      var keysToCheck = ['r', 'g', 'b', 'a', 'h', 's', 'l', 'v']
      var checked = 0
      var passed = 0

      for (var i = 0; i < keysToCheck.length; i++) {
        var letter = keysToCheck[i]
        if (data[letter]) {
          checked++
          if (!isNaN(data[letter])) {
            passed++
          }
        }
      }

      if (checked === passed) {
        return data
      }
    },
    paletteUpperCase (palette) {
      return palette.filter(c => c.toLowerCase() !== 'transparent').map(c => c.toUpperCase())
    },
    isTransparent (color) {
      return tinycolor(color).getAlpha() === 0
    },
    getColorName (color, colorDetails) {
      if (colorDetails) {
        let colorIndex = colorDetails.findIndex(colorObject => colorObject.value.toUpperCase() === color.toUpperCase())
        return colorIndex > -1 ? colorDetails[colorIndex].displayName : 'No Color Name'
      }
      return 'No Color Details'
    }
  }
}
