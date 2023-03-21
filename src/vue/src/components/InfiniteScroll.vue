<template>
    <div>
      <div :style="{backgroundColor: props.stylesData.notificationBgColor, maxHeight: '350px', width: '300px', overflowX: 'hidden'}" ref="listEl">
        <div v-for="user in usersList" :key="user.in_app_id">
                <div
                :style="{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: '0 15px',
                    color: props.stylesData?.boxTextColor,
                }"
              >
              <p :style="{ ...props.textStyles }">
                  {{ JSON.parse(user.json_data).text }}
                </p>
                <p :style="{ fontSize: '14px', ...props.textStyles }">
                  {{ formatDate(user.createdAt) }}
                </p>
            </div>
              <hr
                :style="{
                    opacity: '0.5',
                    color: props.stylesData?.boxTextColor,
                    ...props.ruleStyles,
                }"
              />
        </div>
        <p v-show="fetchingData">Fetching messages please wait....</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import getMessages from "../api/getMessages";
  import { useInfiniteScroll } from "@vueuse/core";
  import {formatDate} from '../utils'

  const props = defineProps({
    isDev: Boolean,
    isLocal: Boolean,
    apiKey: String,
    id: String,
    stylesData: {
        default: () => ({}),
        type: Object
    },
    textStyles: {
        default: () => ({}),
        type: Object
    },
    rulesStyles: {
        default: () => ({}),
        type: Object
    },
  })
  
  const listEl = ref(null);

  const usersToShow = 10;
  
  const usersList = ref(await getMessages(usersToShow, 0, props.isDev, props.isLocal, props.id, props.apiKey));
  
  const fetchingData = ref(null);
  
  const getUsersOnScroll = async () => {
    fetchingData.value = true;
    const newUsers = await getMessages(usersToShow, usersList.value.length, props.isDev, props.isLocal, props.id, props.apiKey);
    usersList.value.push(...newUsers);
    fetchingData.value = null;
  };
  useInfiniteScroll(
    listEl,
    async () => {
      await getUsersOnScroll();
    },
    { distance: 10 }
  );
  </script>