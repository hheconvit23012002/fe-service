<script setup>
import { defineProps, defineEmits, ref } from "vue";
import {onClickOutside} from '@vueuse/core'

const props = defineProps({
  isOpen: Boolean,
  order : Object
});

const emit = defineEmits(["modal-close"]);

const target = ref(null)
onClickOutside(target, ()=>emit('modal-close'))

</script>

<template>
  <div v-if="isOpen" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container" ref="target">
        <div class="modal-body">
          <table class="table table-striped">
            <thead>
            <tr>
              <th class="text-center">ID</th>
              <th class="text-center">title</th>
              <th class="text-center">price</th>
              <th class="text-center">number</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(value,index) in order.order_detail" :key="index">
              <td class="text-center">{{ index + 1 }}</td>
              <td class="text-center">{{ value.name_product }}</td>
              <td class="text-center">{{ value.price }}</td>
              <td class="text-center">{{ value.number }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-container {
  width: 300px;
  margin: 150px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}

</style>