<template>
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
              @change="importFile"         
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
          <button class="button" @click="onDecrypt">Chuyển</button> 

          <button @click="exportFile" class="button">Xuất file</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { saveAs, encodeBase64 } from '@progress/kendo-file-saver';
import { defineComponent } from "vue";
import { useStore } from "../stores/store";

export default defineComponent({
  setup() {
    const store = useStore();

    return { store }
  },

  created() {
    if(this.store.getInput) {
      this.decryptInput = this.store.getInput;
      this.store.setInput("");
    }
  },

  data() {
    return {
      url: 'http://localhost:5220/api/RSAs',
      decryptInput: '',
      decryptOutput: '',
    }
  },

  methods: {
    onDecrypt() {
      this.store.setInput(this.decryptOutput);
      this.$router.push('/');

    },

    exportFile() {
      if (this.decryptOutput) {
        const dataURI = "data:text/plain;base64," + encodeBase64(this.decryptOutput);
        saveAs(dataURI, "rsa.txt");
      }
    },

    importFile(ev) {
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

<style lang="css" scoped>

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