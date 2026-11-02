<script setup lang="ts">
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { onMounted, reactive, ref } from 'vue'

interface Settings {
  letters: boolean
  numbers: boolean
  symbols: boolean
}

interface Labels {
  [key: string]: string
}

interface CharsetMap {
  [key: string]: string
}

interface Props {
  initialLength: number
}

const props = withDefaults(defineProps<Props>(), {
  initialLength: 16,
})

const passwordLength = ref(props.initialLength)
const newPassword = ref('')
const copied = ref(false)

const settings = reactive<Settings>({
  letters: true,
  numbers: true,
  symbols: true,
})

const labels: Labels = {
  letters: 'Letters (A-Z, a-z)',
  numbers: 'Numbers (0-9)',
  symbols: 'Symbols (!$@#%&?^)',
}

const charsetMap: CharsetMap = {
  letters: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!$@#%&?^',
}

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

  const charSetLength = charSet.length
  const maxValidValue = Math.floor(0xffffffff / charSetLength) * charSetLength

  let generated = ''

  while (generated.length < passwordLength.value) {
    const randomValues = new Uint32Array(passwordLength.value - generated.length)
    window.crypto.getRandomValues(randomValues)

    for (const value of randomValues) {
      if (value < maxValidValue) {
        generated += charSet[value % charSetLength]
        if (generated.length === passwordLength.value) break
      }
    }
  }

  newPassword.value = generated

  copyToClipboard()
}

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
                       class="form-control text-white border-secondary"
                       id="newPassword"
                       disabled
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

        <div class="form-group mb-4 d-flex flex-column justify-content-center align-items-center">
            <div class="psw-length-label d-flex justify-content-between align-items-center">
                <label for="passwordLength"
                       class="form-label">Length</label>
                <span class="badge fs-6">
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
$dark-green: #35495e;
$green: #42b883;
$btn-text-color: #213547;
$dark-grey: #2f2f2f;

.password-generator-card {
    background-color: $dark-green !important;
    backdrop-filter: blur(12px);
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    max-width: 600px;
    border: 1px solid rgba(255, 255, 255, 0.1);

    .form-label {
        font-weight: 700;
        color: rgba(255, 255, 255, 0.9);

        & + .badge {
            background: $dark-grey;
            width: 50px;
        }
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
            outline: none;
            box-shadow: none;

            &:checked {
                background-color: $green;
                border-color: transparent;
            }
        }

        label {
            cursor: pointer;
            padding-left: 10px;
        }
    }

    .psw-length-label,
    .form-range {
        width: 249px;
    }

    .form-control {
        background: $dark-grey;
        outline: none;
        box-shadow: none;
    }

    .btn-copy {
        background: $green;
        color: $btn-text-color;
        border: none;
        border-radius: 0 var(--bs-border-radius) var(--bs-border-radius) 0 !important;

        &:hover {
            filter: brightness(1.1);
        }
    }

    .btn-generate {
        background: linear-gradient($dark-grey, $dark-grey) padding-box, linear-gradient(45deg, #42d392, #647eff) border-box;
        border: 2px solid #0000;
        color: white;
        transition: transform 0.2s;

        &:active {
            transform: scale(0.98);
        }
    }

    .password-copied-badge {
        position: absolute;
        top: 0;
        right: -93px;
        background-color: $green;
        color: $btn-text-color;
        padding: 8px 15px;
        border-radius: 8px !important;
        font-size: 0.85rem;
        font-weight: bold;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);
        height: 38px;

        &::before {
            content: "";
            position: absolute;
            left: -10px;
            top: 50%;
            transform: translateY(-50%);
            border-top: 4px solid transparent;
            border-bottom: 4px solid transparent;
            border-right: 10px solid $green;
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
