import { defineStore } from "pinia";

export const useStore = defineStore("store",{
    state: () => ({
        input: null,
        privateKey: null,
        publicKey: null,
        khoa: null,
    }),

    getters: {
        getInput() {
            return this.input;
        },

        getPrivateKey() {
            return this.privateKey;
        },

        getPublicKey() {
            return this.publicKey;
        },

        getKhoa() {
            return this.khoa;
        },
    },

    actions: {
        setInput(value) {
            this.input = value;
        },

        setPrivateKey(value) {
            this.privateKey = value;
        },

        setPublicKey(value) {
            this.publicKey = value;
        },

        setKhoa(value) {
            this.khoa = value;
        }
    },

})