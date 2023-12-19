<template>
  <div>
    <div v-if="latestPopupData?.html" @click="event => handleOverlayClick(event, latestPopupData?.payload?.in_app_id)"
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
        ">
      <div v-for="(item, index) in popupData.slice().reverse().slice(0, 3)" :key="index" :style="{
          top: `${46 + index * 1.5}%`,
          width: '75%',
          maxWidth: '420px',
          maxHeight: '70%',
          height: 'auto',
          background: 'rgb(255, 255, 255)',
          borderRadius: '10px',
          padding: '20px',
          textAlign: 'center',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          transform: `translate(-50%, -50%) scale(${1 - index * 0.02})`,
          position: 'fixed',
          left: '50%',
          overflow: 'auto',
          zIndex: 99000 - index,
          transition: '2s',
        }
        ">
        <button @click="() => handleCloseBtn(latestPopupData?.payload?.in_app_id)" style="
              background-color: transparent;
              border: none;
              cursor: pointer;
              font-size: 28px;
              position: absolute;
              top: 5px;
              right: 5px;
            ">
          &times;
        </button>
        <div v-if="popupData.length > 0 && popupData[popupData.length - 1]?.html"
          v-html="popupData[popupData.length - 1].html"></div>
      </div>
      <div style="
          position: absolute;
          bottom: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
        ">
        <div v-if="popupData.length > 1" style="
            color: white;
            cursor: pointer;
            font-size: 20px;
          ">
          {{ popupData.length - 1 }} more messages
        </div>
        <div @click="handleClearAll" style="
            color: black;
            font-size: 17px;
            font-weight: 300;
            margin-top: 10px;
            border: 1px solid black;
            padding: 1px 10px;
            border-radius: 20px;
            background: rgba(0, 0, 0, 0.2);
            width: fit-content;
            cursor: pointer;
          ">
          &times; clear all
        </div>
      </div>
    </div>
    <div v-else @click="event => handleOverlayClick(event, latestPopupData?.payload?.in_app_id)" style="
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          flex-direction: column;
        ">
      <div v-for="(item, index) in popupData.slice().reverse().slice(0, 3)" :key="index" :style="{
          top: `${46 + index * 1.5}%`,
          width: '75%',
          maxWidth: '420px',
          maxHeight: '70%',
          height: 'auto',
          background: 'rgb(255, 255, 255)',
          borderRadius: '10px',
          padding: '20px',
          textAlign: 'center',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          transform: `translate(-50%, -50%) scale(${1 - index * 0.02})`,
          position: 'fixed',
          left: '50%',
          overflow: 'auto',
          zIndex: 99000 - index,
          transition: '2s',
        }
        ">
        <div style="
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px gray black;
            padding-bottom: 10px;
          ">
          <h1 style="
              color: #000000;
              font-size: 24px;
              margin: 0;
              text-align: start;
            ">
            {{ latestPopupData && latestPopupData?.payload?.title }}
          </h1>
          <button @click="() => handleCloseBtn(latestPopupData?.payload?.in_app_id)" style="
                background-color: transparent;
                border: none;
                cursor: pointer;
                font-size: 24px;
              ">
            &times;
          </button>
        </div>
        <img :src="latestPopupData && latestPopupData?.payload?.image" style="width: 100%;" />
        <p style="
            color: #000000;
            font-size: 18px;
            text-align: start;
          ">
          {{ latestPopupData && latestPopupData?.payload?.text }}
        </p>
      </div>
      <div style="
          position: absolute;
          bottom: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
        ">
        <div v-if="popupData.length > 1" style="
            color: white;
            cursor: pointer;
            font-size: 20px;
          ">
          {{ popupData.length - 1 }} more messages
        </div>
        <div @click="handleClearAll" style="
            color: black;
            font-size: 17px;
            font-weight: 300;
            margin-top: 10px;
            border: 1px solid black;
            padding: 1px 10px;
            border-radius: 20px;
            background: rgba(0, 0, 0, 0.2);
            width: fit-content;
            cursor: pointer;
          ">
          &times; clear all
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'NormalPopup',
  props: {
    popupData: Array,
    handleClearAll: Function,
    handleOverlayClick: Function,
    latestPopupData: Object,
    handleCloseBtn: Function,
  },
  mounted() {
    console.log("normal popup")
  }
};
</script>
  
<style scoped>
/* Add any scoped styles if needed */
</style>
  