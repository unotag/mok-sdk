<template>
    <div>
        <div v-for="(item, index) in carouselDetails" :key="index">
            <div v-if="elementExists(item.div_id)">
                <CarouselComponent CarouselData="item" CarouselIndex="index">
                </CarouselComponent>
            </div>
        </div>
    </div>
</template>
  
<script>
import { ref, onMounted, createApp } from 'vue';
import getUserCarouselData from '../api/getCarouselData'
import CarouselComponent from './CarouselComponent.vue'; // Make sure to adjust the path based on your project structure

export default {
    props: {
        readKey: String,
        id: String,
        isDev: Boolean,
        isLocal: Boolean,
    },
    data() {
        return {
            carouselDetails: [],
            baseUrl: '',
        };
    },
    computed: {
        elementExists() {
            return (divId) => {
                return document.getElementById(divId) !== null;
            };
        },
    },
    components: {
        CarouselComponent,
    },
    methods: {
        async fetchCarouselDetails() {
            const response = await getUserCarouselData(
                this.baseUrl,
                this.id,
                this.readKey
            );
            console.log(response.data[0].caraousel_content)
            const combinedContentMap = new Map();

            response.data.forEach((entry) => {
                const { div_id, caraousel_content } = entry;

                if (!combinedContentMap.has(div_id)) {
                    combinedContentMap.set(div_id, {
                        ...entry,
                        caraousel_content: this.filterNonNullUrls(caraousel_content),
                    });
                } else {
                    const existingEntry = combinedContentMap.get(div_id);
                    if (existingEntry) {
                        existingEntry.caraousel_content.push(
                            ...this.filterNonNullUrls(caraousel_content)
                        );
                    }
                }
            });

            this.carouselDetails = Array.from(combinedContentMap.values());
            return Array.from(combinedContentMap.values())
        },
        filterNonNullUrls(contentArray) {
            return contentArray.filter((item) => item.url !== null);
        },
    },
    async mounted() {
        this.baseUrl = this.isDev
            ? 'https://dev.mok.one'
            : this.isLocal
                ? 'http://localhost:8080'
                : 'https://live.mok.one';

        const Carouseldata = await this.fetchCarouselDetails();

        Carouseldata.forEach((item, index) => {


            const targetElement = document.getElementById(item.div_id);

            // Create a new instance of YourComponent
            const yourComponentInstance = createApp(CarouselComponent, {
    CarouselData: item,
    CarouselIndex: index
  });

            // Mount YourComponent to the target element
            yourComponentInstance.mount(targetElement);
        })
    },
};
</script>
  
<style scoped>
/* Add your styles here */
</style>
  