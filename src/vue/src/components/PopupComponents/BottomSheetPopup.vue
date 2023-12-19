<template>
    <div v-if="popupData[popupData.length - 1]?.html">
      <div
        style="
          position: fixed;
          top: 0;
          left: 0;
          z-index: -1;
          width: 100%;
          height: 100%;
          opacity: 0.2;
          background: #000;
        "
      ></div>
      <div
        style="
          width: auto;
          position: relative;
          background: #fff;
          max-height: 100vh;
          height: 50vh;
          max-width: 1150px;
          padding: 25px 30px;
          overflow-y: auto;
          transform: translateY(100%);
          border-radius: 12px 12px 0 0;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.03);
          transition: 0.3s ease;
        "
      >
        <div v-html="popupData[popupData.length - 1].html"></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      popupData: Array,
      handleOverlayClick: Function,
      handleCloseBtn: Function,
    },
  };
  </script>
  
  <style scoped>
  /* Add any scoped styles if needed */
  </style>
  