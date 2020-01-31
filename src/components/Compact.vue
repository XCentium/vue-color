<template>
  <div role="application" aria-label="Compact color picker" class="vc-compact" :class="{'big-swatch-styles': bigSwatchStyles, 'list-layout': listLayout}">
    <template v-if="listLayout">
      <ul class="vc-compact-colors" role="listbox">
        <li
          v-for="c in paletteUpperCase(palette)"
          role="option"
          :aria-label="'color:' + c"
          :aria-selected="c === pick"
          class="vc-compact-list-layout-item-container"
          :key="c"
          @mouseover="hoveredColor = c"
          @mouseleave="hoveredColor = null"
          @click="handlerClick(c)"
        >
          <div
            :style="{background: c}"
            class="vc-compact-list-layout-color-item"
            :class="{'vc-compact-color-item--white': c === '#FFFFFF'}"
          >
            <div class="vc-compact-dot" :class="{'list-layout': listLayout}" v-show="c === pick"></div>
          </div>
          <span class="vc-compact-color-label" v-html="getColorName(c, colorDetails)"></span>
        </li>
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
          @mouseover="hoveredColor = c"
          @mouseleave="hoveredColor = null"
          @click="handlerClick(c)"
        >
          <div class="vc-compact-dot" :class="{'big-swatch-styles': bigSwatchStyles}" v-show="c === pick"></div>
        </li>
      </ul>
    </template>
    <!-- <ul class="vc-compact-colors" role="listbox">
      <li
        v-for="c in paletteUpperCase(palette)"
        role="option"
        :aria-label="'color:' + c"
        :aria-selected="c === pick"
        class="vc-compact-color-item"
        :key="c"
        :class="{'vc-compact-color-item--white': c === '#FFFFFF', 'big-swatch-styles': bigSwatchStyles}"
        :style="{background: c}"
        @mouseover="hoveredColor = c"
        @mouseleave="hoveredColor = null"
        @click="handlerClick(c)"
      >
        <div class="vc-compact-dot" :class="{'big-swatch-styles': bigSwatchStyles}" v-show="c === pick"></div>
      </li>
    </ul> -->
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
    listLayout: {
      type: Boolean,
      default: false
    },
    // bigSwatchStyles: {
    //   type: Boolean,
    //   default: true
    // },
    flexColorSettings: {
      type: Array
      // default () {
      //   return [{"displayName":"Color-1 100","name":"bc-1","value":"#283C48"},{"displayName":"Color-1 200","name":"bc-2","value":"#005773"},{"displayName":"Color-1 300","name":"bc-3","value":"#6399AB"},{"displayName":"Color-1 400","name":"bc-4","value":"#C85228"},{"displayName":"Color-1 500","name":"bc-5","value":"#75C0BF"},{"displayName":"Color-2 100","name":"bc-6","value":"#9CCA96"},{"displayName":"Color-2 200","name":"bc-7","value":"#FFFFFF"},{"displayName":"Color-2 300","name":"bc-8","value":"#3A3A44"},{"displayName":"Color-2 400","name":"bc-9","value":"#42424D"},{"displayName":"Color-2 500","name":"bc-10","value":"#656576"},{"displayName":"Color-3 100","name":"bc-11","value":"#75758B"},{"displayName":"Color-3 200","name":"bc-12","value":"#B7B7C1"},{"displayName":"Color-3 300","name":"bc-13","value":"#C4C4CC"},{"displayName":"Color-3 400","name":"bc-14","value":"#DEDEDE"},{"displayName":"Red Orange Orange","name":"bc-15","value":"#F44E3B"},{"displayName":"Orange","name":"bc-16","value":"#FE9200"},{"displayName":"Color-4 200","name":"bc-17","value":"#FFFFFF"},{"displayName":"Color-4 300","name":"bc-18","value":"#FFFFFF"},{"displayName":"Color-4 400","name":"bc-19","value":"#FFFFFF"},{"displayName":"Color-4 500","name":"bc-20","value":"#FFFFFF"},{"displayName":"Color-5 100","name":"bc-21","value":"#FFFFFF"},{"displayName":"Color-5 200","name":"bc-22","value":"#FFFFFF"},{"displayName":"Color-5 300","name":"bc-23","value":"#FFFFFF"},{"displayName":"Color-5 400","name":"bc-24","value":"#FFFFFF"},{"displayName":"Color-5 500","name":"bc-25","value":"#FFFFFF"},{"displayName":"Color-6 100","name":"bc-26","value":"#FFFFFF"},{"displayName":"Color-6 200","name":"bc-27","value":"#FFFFFF"},{"displayName":"Color-6 300","name":"bc-28","value":"#FFFFFF"},{"displayName":"Color-6 400","name":"bc-29","value":"#FF0000"},{"displayName":"Color-6 500","name":"bc-30","value":"#00FF00"},{"displayName":"Color-7 100","name":"bc-31","value":"#000000"},{"displayName":"Color-7 200","name":"bc-32","value":"#FFFFFF"},{"displayName":"Color-7 300","name":"bc-33","value":"#FFFFFF"},{"displayName":"Color-7 400","name":"bc-34","value":"#FFFFFF"},{"displayName":"Color-7 500","name":"bc-35","value":"#FFFFFF"}]
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
      return this.colors.hex.toUpperCase()
    }
  },
  methods: {
    handlerClick (c) {
      this.colorChange({
        hex: c,
        source: 'hex'
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
/* .vc-compact.big-swatch-styles {
  width: 217px;
} */
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
/* .vc-compact-list-layout-item-container:first-of-type .vc-compact-list-layout-color-item {
  margin-top: 0px;
} */
.vc-compact-list-layout-item-container:last-of-type {
  margin-bottom: 0px;
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

.vc-compact-color-label {
  /* height: 24px; */
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
/* .vc-compact-color-item.big-swatch-styles {
  width: 26px;
  height: 26px;
} */
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
.vc-compact-dot.list-layout {
  width: 10px;
  height: 10px;
  top: 50%;
  right: unset;
  bottom: unset;
  left: 50%;
  transform: translate(-50%, -50%);
}
/* .vc-compact-dot.big-swatch-styles {
  top: 8px;
  right: 8px;
  bottom: 8px;
  left: 8px;
} */

/* .vc-compact-meta-data {
  min-height: 17px;
  font-size: .8rem
} */
</style>
