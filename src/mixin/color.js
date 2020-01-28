import tinycolor from 'tinycolor2'

function _colorChange (data, oldHue) {
  var alpha = data && data.a
  var color

  // hsl is better than hex between conversions
  if (data && data.hsl) {
    color = tinycolor(data.hsl)
  } else if (data && data.hex && data.hex.length > 0) {
    color = tinycolor(data.hex)
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
    a: data.a || color.getAlpha()
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
    }
    // colorDetails () {
    //   let colorToFind
    //   if (this.hoveredColor) {
    //     colorToFind = this.hoveredColor
    //   } else if (!this.pick) {
    //     return { displayName: '', value: '' }
    //   } else {
    //     colorToFind = this.value.hex
    //   }
    //   return this.flexColorSettings.findIndex(colorObject => colorObject.value === colorToFind) > -1 ? this.flexColorSettings[this.flexColorSettings.findIndex(colorObject => colorObject.value === colorToFind)] : { displayName: '', value: colorToFind }
    // }
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
    paletteUpperCase (palette, flexColorSettings) {
      console.log('flexColorSettings in paletteUpperCase:', flexColorSettings)
      if (flexColorSettings instanceof Array) {
        console.log('Inside flexColorSettings if check')
        let flexColorValues = flexColorSettings.map((colorObject) => {
          return colorObject.value
        })

        return palette.map((color) => {
          let pos = flexColorValues.indexOf(color.toUpperCase())
          if (pos > -1) {
            return { displayName: flexColorSettings[pos].displayName, value: flexColorSettings[pos].value.toUpperCase() }
          } else if (color.toLowerCase() === 'transparent') {
            return { displayName: 'Transparent', value: 'transparent' }
          } else {
            return { displayName: '', value: '' }
          }
        })
      }
      return palette.map(c => c.toUpperCase())
    },
    isTransparent (color) {
      return tinycolor(color).getAlpha() === 0
    }
  }
}
