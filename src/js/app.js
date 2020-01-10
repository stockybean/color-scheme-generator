import Vue from 'vue';
import chroma from 'chroma-js';

new Vue({
    el: '#app',

    created() {
        this.activeTab = localStorage.getItem('activeTab')
            ? localStorage.getItem('activeTab')
            : 'tailwind';
    },

    data: {
        activeTab: null,
        colorInputValue: '',
        percentInputValue: '0.4',
        ctaHueInputValue: '150',
        tintInputValue: '.25',
        shadeInputValue: '.5',
        tabs: [
            {
                id: 'tailwind',
                title: 'Tailwind',
            },
            {
                id: 'sass',
                title: 'SASS',
            },
            {
                id: 'scss',
                title: 'SCSS',
            },
        ],
    },

    computed: {
        brand() {
            return ! this.colorInputValue
                ? this.getRandomColor()
                : chroma(this.colorInputValue);
        },

        percent() {
            return this.percentInputValue;
        },

        ctaHueShift() {
            return this.ctaHueInputValue;
        },

        tintShift() {
            return this.tintInputValue;
        },

        shadeShift() {
            return this.shadeInputValue;
        },

        colors() {
            return {
                'brand': {
                    name: 'Brand',
                    value: this.brand,
                },
                'cta': {
                    name: 'CTA',
                    value: this.brand.set('hsl.h', + this.ctaHueShift),
                },
                'info': {
                    name: 'Info',
                    value: chroma.mix('#3df', this.brand, this.percent, 'lab'),
                },
                'warning': {
                    name: 'Warning',
                    value: chroma.mix('#fd0', this.brand, this.percent, 'lab'),
                },
                'success': {
                    name: 'Success',
                    value: chroma.mix('#3e4', this.brand, this.percent, 'lab'),
                },
                'danger': {
                    name: 'Danger',
                    value: chroma.mix('#f34', this.brand, this.percent, 'lab'),
                },
            };
        },

        grays() {
            return {
                'white': {
                    name: 'White',
                    value: chroma('#fff'),
                },
                'gray-lightest': {
                    name: 'gray Lightest',
                    value: chroma.mix('#fafafa', this.brand, .02, 'lab'),
                },
                'gray-lighter': {
                    name: 'gray Lighter',
                    value: chroma.mix('#e6e6e6', this.brand, .02, 'lab'),
                },
                'gray-light': {
                    name: 'gray Light',
                    value: chroma.mix('#d2d2d2', this.brand, .02, 'lab'),
                },
                'gray': {
                    name: 'gray',
                    value: chroma.mix('#bfbfbf', this.brand, .02, 'lab'),
                },
                'gray-dark': {
                    name: 'gray Dark',
                    value: chroma.mix('#979797', this.brand, .02, 'lab'),
                },
                'gray-darker': {
                    name: 'gray Darker',
                    value: chroma.mix('#6f6f6f', this.brand, .02, 'lab'),
                },
                'gray-darkest': {
                    name: 'gray Darkest',
                    value: chroma.mix('#484848', this.brand, .02, 'lab'),
                },
                'black': {
                    name: 'Black',
                    value: chroma.mix('#202020', this.brand, .02, 'lab'),
                },
            };
        },
    },

    methods: {
        setActiveTab(tab) {
            this.activeTab = tab;
            localStorage.setItem('activeTab', tab);
        },

        getRandomColor() {
            return chroma.random();
        },

        tint(hex, factor) {
            return chroma.mix('#fff', hex, factor, 'lab');
        },

        shade(hex, factor) {
            return chroma.mix('#000', hex, factor, 'lab');
        },
    },
});
