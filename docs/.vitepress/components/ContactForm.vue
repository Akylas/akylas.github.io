<template>
  <div class="contact-form-wrapper">
    <!-- <div class="contact-form-header">
      <h2>Send Me a Message</h2>
      <p>Have a project in mind or want to discuss collaboration? Fill out the form below and I'll get back to you within 24-48 hours.</p>
    </div> -->

    <form @submit.prevent="handleSubmit" class="contact-form" ref="formRef">
      <div class="form-row">
        <div class="form-group">
          <label for="name">Your Name *</label>
          <input
            type="text"
            id="name"
            v-model="formData.name"
            required
            :disabled="isSubmitting"
            placeholder="John Doe"
          />
          <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
        </div>

        <div class="form-group">
          <label for="email">Your Email *</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            required
            :disabled="isSubmitting"
            placeholder="john@example.com"
          />
          <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="phone">Your Phone</label>
          <input
            type="tel"
            id="phone"
            v-model="formData.phone"
            :disabled="isSubmitting"
            placeholder="+1 (555) 123-4567"
          />
          <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
        </div>

        <div class="form-group">
          <label for="subject">Subject</label>
          <input
            type="text"
            id="subject"
            v-model="formData.subject"
            :disabled="isSubmitting"
            placeholder="Project Inquiry"
          />
        </div>
      </div>

      <!-- Honeypot field for spam protection -->
      <input
        type="text"
        id="_gotcha"
        v-model="formData._gotcha"
        style="display: none"
        tabindex="-1"
        autocomplete="off"
      />

      <div class="form-group full-width">
        <label for="message">Your Message *</label>
        <textarea
          id="message"
          v-model="formData.message"
          required
          :disabled="isSubmitting"
          rows="6"
          placeholder="Tell me about your project, timeline, and any specific requirements..."
        ></textarea>
        <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
      </div>

      <div v-if="submitStatus === 'success'" class="alert alert-success">
        <strong>✓ Success!</strong> Your message has been sent successfully. I'll get back to you soon!
      </div>

      <div v-if="submitStatus === 'error'" class="alert alert-error">
        <strong>✗ Error</strong> {{ errorMessage }}
      </div>

      <button type="submit" class="submit-button" :disabled="isSubmitting">
        <span v-if="!isSubmitting">Send Message</span>
        <span v-else>Sending...</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const formRef = ref(null)
const isSubmitting = ref(false)
const submitStatus = ref(null)
const errorMessage = ref('')

const formData = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  _gotcha: '' // Honeypot field
})

const errors = reactive({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const validateForm = () => {
  let isValid = true
  
  // Reset errors
  errors.name = ''
  errors.email = ''
  errors.message = ''

  if (!formData.name.trim()) {
    errors.name = 'Please enter your name'
    isValid = false
  }

  if (!formData.email.trim()) {
    errors.email = 'Please enter your email'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }

  if (!formData.message.trim()) {
    errors.message = 'Please enter a message'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  // Check honeypot
  if (formData._gotcha) {
    console.log('Spam detected')
    return
  }

  isSubmitting.value = true
  submitStatus.value = null
  errorMessage.value = ''

  try {
    const response = await fetch('https://formspree.io/f/moqplllb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        _gotcha: formData._gotcha
      })
    })

    if (response.ok) {
      submitStatus.value = 'success'
      // Reset form
      formData.name = ''
      formData.email = ''
      formData.phone = ''
      formData.subject = ''
      formData.message = ''
      formData._gotcha = ''

      // Scroll to success message
      setTimeout(() => {
        const alert = document.querySelector('.alert-success')
        if (alert) {
          alert.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)

      // Clear success message after 10 seconds
      setTimeout(() => {
        submitStatus.value = null
      }, 10000)
    } else {
      const data = await response.json()
      throw new Error(data.error || 'Failed to send message')
    }
  } catch (error) {
    console.error('Form submission error:', error)
    submitStatus.value = 'error'
    errorMessage.value = error.message || 'Something went wrong. Please try again later or contact me via GitHub.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.contact-form-wrapper {
  max-width: 900px;
  margin: 3rem auto;
  padding: 0 1rem;
}

.contact-form-header {
  text-align: center;
  margin-bottom: 3rem;
}

.contact-form-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--akylas-primary, #42C0ED), var(--akylas-secondary, #16afe6));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

.contact-form-header p {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

.contact-form {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: var(--shadow-lg, 0 8px 32px rgba(0, 0, 0, 0.15));
  backdrop-filter: blur(10px);
}

/* Dark theme adjustments */
.dark .contact-form {
  background: linear-gradient(135deg, rgba(26, 31, 46, 0.9), rgba(15, 20, 25, 0.95));
  border: 1px solid rgba(66, 192, 237, 0.2);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  margin-bottom: 1.5rem;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
  font-size: 0.95rem;
}

.form-group input,
.form-group textarea {
  padding: 0.875rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  font-size: 1rem;
  font-family: inherit;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--akylas-primary, #42C0ED);
  box-shadow: 0 0 0 3px rgba(66, 192, 237, 0.1);
}

.form-group input:disabled,
.form-group textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-group textarea {
  resize: vertical;
  min-height: 150px;
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.alert {
  padding: 1rem 1.5rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.alert-success {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  color: #22c55e;
}

.dark .alert-success {
  background: rgba(34, 197, 94, 0.15);
  border-color: rgba(34, 197, 94, 0.4);
}

.alert-error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
}

.dark .alert-error {
  background: rgba(239, 68, 68, 0.15);
  border-color: rgba(239, 68, 68, 0.4);
}

.submit-button {
  width: 100%;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, var(--akylas-primary, #42C0ED), var(--akylas-secondary, #16afe6));
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(66, 192, 237, 0.3);
  position: relative;
  overflow: hidden;
}

.submit-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.submit-button:hover::before {
  left: 100%;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(66, 192, 237, 0.4);
}

.submit-button:active:not(:disabled) {
  transform: translateY(0);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 768px) {
  .contact-form {
    padding: 2rem 1.5rem;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .contact-form-header h2 {
    font-size: 2rem;
  }

  .contact-form-header p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .contact-form-wrapper {
    padding: 0 0.5rem;
  }

  .contact-form {
    padding: 1.5rem 1rem;
  }

  .contact-form-header h2 {
    font-size: 1.75rem;
  }

  .submit-button {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }
}
</style>
