import { courses } from './courses'
import type { AuthPageContent, Course } from './types'

const findCourse = (id: string): Course => {
  const course = courses.find((item) => item.id === id)
  if (!course) throw new Error(`Missing auth collage course: ${id}`)
  return course
}

export const authCollageCourses = {
  back: findCourse('c2'),
  front: findCourse('c3'),
}

export const registerContent: AuthPageContent = {
  promoTitle: 'Sign up and come in',
  promoBody:
    'The registration process is straightforward, uncomplicated, and efficient, allowing users to sign up quickly, easily, and at no cost',
  eyebrow: 'Create an Account',
  title: 'Welcome to ByteSpace',
  submitLabel: 'Continue',
  switchPrompt: 'Already have an account?',
  switchLabel: 'Login',
  switchHref: '/login',
}

export const loginContent: AuthPageContent = {
  promoTitle: 'Sign in with ease',
  promoBody:
    'Experience a seamless and efficient sign-in process that grants you instant access to a world of knowledge.',
  eyebrow: 'Sign In',
  title: 'Welcome Back',
  submitLabel: 'Sign In',
  switchPrompt: 'New user?',
  switchLabel: 'Create an account',
  switchHref: '/register',
}
