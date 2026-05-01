<script setup>
import { ref, reactive, onMounted } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'

const props = defineProps({
  initialLength: {
    type: Number,
    default: 16
  }
})

const passwordLength = ref(props.initialLength)
const newPassword = ref('')
const copied = ref(false)

const settings = reactive({
  letters: true,
  numbers: true,
  symbols: true
})

const labels = {
  letters: 'Letters (A-Z, a-z)',
  numbers: 'Numbers (0-9)',
  symbols: 'Symbols (!$@#%&?^)'
}

const charsetMap = {
  letters: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!$@#%&?^'
}

/**
 * Generates a random password based on the current settings and updates the relevant reactive properties.
 *
 * The function uses cryptographically secure random values to ensure unpredictability.
 */
const generatePassword = () => {
  copied.value = false

  let charSet = ''

  if (settings.letters) {
    charSet += charsetMap.letters
  }

  if (settings.numbers) {
    charSet += charsetMap.numbers
  }

  if (settings.symbols) {
    charSet += charsetMap.symbols
  }

  if (charSet.length === 0) {
    newPassword.value = ''
    return
  }

  const randomValues = new Uint32Array(passwordLength.value)
  window.crypto.getRandomValues(randomValues)

  let generated = ''

  for (let i = 0; i < passwordLength.value; i++) {
    generated += charSet[randomValues[i] % charSet.length]
  }

  newPassword.value = generated

  copyToClipboard()
}

/**
 * Copies the current value of `newPassword` to the clipboard.
 *
 * This function checks if a value exists in the `newPassword` field before attempting to copy it.
 * If successful, it updates the `copied` state to `true` for a short duration (2 seconds)
 * to indicate a successful copy operation.
 * In the event of a failure, an error is logged to the console.
 *
 * The function makes use of the Clipboard API for copying text to the clipboard.
 *
 * @returns {Promise<void>} Resolves when the text is successfully copied or immediately
 * returns if no value exists in `newPassword`.
 */
const copyToClipboard = async () => {
  if (!newPassword.value) {
    return
  }

  try {
    await navigator.clipboard.writeText(newPassword.value)

    copied.value = true

    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy!', err)
  }
}

onMounted(generatePassword)
</script>

<template>
    <section class="password-generator-card mx-auto text-bg-dark p-5">
        <div class="form-group position-relative mb-4">
            <label for="newPassword"
                   class="form-label d-inline-block">Generated password</label>
            <div class="input-group">
                <input type="text"
                       class="form-control bg-dark text-white border-secondary"
                       id="newPassword"
                       readonly
                       :value="newPassword">
                <button class="btn btn-copy fw-bold"
                        @click="copyToClipboard"
                        :disabled="!newPassword">
                    <FontAwesomeIcon :icon="faCopy"/>
                    Copy
                </button>

                <Transition name="fade">
                    <div v-if="copied"
                         class="password-copied-badge">Copied!
                    </div>
                </Transition>
            </div>
        </div>

        <div class="form-group mb-4">
            <div class="d-flex justify-content-between align-items-center">
                <label for="passwordLength"
                       class="form-label">Length</label>
                <span class="badge bg-primary fs-6">
                    {{ passwordLength }}
                </span>
            </div>
            <input type="range"
                   class="form-range mt-2"
                   id="passwordLength"
                   min="6"
                   max="255"
                   v-model.number="passwordLength">
        </div>

        <div class="form-group mb-4">
            <label class="d-block form-label mb-3">
                Characters to include
            </label>

            <div class="options-grid">
                <div class="form-check form-switch"
                     v-for="(val, key) in settings"
                     :key="key">
                    <input class="form-check-input"
                           type="checkbox"
                           role="switch"
                           :id="key"
                           v-model="settings[key]">
                    <label class="form-check-label"
                           :for="key">
                        {{ labels[key] }}
                    </label>
                </div>
            </div>
        </div>

        <div class="text-center">
            <button class="btn btn-generate fw-bold w-100 py-3"
                    @click="generatePassword">
                Generate Password
            </button>
        </div>
    </section>
</template>

<style scoped lang="scss">
.password-generator-card {
    background-color: rgba(58, 28, 49, 0.75) !important;
    backdrop-filter: blur(12px);
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    max-width: 600px;
    border: 1px solid rgba(255, 255, 255, 0.1);

    .form-label {
        font-weight: 700;
        color: rgba(255, 255, 255, 0.9);
    }

    .options-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 15px;

        @media (min-width: 576px) {
            grid-template-columns: 1fr 1fr;
        }
    }

    .form-switch {
        .form-check-input {
            width: 3em;
            height: 1.5em;
            cursor: pointer;

            &:checked {
                background-color: #f18c2c;
                border-color: #f18c2c;
            }
        }

        label {
            cursor: pointer;
            padding-left: 10px;
        }
    }

    .btn-copy {
        background: linear-gradient(45deg, #ffce9f 0%, #f18c2c 100%);
        color: #000;
        border: none;

        &:hover {
            filter: brightness(1.1);
        }
    }

    .btn-generate {
        background: linear-gradient(45deg, #f1c2c2 0%, #d43434 100%);
        color: white;
        border: none;
        transition: transform 0.2s;

        &:active {
            transform: scale(0.98);
        }
    }

    .password-copied-badge {
        position: absolute;
        top: 0;
        right: -93px;
        background-color: #ffc0cb;
        color: #000;
        padding: 8px 15px;
        border-radius: 8px;
        font-size: 0.85rem;
        font-weight: bold;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        height: 38px;

        &::before {
            content: "";
            position: absolute;
            left: -10px;
            top: 50%;
            transform: translateY(-50%);
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
            border-right: 10px solid #ffc0cb;
        }
    }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>
