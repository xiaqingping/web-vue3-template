<script setup lang="ts">
// import { t } from '@/lang'
// import { routerTo } from '@/util'
// import { useConfigStore } from '@/stores/user'
//
// const config = useConfigStore()
//
// const toPage = (type: number) => {
//   switch (type) {
//     case 1:
//       routerTo('/mySharing')
//       break
//     case 2:
//       routerTo('/shareMe')
//       break
//     case 6:
//       routerTo('/groupManage')
//       break
//   }
// }

</script>

<template>
  <div class="page">

  </div>
</template>

<style scoped lang="scss">
.works {
  padding: 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 160px 160px;
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  overflow: auto;
  height: 100%;
}

.work-item {
  height: 160px;
  box-sizing: border-box;
  border: 1px solid rgb(238, 238, 238);
  border-radius: 8px;
  background: rgb(255, 255, 255);
  flex-direction: column;
  padding: 10px;
  user-select: none;

  .text {
    margin-top: 20px;
    color: rgb(34, 33, 44);
    font-size: 15px;
    text-align: center;
  }
}
</style>
