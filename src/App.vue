<template>
  <!-- Mã hóa -->
  <div id="container" class="container">
    <div class="header">
      MÃ HÓA
    </div>
    <div class="body">
      <div class="body__item body__item--banro">
        <div class="item__title">
          <div class="span">Bản rõ:</div>
        </div>

        <div class="item__body">
          <textarea 
            class="textarea"
            v-model="encryptInput"
          ></textarea>
        </div>

        <div class="item__function">
          <button  type="file" class="button">
            Nhập file
            <input 
              type="file"
              class="button hidden"
              @change="importFileEncrypt"         
            >
          </button>
        </div>
      </div>

      <div class="body__item body__item--mahoa">
        <button class="button" @click="encrypt">Mã hóa</button>
      </div>

      <div class="body__item body__item--banma">
        <div class="item__title">
          <div class="span">Bản mã:</div>
        </div>

        <div class="item__body">
          <textarea 
            class="textarea"
            v-model="encryptOutput"
          ></textarea>
        </div>

        <div class="item__function">
          <button class="button" @click="onDecrypt">Chuyển</button> 
          <button @click="exportFileEncrypt" class="button">Xuất file</button>
        </div>
      </div>
    </div>
  </div>
  <!-- End: Mã hóa -->

  <!-- Giải mã -->
  <div id="container" class="container">
    <div class="header">
      GIẢI MÃ
    </div>
    <div class="body">
      <div class="body__item body__item--banro">
        <div class="item__title">
          <div class="span">Bản mã:</div>
        </div>

        <div class="item__body">
          <textarea 
            class="textarea"
            v-model="decryptInput"
          ></textarea>
        </div>

        <div class="item__function">
          <button class="button">
            Nhập file
            <input 
              type="file"
              class="button hidden"
              @change="importFileDecrypt"         
            >
          </button>
        </div>
      </div>

      <div class="body__item body__item--mahoa">
        <button @click="decrypt" class="button">Giải mã</button>
      </div>

      <div class="body__item body__item--banma">
        <div class="item__title">
          <div class="span">Bản rõ:</div>
        </div>

        <div class="item__body">
          <textarea 
            class="textarea"
            v-model="decryptOutput"
          ></textarea>
        </div>

        <div class="item__function">     
          <button class="button" @click="onEncrypt">Chuyển</button> 

          <button @click="exportFileDecrypt" class="button">Xuất file</button>
        </div>
      </div>
    </div>
  </div>
  <!-- End: Giải mã -->
</template>

<script>
import axios from "axios";
import { saveAs, encodeBase64 } from '@progress/kendo-file-saver';
import { defineComponent } from "vue";
import { useStore } from "@/stores/store";

export default defineComponent({


    setup() {
      const store = useStore();

      return { store }
    },
    data() {
      return {
        url: 'http://localhost:5220/api/RSAs',
        encryptInput: '',
        encryptOutput: '',
        decryptInput: '',
        decryptOutput: ''
      }
    },

    methods: {
      onDecrypt() {
        this.decryptInput = this.encryptOutput;
      },

      exportFileEncrypt() {
        if (this.encryptOutput) {
          const dataURI = "data:text/plain;base64," + encodeBase64(this.encryptOutput);
          saveAs(dataURI, "rsa.txt");
        }
      },

      importFileEncrypt(ev) {
        const file = ev.target.files[0];
        const reader = new FileReader();
  
        reader.readAsText(file);

        reader.onload = e =>{
          this.encryptInput = e.target.result;
        };
      },

      encrypt() {
        let me = this;
        if (me.encryptInput) {
          axios.post(`${me.url}/encrypt`, {
            "value": me.encryptInput
          })
          .then((resource) => {
            me.encryptOutput = resource.data.ketQua;
            this.store.setKhoa(resource.data.khoa);
          })
          .catch((error) => {
              console.log('error' + error.status);
          });
        }
      },

      onEncrypt() {
        this.encryptInput = this.decryptOutput;
      },

      exportFileDecrypt() {
        if (this.decryptOutput) {
          const dataURI = "data:text/plain;base64," + encodeBase64(this.decryptOutput);
          saveAs(dataURI, "rsa.txt");
        }
      },

      importFileDecrypt(ev) {
        const file = ev.target.files[0];
        const reader = new FileReader();

        reader.readAsText(file);

        reader.onload = e =>{
          this.decryptInput = e.target.result;
        };
      },

      decrypt() {
        let me = this;
        if (me.decryptInput) {
          axios.post(`${me.url}/decrypt`, {
            "textToDecrypt": me.decryptInput,
            "khoa": me.store.getKhoa
          })
          .then((resource) => {
            me.decryptOutput = resource.data;
          })
          .catch((error) => {
              console.log('error' + error.status);
              me.decryptOutput = "";
          });
        }
      }
    },
  })
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  height: 20px;
  font-size: 20px;
  text-align: center;
  line-height: 20px;
}

nav a.router-link-exact-active {
  color: var(--color-text);
  font-size: 28px;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  border-left: 1px solid var(--color-border);
  font-size: 20px;
}


#container {
  margin-right: 80px;
}

.header {
  font-size: 60px;
  color: rgb(0, 189, 126);
  text-align: center;
  font-weight: 500;
  margin-bottom: 80px;
}

.body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.body__item {
  display: flex;
  align-items: center;
}

.item__title {
  min-width: 80px;
}

.item__body {
  margin: 20px;
}

.item__function {
  margin-left: 16px;
}

.textarea {
  width: 360px;
  height: 160px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  font-size: 16px;
  resize: none;
  outline: none;
}

.textarea:hover,
.textarea:focus {
  border: 2px solid rgb(0, 189, 126);
}

.button {
  background-color: rgb(0, 189, 126);
  outline: none;
  border: 1px solid rgb(0, 189, 126);
  padding: 16px 32px;
  width: 120px;
  margin: 10px 2px;
  border-radius: 4px;
  color: #fff;
  position: relative;
}

.button:hover {
  cursor: pointer;
  background-color: rgb(0, 214, 142);
  border: 1px solid rgb(0, 214, 142);
}

.button:active {
  background-color: rgb(0, 138, 92);
  border: 1px solid rgb(0, 138, 92);
}

.hidden {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: -10px;
  opacity: 0;
}

</style>
