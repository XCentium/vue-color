<template>
  <div role="application" aria-label="Compact color picker" class="vc-compact" :class="{'big-swatch-styles': bigSwatchStyles, 'list-layout': listLayout}">
    <template v-if="listLayout">
        <li
          v-if="showNoColor"
          role="option"
          :aria-label="'No Color'"
          :aria-selected="colors.nocolor"
          class="vc-compact-list-layout-item-container"
          @click="handlerClick('#00000000')"
        >
          <div
            class="vc-compact-list-layout-color-item vc-compact-list-layout-color-item--no-color vc-compact-color-item--white"
          >
            <div class="vc-compact-dot list-layout" v-show="colors.nocolor"></div>
          </div>
            <span class="vc-compact-color-label">No Color</span>
        </li>
        <li
          v-if="showTransparent"
          role="option"
          :aria-label="'Transparent'"
          :aria-selected="colors.a === 0 && colors.hex8 === '#FFFFFF00'"
          class="vc-compact-list-layout-item-container"
          @click="handlerClick('#FFFFFF00')"
        >
          <div
            class="vc-compact-list-layout-color-item vc-compact-color-item--white"
          >
            <checkboard></checkboard>
            <div class="vc-compact-dot list-layout" v-show="colors.a === 0 && colors.hex8 === '#FFFFFF00'"></div>
          </div>
            <span class="vc-compact-color-label">Transparent</span>
        </li>
      <ul class="vc-compact-colors" role="listbox">
        <template v-for="c in paletteUpperCase(palette)">
          <li
            role="option"
            :aria-label="'color:' + c"
            :aria-selected="c === pick"
            class="vc-compact-list-layout-item-container"
            :key="c"
            @click="handlerClick(c)"
          >
            <div
              :style="{background: c}"
              class="vc-compact-list-layout-color-item"
              :class="{'vc-compact-color-item--white': c === '#FFFFFF'}"
            >
              <div class="vc-compact-dot" :class="{'list-layout': listLayout}" v-show="c === pick && colors.a !== 0"></div>
            </div>
            <span class="vc-compact-color-label" v-html="getColorName(c, colorDetails)"></span>
          </li>
          <li class="vc-compact-list-layout-tooltip-container" :key="c + '-label'" aria-hidden>
            <span class="vc-compact-list-layout-tooltip" v-html="c"></span>
          </li>
        </template>
      </ul>
    </template>

    <template v-else>
      <ul class="vc-compact-colors" :class="{'list-layout': listLayout}" role="listbox">
        <li
          v-for="c in paletteUpperCase(palette)"
          role="option"
          :aria-label="'color:' + c"
          :aria-selected="c === pick"
          class="vc-compact-color-item"
          :key="c"
          :class="{'vc-compact-color-item--white': c === '#FFFFFF', 'big-swatch-styles': bigSwatchStyles}"
          :style="{background: c}"
          @click="handlerClick(c)"
        >
          <div class="vc-compact-dot" :class="{'big-swatch-styles': bigSwatchStyles}" v-show="c === pick"></div>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import colorMixin from '../mixin/color'
