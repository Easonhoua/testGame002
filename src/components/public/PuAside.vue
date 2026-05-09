<script setup>
import AsideTemplateOne from '@/components/templates/template_one/AsideOne.vue'
import AsideTemplateTwo from '@/components/templates/template_two/AsideTwo.vue'
import AsideTemplateThree from '@/components/templates/template_three/AsideThree.vue'
import AsideTemplateFour from '@/components/templates/template_four/AsideFour.vue'
import AsideTemplateFive from '@/components/templates/template_five/AsideFive.vue'
</script>

<template>
    <component 
      :is="currentTemplate.value  === 'template_one' ? AsideTemplateOne : 
           currentTemplate.value  === 'template_two' ? AsideTemplateTwo : 
           currentTemplate.value  === 'template_three' ? AsideTemplateThree : 
           currentTemplate.value  === 'template_five' ? AsideTemplateFive : 
           AsideTemplateFour"
    />
  </template>