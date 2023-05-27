import { defineStore } from "pinia";

export const useStore = defineStore("store",{
    state: () => ({
        input: null,
        privateKey: null,
        publicKey: null,
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
    },

})