import { computed, reactive, ref } from 'vue'
import {
	required,
	minLength,
	email,
	sameAs,
	helpers,
} from '@vuelidate/validators'


type AuthMethod = 'signup' | 'signin'


type SignUpForm = {
	username: string
	email: string
	password: string
	repeatPassword: string
}


type SignInForm = {
	email: string
	password: string
}


type FormData<T extends AuthMethod> =
	T extends 'signup'
		? SignUpForm
		: SignInForm


type FormErrors = Record<string, string[]>



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





	function setErrors(error: unknown) {


		const axiosError = error as {
			response?: {
				status?: number
				data?: {
					errors?: FormErrors
				}
			}
		}



		if (axiosError.response?.status === 422) {


			errors.value = axiosError.response.data?.errors ?? {}


			return

		}



		errors.value = {}

	}

	function clearErrors() {

		errors.value = {}

	}





	return {

		formData,

		rules,

		errors,

		setErrors,

		clearErrors,

	}

}