<template>
  <div class="my-input">
    <el-input v-bind="$attrs" ref="input">
      <!--传递给 el-input 的具名插槽内容-->
      <!--elInputProps是 el-input 从其插槽出口传递出来的-->
      <template v-for="(value, name) in $slots" #[name]="elInputProps">
        <!--本组件接收父组件对应插槽内容的具名插槽出口-->
        <!--需要将 elInputProps 从此出口再传递出去 -->
        <slot :name="name" v-bind="elInputProps || {}"></slot>
      </template>
    </el-input>
  </div>
</template>

<script>
export default {
  mounted() {
    /** 将 el-input 的方法转发给当前组件实例 */
    const entries = Object.entries(this.$ref.input);
    for (const [key, value] of entries) {
      this[key] = value;
    }
  }
}
</script>

<style scoped>
.my-input {
  transition: 0.3s;
}

.my-input:hover,
.my-input:focus-within {
  filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.3));
}
</style>