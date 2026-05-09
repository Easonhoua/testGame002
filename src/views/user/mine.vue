<script setup>
import MineTemplateOne from '@/components/templates/template_one/MineOne.vue'
import MineTemplateTwo from '@/components/templates/template_two/MineTwo.vue'
import MineTemplateThree from '@/components/templates/template_three/MineThree.vue'
import MineTemplateFour from '@/components/templates/template_four/MineFour.vue'
import MineTemplateFive from '@/components/templates/template_five/MineFive.vue'
</script>

<template>

    <component 
      :is="currentTemplate.value === 'template_one' ? MineTemplateOne : 
           currentTemplate.value === 'template_two' ? MineTemplateTwo : 
           currentTemplate.value === 'template_three' ? MineTemplateThree : 
           currentTemplate.value === 'template_four' ? MineTemplateFour : 
           MineTemplateFive"
    />
  </template>
