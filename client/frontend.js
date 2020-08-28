import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

new Vue({
    el: '#app',
    data() {
        return {
            form: {
                name: '',
                value: ''
            },
            contacts: [
                {id: 1, name: 'Danil', value: '8-800-555-55-55', marked: false}
            ]
        }
    },
    computed: {
        canCreate() {
            return this.form.value && this.form.name
        }
    },
    methods: {
        createContact() {
            const {...contact} = this.form;

            this.contacts.push({...contact, id: Date.now(), marked: false})

            this.form.name = '';
            this.form.value = '';
        },
        markContact(id) {
            const contact = this.contacts.find((it) => it.id === id);
            contact.marked = true;
        },
        removeContact(id) {
            this.contacts = this.contacts.filter((it) => it.id !== id); 
        }
    }
})