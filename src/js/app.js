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
        grayPercentInputValue: '0.2',
        ctaHueInputValue: '150',
        tintOneInputValue: '.1',
        tintTwoInputValue: '.3',
        shadeOneInputValue: '.55',
        shadeTwoInputValue: '.3',
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

        grayPercent() {
            return this.grayPercentInputValue;
        },

        ctaHueShift() {
            return this.ctaHueInputValue;
        },

        tintOneShift() {
            return this.tintOneInputValue;
        },

        tintTwoShift() {
            return this.tintTwoInputValue;
        },

        shadeOneShift() {
            return this.shadeOneInputValue;
        },

        shadeTwoShift() {
            return this.shadeTwoInputValue;
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
                    value: chroma.mix('rgb(253, 253, 253)', this.brand, this.grayPercent, 'lab'),
                },
                'gray-lighter': {
                    name: 'gray Lighter',
                    value: chroma.mix('rgb(225, 225, 225)', this.brand, this.grayPercent, 'lab'),
                },
                'gray-light': {
                    name: 'gray Light',
                    value: chroma.mix('rgb(194, 194, 194)', this.brand, this.grayPercent, 'lab'),
                },
                'gray': {
                    name: 'gray',
                    value: chroma.mix('rgb(163, 163, 163)', this.brand, this.grayPercent, 'lab'),
                },
                'gray-dark': {
                    name: 'gray Dark',
                    value: chroma.mix('rgb(133, 133, 133)', this.brand, this.grayPercent, 'lab'),
                },
                'gray-darker': {
                    name: 'gray Darker',
                    value: chroma.mix('rgb(96, 96, 96)', this.brand, this.grayPercent, 'lab'),
                },
                'gray-darkest': {
                    name: 'gray Darkest',
                    value: chroma.mix('rgb(60, 60, 60)', this.brand, this.grayPercent, 'lab'),
                },
                'black': {
                    name: 'Black',
                    value: chroma.mix('rgb(30, 30, 30)', this.brand, this.grayPercent, 'lab'),
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
