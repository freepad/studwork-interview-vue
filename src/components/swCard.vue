<template>
  <div class="swCard">
    <div class="swCard_header">
      <slot name="header" />
    </div>
    <div class="swCard_content">
      <slot name="content" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .swCard {
    background: #34495E;
    border-radius: 25px;
    color: white;

    &_header {
      padding: 10px 0 10px 30px;
    }

    &_content {
      padding: 10px 5px;
    }
  }
</style>
