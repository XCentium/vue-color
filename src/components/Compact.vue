<template>
  <div role="application" aria-label="Compact color picker" class="vc-compact">
    <ul class="vc-compact-colors" role="listbox">
      <li
        v-for="color in colorsArrayUpperCase()"
        role="option"
        :aria-label="'color:' + color"
        :aria-selected="color === pick"
        class="vc-compact-color-item"
        :key="color"
        :class="{'vc-compact-color-item--white': color === '#FFFFFF' || color === 'transparent' }"
        :style="{background: color}"
        @mouseover="hoveredColor = color"
        @mouseleave="hoveredColor = null"
        @click="handlerClick(color)"
      >
        <div class="vc-compact-dot" v-show="color === pick"></div>
      </li>
    </ul>
    <!-- <div class="vc-compact-meta-data">
      <span v-if="colorDetails.displayName">Name: {{ colorDetails.displayName }},</span>
      <span v-if="colorDetails.value">Value: {{ colorDetails.value }}</span>
    </div> -->
  </div>
</template>

<script>
import colorMixin from '../mixin/color'
import editableInput from './common/EditableInput.vue'

const defaultColors = [
  '#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00',
  '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF',
  '#333333', '#808080', '#CCCCCC', '#D33115', '#E27300', '#FCC400',
  '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF',
  '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00',
  '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E'
]

export default {
  name: 'Compact',
  mixins: [colorMixin],
  props: {
    palette: {
      type: Array,
      default () {
        return defaultColors
      }
    },
    flexColorSettings: {
      type: Array
    }
  },
  components: {
    'ed-in': editableInput
  },
  data () {
    return {
      hoveredColor: null
    }
  },
  computed: {
    pick () {
      return this.colors.hex.toUpperCase()
    }
  },
  methods: {
    handlerClick (color) {
      this.colorChange({
        hex: color,
        source: 'hex'
      })
    },
    colorsArrayUpperCase () {
      let array = this.paletteUpperCase(this.palette, this.flexColorSettings)
      console.log('colorsArrayUpperCase colors variable:', array)
      if (typeof array[0] === 'string') {
        return array
      } else if (typeof array[0] === 'object') {
        return array.map(() => {
          return array.value
        })
      }
    }
  }
}

</script>

<style>
.vc-compact {
  padding-top: 5px;
  padding-left: 5px;
  width: 240px;
  border-radius: 2px;
  box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);
  background-color: #fff;
}
.vc-compact-colors {
  overflow: hidden;
  padding: 0;
  margin: 0;
}
.vc-compact-color-item {
  list-style: none;
  width: 15px;
  height: 15px;
  float: left;
  margin-right: 5px;
  margin-bottom: 5px;
  position: relative;
  cursor: pointer;
}
.vc-compact-color-item--white {
  box-shadow: inset 0 0 0 1px #ddd;
}
.vc-compact-color-item--white .vc-compact-dot {
  background: #000;
}

.vc-compact-dot {
  position: absolute;
  top: 5px;
  right: 5px;
  bottom: 5px;
  left: 5px;
  border-radius: 50%;
  opacity: 1;
  background: #fff;
}

.vc-compact-meta-data {
  min-height: 20px;
  font-size: .8rem
}
</style>
