<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Login - Finanças</h1>

      <form @submit.prevent="enviarCodigo">
        <div class="mb-4">
          <label class="block mb-2 font-semibold">E-mail</label>
          <input
            type="email"
            v-model="email"
            required
            class="w-full p-2 border border-gray-300 rounded"
            placeholder="Digite seu e-mail"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Enviar Código
        </button>
      </form>

      <div v-if="codigoEnviado" class="mt-6">
        <label class="block mb-2 font-semibold">Código de Verificação</label>
        <input
          type="text"
          v-model="codigo"
          class="w-full p-2 border border-gray-300 rounded"
          placeholder="Digite o código"
        />

        <button
          class="w-full bg-green-500 text-white py-2 rounded mt-4 hover:bg-green-600 transition"
          @click="verificarCodigo"
        >
          Verificar Código
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const codigo = ref('')
const codigoEnviado = ref(false)

function enviarCodigo() {
  console.log('Enviar código para:', email.value)
  codigoEnviado.value = true
}

function verificarCodigo() {
  console.log('Código informado:', codigo.value)
  alert('Aqui futuramente vamos validar e logar o usuário.')
}
</script>
