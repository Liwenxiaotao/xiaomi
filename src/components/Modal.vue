<!-- 模态框 -->
<template>
  <transition name="slide">
    <div class="modal" v-show="showModal">
      <div class="mask"></div>
      <div class="modal-dialog">
        <div class="modal-header">
          <span>{{title}}</span>
          <a href="javascript:;" class="icon-close" @click="$emit('cancel')"></a>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <a href="javascript:;" v-if="btnType==1" @click="$emit('submit')" class="btn">{{sureText}}</a>
          <a href="javascript:;" v-else-if="btnType==2" @click="$emit('cancel')" class="btn">{{cancelText}}</a>
          <div class="btn-group" v-else>
            <a href="javascript:;" class="btn" @click="$emit('submit')">{{sureText}}</a>
            <a href="javascript:;" class="btn btn-default" @click="$emit('cancel')">{{cancelText}}</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'modal',
  props: {
    modalType: {
      type: String,
      defaule: 'form',
    },
    title: String,
    // 按钮类型： 1、确定按钮 2、取消按钮 3、确定按钮
    btnType: String,
    sureText: {
      type: String,
      default: '确定',
    },
    cancelText: {
      type: String,
      default: '取消',
    },
    showModal: Boolean
  },
  data() {
    return {
    }
  },
  components: {},
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/mixin.scss';
  @import '../assets/scss/config.scss';
  @import '../assets/scss/modal.scss';
</style>
