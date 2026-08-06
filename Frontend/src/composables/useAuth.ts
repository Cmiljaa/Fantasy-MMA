import { computed, reactive, ref } from 'vue'
import {
	required,
	minLength,
	email,
	sameAs,
	helpers,
} from '@vuelidate/validators'

import type { SignInForm, SignUpForm } from '../interfaces/Auth'


type AuthMethod = 'signup' | 'signin'


type FormData<T extends AuthMethod> =
	T extends 'signup'
		? SignUpForm
		: SignInForm


type FormErrors = Record<string, string[]>

type BackendErrorResponse = {
	message?: string
	errors?: FormErrors
}


export default function useAuthForm<T extends AuthMethod>(method: T) {


	const formData = reactive(
		(method === 'signup'
			? {
					username: '',
					email: '',
					password: '',
					repeatPassword: '',
			  }
			: {
					email: '',
					password: '',
			  }) as FormData<T>
	)



	const errors = ref<FormErrors>({})
	const authError = ref<string | null>(null)



	const rules = computed(() => {


		if (method === 'signup') {


			return {

				username: {

					required: helpers.withMessage(
						'Username is required.',
						required
					),

				},



				email: {

					required: helpers.withMessage(
						'Email is required.',
						required
					),


					email: helpers.withMessage(
						'Invalid email.',
						email
					),

				},



				password: {

					required: helpers.withMessage(
						'Password is required.',
						required
					),


					minLength: helpers.withMessage(
						'Password must be at least 8 characters.',
						minLength(8)
					),

				},



				repeatPassword: {

					required: helpers.withMessage(
						'Please confirm your password.',
						required
					),


					sameAsPassword: helpers.withMessage(
						'Passwords do not match.',
						sameAs(computed(() => formData.password))
					),

				},

			}

		}




		return {


			email: {

				required: helpers.withMessage(
					'Email is required.',
					required
				),


				email: helpers.withMessage(
					'Invalid email.',
					email
				),

			},



			password: {

				required: helpers.withMessage(
					'Password is required.',
					required
				),


				minLength: helpers.withMessage(
					'Password must be at least 8 characters.',
					minLength(8)
				),

			},


		}

	})




	function shouldShowGeneralAuthError(message?: string, fieldErrors: FormErrors = {}): boolean {
		const authMessage = 'These credentials do not match our records.'
		const fieldMessage = Object.values(fieldErrors).flat().find((errorMessage) => errorMessage === authMessage)

		return method === 'signin' && (message === authMessage || Boolean(fieldMessage))
	}

	function setErrors(error: unknown): void {


		const axiosError = error as {
			response?: {
				status?: number
				data?: BackendErrorResponse
			}
		}

		const responseMessage = axiosError.response?.data?.message
		const fieldErrors = axiosError.response?.data?.errors ?? {}

		if (axiosError.response?.status === 422) {
			const filteredErrors = Object.entries(fieldErrors).reduce((acc, [field, messages]) => {
				const normalizedMessages = (messages ?? []).filter((messageText) => {
					if (method === 'signin' && messageText === 'These credentials do not match our records.') {
						return false
					}

					return true
				})

				if (normalizedMessages.length > 0) {
					acc[field] = normalizedMessages
				}

				return acc
			}, {} as FormErrors)

			errors.value = filteredErrors
			authError.value = shouldShowGeneralAuthError(responseMessage, fieldErrors)
				? 'Invalid email or password.'
				: null

			return
		}

		errors.value = {}
		authError.value = shouldShowGeneralAuthError(responseMessage, fieldErrors)
			? 'Invalid email or password.'
			: null
	}

	function clearErrors(): void {
		errors.value = {}
		authError.value = null
	}





	return {

		formData,

		rules,

		errors,
		
		authError,

		setErrors,

		clearErrors,

	}

}