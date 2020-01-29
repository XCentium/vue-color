<template>
  <div role="application" aria-label="Compact color picker" class="vc-compact">
    <ul class="vc-compact-colors" role="listbox">
      <li
        v-for="color in paletteUpperCase(palette)"
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
    <div class="vc-compact-meta-data">
      {{ colorDetails }}
      <span v-if="colorDetails.displayName">Name: {{ colorDetails.displayName }},</span>
      <span v-if="colorDetails.value">Value: {{ colorDetails.value }}</span>
    </div>
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
      // default () {
      //   return [{"displayName":"Color-1 100","name":"bc-1","value":"#283C48"},{"displayName":"Color-1 200","name":"bc-2","value":"#005773"},{"displayName":"Color-1 300","name":"bc-3","value":"#6399AB"},{"displayName":"Color-1 400","name":"bc-4","value":"#C85228"},{"displayName":"Color-1 500","name":"bc-5","value":"#75C0BF"},{"displayName":"Color-2 100","name":"bc-6","value":"#9CCA96"},{"displayName":"Color-2 200","name":"bc-7","value":"#FFFFFF"},{"displayName":"Color-2 300","name":"bc-8","value":"#3A3A44"},{"displayName":"Color-2 400","name":"bc-9","value":"#42424D"},{"displayName":"Color-2 500","name":"bc-10","value":"#656576"},{"displayName":"Color-3 100","name":"bc-11","value":"#75758B"},{"displayName":"Color-3 200","name":"bc-12","value":"#B7B7C1"},{"displayName":"Color-3 300","name":"bc-13","value":"#C4C4CC"},{"displayName":"Color-3 400","name":"bc-14","value":"#DEDEDE"},{"displayName":"Color-3 500","name":"bc-15","value":"#FFFFFF"},{"displayName":"Color-4 100","name":"bc-16","value":"#FFFFFF"},{"displayName":"Color-4 200","name":"bc-17","value":"#FFFFFF"},{"displayName":"Color-4 300","name":"bc-18","value":"#FFFFFF"},{"displayName":"Color-4 400","name":"bc-19","value":"#FFFFFF"},{"displayName":"Color-4 500","name":"bc-20","value":"#FFFFFF"},{"displayName":"Color-5 100","name":"bc-21","value":"#FFFFFF"},{"displayName":"Color-5 200","name":"bc-22","value":"#FFFFFF"},{"displayName":"Color-5 300","name":"bc-23","value":"#FFFFFF"},{"displayName":"Color-5 400","name":"bc-24","value":"#FFFFFF"},{"displayName":"Color-5 500","name":"bc-25","value":"#FFFFFF"},{"displayName":"Color-6 100","name":"bc-26","value":"#FFFFFF"},{"displayName":"Color-6 200","name":"bc-27","value":"#FFFFFF"},{"displayName":"Color-6 300","name":"bc-28","value":"#FFFFFF"},{"displayName":"Color-6 400","name":"bc-29","value":"#FF0000"},{"displayName":"Color-6 500","name":"bc-30","value":"#00FF00"},{"displayName":"Color-7 100","name":"bc-31","value":"#000000"},{"displayName":"Color-7 200","name":"bc-32","value":"#FFFFFF"},{"displayName":"Color-7 300","name":"bc-33","value":"#FFFFFF"},{"displayName":"Color-7 400","name":"bc-34","value":"#FFFFFF"},{"displayName":"Color-7 500","name":"bc-35","value":"#FFFFFF"}]
      // }
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
      // console.log('this.colors.hex', this.colors.hex);
      return this.colors.hex.toUpperCase()
    }
  },
  methods: {
    handlerClick (color) {
      this.colorChange({
        hex: color,
        source: 'hex'
      })
    }
    // colorsArrayUpperCase () {
    //   let array = this.paletteUpperCase(this.palette, this.flexColorSettings)
    //   console.log('colorsArrayUpperCase colors variable:', array)
    //   if (typeof array[0] === 'string') {
    //     return array
    //   } else if (typeof array[0] === 'object') {
    //     return array.map(() => {
    //       return array.value
    //     })
    //   }
    // }
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
  min-height: 17px;
  font-size: .8rem
}
</style>
