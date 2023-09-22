<template>

  <header class="text-center bg-dark text-bg-dark p-3 container">
    <img alt="Vue logo"
         width="150"
         height="150"
         class="rounded-circle"
         src="./assets/logo.png">

    <h1 class="mb-0">A simple password generator - powered by VueJS</h1>
  </header>

  <section class="text-center passwordGeneratorContainer mx-auto text-bg-dark mt-0 container p-5">
    <div class="form-group position-relative">
      <label for="newPassword"
             class="form-label d-inline-block">Generated password&nbsp;</label>
      <input type="text"
             class="form-control d-inline-block w-50 text-white"
             aria-describedby="newPassword"
             id="newPassword"
             readonly
             v-model="newPassword">
      <button class="btn copyPassword fw-bold"
              @click="copyToClipboard">
        <font-awesome-icon icon="copy" />
        Copy
      </button>
      <div v-if="copied"
           class="passwordCopied">Copied!</div>
    </div>

    <div class="form-group">
      <label for="passwordLength"
             class="form-label">Length&nbsp;</label>
      <input type="range"
             class="form-range w-auto pt-3"
             id="passwordLength"
             min="6"
             max="255"
             step="1"
             v-model="passwordLength">
      <span class="passwordLengthCurrentValue ms-3 d-inline-block">{{ passwordLength }}</span>
    </div>

    <div class="form-group">

      <label for="includeLetters"
             class="d-block form-label">Characters to include</label>

      <div class="form-check form-switch w-50 mx-auto">
        <input class="form-check-input me-3"
               type="checkbox"
               role="switch"
               id="includeLetters"
               v-model="includeLetters">
        <label class="form-check-label"
               for="includeLetters">Letters (A-Z a-z)</label>
      </div>

      <div class="form-check form-switch w-50 mx-auto">
        <input class="form-check-input me-3"
               type="checkbox"
               role="switch"
               id="includeNumbers"
               v-model="includeNumbers">
        <label class="form-check-label"
               for="includeNumbers">Numbers (0-9)</label>
      </div>

      <div class="form-check form-switch w-50 mx-auto">
        <input class="form-check-input me-3"
               type="checkbox"
               role="switch"
               id="includeSymbols"
               v-model="includeSymbols">
        <label class="form-check-label"
               for="includeSymbols">Symbols (!$@#%&?^)</label>
      </div>

    </div>
    <div>
      <button class="btn fw-bold generateButton mt-3"
              @click="generatePassword">
        Generate
      </button>
    </div>
  </section>
</template>

<script>

// importing bootstrap
import 'bootstrap/dist/css/bootstrap.css';

// importing FontAwesomeIcon component for font awesome icon's rendering
import {FontAwesomeIcon} from './fontawesome';

export default
{
  name: 'App',
  data()
  {
    return {
      passwordLength: 6,    // length of the password
      includeLetters: true, // new psw will include letters (lowercase and uppercase)
      includeNumbers: true, // new psw will include numbers
      includeSymbols: true, // new psw will include symbols (!$@#%&?^)
      newPassword: '',      // new generated password
      copied: false,        // the new psw has been copied into the user's clipboard
    }
  },
  methods:
  {
    /**
     * This method will take care of the new password generation.
     * Instead of generating a random index with Math.random(), we'll utilize the Web Crypto API
     *
     * https://www.w3schools.com/jsref/met_crypto_getrandomvalues.asp
     */
    generatePassword()
    {
      this.copied      = false; // resetting the copied status
      this.newPassword = '';    // resetting the content of newPassword read only input
      let charSet      = '';    // defining charset

      // if user requested to include letters
      if(this.includeLetters)
      {
        // generating lower cases and upper cases char sets
        const lowercaseChars = Array.from({ length: 26 }, (_, i) =>
            String.fromCharCode(97 + i)
        ).join('');

        const uppercaseChars = Array.from({ length: 26 }, (_, i) =>
            String.fromCharCode(65 + i)
        ).join('');

        // adding newly generated charset into che global charset used to generate the password
        charSet += lowercaseChars;
        charSet += uppercaseChars;
      }

      // if user requested to include numbers
      if(this.includeNumbers)
      {
        // generating integers char set
        const numericChars = Array.from({ length: 10 }, (_, i) =>
            String.fromCharCode(48 + i)
        ).join('');

        // adding the newly generated charset into che global charset used to generate the password
        charSet += numericChars;
      }

      // if user requested to include symbols
      if(this.includeSymbols)
      {
        // defining symbols char set
        const symbols = '!$@#%&?^';

        // adding the newly generated charset into che global charset used to generate the password
        charSet += symbols;
      }

      let newPassword = ''; // inizializing the newPassword string

      // if the user requested to include at least one type of characters into the new password
      if(charSet.length > 0)
      {
        const charSetLength = charSet.length; // the total length of the charset

        // generating a typed array containing N 32-bit unsigned integers, where N is the user defined password length
        const randomValues  = new Uint32Array(this.passwordLength);

        // filling up the newly generated typed array `randomValues` with the Web Crypto Api;
        // this method will generate pseudo-random number seeded
        window.crypto.getRandomValues(randomValues);

        // filling up the newPassword string with N random characters, where N is the user defined password length
        for(let i = 0; i < this.passwordLength; i++)
        {
          // retrieving a random char from the charset string;
          // we'll use one of the typed array's random integers to get better results
          newPassword += charSet[randomValues[i] % charSetLength];
        }
      }

      // saving the newly generated password
      this.newPassword = newPassword;
    },
    /**
     * This method will take care of filling up the user clipboard with the current generated password
     * @returns {boolean}
     */
    copyToClipboard()
    {
      this.copied = false; // resetting the "copied" status

      // if the user didn't generated a valid password yet
      if(this.newPassword.length < 1)
      {
        return false;
      }

      // using the browser's navigator interface and the Clipboard API to write the new password into the user's clipboard
      navigator.clipboard.writeText(this.newPassword);

      this.copied = true; // the password has been copied
    }
  },
  components: { FontAwesomeIcon } // loading components
}
</script>

<style lang="scss">
#app {
  .passwordLengthCurrentValue {
    text-align: left;
    width: 30px;
  }
  .passwordGeneratorContainer {
    background-color: rgba(58, 28, 49, 0.7) !important;
    backdrop-filter: blur(10px);
    width: 600px;
    border-radius: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.45), 0 4px 8px rgba(0, 0, 0, 0.35), 0 8px 12px rgba(0, 0, 0, 0.15);
  }
  .form-label { font-weight: bold; }
  .form-switch { line-height: 36px; }
  .form-switch label { width: 160px; }
  .form-switch input {
    height: 2rem;
    width: 3rem !important;
    cursor: pointer;
    float: initial;
  }
  .copyPassword {
    background: rgb(255,206,159);
    background: linear-gradient(45deg, rgba(255,206,159,1) 0%, rgba(255,179,106,1) 35%, rgba(241,140,44,1) 100%);
    float: right;
  }
  .generateButton {
    background: rgb(241,194,194);
    background: linear-gradient(45deg, rgba(241,194,194,1) 0%, rgba(203,104,104,1) 35%, rgba(212,52,52,1) 100%);
  }
  .passwordCopied {
    position: absolute;
    background-color: $pink;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    top: 13px;
    right: -97px;
    filter: hue-rotate(45deg);
    color: black;
  }
  .passwordCopied:before {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    border-left: 10px solid transparent;
    border-right: 10px solid $pink;
    border-top: 10px solid $pink;
    border-bottom: 10px solid transparent;
    left: -20px;
    top: 6px;
  }
}
</style>