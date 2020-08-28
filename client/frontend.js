import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

Vue.component('loader', {
    template: `
    <div style="display: flex;justify-content: center;align-items: center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  `
})

new Vue({
    el: '#app',
    data() {
        return {
            loading: false,
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
        this.loading = true;
        this.contacts = await request('/api/contacts');
        this.loading = false;
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