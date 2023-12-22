<template>
  <div>
    <div
      v-if="latestPopupData && latestPopupData.html"
      @click="event => handleOverlayClick(event, latestPopupData?.payload?.in_app_id)"
      style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        z-index: 9999;
      "
    >
      <div
        style="
          position: fixed;
          bottom: 0;
          width: 86%;
          background-color: #fff;
          box-shadow: 0px -5px 15px 0px rgba(0, 0, 0, 0.1);
          transition: bottom 0.3s ease-out;
          padding: 20px;
          height: 50vh;
          max-width: 1150px;
          overflow-y: auto;
          border-radius: 20px 20px 0px 10px;
          left: 50%;
          transform: translateX(-50%);
        "
      >
        <div v-html="latestPopupData.html"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    popupData: Object,
    handleOverlayClick: Function,
    handleCloseBtn: Function,
    latestPopupData: Object,
  },
};
</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>
