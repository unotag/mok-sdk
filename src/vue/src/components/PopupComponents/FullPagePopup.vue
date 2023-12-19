<template>
    <div v-if="latestPopupData">
      <div
        style="
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: end;
          flex-direction: column;
          z-index: 9999;
        "
      >
        <button
          @click="() => handleCloseBtn(latestPopupData?.payload?.in_app_id)"
          style="
            background: rgba(0, 0, 0, 0.5);
            border: none;
            cursor: pointer;
            height: 32px;
            width: 32px;
            border-radius: 50%;
            box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 10px;
            font-size: 26px;
            position: absolute;
            top: 6px;
            right: 6px;
            z-index: 9999;
          "
        >
          &times;
        </button>
        <div
          style="
            width: 100%;
            height: 100%;
            background: rgb(255, 255, 255);
            text-align: center;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            position: fixed;
            overflow: auto;
          "
        >
          <iframe
            :src="latestPopupData.popup_configs.web_url"
            style="border-width: 0px"
            width="100%"
            height="100%"
          ></iframe>
        </div>
        <div
          style="
            position: absolute;
            bottom: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
          "
        ></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      popupData: Array,
      handleClearAll: Function,
      handleCloseBtn: Function,
      latestPopupData: Object,
    },
  };
  </script>
  
  <style scoped>
  /* Add any scoped styles if needed */
  </style>
  