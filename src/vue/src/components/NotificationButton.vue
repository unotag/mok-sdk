<script>
import InfiniteScroll from './InfiniteScroll.vue';
import getStylesData from '../api/getStyledData';
export default {
  name: 'NotificationButton',
  components: {
    InfiniteScroll: InfiniteScroll,
  },
  props: {
    containerStyles: {
      type: Object,
      default: () => ({}),
    },
    position: {
      type: String,
      default: () => 'right',
    },
    readKey: {
      type: String,
      required: true,
    },
    isDev: Boolean,
    isLocal: Boolean,
    id: {
      type: String,
      required: true,
    },
    messageBoxStyles: {
      type: Object,
      default: () => ({}),
    },
    ruleStyles: {
      type: Object,
      default: () => ({}),
    },
    textStyles: {
      type: Object,
      default: () => ({}),
    },
    headerStyles: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      clicked: false,
      stylesData: {},
    };
  },
  methods: {
    toggle() {
      this.clicked = !this.clicked;
    },
    async getUpdateStylesData() {
      try {
        const BASE_URL = this.isDev
          ? 'https://dev.mok.one'
          : this.isLocal
          ? 'http://localhost:8080'
          : 'https://live.mok.one';
        const data = await getStylesData(BASE_URL, this.readKey);
        this.stylesData = data;
      } catch (error) {
        console.log(error)
      }
    },
  },
  created() {
    this.getUpdateStylesData()
  },
};
</script>

<template>
  <div :style="{ position: 'relative', ...this.containerStyles }">
    <div style="cursor: pointer" @click="toggle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9m-4.27 13a2 2 0 0 1-3.46 0"
        />
      </svg>
    </div>

    <div
      v-show="clicked"
      :style="{
        width: '300px',
        height: '350px',
        overflowY: 'none',
        borderRadius: '5px',
        backgroundColor: stylesData?.notificationBgColor,
        color: stylesData?.boxTextColor,
        boxShadow: '0 0 20px rgb(89 102 122 / 35%)',
        position: 'absolute',
        left: this.position === 'left' ? -278 : 0,
        right: this.position === 'right' ? 278 : 0,
        zIndex: '999 !important',
        ...this.messageBoxStyles,
      }"
    >
      <div
        :style="{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: stylesData?.titleBarBgColor,
          color: stylesData?.titleTextColor,
          padding: '0 15px',
          fontWeight: '500',
          height: '50px',
          position: 'sticky',
          ...this.headerStyles,
        }"
      >
        Notifications
        <div style="cursor: pointer" @click="toggle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g
              id="feClose0"
              fill="none"
              fill-rule="evenodd"
              stroke="none"
              stroke-width="1"
            >
              <g id="feClose1" fill="currentColor">
                <path
                  id="feClose2"
                  d="M10.657 12.071L5 6.414L6.414 5l5.657 5.657L17.728 5l1.414 1.414l-5.657 5.657l5.657 5.657l-1.414 1.414l-5.657-5.657l-5.657 5.657L5 17.728z"
                />
              </g>
            </g>
          </svg>
        </div>
      </div>
      <Suspense>
        <InfiniteScroll :textStyles="textStyles" :ruleStyles="ruleStyles" :readKey="readKey" :id="id" :isDev="isDev" :isLocal="isLocal" :stylesData="stylesData" />
        <template #fallback>
          <p>Loading...</p>
        </template>
      </Suspense>
    </div>
  </div>
  <!-- <main
    style="
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    "
  >
    <h1>Infinite Scrolling Component</h1>
    <Suspense>
      <InfiniteScroll />
      <template #fallback>
        <p>Loading...</p>
      </template>
    </Suspense>
  </main> -->
</template>
