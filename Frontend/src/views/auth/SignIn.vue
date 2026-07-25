<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)

const showPassword = ref(false)
</script>

<template>
	<div class="min-h-screen bg-[#0F0F0F] flex flex-col">
		<!-- Main Content -->
		<div class="flex-1 flex items-center justify-center px-6 py-11">
			<div class="w-full max-w-lg">
				<div class="mb-6">
					<h2 class="text-3xl font-bold text-white text-center mb-2">
						Welcome Back
					</h2>
					<p class="text-gray-300 text-center">
						Sign in to manage your roster and compete with MMA fans worldwide
					</p>
				</div>

				<form class="space-y-5">
					<!-- Email -->
					<div>
						<label for="email" class="block text-sm font-medium text-gray-300 mb-2">
							Email address
						</label>
						<input id="email" v-model="email" type="email"
							class="w-full px-4 py-3 bg-[#202020] border border-[#303030] rounded-xl text-white placeholder-gray-500 transition-all duration-200 focus:outline-none focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20" />
					</div>

					<!-- Password -->
					<div>
						<label for="password" class="block text-sm font-medium text-gray-300 mb-2">
							Password
						</label>

						<div class="relative">
							<input id="password" v-model="password" :type="showPassword ? 'text' : 'password'"
								class="w-full px-4 py-3 bg-[#202020] border border-[#303030] rounded-xl text-white placeholder-gray-500 transition-all duration-200 focus:outline-none focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20" />

							<button type="button" @click="showPassword = !showPassword"
								:aria-label="showPassword ? 'Hide password' : 'Show password'"
								class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 cursor-pointer transition-colors duration-200 text-sm">
								{{ showPassword ? 'Hide' : 'Show' }}
							</button>
						</div>
					</div>

					<!-- Remember Me + Forgot Password -->
					<div class="flex items-center justify-between">
						<label for="remember" class="flex items-center gap-3 text-sm text-gray-400 cursor-pointer">
							<input id="remember" v-model="rememberMe" type="checkbox"
								class="w-5 h-5 bg-[#202020] border border-[#303030] rounded accent-[#DC2626]" />
							Remember me
						</label>

						<button type="button"
							class="text-sm text-[#DC2626] hover:text-[#EA580C] transition-colors duration-200 cursor-pointer">
							Forgot password?
						</button>
					</div>

					<!-- Sign In Button -->
					<button type="submit"
						class="w-full px-6 py-3 bg-[#DC2626] text-white font-semibold rounded-xl shadow-lg hover:bg-[#CC1F1F] active:bg-[#B31818] cursor-pointer transition-colors duration-200 mt-8">
						Sign In
					</button>

					<!-- Divider -->
					<div class="flex items-center gap-2">
						<div class="flex-1 h-px bg-[#303030]"></div>
						<span class="text-sm text-gray-500">or continue with</span>
						<div class="flex-1 h-px bg-[#303030]"></div>
					</div>

					<!-- Google -->
					<button type="button"
						class="w-full px-6 py-3 bg-[#202020] border border-[#303030] rounded-xl text-white font-medium cursor-pointer hover:bg-[#252525] transition-colors duration-200 flex items-center justify-center gap-3">
						<svg class="w-5 h-5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
							<path fill="#FFC107"
								d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.2-.1-2.3-.4-3.5z" />
							<path fill="#FF3D00"
								d="M6.3 14.7l6.6 4.8C14.7 15.1 18.9 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
							<path fill="#4CAF50"
								d="M24 44c5.2 0 10-2 13.6-5.3l-6.3-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.8-3.3-11.4-8l-6.6 5.1C9.3 39.6 16.1 44 24 44z" />
							<path fill="#1976D2"
								d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.4 4.2-4.6 5.5l6.3 5.2C40.8 35.2 44 30.1 44 24c0-1.2-.1-2.3-.4-3.5z" />
						</svg>

						Continue with Google
					</button>

					<!-- Register -->
					<div class="text-center pt-2">
						<span class="text-gray-400">
							Don't have an account?
						</span>

						<RouterLink :to="{ name: 'Register' }" type="button"
							class="text-[#DC2626] font-medium cursor-pointer hover:text-[#EA580C] transition-colors duration-200 ml-1">
							Create Account
						</RouterLink>
					</div>
				</form>
			</div>
		</div>

		<!-- Footer -->
		<div class="border-t border-[#303030] bg-[#161616]">
			<div class="max-w-4xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
				<p class="text-sm text-gray-400">
					© 2026 Fantasy MMA. All rights reserved.
				</p>

				<div class="flex items-center gap-6 text-sm">
					<button class="text-gray-400 hover:text-white cursor-pointer transition-colors duration-200">
						Privacy Policy
					</button>

					<button class="text-gray-400 hover:text-white cursor-pointer transition-colors duration-200">
						Terms of Service
					</button>
				</div>
			</div>
		</div>
	</div>
</template>