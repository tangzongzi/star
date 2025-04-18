<template>
  <div class="p-4 bg-white rounded-lg shadow">
    <h2 class="text-xl font-bold mb-4">Supabase 连接测试</h2>
    
    <div class="space-y-4">
      <div>
        <h3 class="font-medium">环境变量检查</h3>
        <div class="mt-2 text-sm">
          <div class="flex">
            <span class="font-medium w-40">Supabase URL:</span>
            <span>{{ supabaseUrlStatus }}</span>
          </div>
          <div class="flex">
            <span class="font-medium w-40">Supabase Key:</span>
            <span>{{ supabaseKeyStatus }}</span>
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="font-medium">连接测试</h3>
        <div class="flex mt-2">
          <button 
            @click="testConnection" 
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            :disabled="loading"
          >
            {{ loading ? '测试中...' : '测试连接' }}
          </button>
          <button 
            @click="testProfilesQuery" 
            class="ml-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            :disabled="loading"
          >
            {{ loading ? '测试中...' : '测试profiles表' }}
          </button>
        </div>
        <div v-if="testResult" class="mt-2 text-sm">
          <pre class="bg-gray-100 p-2 rounded overflow-auto max-h-40">{{ testResult }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../lib/supabase'

// 环境变量状态
const supabaseUrl = ref(import.meta.env.VITE_SUPABASE_URL)
const supabaseKey = ref(import.meta.env.VITE_SUPABASE_ANON_KEY)

const supabaseUrlStatus = computed(() => {
  if (!supabaseUrl.value) return '❌ 未设置'
  return `✅ 已设置 (${supabaseUrl.value.substring(0, 10)}...)`
})

const supabaseKeyStatus = computed(() => {
  if (!supabaseKey.value) return '❌ 未设置'
  return `✅ 已设置 (${supabaseKey.value.substring(0, 10)}...)`
})

// 测试结果
const testResult = ref('')
const loading = ref(false)

// 测试Supabase连接
async function testConnection() {
  try {
    loading.value = true
    testResult.value = '测试中...'
    
    // 简单的服务器时间查询
    const { data, error } = await supabase.rpc('get_service_status')
    
    if (error) {
      testResult.value = `❌ 连接失败: ${error.message}`
      console.error('Supabase连接失败:', error)
    } else {
      testResult.value = `✅ 连接成功!\n服务器状态: ${JSON.stringify(data, null, 2)}`
      console.log('Supabase连接成功:', data)
    }
  } catch (err) {
    testResult.value = `❌ 异常: ${err.message}`
    console.error('Supabase测试异常:', err)
  } finally {
    loading.value = false
  }
}

// 测试profiles表
async function testProfilesQuery() {
  try {
    loading.value = true
    testResult.value = '测试中...'
    
    // 尝试从profiles表查询最多5条记录
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .limit(5)
    
    if (error) {
      testResult.value = `❌ 查询profiles表失败: ${error.message}`
      console.error('查询profiles表失败:', error)
    } else {
      testResult.value = `✅ 查询profiles表成功!\n记录数: ${data.length}\n首条记录: ${data.length > 0 ? JSON.stringify(data[0], null, 2) : '无记录'}`
      console.log('查询profiles表成功:', data)
    }
  } catch (err) {
    testResult.value = `❌ 异常: ${err.message}`
    console.error('查询profiles表异常:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  console.log('Supabase测试组件已加载')
})
</script> 