<template>
<!--  <div v-if="history.length > 0">-->
<!--    <h5 class="flex flex-center text-brown-6">History</h5>-->
<!--  </div>-->
  <EmptyHistory/>
<!--      <div class="flex flex-center">-->
<!--        <div class="lines"></div>-->
<!--      </div>-->
<!--  <div class="wrapper">-->
<!--    <div class="progress">-->
<!--      <div class="progress_line-bg">-->
<!--        <div class="progress_line" id="progress_line"></div>-->
<!--        <span class="progress_text text-white">50%</span>-->
<!--        <span class="progress_text_bg text-white">50%</span>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--      <div class="q-pa-md flex" style="justify-content: space-between">-->
<!--        <span>Success orders</span>-->
<!--        <span>Declined orders</span>-->
<!--      </div>-->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EmptyHistory from 'components/ordersComponents/EmptyHistory.vue'

export default defineComponent({
  components: { EmptyHistory },
  props: ['user'],
  name: 'History',
  setup () {
    return {
    }
  }
})
</script>

<style lang="scss">
.wrapper{
  margin: 0 auto;
  max-width: 90%;
  width: 90%;
}

.progress_line{
  width: 50%;
  background-color: green;
  bottom: 0;
  color: #fff;
  left: 0;
  top: 0;
  position: absolute;
  text-align: center;
}

.progress_line-bg{
  background-color: red;
  border-radius: 1rem;
  height: 1rem;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.progress_text{
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
}

.progress_text_bg {
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
}
//.lines {
//  width: 90%;
//  border-radius: 80%;
//  position: relative;
//}
//
//.lines::after, .lines::before {
//  content: '';
//  position: absolute;
//  margin: auto;
//  height: 1rem;
//  width: 50%;
//}
//
//.lines::after{
//  left: 0;
//  background: green;
//  border-radius: 1rem 0 0 1rem;
//}
//
//.lines::before{
//  right: 0;
//  background: red;
//  border-radius: 0 1rem 1rem 0;
//}
</style>
