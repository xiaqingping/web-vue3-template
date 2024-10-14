<script setup lang="ts">

</script>

<template>
  <div class="page">
    messages
  </div>
</template>

<style scoped lang="scss">
.filter {
  padding: 16px;

  .icon {
    width: 40px;
    font-size: 20px;
  }
}

.list {
  padding: 0 16px 16px 16px;
  height: calc(100% - 80px);
  overflow: auto;

  .item {
    min-height: 80px;
    border-radius: 8px;
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.07);
    background: rgb(255, 255, 255);
    margin-bottom: 10px;
    padding: 10px;

    .header {
      width: 45px;
      height: 45px;
      background: #e7e7ee;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 16px;
      position: relative;

      .unread {
        position: absolute;
        left: 0;
        top: 0;
        width: 10px;
        height: 10px;
        background: red;
        border-radius: 50%;
      }

      i {
        font-size: 22px;
        color: #FF0000;
      }
    }

    .title {
      font-size: 15px;
      font-weight: bold;
    }

    .content {
      font-size: 13px;
      color: rgb(165, 165, 165);
    }
  }
}

.filter-row {
  margin-top: 2px;

  .filter-item {
    padding: 2px 14px;
    margin-right: 10px;
    border-radius: 4px;
    background: rgb(236, 235, 235);
    font-size: 12px;
    line-height: 22px;
    box-sizing: border-box;
    min-width: 60px;
    text-align: center;

    &.active {
      background: rgb(255, 0, 0);
      color: #fff;
    }
  }

  .time {
    height: 40px;
    box-sizing: border-box;
    border: 1px solid rgba(48, 49, 58, 0.39);
    border-radius: 8px;
    background: rgb(255, 255, 255);
    margin: 10px 0 10px 0;
    display: flex;
    align-items: center;
    padding: 6px;

    .time-rang {
      padding-left: 10px;
      text-align: center;
      color: rgb(24, 24, 27);
      font-size: 16px;
      font-weight: 400;
      line-height: 28px;
      letter-spacing: 0.2px;

      .placeholder {
        color: rgb(128, 136, 151);
      }
    }
  }
}

.filter-btn {
  width: 48%;
  box-sizing: border-box;
  border: 1px solid rgba(48, 49, 58, 0.39);
  border-radius: 8px;
}

.tag {
  border: 1px solid #1CDF15;
  color: #1CDF15;
  background: rgba(28, 223, 21, 0.23);
  display: inline-block;
  padding: 0 8px;
  line-height: 18px;
  border-radius: 4px;
  font-size: 10px;
}

</style>
