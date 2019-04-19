<template>
  <div :class="{'vuestic-switch-2':value, 'vuestic-switch-1':!value,}">
    <div class="vuestic-switch-option1 true-option" :class="{'active': value}" @click.prevent="setValue(true)">
      <slot name="trueTitle"></slot>
    </div>
    <div class="vuestic-switch-option2 false-option" :class="{'active': !value}" @click.prevent="setValue(false)">
      <slot name="falseTitle"></slot>
    </div>
  </div>
</template>

<script>
import {bus} from '../../../main'
  export default {
    name: 'vuestic-switch',
    props: {
      value: Boolean
    },
    mounted () {
      this.$emit('input', this.value)
      
    },
    methods: {
      setValue (newVal) {
        this.$emit('input', newVal)
        if(newVal === true){
          bus.$emit('odobren', newVal)
        }else{
          bus.$emit('neodobren', newVal)
        }        
        // console.log(this.value)
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../sass/_variables.scss";

  .vuestic-switch-1 {
    cursor: pointer;
    display: flex;
    flex-direction: row;

    .vuestic-switch-option1 {
      padding: $vuestic-switch-padding;
      border-top: $vuestic-switch-border-size solid transparent;
      border-bottom: $vuestic-switch-border-size solid #f7cc36;
      background-color: transparent;
      transition: all 0.15s ease;
      width: 35%;
      display: flex;
      justify-content: center;
      align-items: center;

      &.active {
        color: $white;
        background-color: $vuestic-switch-bg;
      }

      &:not(.active):hover {
        color: $brand-primary;
       
      }
    }

    .vuestic-switch-option2 {
      padding: $vuestic-switch-padding;
      border-top: $vuestic-switch-border-size solid transparent;
      border-bottom: $vuestic-switch-border-size solid #f7cc36;
      background-color: transparent;
      transition: all 0.15s ease;
      width: 35%;
      display: flex;
      justify-content: center;
      align-items: center;

      &.active {
        color: $white;
        background-color: #f7cc36;
      }

      &:not(.active):hover {
        color: #f7cc36;
        
      }
    }
  }

  .vuestic-switch-2 {
    cursor: pointer;
    display: flex;
    flex-direction: row;

    .vuestic-switch-option1 {
      padding: $vuestic-switch-padding;
      border-top: $vuestic-switch-border-size solid transparent;
      border-bottom: $vuestic-switch-border-size solid $vuestic-switch-bg;
      background-color: transparent;
      transition: all 0.15s ease;
      width: 35%;
      display: flex;
      justify-content: center;
      align-items: center;

      &.active {
        color: $white;
        background-color: $vuestic-switch-bg;
      }

      &:not(.active):hover {
        color: $brand-primary;
       
      }
    }

    .vuestic-switch-option2 {
      padding: $vuestic-switch-padding;
      border-top: $vuestic-switch-border-size solid transparent;
      border-bottom: $vuestic-switch-border-size solid $vuestic-switch-bg;
      background-color: transparent;
      transition: all 0.15s ease;
      width: 35%;
      display: flex;
      justify-content: center;
      align-items: center;

      &.active {
        color: $white;
        background-color: #f7cc36;
      }

      &:not(.active):hover {
        color: #f7cc36;
        
      }
    }
  }
</style>
