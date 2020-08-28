import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

new Vue({
    el: '#app',
    data() {
        return {
            form: {
                name: '',
                value: ''
            },
            contacts: []
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
    },
    async mounted() {
        this.contacts = await request('/api/contacts');
    }
})

async function request(url, method = 'GET', data = null) {
    try {
        const headers = {};
        let body;

        if (data) {
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(data);
        }

        const response = await fetch(url, {
            method,
            headers,
            body
        });
        return await response.json();
    } catch (e) {
        console.warn('Error', e.message);
    }
}