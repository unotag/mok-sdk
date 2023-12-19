<template>
    <div v-if="latestOnBoarding"
        :style="{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }">
        <template v-if="latestOnBoarding.is_fullscreen">
            <button @click="handleSkipOnBoarding(latestOnBoarding.onboarding_id)" :style="{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '50%',
                fontSize: '20px',
                position: 'absolute',
                top: '6px',
                right: '6px',
                zIndex: 9999,
            }">skip</button>
            <div :style="{
                width: '100%',
                height: '100%',
                background: 'rgb(255, 255, 255)',
                textAlign: 'center',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                position: 'fixed',
                overflow: 'auto',
                display: 'flex',
                justifyContent: 'center',
            }">
                <!-- Content rendering here -->
                <div>
                    <template v-if="latestOnBoarding?.content[activeIndex]">
                        <template v-if="latestOnBoarding?.content[activeIndex].type === 'image'">
                            <img style="width: 100%; height: 100%" :src="latestOnBoarding?.content[activeIndex]?.url" />
                        </template>
                        <template v-else-if="latestOnBoarding?.content[activeIndex].type === 'video'">
                            <video :src="latestOnBoarding?.content[activeIndex]?.url" width="100%" height="100%" controls
                                autoplay></video>
                        </template>
                        <template v-else-if="latestOnBoarding?.content[activeIndex].type === 'html'">
                            <div style="width: 100%" v-html="latestOnBoarding?.content[activeIndex]?.html.templateCode">
                            </div>
                        </template>
                        <template v-else>
                            <!-- Default case for unknown type -->
                            <img style="width: 100%; height: 100%" :src="latestOnBoarding?.content[activeIndex]?.url" />
                        </template>
                    </template>
                </div>
            </div>
            <div :style="{
                display: 'flex',
                justifyContent: 'space-between',
                zIndex: 9999,
                width: '100%',
                position: 'absolute',
                bottom: '0',
                background: 'white'
            }">
                <button @click="prevStep" v-if="activeIndex > 0" :style="{
                    backgroundColor: '#7366ff',
                    border: 'none',
                    color: 'white',
                    padding: '10px 26px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'inline-block',
                    fontSize: '16px',
                    margin: '4px 2px',
                    cursor: 'pointer',
                    borderRadius: '10px',
                }">Prev</button>
                <div :style="{
                    display: 'flex',
                    alignSelf: 'center',
                    gap: '4px',
                }">
                    <!-- Indicator rendering here -->
                    <span v-for="(item, index) in latestOnBoarding?.content" :key="index" :style="{
                        height: '12px',
                        width: '12px',
                        backgroundColor: index === activeIndex ? 'rgba(88, 88, 88, 1)' : 'rgba(88, 88, 88, 0.5)',
                        borderRadius: '50%',
                        display: 'inline-block',
                    }"></span>
                </div>
                <button @click="nextStep"
                    v-if="activeIndex < latestOnBoarding.content.length - 1 || handleSkipOnBoarding(latestOnBoarding.onboarding_id)"
                    :style="{
                        backgroundColor: '#7366ff',
                        border: 'none',
                        color: 'white',
                        padding: '10px 26px',
                        textAlign: 'center',
                        textDecoration: 'none',
                        display: 'inline-block',
                        fontSize: '16px',
                        margin: '4px 2px',
                        cursor: 'pointer',
                        borderRadius: '10px',
                    }">Next</button>
            </div>
        </template>
        <template v-else>
            <div :style="{
                top: '50%',
                width: '75%',
                maxWidth: '420px',
                maxHeight: '70%',
                height: 'auto',
                background: 'rgb(255, 255, 255)',
                borderRadius: '10px',
                padding: '20px',
                textAlign: 'center',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                transform: 'translate(-50%, -50%) scale(1)',
                position: 'fixed',
                left: '50%',
                overflow: 'auto',
                zIndex: '99000',
                transition: '2s',
            }">
                <div :style="{
                    display: 'flex',
                    fontSize: '20px',
                    fontWeight: 'normal',
                    flexDirection: 'row',
                    justifyContent: 'end',
                }" @click="handleSkipOnBoarding(latestOnBoarding?.onboarding_id)">
                    <div :style="{ cursor: 'pointer' }">skip</div>
                </div>
                <!-- Content rendering here -->
                <div>
                    <template v-if="latestOnBoarding?.content[activeIndex]">
                        <template v-if="latestOnBoarding?.content[activeIndex].type === 'image'">
                            <img :style="{ width: '100%', height: '100%' }"
                                :src="latestOnBoarding?.content[activeIndex]?.url" />
                        </template>
                        <template v-else-if="latestOnBoarding?.content[activeIndex].type === 'video'">
                            <video :src="latestOnBoarding?.content[activeIndex]?.url" width="100%" height="100%" controls
                                autoplay></video>
                        </template>
                        <template v-else-if="latestOnBoarding?.content[activeIndex].type === 'html'">
                            <div :style="{ width: '100%' }"
                                v-html="latestOnBoarding?.content[activeIndex]?.html.templateCode"></div>
                        </template>
                        <template v-else>
                            <!-- Default case for unknown type -->
                            <img :style="{ width: '100%', height: '100%' }"
                                :src="latestOnBoarding?.content[activeIndex]?.url" />
                        </template>
                    </template>
                </div>
                <div :style="{ display: 'flex', justifyContent: 'space-between' }">
                    <button @click="prevStep" v-if="activeIndex > 0" :style="{
                        backgroundColor: '#7366ff',
                        border: 'none',
                        color: 'white',
                        padding: '10px 26px',
                        textAlign: 'center',
                        textDecoration: 'none',
                        display: 'inline-block',
                        fontSize: '16px',
                        margin: '4px 2px',
                        cursor: 'pointer',
                        borderRadius: '10px',
                    }">
                        Prev
                    </button>
                    <div :style="{
                        display: 'flex',
                        alignSelf: 'center',
                        gap: '4px',
                    }">
                        <!-- Indicator rendering here -->
                        <span v-for="(item, index) in latestOnBoarding?.content" :key="index" :style="{
                            height: '12px',
                            width: '12px',
                            backgroundColor: index === activeIndex ? 'rgba(88, 88, 88, 1)' : 'rgba(88, 88, 88, 0.5)',
                            borderRadius: '50%',
                            display: 'inline-block',
                        }"></span>
                    </div>
                    <button @click="nextStep"
                        v-if="activeIndex < latestOnBoarding.content.length - 1 || handleSkipOnBoarding(latestOnBoarding.onboarding_id)"
                        :style="{
                            backgroundColor: '#7366ff',
                            border: 'none',
                            color: 'white',
                            padding: '10px 26px',
                            textAlign: 'center',
                            textDecoration: 'none',
                            display: 'inline-block',
                            fontSize: '16px',
                            margin: '4px 2px',
                            cursor: 'pointer',
                            borderRadius: '10px',
                        }">
                        Next
                    </button>
                </div>
            </div>
        </template>

    </div>
