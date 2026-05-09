<script setup>
import { ref } from 'vue'
import { t } from '@/i18n'
import { useThemeImages } from '@/utils/themeimg'
const AgentImg = useThemeImages().agent
const VITE_APP_NAME = import.meta.env.VITE_APP_NAME


let faq_list = ref([
    {
        title: `O que é o programa de afiliados <span class="text-four">${window.document.title}</span>?`,
        content: `<p><span class="text-four">${window.document.title}</span> Afiliados é um programa onde oferecemos a você a oportunidade de ganhar dinheiro todos os dias, simplesmente nos dando a chance de receber mais jogadores.</p>`
    },
    {
        title: `QUANTO CUSTA PARA PARTICIPAR?`,
        content: `<p>Absolutamente nada. É totalmente gratuito.</p>`
    },
    {
        title: `Posso obter benefícios mesmo se não tiver um site?`,
        content: `<p>Claro que pode. Podemos fornecer todas as ferramentas de marketing de que você precisa para promover a <span class="text-four">${window.document.title}</span> offline nas mídias sociais ou por e-mail.</p>`
    },
    {
        title: `QUANTO EU GANHO?`,
        content: `<p>Como parte da nossa rede de afiliados, você será pago em um modelo de compartilhamento de receita. Você ganha mais de 80% de recompensa de comissão.</p>`
    },
    {
        title: `Desenvolvimento e recompensas para os subordinados`,
        content: `<p><img src="${AgentImg.img_invite}" alt=""></p><p>1. Você receberá uma porcentagem de comissão diferente toda vez que um jogador indicado por você fizer uma aposta,<span class="text-four">ganhar ou perder.</span></p><p>2. O sistema calcula a comissão a cada 3 minutos.</p>`
    },
    {
        title: `Regras de cálculo de comissão`,
        content: ``,
        type: 'regra'
    },
    {
        title: `Definição`,
        content: `<p>Aposta válidas em equipe [num] - Total de valor de apostas válidas provenientes de indicações e contribuições de suas equipes. num - Número total de indicações e membros de suas equipes que contribuíram com apostas válidas.</p>`
    }
])
let faq_list_m4 = ref([
    {
        title: `O que é o programa de afiliados <span class="m4-text">${window.document.title}</span>?`,
        content: `<p class="text-white/60"><span class="text-themetext0">${window.document.title}</span> Afiliados é um programa onde oferecemos a você a oportunidade de ganhar dinheiro todos os dias, simplesmente nos dando a chance de receber mais jogadores.</p>`
    },
    {
        title: `QUANTO CUSTA PARA PARTICIPAR?`,
        content: `<p class="text-white/60">Absolutamente nada. É totalmente gratuito.</p>`
    },
    {
        title: `Posso obter benefícios mesmo se não tiver um site?`,
        content: `<p class="text-white/60">Claro que pode. Podemos fornecer todas as ferramentas de marketing de que você precisa para promover a <span class="text-theme-three">${window.document.title}</span> offline nas mídias sociais ou por e-mail.</p>`
    },
    {
        title: `QUANTO EU GANHO?`,
        content: `<p class="text-white/60">Como parte da nossa rede de afiliados, você será pago em um modelo de compartilhamento de receita. Você ganha mais de 80% de recompensa de comissão.</p>`
    },
    {
        title: `Desenvolvimento e recompensas para os subordinados`,
        content: `<p class="text-white/60"><img src="/imgs/agent/agent-invite.png" alt=""></p><p class='text-white'>1. Você receberá uma porcentagem de comissão diferente toda vez que um jogador indicado por você fizer uma aposta,<span class="text-theme-three">ganhar ou perder.</span></p><p class='text-white'>2. O sistema calcula a comissão a cada 3 minutos.</p>`
    },
    {
        title: `Regras de cálculo de comissão`,
        content: ``,
        type: 'regra'
    },
    {
        title: `Definição`,
        content: `<p class="text-white/60">Aposta válidas em equipe [num] - Total de valor de apostas válidas provenientes de indicações e contribuições de suas equipes. num - Número total de indicações e membros de suas equipes que contribuíram com apostas válidas.</p>`
    }
])
</script>

