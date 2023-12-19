<template>
  <div v-if="checklistDetails.length > 0">
    <div @click="handleOverlayClick" style="
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
      <div style="
            top: 50%;
            width: 75%;
            max-width: 420px;
            max-height: 70%;
            height: auto;
            background: rgb(255, 255, 255);
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            transform: translate(-50%, -50%) scale(1);
            position: fixed;
            left: 50%;
            overflow: auto;
            z-index: 99000;
            transition: 2s;
          ">
        <div>
          <div style="
                display: flex;
                font-size: 20px;
                font-weight: normal;
                flex-direction: row;
                justify-content: end;
              ">
            <div @click="handleCloseBtn" style="cursor: pointer;">&times;</div>
          </div>
          <div style="
                margin-top: 20px;
                display: flex;
                flex-direction: row;
                align-items: center;
                color: gray;
              ">
            <div>{{ checklistCount }}/{{ checklistDetails.length }}</div>
            <div style="
                  margin: auto;
                  width: 86%;
                  border-radius: 10px;
                  overflow: hidden;
                  background: #e9ecef;
                ">
              <div
                :style="{ width: `${(checklistCount * 100) / checklistDetails.length}%`, height: '8px', backgroundColor: '#7366ff', color: '#fff', textAlign: 'center', lineHeight: '30px', transition: 'width 0.3s ease' }">
              </div>
            </div>
          </div>
          <div style="display: flex; flex-direction: column;">
            <div v-for="(item, index) in checklistDetails" :key="index">
              <div style="
                    display: flex;
                    border-bottom: ${
                      checklistDetails.length === index + 1
                        ? '0px solid gray'
                        : '1px solid gray'
                    };
                    padding-bottom: ${
                      checklistDetails.length === index + 1 ? '0px' : '10px'
                    };
                    flex-direction: row;
                    align-items: center;
                    margin-top: 20px;
                  ">
                <svg v-if="item.completed" class="svg-icon" style="
                      width: 22px;
                      align-self: start;
                      color: #7366ff;
                      height: 22px;
                      vertical-align: middle;
                      fill: currentColor;
                      overflow: hidden;
                    " viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M341.436 432.964L283.2 491.2l187.2 187.2 416-416-58.236-58.236L470.4 559.836l-128.964-126.872zM844.8 512c0 183.036-149.766 332.8-332.8 332.8S179.2 695.036 179.2 512 328.964 179.2 512 179.2c31.2 0 62.4 4.164 91.528 12.482L668 127.2C620.164 106.4 568.164 96 512 96 283.2 96 96 283.2 96 512s187.2 416 416 416 416-187.2 416-416h-83.2z" />
                </svg>
                <svg v-else fill="gray" style="
                      width: 22px;
                      align-self: start;
                      color: gray;
                      height: 22px;
                      vertical-align: middle;
                      fill: currentColor;
                      overflow: hidden;
                    " version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330">
                  <path id="XMLID_520_" d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.982,0,165,0z M165,300
                 C90.561,300,30,239.44,30,165S90.561,30,165,30c74.439,0,135,60.561,135,135S239.439,300,165,300z" />
                </svg>
                <div style="
                      margin-left: 10px;
                      width: 90%;
                      text-align: start;
                    ">
                  <div style="font-size: 16px; color: black;">{{ item.label }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>

import getUserChecklist from '../api/getChecklist'

export default {
  name: 'Checklist',
  props: {
    readKey: String,
    id: String,
    isDev: Boolean,
    isLocal: Boolean,
  },
  data() {
    return {
      checklistDetails: [],
      checklistCount: 0,
      BASE_URL: this.isDev
        ? 'https://dev.mok.one'
        : this.isLocal
          ? 'http://localhost:8080'
          : 'https://live.mok.one',
    };
  },
  mounted() {
    const checklistSession = sessionStorage.getItem('checklist_token');
    console.log("import...")
    if (!checklistSession || checklistSession !== 'true') {
      this.fetchUserProperties();
    }
  },
  methods: {
    async fetchUserProperties() {
        console.log("call api")
      const response = await getUserChecklist(
        this.BASE_URL,
        this.id,
        this.readKey
      );
      console.log("respo..",response)
      if (response?.success) {
        this.checklistCount = response.data.filter((item) => item.completed).length;
        this.checklistDetails = response.data;
      }
    },
    handleCloseBtn() {
      sessionStorage.setItem('checklist_token', 'true');
      this.checklistDetails = [];
    },
    handleOverlayClick(event) {
      if (event.target === event.currentTarget) {
        this.handleCloseBtn();
      }
    },
  },
};
</script>
  
<style scoped>
/* Add your component-specific styles here */
</style>
  