</template>
  
<script>
import getMokOnBoarding from '../api/getMokOnBoarding'

export default {
    name: "MokOnBoarding",
    props: {
        readKey: String,
        id: String,
        isDev: Boolean,
        isLocal: Boolean,
    },
    data() {
        return {
            onBoardingData: [],
            activeIndex: 0,
        };
    },
    computed: {
        latestOnBoarding() {
            return this.onBoardingData[this.onBoardingData.length - 1];
        },
    },
    methods: {

        handleSkipOnBoarding(onboarding_id) {
            const newData = this.onBoardingData.filter(data => data?.onboarding_id !== onboarding_id);
            this.activeIndex = 0;
            this.onBoardingData = newData;
        },
        async fetchOnBoardingDetails() {

            const BASE_URL = this.isDev
                ? "https://dev.mok.one"
                : this.isLocal
                    ? "http://localhost:8080"
                    : "https://live.mok.one";

            try {
                const response = await getMokOnBoarding(BASE_URL, this.id, this.readKey);

                const filteredData = response.data.map(item => ({
                    ...item,
                    content: item.content.filter(contentItem => {
                        if (contentItem.type === "html") {
                            return true; // Include items with type 'html'
                        } else {
                            return contentItem.url !== null; // Exclude items with null url
                        }
                    }),
                }));

                // Set the filtered data to onBoardingData
                this.onBoardingData = filteredData;
            } catch (error) {
                console.error("Error fetching onboarding details:", error);
            }



        },
        prevStep() {
            if (this.activeIndex > 0) {
                this.activeIndex--;
            }
        },
        nextStep() {
            if (this.activeIndex < this.onBoardingData[this.onBoardingData.length - 1]?.content.length - 1) {
                this.activeIndex++;
            } else {
                this.handleSkipOnBoarding(this.latestOnBoarding?.onboarding_id);
            }
        },
    },
    mounted() {
        this.fetchOnBoardingDetails();
    },
};
</script>
  