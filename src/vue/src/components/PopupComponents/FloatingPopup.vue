<template>
  <div v-if="latestPopupData">
    <div ref='draggableElement' @click="event => handleOverlayClick(event, latestPopupData?.payload?.in_app_id)" id="mydiv" class="draggable-div"
      :style="{
        width: '200px',
        height: 'auto',
        top: `${position.top}px`,
        left: `${position.left}px`,
        position: 'fixed',
        zIndex: 9999,
        textAlign: 'center',
      }" @mousedown="dragStart" @mousemove="elementDrag" @mouseup="closeDragElement" @touchstart="dragStart"
      @touchmove="elementDrag" @touchend="closeDragElement">
      <video :style="{
        border: '2px solid #ffffff',
        borderRadius: '10px',
        width: '200px',
        height: 'auto',
      }" controls autoplay loop>
        <source :src="latestPopupData.popup_configs.video_url" type="video/mp4" />
      </video>
      <button @click="() => handleCloseBtn(latestPopupData?.payload?.in_app_id)" style="
            position: absolute;
            top: -10px;
            right: -10px;
            background: white;
            border: none;
            font-size: 20px;
            width: 24px;
            height: 24px;
            border-radius: 50%;
          ">
        &times;
      </button>
    </div>
  </div>
</template>
  
<script>
export default {
  props: {
    popupData: Array,
    handleCloseBtn: Function,
    handleOverlayClick: Function,
    latestPopupData: Object,
  },
  data() {
    return {
      isDragging: false,
      position: { left: 0, top: 0 },
      initialMousePos: { x: 0, y: 0 },
    };
  },
  methods: {

    dragStart(e) {
      e.preventDefault();
      this.isDragging = true;

      if (e.type === "touchstart") {
        this.initialMousePos = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      } else {
        this.initialMousePos = {
          x: e.clientX,
          y: e.clientY,
        };
      }
    },
    elementDrag(e) {
      if (!this.isDragging) return;

      const currentMousePos = { x: e.clientX, y: e.clientY };

      const left =
        currentMousePos.x - this.initialMousePos.x + this.position.left;
      const top = currentMousePos.y - this.initialMousePos.y + this.position.top;

      const maxX = window.innerWidth - this.$refs.draggableElement.offsetWidth;
      const maxY =
        window.innerHeight - this.$refs.draggableElement.offsetHeight;

      const constrainedLeft = Math.min(maxX, Math.max(0, left));
      const constrainedTop = Math.min(maxY, Math.max(0, top));

      this.position = { left: constrainedLeft, top: constrainedTop };
      this.initialMousePos = currentMousePos;
    },
    closeDragElement() {
      this.isDragging = false;
    },

  },
};
</script>
  
<style scoped>
/* Add any scoped styles if needed */
</style>
  