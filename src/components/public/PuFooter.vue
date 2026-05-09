<script setup>
import FooterTemplateOne from '@/components/templates/template_one/FooterOne.vue'
import FooterTemplateTwo from '@/components/templates/template_two/FooterTwo.vue'
import FooterTemplateThree from '@/components/templates/template_three/FooterThree.vue'
import FooterTemplateFour from '@/components/templates/template_four/FooterFour.vue'
import FooterTemplateFive from '@/components/templates/template_five/FooterFive.vue'

</script>

<template>
    <component 
      :is="currentTemplate.value  === 'template_one' ? FooterTemplateOne : 
           currentTemplate.value  === 'template_two' ? FooterTemplateTwo : 
           currentTemplate.value  === 'template_three' ? FooterTemplateThree : 
           currentTemplate.value  === 'template_five' ? FooterTemplateFive : 
           FooterTemplateFour"
    />
  </template>