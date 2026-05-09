<script setup>
import HomeOne from '@/components/templates/template_one/HomeOne.vue'
import HomeTemplateTwo from '@/components/templates/template_two/HomeTwo.vue'
import HomeTemplateThree from '@/components/templates/template_three/HomeThree.vue'
import HomeTemplateFour from '@/components/templates/template_four/HomeFour.vue'
import HomeTemplateFive from '@/components/templates/template_five/HomeFive.vue'
</script>

<template>

    <component 
      :is="currentTemplate.value === 'template_one' ? HomeOne : 
           currentTemplate.value === 'template_two' ? HomeTemplateTwo : 
           currentTemplate.value === 'template_three' ? HomeTemplateThree : 
           currentTemplate.value === 'template_five' ? HomeTemplateFive : 
           HomeTemplateFour"
    />
  </template>