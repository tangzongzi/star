<template>
  <div class="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
    <div class="max-w-4xl w-full">
      <div class="text-center mb-12">
        <div class="flex justify-center mb-4">
          <div class="relative">
            <div class="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur"></div>
            <div class="relative bg-white rounded-full p-5">
              <svg class="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
              </svg>
            </div>
          </div>
        </div>
        <h1 class="text-5xl font-bold text-gray-800 mb-4">星星任务</h1>
        <p class="text-xl text-gray-600 max-w-md mx-auto">让孩子享受完成任务的成就感，培养良好的习惯</p>
      </div>
      
      <div class="grid gap-8 md:grid-cols-2">
        <!-- 家长模式卡片 -->
        <div 
          class="relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer group"
          @click="selectMode('parent')"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-primary-light/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="p-8">
            <div class="flex flex-col items-center">
              <div class="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-6 shadow-md">
                <svg class="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H14C15.0609 15 16.0783 15.4214 16.8284 16.1716C17.5786 16.9217 18 17.9391 18 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-gray-800 mb-3">家长模式</h2>
              <p class="text-gray-600 text-center mb-6">创建任务和奖励，验证孩子完成的任务</p>
              
              <div class="w-full mt-2">
                <div class="flex justify-center">
                  <span class="inline-flex items-center px-4 py-2 rounded-lg text-primary font-medium bg-indigo-50 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    进入家长模式
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 孩子模式卡片 -->
        <div 
          class="relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer group"
          @click="selectMode('child')"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-secondary-light/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="p-8">
            <div class="flex flex-col items-center">
              <div class="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-6 shadow-md">
                <svg class="w-12 h-12 text-secondary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 14C21.1046 14 22 13.1046 22 12C22 10.8954 21.1046 10 20 10C18.8954 10 18 10.8954 18 12C18 13.1046 18.8954 14 20 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M4 14C5.10457 14 6 13.1046 6 12C6 10.8954 5.10457 10 4 10C2.89543 10 2 10.8954 2 12C2 13.1046 2.89543 14 4 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 6C13.1046 6 14 5.10457 14 4C14 2.89543 13.1046 2 12 2C10.8954 2 10 2.89543 10 4C10 5.10457 10.8954 6 12 6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 22C13.1046 22 14 21.1046 14 20C14 18.8954 13.1046 18 12 18C10.8954 18 10 18.8954 10 20C10 21.1046 10.8954 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M18 12H22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2 12H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 6V10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 18V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-gray-800 mb-3">孩子模式</h2>
              <p class="text-gray-600 text-center mb-6">完成任务，获得星星，兑换奖励</p>
              
              <div class="w-full mt-2">
                <div class="flex justify-center">
                  <span class="inline-flex items-center px-4 py-2 rounded-lg text-secondary font-medium bg-purple-50 group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    进入孩子模式
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 小贴士部分 -->
      <div class="mt-12 bg-white rounded-xl p-6 shadow-md">
        <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          使用小贴士
        </h2>
        <ul class="space-y-3">
          <li class="flex items-start">
            <svg class="w-5 h-5 text-primary-dark mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>设定明确、可衡量的任务目标，让孩子容易理解</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-primary-dark mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>根据孩子年龄设置适当的任务难度和奖励标准</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-primary-dark mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>及时审核完成的任务，给予积极反馈</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-primary-dark mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>定期与孩子一起回顾任务完成情况，讨论进步</span>
          </li>
        </ul>
      </div>
      
      <div class="text-center mt-12 text-gray-500 text-sm">
        <p>星星任务 - 培养孩子良好习惯的得力助手</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAppStore } from '../stores/app';

const router = useRouter();
const appStore = useAppStore();

const selectMode = (mode) => {
  appStore.setMode(mode);
  router.push({ name: mode });
};
</script> 