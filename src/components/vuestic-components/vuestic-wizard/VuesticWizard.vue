<template>
  <div class="wizard" :class="computedLayout" v-orientation-handler="{ layout: wizardLayout,  breakPoint: orientationBreakPoint }">
  
    <div v-if="computedLayout === 'horizontal'" class="indicator-container indicator-container-horizontal">
      <simple-horizontal-indicator v-if="wizardType === 'simple'" :steps="steps" :currentStep="currentStep" :completed="wizardCompleted"></simple-horizontal-indicator>
      <rich-horizontal-indicator v-if="wizardType === 'rich'" :steps="steps" :currentStep="currentStep" :completed="wizardCompleted"></rich-horizontal-indicator>
    </div>
  
    <div v-if="computedLayout === 'vertical'" class="indicator-container indicator-container-vertical">
      <rich-vertical-indicator v-if="wizardType === 'rich'" :steps="steps" :currentStep="currentStep" :completed="wizardCompleted"></rich-vertical-indicator>
      <simple-vertical-indicator v-if="wizardType === 'simple'" :steps="steps" :currentStep="currentStep" :completed="wizardCompleted"></simple-vertical-indicator>
    </div>
  
    <div class="wizard-body">
      <div class="wizard-body-step" v-for="step in steps" v-show="isStepShown(step)">
        <slot :name="step.slot" class="step-content"></slot>
      </div>
  
      <div class="wizard-body-step" v-show="wizardCompleted">
        <slot :name="wizardCompletedSlotName" class="step-content"></slot>
      </div>
  
  
      <div class="wizard-body-actions" v-if="!wizardCompleted">
        <div class="btn-container" v-if="backEnabled">
          <div v-if="stepTri">
            <button class="btn btn-secondary wizard-back pull-left" @click="goBack()">
              <span class="fa fa-step-backward"></span>{{ ' nazad'}}
            </button>
          </div>
        </div>
  
        <div class="btn-container" v-if="!isLastStep()">
          <button class="btn btn-primary wizard-next pull-right" @click="goNext()">
              <span class="fa fa-step-forward"></span>{{ ' Naprijed'}}
            </button>
        </div>
  
  
      </div>
      <div id="wrapper" v-if="currentStep == steps.length - 1 && $route.path.includes('/uzorci/unos')">
        <button class="btn btn-secondary wizard-next pull-right final-step" @click="goBack2()">
          <span class="fa fa-flask"></span>{{' Dodaj'}}
        </button>
      </div>
      <br v-if="currentStep == steps.length - 1 && $route.path.includes('/uzorci/unos')">
      <div id="wrapper" v-if="currentStep == steps.length - 1">
        <button class="btn btn-primary wizard-next pull-right final-step" @click="completeWizard()">
          <span class="glyphicon glyphicon-ok"></span>{{lastStepLabel}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import SimpleHorizontalIndicator from './indicators/SimpleHorizontalIndicator.vue'
  import RichHorizontalIndicator from './indicators/RichHorizontalIndicator.vue'
  import RichVerticalIndicator from './indicators/RichVerticalIndicator.vue'
  import SimpleVerticalIndicator from './indicators/SimpleVerticalIndicator.vue'
  import WizardOrientationHandler from './WizardOrientationHandler'
  import router from '../../../router'
  
  export default {
    name: 'vuestic-wizard',
    props: {
      steps: {},
      wizardType: {
        type: String,
        default: 'simple'
      },
      wizardLayout: {
        type: String,
        default: 'horizontal'
      },
      lastStepLabel: {
        default: ' Završi'
      },
      onNext: {},
      onBack: {},
      sekcija: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        currentStep: 0,
        wizardCompleted: false,
        wizardCompletedSlotName: 'Unos Kompletan',
        orientationBreakPoint: 767, // TODO: into config,
        computedLayout: this.wizardLayout,
        stepTri: true
      }
    },
    components: {
      SimpleHorizontalIndicator,
      RichHorizontalIndicator,
      RichVerticalIndicator,
      SimpleVerticalIndicator
    },
    directives: {
      orientationHandler: WizardOrientationHandler
    },
    computed: {
      currentSlot() {
        let slotName = this.steps[this.currentStep].slot
        if (this.wizardCompleted) {
          slotName = this.wizardCompletedSlotName
        }
        return slotName
      },
      backEnabled() {
        return this.currentStep !== 0
      }
    },
    created() {
      this.$on('wizardLayoutChange', this.updateLayout)
    },
    methods: {
      updateLayout(layout) {
        this.computedLayout = layout
      },
      goNext() {
        this.currentStepOnNext()
        if (!this.isLastStep() && this.isCurrentStepValid()) {
          this.currentStep++
        }
        if (this.stepTri === false) {
          this.$emit('uzorakUnesen')
          // console.log(this.$route.path)
          if (this.$route.path === '/kontrole/unos') {
            router.push('/kontrole/pregled')
          } else {
            router.push('/uzorci/pregled/?sekcija=' + this.sekcija)
            // console.log(this.sekcija)
          }
  
          this.stepTri = true
        }
        if (this.currentStep === 3) {
          this.stepTri = false
        }
      },
      goBack() {
        this.currentStepOnBack()
        if (this.currentStep > 0) {
          this.currentStep--
        }
      },
      goBack2() {
        this.goBack()
        this.goBack()
        this.stepTri = !this.stepTri
      },
      completeWizard() {
        this.wizardCompleted = true
        this.goNext()
      },
      isLastStep() {
        return this.currentStep === this.steps.length - 1
      },
      currentStepOnNext() {
        let step = this.steps[this.currentStep]
        if (step.onNext) {
          step.onNext()
        }
      },
      currentStepOnBack() {
        let step = this.steps[this.currentStep]
        if (step.onBack) {
          step.onBack()
        }
      },
      isCurrentStepValid() {
        return this.steps[this.currentStep].isValid()
      },
      isStepShown(step) {
        return step.slot === this.currentSlot && !this.wizardCompleted
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../sass/_variables.scss";
  $wizard-body-vl-step-h-padding: 7%;
  $wizard-indicator-vl-width: 20rem;
  $wizard-body-vl-min-height: 20rem;
  $wizard-body-hl-step-h-padding: 15%;
  $wizard-body-step-v-padding: 2.25rem;
  $wizard-body-step-item-margin-bottom: $wizard-body-step-v-padding;
  .wizard {
    position: relative;
    width: 100%;
    display: flex;
    &.horizontal {
      flex-direction: column;
    }
    &.vertical {
      flex-direction: row;
    }
  }
  
  .wizard-body {
    position: relative;
  }
  
  .wizard-body-step {
    >* {
      display: flex;
      flex-direction: column;
      align-items: center;
      >* {
        margin-bottom: $wizard-body-step-item-margin-bottom;
      }
      >*:last-child {
        margin-bottom: 0;
      }
    }
  }
  
  .wizard-body-actions {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    align-items: baseline;
    .btn-container {
      margin: $wizard-body-step-item-margin-bottom $wizard-body-step-item-margin-bottom/2 0 $wizard-body-step-item-margin-bottom/2;
    }
  }
  
  .vertical {
    .wizard-body {
      min-height: $wizard-body-vl-min-height;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: $wizard-body-step-v-padding $wizard-body-vl-step-h-padding;
    }
    .indicator-container {
      flex-basis: $wizard-indicator-vl-width;
      max-width: $wizard-indicator-vl-width;
      flex-grow: 0;
      flex-shrink: 0;
      position: relative;
    }
  }
  
  .horizontal {
    .wizard-body {
      padding: $wizard-body-step-v-padding $wizard-body-hl-step-h-padding;
    }
  }
  
  #wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
