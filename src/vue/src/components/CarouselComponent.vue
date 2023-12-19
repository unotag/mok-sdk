<template>
    <div class="carousel-main" :class="'carousel-main' + CarouselIndex"
        style="position: relative; overflow: hidden; width: 100%; height: 100%;" @keydown="handleKeyDown" tabindex="0"
        aria-live="polite" aria-roledescription="carousel">
        <div style="display: flex; width: 100%; height: 100%; transition: transform 0.5s ease;">
            <div v-for="(item, index) in CarouselData.caraousel_content" :key="index"
                :class="{ active: index === activeIndex }" :style="{
                    'flex-shrink': 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    'align-items': 'center',
                    'justify-content': 'center',
                    transform: `translateX(-${activeIndex * 100}%)`,
                    'margin-top': 'auto',
                    'margin-bottom': 'auto',
                }">
                <img v-if="item.type === 'image'" :src="item.url" :alt="'carousel-image-' + index"
                    style="width: 100%; height: 100%;" />
                <video v-else-if="item.type === 'video'" :src="item.url" width="100%" height="100%" controls
                    autoplay></video>
            </div>
        </div>

        <button style="
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(0, 0, 0, 0.3);
          color: #fff;
          border: none;
          padding: 0.5rem 1rem;
          cursor: pointer;
          left: 0;
        " class="carousel-control prev" @click="handlePrev" aria-label="Previous slide">
             <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <polygon points="15.293 3.293 6.586 12 15.293 20.707 16.707 19.293 9.414 12 16.707 4.707 15.293 3.293" />
          </svg>
        </button>

        <button style="
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(0, 0, 0, 0.3);
          color: #fff;
          border: none;
          padding: 0.5rem 1rem;
          cursor: pointer;
          right: 0;
        " @click="handleNext" aria-label="Next slide">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <polygon points="7.293 4.707 14.586 12 7.293 19.293 8.707 20.707 17.414 12 8.707 3.293 7.293 4.707" />
          </svg>
        </button>

        <div style="
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.5rem;
          padding: 1rem;
        ">
            <button v-for="(item, index) in CarouselData.caraousel_content" :key="index" :style="{
                width: '1rem',
                height: '1rem',
                backgroundColor: index === activeIndex ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.5)',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                outline: 'none'
            }" @click="setActiveIndex(index)" :aria-label="'Go to slide ' + (index + 1)"
                :aria-selected="index === activeIndex"></button>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        CarouselData: Object,
        CarouselIndex: Number,
    },
    data() {
        return {
            activeIndex: 0,
        };
    },
    methods: {
        handlePrev() {
            this.activeIndex = this.activeIndex === 0
                ? this.CarouselData.caraousel_content.length - 1
                : this.activeIndex - 1;
        },
        handleNext() {
            this.activeIndex = this.activeIndex === this.CarouselData.caraousel_content.length - 1
                ? 0
                : this.activeIndex + 1;
        },
        handleKeyDown(event) {
            if (event.key === 'ArrowRight') {
                this.handleNext();
            } else if (event.key === 'ArrowLeft') {
                this.handlePrev();
            }
        },
    },
};
</script>
  
<style scoped>
/* Add your styles here */
</style>
  