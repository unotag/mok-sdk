<template>
    <div v-if='latestPopupData'>
        <template v-if="latestPopupData?.popup_configs?.template_type === 'full_page'">
            <FullPagePopup :popupData="popupData" :handleClearAll="handleClearAll" :latestPopupData="latestPopupData"
                :handleCloseBtn="handleCloseBtn" />
        </template>
        <template v-else-if="latestPopupData?.popup_configs?.template_type === 'pip_video'">
            <FloatingPopup :popupData="popupData" :handleOverlayClick="handleOverlayClick"
                :latestPopupData="latestPopupData" :handleCloseBtn="handleCloseBtn" />
        </template>
        <template v-else-if="latestPopupData?.popup_configs?.template_type === 'bottom_sheet'">
            <BottomSheetPopup :popupData="popupData" :handleOverlayClick="handleOverlayClick"
                :handleCloseBtn="handleCloseBtn" />
        </template>
        <template v-else>
            <NormalPopup :popupData="popupData" :handleClearAll="handleClearAll" :handleOverlayClick="handleOverlayClick"
                :latestPopupData="latestPopupData" :handleCloseBtn="handleCloseBtn" />
        </template>

    </div>
</template>
  
<script>
import FullPagePopup from "./PopupComponents/FullPagePopup.vue";
import FloatingPopup from "./PopupComponents/FloatingPopup.vue";
import BottomSheetPopup from "./PopupComponents/BottomSheetPopup.vue";
import NormalPopup from "./PopupComponents/NormalPopup.vue";
import * as serviceWorkerRegistration from "../api/serviceWokerRegistration";
import { markAllAsRead, markOneAsRead } from "../api/MarkReadFunction"

export default {
    props: {
        readKey: String,
        id: String,
        isDev: Boolean,
        isLocal: Boolean,
        writeKey: String,
    },
    components: {
        NormalPopup,
        FullPagePopup,
        BottomSheetPopup,
        FloatingPopup
    },
    data() {
        return {
            clickedPopup: [],
            popupData: [],
            audio: new Audio(),
            popupTimeout: undefined,
            BASE_URL: this.isDev
                ? "https://dev.mok.one"
                : this.isLocal
                    ? "http://localhost:8080"
                    : "https://live.mok.one",
        };
    },
    methods: {
        playAudio(audioSrc) {
            this.audio.src = audioSrc;
            this.audio.play().catch((error) => {
                console.error("Failed to play audio:", error);
            });
        },
        handleAddPopupData(eventData) {
            if (
                !eventData?.popup_configs?.start_time ||
                !eventData?.popup_configs.end_time ||
                (new Date(eventData?.popup_configs.start_time) <= new Date() &&
                    new Date(eventData?.popup_configs.end_time) >= new Date())
            ) {
                if (this.popupTimeout) {
                    clearTimeout(this.popupTimeout);
                }

                this.clickedPopup.push(true);
                this.popupData.push(eventData);


                if (eventData?.popup_configs?.sound) {
                    this.audio.autoplay = true;
                    this.playAudio(eventData?.popup_configs?.sound);
                }

                if (eventData?.popup_configs?.number_of_seconds_view) {
                    this.popupTimeout = setTimeout(() => {
                        if (eventData?.payload?.in_app_id) {
                            markOneAsRead(
                                this.BASE_URL,
                                this.id,
                                this.writeKey,
                                eventData?.payload?.in_app_id
                            );
                            this.clickedPopup.pop();
                            this.popupData = this.popupData.filter(
                                (data) => data?.payload?.in_app_id !== eventData?.payload?.in_app_id
                            );
                            this.audio.pause();
                        }
                    }, parseInt(eventData?.popup_configs?.number_of_seconds_view));
                }
            }
        },
        handleDeletePopupData(inAppID) {
            this.audio.pause();
            const newData = this.popupData.filter(
                (data) => data?.payload?.in_app_id !== inAppID
            );
            this.popupData = newData;
            this.clickedPopup.pop();
            if (inAppID) {
                markOneAsRead(this.BASE_URL, this.id, this.writeKey, inAppID);
            }
            if (newData.length > 0) {
                const latestPopup = newData[newData.length - 1];

                if (
                    !latestPopup?.popup_configs?.start_time ||
                    !latestPopup?.popup_configs?.end_time ||
                    (new Date(latestPopup?.popup_configs?.start_time) <= new Date() &&
                        new Date(latestPopup?.popup_configs?.end_time) >= new Date())
                ) {
                    if (this.popupTimeout) {
                        clearTimeout(this.popupTimeout);
                    }

                    if (latestPopup?.popup_configs?.sound) {
                        this.playAudio(latestPopup?.sound);
                    }

                    if (latestPopup?.popup_configs?.number_of_seconds_view) {
                        this.popupTimeout = setTimeout(() => {
                            if (latestPopup?.payload?.in_app_id) {
                                markOneAsRead(
                                    this.BASE_URL,
                                    this.id,
                                    this.writeKey,
                                    latestPopup?.payload?.in_app_id
                                );
                                this.clickedPopup.pop();
                                this.popupData = this.popupData.filter(
                                    (data) =>
                                        data?.payload?.in_app_id !== latestPopup?.payload?.in_app_id
                                );
                                this.audio.pause();
                            }
                        }, parseInt(latestPopup?.popup_configs?.number_of_seconds_view));
                    }
                }
            }
        },
        handleOverlayClick(event, in_app_id) {
            if (event.target === event.currentTarget) {
                this.handleDeletePopupData(in_app_id);
            }
        },
        handleClearAll() {
            this.clickedPopup = [];
            this.popupData = [];
            markAllAsRead(this.BASE_URL, this.id, this.writeKey);
        },
        handleCloseBtn(in_app_id) {
            this.handleDeletePopupData(in_app_id);
        },

        cb(data) {
            const newData = data.map((d) => {
                const item = d.json_data;
                return {
                    id: d.in_app_id,
                    html: item.html,
                    popup_configs: item.popup_configs,
                    payload: {
                        category: item.category,
                        icon: item.icon,
                        image: item.image,
                        in_app_click_action: item.in_app_click_action,
                        in_app_id: d.in_app_id,
                        popup_configs: item.popup_configs,
                        text: item.text,
                        title: item.title,
                    },
                };
            });

            newData.forEach((data) => {
                this.handleAddPopupData(data);
            });
        },

    },
    computed: {
        latestPopupData() {
            console.log(this.popupData[this.popupData.length - 1])
            return this.popupData[this.popupData.length - 1];
        },
    },
    mounted() {
        this.$nextTick(() => {
            serviceWorkerRegistration.getPendingMessages({
                userId: this.id,
                readKey: this.readKey,
                BASE_URL: this.BASE_URL,
                writeKey: this.writeKey,
                cb: this.cb,
            });

            const es = new EventSource(`${this.BASE_URL}/server/sse`);

            const eventListener = (event) => {
                this.handleAddPopupData(JSON.parse(event.data));
            };

            es.addEventListener(`event_${this.readKey}_${this.id}`, eventListener);

            // this.$once("hook:beforeDestroy", () => {
            //     es.removeEventListener(`event_${this.readKey}_${this.id}`, eventListener);
            //     es.close();
            // });
        });
    },
};
</script>
  