<template>
    <div>
        <ul class="mt-4 p-2" v-if="currentTemplate.value=='template_one'||currentTemplate.value == 'template_five'">
            <template v-for="item,index in faq_list" :key="index" >
                <li class="w-full  mb-4 rounded-xl p-3 block border border-rgbawhite10 bg-gradient-to-t from-transparent to-rgbawhite10" >
                    <h5 v-html="item.title" class="text-base font-bold text-center"></h5>
                    <section v-if="item.type&&item.type=='regra'" class="mt-2  text-sm">
                        <dl class="mt-4 flex">
                            <dt class="mr-2 shrink-0">
                                <van-image :src=AgentImg.icon_fq1 width="5rem" height="5rem" fit="contain" />
                            </dt>
                            <dd class="flex-1 overflow-hidden">
                                <p class="text-sm opacity-65">O C3 é poderoso e também possui</p>
                                <p class="text-base">
                                    <span class="text-four">110</span>/million
                                </p>
                            </dd>
                        </dl>
                        <div class="mt-4">
                            <p class="mb-1 flex items-center justify-between">
                                <span class="text-[0.625rem]">Desempenho total 3,31M, Bônus total do agente</span>
                                <span class="text-four shrink-0">2500</span>
                            </p>
                            <p class="mb-1 flex items-center justify-between">
                                <span class="text-[0.625rem]">Desempenho de subordinado 180K, Contribuiu</span>
                                <span class="text-four shrink-0">1980</span>
                            </p>
                            <p class="mb-1 flex items-center justify-between">
                                <span class="text-[0.625rem]">Outro desempenho 3,13M, Contribuir</span>
                                <span class="text-four shrink-0">520</span>
                            </p>
                        </div>
                        <div class="h-[8.125rem] mt-4 relative">
                            <img :src=AgentImg.icon_fqtr style="width: 4.125rem;height: 5.1875rem;position: absolute;top: 1rem;left: 2.5rem;">
                            <img :src=AgentImg.icon_fqt style="width: 4.125rem;height: 5.1875rem;position: absolute;top: 0;left: 50%;margin-left: -2.0625rem;">
                            <img :src=AgentImg.icon_fqtl style="width: 4.125rem;height: 5.1875rem;position: absolute;top: 1rem;right: 2.5rem;">
                            <div class="w-[9.375rem] text-[0.625rem] text-center absolute -left-[1.875rem] top-[1.375rem] -rotate-45">
                                <span>Contribuição de B1</span>
                                <br>
                                <span class="text-four">1320</span>
                            </div>
                            <div class="w-[9.375rem] text-[0.625rem] text-center absolute left-[0.9375rem] top-[4.375rem] -rotate-45">
                                <span>Outras contribuições de</span>
                                <br>
                                <span>C1 e C2 </span>
                                <span class="text-four">520</span>
                            </div>
                            <div class="w-[9.375rem] text-[0.625rem] text-center absolute left-1/2 bottom-1 -translate-x-1/2">
                                <span>Contribuir para A: </span>
                                <br>
                                <span class="text-four">440</span>
                            </div>
                            <div class="w-[9.375rem] text-[0.625rem] text-center absolute right-[0.9375rem] top-[4.3125rem] rotate-45">
                                <span>Outras contribuições de</span>
                                <br>
                                <span>C3 </span>
                                <span class="text-four">0</span>
                            </div>
                            <div class="w-[9.375rem] text-[0.625rem] text-center absolute -right-[1.875rem] top-[1.375rem] rotate-45">
                                <span>Contribuição de B3</span>
                                <br>
                                <span class="text-four">220</span>
                            </div>
                        </div>
                        <dl class="w-full flex justify-between">
                            <dd class="w-[5.8125rem] bg-faqcolor1 text-themewhite rounded-lg">
                                <div class="w-full py-3 flex flex-col items-center">
                                    <van-image :src=AgentImg.icon_fq2 width="4.125rem" height="4.125rem" fit="contain" />
                                    <div class="w-full px-1 mt-3 text-xs text-rgbawhite80 leading-4 text-center">
                                        <p>Subagente ganha, geralmente <span class="text-four">70</span>/10K</p>
                                    </div>
                                </div>
                                <div class="w-full px-1 py-3 bg-faqcolor2 text-themewhite text-center font-bold rounded-b-lg">
                                    <p class="text-[0.625rem]">Apostas válidas</p>
                                    <p class="text-sm">120K</p>
                                </div>
                            </dd>
                            <dd class="w-[5.8125rem] bg-faqcolor1 text-themewhite rounded-lg">
                                <div class="w-full py-3 flex flex-col items-center">
                                    <van-image :src=AgentImg.icon_fq3 width="4.125rem" height="4.125rem" fit="contain" />
                                    <div class="w-full px-1 mt-3 text-xs text-rgbawhite80 leading-4 text-center">
                                        <p>B2 não tem subordinados, por isso não tem lucros</p>
                                    </div>
                                </div>
                                <div class="w-full px-1 py-3 bg-faqcolor2 text-themewhite text-center font-bold rounded-b-lg">
                                    <p class="text-[0.625rem]">Apostas válidas</p>
                                    <p class="text-sm">40K</p>
                                </div>
                            </dd>
                            <dd class="w-[5.8125rem] bg-faqcolor1 text-themewhite rounded-lg">
                                <div class="w-full py-3 flex flex-col items-center">
                                    <van-image :src=AgentImg.icon_fq4 width="4.125rem" height="4.125rem" fit="contain" />
                                    <div class="w-full px-1 mt-3 text-xs text-rgbawhite80 leading-4 text-center">
                                        <p>Muito bem subagente, ganhou <span class="text-four">110</span>/10K</p>
                                    </div>
                                </div>
                                <div class="w-full px-1 py-3 bg-faqcolor2 text-themewhite text-center font-bold rounded-b-lg">
                                    <p class="text-[0.625rem]">Apostas válidas</p>
                                    <p class="text-sm">20K</p>
                                </div>
                            </dd>
                        </dl>
                        <div class="w-full pt-[5.1875rem] pb-2 mt-2 relative">
                            <img :src=AgentImg.icon_fqt style="width: 4.125rem;height: 5.1875rem;position: absolute;top: 0;left: 0.875rem;">
                            <img :src=AgentImg.icon_fqt style="width: 4.125rem;height: 5.1875rem;position: absolute;top: 0;left: 8.525rem;">
                            <img :src=AgentImg.icon_fqt style="width: 4.125rem;height: 5.1875rem;position: absolute;top: 0;right: 0.875rem;">
                            <ol class="w-full text-[0.625rem] text-center flex justify-between">
                                <li class="w-[5.8125rem]">
                                    <p>
                                        <span>Contribuir para A:</span>
                                        <br>
                                        <b class="text-four">400</b>
                                    </p>
                                    <p class="mt-2">
                                        <span>Contribuir para B1:</span>
                                        <br>
                                        <b class="text-four">700</b>
                                    </p>
                                </li>
                                <li class="w-[5.8125rem]">
                                    <p>
                                        <span>Contribuir para A:</span>
                                        <br>
                                        <b class="text-four">120</b>
                                    </p>
                                    <p class="mt-2">
                                        <span>Contribuir para B1:</span>
                                        <br>
                                        <b class="text-four">210</b>
                                    </p>
                                </li>
                                <li class="w-[5.8125rem]">
                                    <p>
                                        <span>Contribuir para A:</span>
                                        <br>
                                        <b class="text-four">0</b>
                                    </p>
                                    <p class="mt-2">
                                        <span>Contribuir para B3:</span>
                                        <br>
                                        <b class="text-four">33000</b>
                                    </p>
                                </li>
                            </ol>
                        </div>
                        <dl class="w-full flex justify-between">
                            <dd class="w-[5.8125rem]  text-themewhite rounded-lg bg-faqcolor3" >
                                <div class="w-full py-3 flex flex-col items-center">
                                    <van-image :src=AgentImg.icon_fq5 width="4.125rem" height="4.125rem" fit="contain" />
                                    <div class="w-full px-1 mt-3 text-xs text-rgbawhite80 leading-4 text-center">
                                        <p>C1 não tem subordinados, por isso não tem lucros</p>
                                    </div>
                                </div>
                                <div class="w-full px-1 py-3  text-themewhite text-center font-bold rounded-b-lg bg-faqcolor4" >
                                    <p class="text-[0.625rem]">Apostas válidas</p>
                                    <p class="text-sm">100K</p>
                                </div>
                            </dd>
                            <dd class="w-[5.8125rem]  text-themewhite rounded-lg bg-faqcolor3" >
                                <div class="w-full py-3 flex flex-col items-center">
                                    <van-image :src=AgentImg.icon_fq6 width="4.125rem" height="4.125rem" fit="contain" />
                                    <div class="w-full px-1 mt-3 text-xs text-rgbawhite80 leading-4 text-center">
                                        <p>C2 não tem subordinados, por isso não tem lucros</p>
                                    </div>
                                </div>
                                <div class="w-full px-1 py-3  text-themewhite text-center font-bold rounded-b-lg bg-faqcolor4" >
                                    <p class="text-[0.625rem]">Apostas válidas</p>
                                    <p class="text-sm">30K</p>
                                </div>
                            </dd>
                            <dd class="w-[5.8125rem] text-themewhite rounded-lg bg-faqcolor3" >
                                <div class="w-full py-3 flex flex-col items-center">
                                    <van-image :src=AgentImg.icon_fq7 width="4.125rem" height="4.125rem" fit="contain" />
                                    <div class="w-full px-1 mt-3 text-xs text-rgbawhite80 leading-4 text-center">
                                        <p>C3 não tem subordinados, por isso não tem lucros</p>
                                    </div>
                                </div>
                                <div class="w-full px-1 py-3 text-themewhite text-center font-bold rounded-b-lg bg-faqcolor4" >
                                    <p class="text-[0.625rem]">Apostas válidas</p>
                                    <p class="text-sm">3000K</p>
                                </div>
                            </dd>
                        </dl>
                        <article class="ctx-article mt-4 text-xs leading-5 text-rgbawhite50">
                            <h5 class="text-sm text-rgbawhite80 leading-5"><b>Por exemplo:</b></h5>
                            <p>Neste website o bônus do agente é calculado por apostas. Por exemplo, se as apostas forem 10-200000, a taxa de bônus correspondente será 70/10000, e se as apostas forem superiores a 3000000, o bônus de agente é 110/10000. A é o agente do website, ele recruta B1, B2 e B3 como seus agentes e B1 também recruta C1 e C2 como seus agentes. B2 não tem agentes e B3 tem apenas um agente C3. Alguns dias depois, a aposta efetiva do próprio B1 é de 120.000, a aposta efetiva de B2 é de 40.000, as apostas efetivas de B3 são 20.000, as apostas efetivas do C1 são 100.000, as apostas efetivas do C2 são 30.000, C3 Eu tenho 3 milhões de apostas eficazes, Em seguida, o desempenho total de B1 vem de 130.000 de C1 e C2, e a taxa de retorno da comissão correspondente é 70/10.000; B2 não tem desempenho subordinado 0; a taxa de retorno da comissão é 110/10.000; a tem 180.000 do Equipe direta e 3,13 milhões de outras equipes, com um desempenho total de 3,31 milhões, e a taxa de retorno correspondente é 110/10.000.</p>
                            <br>
                            <h5 class="text-sm text-rgbawhite80 leading-5"><b>Por conseguinte, o bônus é calculado da seguinte forma:</b></h5>
                            <p>1. Equipe direta: refere-se aos membros do desenvolvimento vertical, que são coletivamente chamados de Equipe direta.</p>
                            <p>(1) B1, B2, B3 contribuem para A: (120000 + 40000 + 20000) x 110/10000 = 1980.</p>
                            <p>(2) C1 e C2 contribuem para B1: (100000 + 30000) x 70/10000 = 910.</p>
                            <p>(3) C3 contribui para B3: 3 milhões x 110/10000 = 33000.</p>
                            <br>
                            <p>2. Outras equipes: refere-se aos membros do desenvolvimento de subordinados, subordinados, etc., que são coletivamente chamados de outras equipes; porque este sistema pode desenvolver subordinados indefinidamente, para melhor compreensão, este artigo apenas toma como exemplo uma estrutura de 2 níveis.</p>
                            <p>(1) De C1 e C2: Visto que o desempenho total de B1 é de 130000, tem apenas uma taxa de desconto de 70/10000, enquanto que o desempenho total de A é de 3,31 milhões, e tem uma taxa de desconto de 110/10000. Então a diferença de desconto entre A e B1 é de: 110-70=40, esta diferença é a parte contribuída por C1 e C2 para A, portanto C1 e C2 contribuem para A: (100000+30000)×40/10000=520.</p>
                            <p>(2) Outras equipes: refere-se aos membros do desenvolvimento de subordinados, subordinados, etc., que são coletivamente chamados de outras equipes; porque este sistema pode desenvolver subordinados indefinidamente, para melhor compreensão, este artigo apenas toma como exemplo uma estrutura de 2 níveis.</p>
                            <br>
                            <p>3. Resumo:</p>
                            <p>(1) C3 é poderoso, indiretamente permite que todo o desempenho de A desfrute de uma proporção maior de retornos da comissão.</p>
                            <p>(2) B2 pode ser preguiçoso, e não tem vantagem se não houver desenvolvimento de subordinados.</p>
                            <p>(3) Apesar de B3 se ter juntado relativamente tarde e pertencer aos subordinados de A, o seu subordinado C3 é poderoso, permitindo que B3 desfrute diretamente da mais alta taxa de desconto, e A não pode ganhar diretamente a diferença de B3. Por isso, de quem é a posição de B3 quando este se junta? Os benefícios dos subordinados, independentemente do nível em que se encontrem, nunca serão afetados, deixarão de sofrer as perdas de outros subordinados, e o seu desenvolvimento não será restringido.</p>
                            <p>(4) Este é um modelo de agência absolutamente justo, e não prejudicará sempre quem se juntar mais tarde.</p>
                            <p></p>
                        </article>
                    </section>
                    <article v-else v-html="item.content" class="ctx-article mt-2 text-xs leading-5 text-rgbawhite80"></article>
                </li>
            </template>
        </ul>
        <ul class="mt-4 p-2" v-if="currentTemplate.value=='template_two'||currentTemplate.value=='template_three'">
            <template v-for="item,index in faq_list" :key="index" >
                <li class="w-full  mb-4 rounded-xl p-3  block bg-tablergba40" >
                    <h5 v-html="item.title" class="text-base font-bold text-center"></h5>
                    <section v-if="item.type&&item.type=='regra'" class="mt-2  text-sm">
                        <dl class="mt-4 flex">
                            <dt class="mr-2 shrink-0">
                                <van-image :src=AgentImg.icon_fq1 width="5rem" height="5rem" fit="contain" />
                            </dt>
                            <dd class="flex-1 overflow-hidden">
                                <p class="text-sm opacity-65">O C3 é poderoso e também possui</p>
                                <p class="text-base">
                                    <span class="text-four">110</span>/million
                                </p>
                            </dd>
                        </dl>
                        <div class="mt-4">
                            <p class="mb-1 flex items-center justify-between">
                                <span class="text-[0.625rem]">Desempenho total 3,31M, Bônus total do agente</span>
                                <span class="text-four shrink-0">2500</span>
                            </p>
                            <p class="mb-1 flex items-center justify-between">
                                <span class="text-[0.625rem]">Desempenho de subordinado 180K, Contribuiu</span>
                                <span class="text-four shrink-0">1980</span>
                            </p>
                            <p class="mb-1 flex items-center justify-between">
                                <span class="text-[0.625rem]">Outro desempenho 3,13M, Contribuir</span>
                                <span class="text-four shrink-0">520</span>
                            </p>
                        </div>
                        <div class="h-[8.125rem] mt-4 relative">
                            <img :src=AgentImg.icon_fqtr style="width: 4.125rem;height: 5.1875rem;position: absolute;top: 1rem;left: 2.5rem;">
                            <img :src=AgentImg.icon_fqt style="width: 4.125rem;height: 5.1875rem;position: absolute;top: 0;left: 50%;margin-left: -2.0625rem;">
                            <img :src=AgentImg.icon_fqtl style="width: 4.125rem;height: 5.1875rem;position: absolute;top: 1rem;right: 2.5rem;">
                            <div class="w-[9.375rem] text-[0.625rem] text-center absolute -left-[1.875rem] top-[1.375rem] -rotate-45">
                                <span>Contribuição de B1</span>
                                <br>
                                <span class="text-four">1320</span>
                            </div>
                            <div class="w-[9.375rem] text-[0.625rem] text-center absolute left-[0.9375rem] top-[4.375rem] -rotate-45">
                                <span>Outras contribuições de</span>
                                <br>
                                <span>C1 e C2 </span>
                                <span class="text-four">520</span>
                            </div>
                            <div class="w-[9.375rem] text-[0.625rem] text-center absolute left-1/2 bottom-1 -translate-x-1/2">
                                <span>Contribuir para A: </span>
                                <br>
                                <span class="text-four">440</span>
                            </div>
                            <div class="w-[9.375rem] text-[0.625rem] text-center absolute right-[0.9375rem] top-[4.3125rem] rotate-45">
                                <span>Outras contribuições de</span>
                                <br>
                                <span>C3 </span>
                                <span class="text-four">0</span>
                            </div>
                            <div class="w-[9.375rem] text-[0.625rem] text-center absolute -right-[1.875rem] top-[1.375rem] rotate-45">
                                <span>Contribuição de B3</span>
                                <br>
                                <span class="text-four">220</span>
                            </div>
                        </div>
                        <dl class="w-full flex justify-between">
                            <dd class="w-[5.8125rem] bg-faqcolor1 text-themewhite rounded-lg">
                                <div class="w-full py-3 flex flex-col items-center">
                                    <van-image :src=AgentImg.icon_fq2 width="4.125rem" height="4.125rem" fit="contain" />
                                    <div class="w-full px-1 mt-3 text-xs text-rgbawhite80 leading-4 text-center">
                                        <p>Subagente ganha, geralmente <span class="text-four">70</span>/10K</p>
                                    </div>
                                </div>
                                <div class="w-full px-1 py-3 bg-faqcolor2 text-themewhite text-center font-bold rounded-b-lg">
                                    <p class="text-[0.625rem]">Apostas válidas</p>
                                    <p class="text-sm">120K</p>
                                </div>
                            </dd>
                            <dd class="w-[5.8125rem] bg-faqcolor1 text-themewhite rounded-lg">
                                <div class="w-full py-3 flex flex-col items-center">
                                    <van-image :src=AgentImg.icon_fq3 width="4.125rem" height="4.125rem" fit="contain" />
                                    <div class="w-full px-1 mt-3 text-xs text-rgbawhite80 leading-4 text-center">
                                        <p>B2 não tem subordinados, por isso não tem lucros</p>
                                    </div>
                                </div>
                                <div class="w-full px-1 py-3 bg-faqcolor2 text-themewhite text-center font-bold rounded-b-lg">
                                    <p class="text-[0.625rem]">Apostas válidas</p>
                                    <p class="text-sm">40K</p>
                                </div>
                            </dd>
                            <dd class="w-[5.8125rem] bg-faqcolor1 text-themewhite rounded-lg">
                                <div class="w-full py-3 flex flex-col items-center">
                                    <van-image :src=AgentImg.icon_fq4 width="4.125rem" height="4.125rem" fit="contain" />
                                    <div class="w-full px-1 mt-3 text-xs text-rgbawhite80 leading-4 text-center">
                                        <p>Muito bem subagente, ganhou <span class="text-four">110</span>/10K</p>
                                    </div>
                                </div>
                                <div class="w-full px-1 py-3 bg-faqcolor2 text-themewhite text-center font-bold rounded-b-lg">
                                    <p class="text-[0.625rem]">Apostas válidas</p>
                                    <p class="text-sm">20K</p>
                                </div>
                            </dd>
                        </dl>
                        <div class="w-full pt-[5.1875rem] pb-2 mt-2 relative">
                            <img :src=AgentImg.icon_fqt style="width: 4.125rem;height: 5.1875rem;position: absolute;top: 0;left: 0.875rem;">
                            <img :src=AgentImg.icon_fqt style="width: 4.125rem;height: 5.1875rem;position: absolute;top: 0;left: 8.525rem;">
                            <img :src=AgentImg.icon_fqt style="width: 4.125rem;height: 5.1875rem;position: absolute;top: 0;right: 0.875rem;">
                            <ol class="w-full text-[0.625rem] text-center flex justify-between">
                                <li class="w-[5.8125rem]">
                                    <p>
                                        <span>Contribuir para A:</span>
                                        <br>
                                        <b class="text-four">400</b>
                                    </p>
                                    <p class="mt-2">
                                        <span>Contribuir para B1:</span>
                                        <br>
                                        <b class="text-four">700</b>
                                    </p>
                                </li>
                                <li class="w-[5.8125rem]">
                                    <p>
                                        <span>Contribuir para A:</span>
                                        <br>
                                        <b class="text-four">120</b>
                                    </p>
                                    <p class="mt-2">
                                        <span>Contribuir para B1:</span>
                                        <br>
                                        <b class="text-four">210</b>
                                    </p>
                                </li>
                                <li class="w-[5.8125rem]">
                                    <p>
                                        <span>Contribuir para A:</span>
                                        <br>
                                        <b class="text-four">0</b>
                                    </p>
                                    <p class="mt-2">
                                        <span>Contribuir para B3:</span>
                                        <br>
                                        <b class="text-four">33000</b>
                                    </p>
                                </li>
                            </ol>
                        </div>
                        <dl class="w-full flex justify-between">
                            <dd class="w-[5.8125rem]  text-themewhite rounded-lg bg-faqcolor1" >
                                <div class="w-full py-3 flex flex-col items-center">
                                    <van-image :src=AgentImg.icon_fq5 width="4.125rem" height="4.125rem" fit="contain" />
                                    <div class="w-full px-1 mt-3 text-xs text-rgbawhite80 leading-4 text-center">
                                        <p>C1 não tem subordinados, por isso não tem lucros</p>
                                    </div>
                                </div>
                                <div class="w-full px-1 py-3  text-themewhite text-center font-bold rounded-b-lg bg-faqcolor2">
                                    <p class="text-[0.625rem]">Apostas válidas</p>
                                    <p class="text-sm">100K</p>
                                </div>
                            </dd>
                            <dd class="w-[5.8125rem]  text-themewhite rounded-lg bg-faqcolor1" >
                                <div class="w-full py-3 flex flex-col items-center">
                                    <van-image :src=AgentImg.icon_fq6 width="4.125rem" height="4.125rem" fit="contain" />
                                    <div class="w-full px-1 mt-3 text-xs text-rgbawhite80 leading-4 text-center">
                                        <p>C2 não tem subordinados, por isso não tem lucros</p>
                                    </div>
                                </div>
                                <div class="w-full px-1 py-3  text-themewhite text-center font-bold rounded-b-lg bg-faqcolor2" >
                                    <p class="text-[0.625rem]">Apostas válidas</p>
                                    <p class="text-sm">30K</p>
                                </div>
                            </dd>
                            <dd class="w-[5.8125rem] text-themewhite rounded-lg bg-faqcolor1" >
                                <div class="w-full py-3 flex flex-col items-center">
                                    <van-image :src=AgentImg.icon_fq7 width="4.125rem" height="4.125rem" fit="contain" />
                                    <div class="w-full px-1 mt-3 text-xs text-rgbawhite80 leading-4 text-center">
                                        <p>C3 não tem subordinados, por isso não tem lucros</p>
                                    </div>
                                </div>
                                <div class="w-full px-1 py-3 text-themewhite text-center font-bold rounded-b-lg bg-faqcolor2">
                                    <p class="text-[0.625rem]">Apostas válidas</p>
                                    <p class="text-sm">3000K</p>
                                </div>
                            </dd>
                        </dl>
                        <article class="ctx-article mt-4 text-xs leading-5 text-rgbawhite50">
                            <h5 class="text-sm text-rgbawhite80 leading-5"><b>Por exemplo:</b></h5>
                            <p>Neste website o bônus do agente é calculado por apostas. Por exemplo, se as apostas forem 10-200000, a taxa de bônus correspondente será 70/10000, e se as apostas forem superiores a 3000000, o bônus de agente é 110/10000. A é o agente do website, ele recruta B1, B2 e B3 como seus agentes e B1 também recruta C1 e C2 como seus agentes. B2 não tem agentes e B3 tem apenas um agente C3. Alguns dias depois, a aposta efetiva do próprio B1 é de 120.000, a aposta efetiva de B2 é de 40.000, as apostas efetivas de B3 são 20.000, as apostas efetivas do C1 são 100.000, as apostas efetivas do C2 são 30.000, C3 Eu tenho 3 milhões de apostas eficazes, Em seguida, o desempenho total de B1 vem de 130.000 de C1 e C2, e a taxa de retorno da comissão correspondente é 70/10.000; B2 não tem desempenho subordinado 0; a taxa de retorno da comissão é 110/10.000; a tem 180.000 do Equipe direta e 3,13 milhões de outras equipes, com um desempenho total de 3,31 milhões, e a taxa de retorno correspondente é 110/10.000.</p>
                            <br>
                            <h5 class="text-sm text-rgbawhite80 leading-5"><b>Por conseguinte, o bônus é calculado da seguinte forma:</b></h5>
                            <p>1. Equipe direta: refere-se aos membros do desenvolvimento vertical, que são coletivamente chamados de Equipe direta.</p>
                            <p>(1) B1, B2, B3 contribuem para A: (120000 + 40000 + 20000) x 110/10000 = 1980.</p>
                            <p>(2) C1 e C2 contribuem para B1: (100000 + 30000) x 70/10000 = 910.</p>
                            <p>(3) C3 contribui para B3: 3 milhões x 110/10000 = 33000.</p>
                            <br>
                            <p>2. Outras equipes: refere-se aos membros do desenvolvimento de subordinados, subordinados, etc., que são coletivamente chamados de outras equipes; porque este sistema pode desenvolver subordinados indefinidamente, para melhor compreensão, este artigo apenas toma como exemplo uma estrutura de 2 níveis.</p>
                            <p>(1) De C1 e C2: Visto que o desempenho total de B1 é de 130000, tem apenas uma taxa de desconto de 70/10000, enquanto que o desempenho total de A é de 3,31 milhões, e tem uma taxa de desconto de 110/10000. Então a diferença de desconto entre A e B1 é de: 110-70=40, esta diferença é a parte contribuída por C1 e C2 para A, portanto C1 e C2 contribuem para A: (100000+30000)×40/10000=520.</p>
                            <p>(2) Outras equipes: refere-se aos membros do desenvolvimento de subordinados, subordinados, etc., que são coletivamente chamados de outras equipes; porque este sistema pode desenvolver subordinados indefinidamente, para melhor compreensão, este artigo apenas toma como exemplo uma estrutura de 2 níveis.</p>
                            <br>
                            <p>3. Resumo:</p>
                            <p>(1) C3 é poderoso, indiretamente permite que todo o desempenho de A desfrute de uma proporção maior de retornos da comissão.</p>
                            <p>(2) B2 pode ser preguiçoso, e não tem vantagem se não houver desenvolvimento de subordinados.</p>
                            <p>(3) Apesar de B3 se ter juntado relativamente tarde e pertencer aos subordinados de A, o seu subordinado C3 é poderoso, permitindo que B3 desfrute diretamente da mais alta taxa de desconto, e A não pode ganhar diretamente a diferença de B3. Por isso, de quem é a posição de B3 quando este se junta? Os benefícios dos subordinados, independentemente do nível em que se encontrem, nunca serão afetados, deixarão de sofrer as perdas de outros subordinados, e o seu desenvolvimento não será restringido.</p>
                            <p>(4) Este é um modelo de agência absolutamente justo, e não prejudicará sempre quem se juntar mais tarde.</p>
                            <p></p>
                        </article>
                    </section>
                    <article v-else v-html="item.content" class="ctx-article mt-2 text-xs leading-5 text-rgbawhite80"></article>
                </li>
            </template>
        </ul>
        <ul class="!px-ctx !py-4 " v-if="currentTemplate.value=='template_four'">
            <template v-for="item,index in faq_list_m4" :key="index">
                <li class="w-full p-4 mb-4 rounded-xl block bg-tablebg">
                    <h5 v-html="item.title" class="m4-text font-bold text-left"></h5>
                    <section v-if="item.type&&item.type=='regra'" class="mt-2 text-sm">
                        <dl class="mt-4 flex">
                            <dt class="mr-2 shrink-0">
                                <van-image :src=AgentImg.icon_fq1 width="5rem" height="5rem" fit="contain" />
                            </dt>
                            <dd class="flex-1 overflow-hidden">
                                <p class="text-sm m4-text">O C3 é poderoso e também possui</p>
                                <p class="">
                                    <span class="m4-text">110</span>/million
                                </p>
                            </dd>
                        </dl>
                        <div class="mt-4">
                            <p class="mb-1 flex items-center justify-between">
                                <span class="text-[0.625rem]">Desempenho total 3,31M, Bônus total do agente</span>
                                <span class="text-themetext0 shrink-0">2500</span>
                            </p>
                            <p class="mb-1 flex items-center justify-between">
                                <span class="text-[0.625rem]">Desempenho de subordinado 180K, Contribuiu</span>
                                <span class="text-themetext0 shrink-0">1980</span>
                            </p>
                            <p class="mb-1 flex items-center justify-between">
                                <span class="text-[0.625rem]">Outro desempenho 3,13M, Contribuir</span>
                                <span class="text-themetext0 shrink-0">520</span>
                            </p>
                        </div>
                        <div class="h-[8.125rem] mt-4 relative">
                            <img :src=AgentImg.icon_fqtr style="width: 4.125rem;height: 5.1875rem;position: absolute;top: 1rem;left: 2.5rem;">
                            <img :src=AgentImg.icon_fqt style="width: 4.125rem;height: 5.1875rem;position: absolute;top: 0;left: 50%;margin-left: -2.0625rem;">
                            <img :src=AgentImg.icon_fqtl style="width: 4.125rem;height: 5.1875rem;position: absolute;top: 1rem;right: 2.5rem;">
                            <div class="w-[9.375rem] text-[0.625rem] text-center absolute -left-[1.875rem] top-[1.375rem] -rotate-45">
                                <span>Contribuição de B1</span>
                                <br>
                                <span class="text-themetext0">1320</span>
                            </div>
                            <div class="w-[9.375rem] text-[0.625rem] text-center absolute left-[0.9375rem] top-[4.375rem] -rotate-45">
                                <span>Outras contribuições de</span>
                                <br>
                                <span>C1 e C2 </span>
                                <span class="text-themetext0">520</span>
                            </div>
                            <div class="w-[9.375rem] text-[0.625rem] text-center absolute left-1/2 bottom-1 -translate-x-1/2">
                                <span>Contribuir para A: </span>
                                <br>
                                <span class="text-themetext0">440</span>
                            </div>
                            <div class="w-[9.375rem] text-[0.625rem] text-center absolute right-[0.9375rem] top-[4.3125rem] rotate-45">
                                <span>Outras contribuições de</span>
                                <br>
                                <span>C3 </span>
                                <span class="text-themetext0">0</span>
                            </div>
                            <div class="w-[9.375rem] text-[0.625rem] text-center absolute -right-[1.875rem] top-[1.375rem] rotate-45">
                                <span>Contribuição de B3</span>
                                <br>
                                <span class="text-themetext0">220</span>
                            </div>
                        </div>
                        <dl class="w-full flex justify-between">
                            <dd class="w-[5.8125rem] bg-white/20  text-white  rounded-lg">
                                <div class="w-full py-3 flex flex-col items-center">
                                    <van-image :src=AgentImg.icon_fq2 width="4.125rem" height="4.125rem" fit="contain" />
                                    <div class="w-full px-1 mt-3 text-xs  text-white /85 leading-4 text-center">
                                        <p>Subagente ganha, geralmente <span class="text-themetext0">70</span>/10K</p>
                                    </div>
                                </div>
                                <div class="w-full px-1 py-3 bg-black/20 text-white  text-center font-bold rounded-b-lg">
                                    <p class="text-[0.625rem]">Apostas válidas</p>
                                    <p class="text-sm">120K</p>
                                </div>
                            </dd>
                            <dd class="w-[5.8125rem] bg-white/20  text-white  rounded-lg">
                                <div class="w-full py-3 flex flex-col items-center">
                                    <van-image  :src=AgentImg.icon_fq3  width="4.125rem" height="4.125rem" fit="contain" />
                                    <div class="w-full px-1 mt-3 text-xs  text-white /85 leading-4 text-center">
                                        <p>B2 não tem subordinados, por isso não tem lucros</p>
                                    </div>
                                </div>
                                <div class="w-full px-1 py-3 bg-black/20  text-white  text-center font-bold rounded-b-lg">
                                    <p class="text-[0.625rem]">Apostas válidas</p>
                                    <p class="text-sm">40K</p>
                                </div>
                            </dd>
                            <dd class="w-[5.8125rem] bg-white/20  text-white  rounded-lg">
                                <div class="w-full py-3 flex flex-col items-center">
                                    <van-image :src=AgentImg.icon_fq4  width="4.125rem" height="4.125rem" fit="contain" />
                                    <div class="w-full px-1 mt-3 text-xs  text-white /85 leading-4 text-center">
                                        <p>Muito bem subagente, ganhou <span class="text-themetext0">110</span>/10K</p>
                                    </div>
                                </div>
                                <div class="w-full px-1 py-3 bg-black/20  text-white  text-center font-bold rounded-b-lg">
                                    <p class="text-[0.625rem]">Apostas válidas</p>
                                    <p class="text-sm">20K</p>
                                </div>
                            </dd>
                        </dl>
                        <div class="w-full pt-[5.1875rem] pb-2 mt-2 relative">
                            <img :src=AgentImg.icon_fqt style="width: 4.125rem;height: 5.1875rem;position: absolute;top: 0;left: 0.875rem;">
                            <img :src=AgentImg.icon_fqt style="width: 4.125rem;height: 5.1875rem;position: absolute;top: 0;left: 7.525rem;">
                            <img :src=AgentImg.icon_fqt style="width: 4.125rem;height: 5.1875rem;position: absolute;top: 0;right: 0.875rem;">
                            <ol class="w-full text-[0.625rem] text-center flex justify-between">
                                <li class="w-[5.8125rem]">
                                    <p>
                                        <span>Contribuir para A:</span>
                                        <br>
                                        <b class="text-themetext0">400</b>
                                    </p>
                                    <p class="mt-2">
                                        <span>Contribuir para B1:</span>
                                        <br>
                                        <b class="text-themetext0">700</b>
                                    </p>
                                </li>
                                <li class="w-[5.8125rem]">
                                    <p>
                                        <span>Contribuir para A:</span>
                                        <br>
                                        <b class="text-themetext0">120</b>
                                    </p>
                                    <p class="mt-2">
                                        <span>Contribuir para B1:</span>
                                        <br>
                                        <b class="text-themetext0">210</b>
                                    </p>
                                </li>
                                <li class="w-[5.8125rem]">
                                    <p>
                                        <span>Contribuir para A:</span>
                                        <br>
                                        <b class="text-themetext0">0</b>
                                    </p>
                                    <p class="mt-2">
                                        <span>Contribuir para B3:</span>
                                        <br>
                                        <b class="text-themetext0">33000</b>
                                    </p>
                                </li>
                            </ol>
                        </div>
                        <dl class="w-full flex justify-between">
                            <dd class="w-[5.8125rem] bg-white/20  text-white  rounded-lg">
                                <div class="w-full py-3 flex flex-col items-center">
                                    <van-image :src=AgentImg.icon_fq5   width="4.125rem" height="4.125rem" fit="contain" />
                                    <div class="w-full px-1 mt-3 text-xs  text-white /85 leading-4 text-center">
                                        <p>C1 não tem subordinados, por isso não tem lucros</p>
                                    </div>
                                </div>
                                <div class="w-full px-1 py-3 bg-black/20  text-white  text-center font-bold rounded-b-lg">
                                    <p class="text-[0.625rem]">Apostas válidas</p>
                                    <p class="text-sm">100K</p>
                                </div>
                            </dd>
                            <dd class="w-[5.8125rem] bg-white/20  text-white  rounded-lg">
                                <div class="w-full py-3 flex flex-col items-center">
                                    <van-image :src=AgentImg.icon_fq6 width="4.125rem" height="4.125rem" fit="contain" />
                                    <div class="w-full px-1 mt-3 text-xs  text-white /85 leading-4 text-center">
                                        <p>C2 não tem subordinados, por isso não tem lucros</p>
                                    </div>
                                </div>
                                <div class="w-full px-1 py-3 bg-black/20  text-white  text-center font-bold rounded-b-lg">
                                    <p class="text-[0.625rem]">Apostas válidas</p>
                                    <p class="text-sm">30K</p>
                                </div>
                            </dd>
                            <dd class="w-[5.8125rem] bg-white/20  text-white  rounded-lg">
                                <div class="w-full py-3 flex flex-col items-center">
                                    <van-image :src=AgentImg.icon_fq7  width="4.125rem" height="4.125rem" fit="contain" />
                                    <div class="w-full px-1 mt-3 text-xs  text-white /85 leading-4 text-center">
                                        <p>C3 não tem subordinados, por isso não tem lucros</p>
                                    </div>
                                </div>
                                <div class="w-full px-1 py-3 bg-black/20  text-white  text-center font-bold rounded-b-lg">
                                    <p class="text-[0.625rem]">Apostas válidas</p>
                                    <p class="text-sm">3000K</p>
                                </div>
                            </dd>
                        </dl>
                        <article class="mt-4 text-xs leading-5 text-white/60">
                            <h5 class="text-sm text-white leading-5"><b>Por exemplo:</b></h5>
                            <p>Neste website o bônus do agente é calculado por apostas. Por exemplo, se as apostas forem 10-200000, a taxa de bônus correspondente será 70/10000, e se as apostas forem superiores a 3000000, o bônus de agente é 110/10000. A é o agente do website, ele recruta B1, B2 e B3 como seus agentes e B1 também recruta C1 e C2 como seus agentes. B2 não tem agentes e B3 tem apenas um agente C3. Alguns dias depois, a aposta efetiva do próprio B1 é de 120.000, a aposta efetiva de B2 é de 40.000, as apostas efetivas de B3 são 20.000, as apostas efetivas do C1 são 100.000, as apostas efetivas do C2 são 30.000, C3 Eu tenho 3 milhões de apostas eficazes, Em seguida, o desempenho total de B1 vem de 130.000 de C1 e C2, e a taxa de retorno da comissão correspondente é 70/10.000; B2 não tem desempenho subordinado 0; a taxa de retorno da comissão é 110/10.000; a tem 180.000 do Equipe direta e 3,13 milhões de outras equipes, com um desempenho total de 3,31 milhões, e a taxa de retorno correspondente é 110/10.000.</p>
                            <br>
                            <h5 class="text-sm text-white leading-5"><b>Por conseguinte, o bônus é calculado da seguinte forma:</b></h5>
                            <p>1. Equipe direta: refere-se aos membros do desenvolvimento vertical, que são coletivamente chamados de Equipe direta.</p>
                            <p>(1) B1, B2, B3 contribuem para A: (120000 + 40000 + 20000) x 110/10000 = 1980.</p>
                            <p>(2) C1 e C2 contribuem para B1: (100000 + 30000) x 70/10000 = 910.</p>
                            <p>(3) C3 contribui para B3: 3 milhões x 110/10000 = 33000.</p>
                            <br>
                            <p>2. Outras equipes: refere-se aos membros do desenvolvimento de subordinados, subordinados, etc., que são coletivamente chamados de outras equipes; porque este sistema pode desenvolver subordinados indefinidamente, para melhor compreensão, este artigo apenas toma como exemplo uma estrutura de 2 níveis.</p>
                            <p>(1) De C1 e C2: Visto que o desempenho total de B1 é de 130000, tem apenas uma taxa de desconto de 70/10000, enquanto que o desempenho total de A é de 3,31 milhões, e tem uma taxa de desconto de 110/10000. Então a diferença de desconto entre A e B1 é de: 110-70=40, esta diferença é a parte contribuída por C1 e C2 para A, portanto C1 e C2 contribuem para A: (100000+30000)×40/10000=520.</p>
                            <p>(2) Outras equipes: refere-se aos membros do desenvolvimento de subordinados, subordinados, etc., que são coletivamente chamados de outras equipes; porque este sistema pode desenvolver subordinados indefinidamente, para melhor compreensão, este artigo apenas toma como exemplo uma estrutura de 2 níveis.</p>
                            <br>
                            <p>3. Resumo:</p>
                            <p>(1) C3 é poderoso, indiretamente permite que todo o desempenho de A desfrute de uma proporção maior de retornos da comissão.</p>
                            <p>(2) B2 pode ser preguiçoso, e não tem vantagem se não houver desenvolvimento de subordinados.</p>
                            <p>(3) Apesar de B3 se ter juntado relativamente tarde e pertencer aos subordinados de A, o seu subordinado C3 é poderoso, permitindo que B3 desfrute diretamente da mais alta taxa de desconto, e A não pode ganhar diretamente a diferença de B3. Por isso, de quem é a posição de B3 quando este se junta? Os benefícios dos subordinados, independentemente do nível em que se encontrem, nunca serão afetados, deixarão de sofrer as perdas de outros subordinados, e o seu desenvolvimento não será restringido.</p>
                            <p>(4) Este é um modelo de agência absolutamente justo, e não prejudicará sempre quem se juntar mais tarde.</p>
                            <p></p>
                        </article>
                    </section>
                    <article v-else v-html="item.content" class="mt-2 text-xs leading-5 text-themefont"></article>
                </li>
            </template>
        </ul>

        <!-- <pu-no-data></pu-no-data> -->
        <em class="w-full h-[4.25rem] block"></em>
    </div>
</template>