import editableInput from './common/EditableInput.vue'
import checkboard from './common/Checkboard.vue'

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
    listLayout: {
      type: Boolean,
      default: false
    },
    bigSwatchStyles: {
      type: Boolean,
      default: false
    },
    showNoColor: {
      type: Boolean,
      default: false
    },
    showTransparent: {
      type: Boolean,
      default: false
    },
    flexColorSettings: {
      type: Array
      // default () {
      //   return [{"displayName":"Color-1 100","name":"bc-1","value":"#283C48"},{"displayName":"Color-1 200","name":"bc-2","value":"#005773"},{"displayName":"Color-1 300","name":"bc-3","value":"#6399AB"},{"displayName":"Color-1 400","name":"bc-4","value":"#C85228"},{"displayName":"Color-1 500","name":"bc-5","value":"#75C0BF"},{"displayName":"Color-2 100","name":"bc-6","value":"#9CCA96"},{"displayName":"Color-2 200","name":"bc-7","value":"#FFFFFF"},{"displayName":"Color-2 300","name":"bc-8","value":"#3A3A44"},{"displayName":"Color-2 400","name":"bc-9","value":"#42424D"},{"displayName":"Color-2 500","name":"bc-10","value":"#656576"},{"displayName":"Color-3 100","name":"bc-11","value":"#75758B"},{"displayName":"Color-3 200","name":"bc-12","value":"#B7B7C1"},{"displayName":"Color-3 300","name":"bc-13","value":"#C4C4CC"},{"displayName":"Color-3 400","name":"bc-14","value":"#DEDEDE"},{"displayName":"Red Orange Super Long Name","name":"bc-15","value":"#F44E3B"},{"displayName":"Orange","name":"bc-16","value":"#FE9200"},{"displayName":"Color-4 200","name":"bc-17","value":"#FFFFFF"},{"displayName":"Color-4 300","name":"bc-18","value":"#FFFFFF"},{"displayName":"Color-4 400","name":"bc-19","value":"#FFFFFF"},{"displayName":"Color-4 500","name":"bc-20","value":"#FFFFFF"},{"displayName":"Color-5 100","name":"bc-21","value":"#FFFFFF"},{"displayName":"Color-5 200","name":"bc-22","value":"#FFFFFF"},{"displayName":"Color-5 300","name":"bc-23","value":"#FFFFFF"},{"displayName":"Color-5 400","name":"bc-24","value":"#FFFFFF"},{"displayName":"Color-5 500","name":"bc-25","value":"#FFFFFF"},{"displayName":"Color-6 100","name":"bc-26","value":"#FFFFFF"},{"displayName":"Color-6 200","name":"bc-27","value":"#FFFFFF"},{"displayName":"Color-6 300","name":"bc-28","value":"#FFFFFF"},{"displayName":"Color-6 400","name":"bc-29","value":"#FF0000"},{"displayName":"Color-6 500","name":"bc-30","value":"#00FF00"},{"displayName":"Color-7 100","name":"bc-31","value":"#000000"},{"displayName":"Color-7 200","name":"bc-32","value":"#FFFFFF"},{"displayName":"Color-7 300","name":"bc-33","value":"#FFFFFF"},{"displayName":"Color-7 400","name":"bc-34","value":"#FFFFFF"},{"displayName":"Color-7 500","name":"bc-35","value":"#FFFFFF"}]
      // }
    }
  },
  components: {
    'ed-in': editableInput,
    checkboard
  },
  mounted () {
    console.log('pick on mount:', this.pick)
  },
  watch: {
    pick () {
      console.log('pick changed:', this.pick)
    }
  },
  computed: {
    pick () {
      return (this.colors.hex8 === '#00000000' || this.colors.hex8 === '#FFFFFF00') ? this.colors.hex8.toUpperCase() : this.colors.hex.toUpperCase()
      // return this.colors.hex.toUpperCase()
    }
  },
  methods: {
    handlerClick (c) {
      let source = (c.length === 9) ? 'hex8' : 'hex'
      console.log('source determined in handlerClick():', source)
      console.log('color in handlerClick()', c)
      this.colorChange({
        hex: c,
        source: source
      })
    }
  }
}

</script>

<style>
.vc-compact {
  overflow: hidden;
  padding-top: 5px;
  padding-left: 5px;
  width: 240px;
  border-radius: 2px;
  box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);
  background-color: #fff;
}
.vc-compact.list-layout {
  height: 340px;
  overflow-y: auto;
  padding-bottom: 5px;
}
.vc-compact.big-swatch-styles {
  width: 217px;
}
.vc-compact-colors {
  padding: 0;
  margin: 0;
}
.vc-compact-colors.list-layout {
  overflow-y: auto;
}
.vc-compact-list-layout-item-container {
  list-style: none;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 5px;
}
.vc-compact-list-layout-color-item {
  display: inline-block;
  width: 40px;
  min-width: 40px;
  height: 24px;
  margin-right: 5px;
  position: relative;
  vertical-align: middle;
}
.vc-compact-list-layout-color-item--no-color {
  background: linear-gradient(-30deg,
  rgba(255, 255, 255, 1) calc(50% - 2px),
  rgba(255,0,0,1) calc(50%),
  rgba(255, 255, 255, 1) calc(50% + 2px));
}
.vc-compact-color-label {
  vertical-align: middle;
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
.vc-compact-color-item.big-swatch-styles {
  width: 26px;
  height: 26px;
}
.vc-compact-color-item--white, .vc-checkerboard {
  box-shadow: inset 0 0 0 1px #ddd;
}
.vc-compact-color-item--white .vc-checkerboard {
  background-size: auto;
}
.vc-compact-color-item--white .vc-compact-dot {
  background: #000;
}
.vc-compact-list-layout-tooltip-container {
  opacity: 0;
  height: 0;
  position: relative;
  transition: opacity .5s;
  pointer-events: none;
}
.vc-compact-list-layout-item-container:hover + .vc-compact-list-layout-tooltip-container {
  opacity: 1;
}
.vc-compact-list-layout-tooltip {
  background-color: #fff;
  border: 1px solid #000;
  padding: 2px;
  font-size: .7rem;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
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
.vc-compact-dot.list-layout {
  width: 10px;
  height: 10px;
  top: 50%;
  right: unset;
  bottom: unset;
  left: 50%;
  transform: translate(-50%, -50%);
}
.vc-compact-dot.big-swatch-styles {
  top: 8px;
  right: 8px;
  bottom: 8px;
  left: 8px;
}
</style>
