<template>
  <div class="form-group dropdown" v-dropdown.closeOnMenuClick>
    <button
      id="itemsPerPageBtn"
      :class="{'btn btn-primary btn-sm dropdown-toggle' : range_max === '',
      'btn btn-pale btn-sm dropdown-toggle' : range_max != ''
      }"
      type="button"
      :disabled="false"
      data-toggle="dropdown"
    >
      {{selected}}
      <i class="ion-ios-arrow-down arrow-down"></i>
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <div class="dropdown-menu-content">
        <a
          :key="option.value"
          class="dropdown-item"
          v-for="option in options"
          @click="selectedItemsPerPage(option.value)"
        >{{option.value}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from "../../../../directives/Dropdown";
import { bus } from "../../../../main";
export default {
  directives: {
    Dropdown
  },
  props: {
    options: {
      type: Array,
      required: true
    },
    defaultPerPage: {
      type: String
    },
    range_max: {
      type: String,
      default: ""
    },
    range_min: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selected: this.defaultPerPage
    };
  },
  watch: {
    range_min: function() {
      if (this.range_min != "") {
        this.selected = "Svi Rezultati";
      }
    }
  },
  methods: {
    selectedItemsPerPage(optionValue) {
      bus.$emit("selectedItemsPerPage");
      this.selected = optionValue;
      this.$emit("items-per-page", this.selected);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../sass/variables";

.btn.dropdown-toggle,
.dropdown-menu {
  min-width: 13rem;
  max-width: 13rem;
}

.dropdown-item,
.dropdown-toggle {
  text-transform: uppercase;
}
</style>
