<script setup>
    const props = defineProps({
        theme: {
            type: [String, Number],
            default: 0
        }
    })
    </script>
    
    <template>
        
        <section :class="{
            'mx-ctx bg-default-bg text-rgbawhite80 rounded-lg': theme == 0,
            'mx-ctx': theme == 1,
            'px-ctx bg-default-bg text-rgbawhite80': theme == 2,
            'px-ctx': theme == 3,
        }" v-if="currentTemplate.value =='template_one'">
            <slot></slot>
        </section>
    
        <section :class="{
            'mx-ctx bg-tablergba20 text-rgbawhite80 rounded-lg': theme == 0,
            'mx-ctx': theme == 1,
            'px-ctx bg-tablergba20 text-rgbawhite80': theme == 2,
            'px-ctx ': theme == 3,
        }" v-else-if="currentTemplate.value =='template_two'">
            <slot></slot>
        </section>
    
        <section :class="{
            'mx-ctx bg-tablergba20 text-rgbablack15 rounded-lg': theme == 0,
            'mx-ctx bg-tablergba40 text-rgbablack15 rounded-lg': theme == 1,
            'px-ctx text-rgbawhite80': theme == 2,
            'px-ctx ': theme == 3,
        }" v-else-if="currentTemplate.value =='template_three'">
            <slot></slot>
        </section>
        <section :class="{
            'mx-ctx bg-tablebg text-rgbablack15 rounded-lg ': theme == 0,
            'mx-ctx bg-tablebg text-rgbablack15 rounded-lg': theme == 1,
            'px-ctx text-rgbawhite80': theme == 2,
            'px-ctx mt-4': theme == 3,
        }" v-else-if="currentTemplate.value =='template_four'">
            <slot></slot>
        </section>
        <section :class="{
            'mx-ctx bg-default-bg text-rgbawhite80 rounded-lg': theme == 0,
            'mx-ctx': theme == 1,
            'px-ctx': theme == 2,
            'px-ctx mt-4': theme == 3,
        }" v-else-if="currentTemplate.value == 'template_five'">
            <slot></slot>
        </section>

    </template>