<script setup>
import { onMounted } from "vue";
import { t, fn } from "@/i18n";
import { agentIndexModel } from "@/model/agent";
import InviteShareCard from "@/components/pages/InviteShareCard.vue";
import { useThemeImages } from "@/utils/themeimg";
const AgentImg = useThemeImages().agent;
const CommonImg = useThemeImages().common;
const { indexListRef, indexListFunc, agentContentRef } = agentIndexModel();

onMounted(() => {
  indexListFunc();
});
</script>

<template>
  <div>
    <pu-card theme="3" class="mb-3 mt-3">
      <invite-share-card></invite-share-card>
    </pu-card>

    <pu-card
      theme="3"
      class="mb-3"
      v-if="currentTemplate.value == 'template_three'"
    >
      <div class="w-full py-4 bg-faqcolor3 text-themetext1 rounded-xl">
        <h5 class="text-sm text-center font-medium">
          Desenvolvimento ilimitado dos subordinados
        </h5>
        <img :src="AgentImg.img_invite" class="w-full h-auto" />
      </div>
    </pu-card>
    <pu-card
      theme="3"
      class="mb-3"
      v-if="
        currentTemplate.value == 'template_two' || currentTemplate.value == 'template_one' "
    >
      <div
        class="w-full py-4 text-themewhite rounded-xl"
        :class="
          currentTemplate.value == 'template_one'
            ? 'bg-rgbawhite10'
            : 'bg-tablergba40'
        "
      >
        <h5 class="text-sm text-center font-medium">
          Desenvolvimento ilimitado dos subordinados
        </h5>
        <img :src="AgentImg.img_invite" class="w-full h-auto" />
      </div>
    </pu-card>
    <div v-if="currentTemplate.value == 'template_four'">
      <pu-card theme="3" class="mb-3">
        <div class="w-full py-4 text-themewhite rounded-xl bg-tablebg px-2">
          <h5 class="text-sm text-center font-bold m4-text">
            Desenvolvimento ilimitado dos subordinados
          </h5>
          <img :src="AgentImg.img_invite" alt="" />
        </div>
      </pu-card>
      <pu-card theme="3" class="mb-3">
        <h5 class="px-2 text-l font-bold mb-1 text-center m4-text">
          <span>Nível de Afiliado e Recompensas</span>
        </h5>
        <img :src="CommonImg.icon_line" alt="" />
      </pu-card>
    </div>
    <div v-if="currentTemplate.value == 'template_five'">
      <pu-card theme="3" class="mb-3">
        <div class="w-full py-4 text-themewhite rounded-xl bg-tablebg px-2">
          <h5 class="text-sm text-center font-bold m4-text">
            Desenvolvimento ilimitado dos subordinados
          </h5>
          <img :src="AgentImg.img_invite" alt="" />
        </div>
      </pu-card>
      <pu-card theme="3" class="mb-3">
        <h5 class="px-2 text-l font-bold mb-1 text-center m4-text">
          <span>Nível de Afiliado e Recompensas</span>
        </h5>
        <img :src="CommonImg.icon_line" alt="" />
      </pu-card>
    </div>

    <div v-if="currentTemplate.value == 'template_one'">
      <pu-card theme="3" class="mb-3">
        <div
          class="w-full py-3 text-themewhite bg-gradient-to-r from-rgbawhite10 to-transparent border border-rgbawhite10 rounded-xl"
        >
          <!-- <dl class="px-3 mb-3 text-sm flex">
                    <dd class="w-1/2 pr-1">
                        <button class="w-full p-3 bg-theme text-theme-text rounded-lg">
                            <svg class="w-5 h-5 mr-1 inline-block align-middle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M14 14.252V16.3414C13.3744 16.1203 12.7013 16 12 16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14C12.6906 14 13.3608 14.0875 14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM18 17V13.5L23 18L18 22.5V19H15V17H18Z"></path>
                            </svg>
                            <span class="align-middle">Comissões diretas</span>
                        </button>
                    </dd>
                    <dd class="w-1/2 pl-1">
                        <button class="w-full p-3 bg-theme text-theme-text rounded-lg opacity-60">
                            <svg class="w-5 h-5 mr-1 inline-block align-middle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11ZM18.2837 14.7028C21.0644 15.9561 23 18.752 23 22H21C21 19.564 19.5483 17.4671 17.4628 16.5271L18.2837 14.7028ZM17.5962 3.41321C19.5944 4.23703 21 6.20361 21 8.5C21 11.3702 18.8042 13.7252 16 13.9776V11.9646C17.6967 11.7222 19 10.264 19 8.5C19 7.11935 18.2016 5.92603 17.041 5.35635L17.5962 3.41321Z"></path>
                            </svg>
                            <span class="align-middle">Comissões equipe</span>
                        </button>
                    </dd>
                </dl> -->
          <section class="px-3">
            <table
              class="w-full text-xs text-center rounded-lg overflow-hidden"
            >
              <thead>
                <tr class="bg-rgbawhite10">
                  <td>Nível</td>
                  <td class="relative">
                    <em
                      class="w-px h-6 -mt-3 bg-rgbawhite10 absolute left-0 top-1/2"
                    ></em>
                    <em
                      class="w-px h-6 -mt-3 bg-rgbawhite10 absolute right-0 top-1/2"
                    ></em>
                    <span>Rollover equipe</span>
                  </td>
                  <td>Proporção</td>
                </tr>
              </thead>
              <tbody>
                <template v-for="(item, index) in indexListRef" :key="index">
                  <tr
                    class="border-t border-rgbawhite10 odd:bg-rgbawhite10 even:bg-rgbawhite10"
                  >
                    <td>{{ item.level }}</td>
                    <td>{{ fn(item.bet_amount, 0) }}</td>
                    <td>{{ item.commission }}%</td>
                  </tr>
                </template>
                <tr v-if="!indexListRef.length">
                  <td colspan="3">
                    <pu-no-data></pu-no-data>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </pu-card>
      <pu-card theme="3" class="mb-3 pt-3 pb-8">
        <div class="w-full mb-4 flex items-center">
          <em
            class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-themewhite"
          ></em>
          <h5 class="ma-w-[60%] px-2 text-sm text-center">
            <span>Descrição da Atividade</span>
          </h5>
          <em
            class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-themewhite"
          ></em>
        </div>
        <article class="ctx-article p-mb text-sm text-rgbawhite50">
          <p>1. O uso do bônus deve seguir as regras da plataforma.</p>
          <p>
            2. A empresa reserva-se o direito de interpretação final sobre esta
            atividade.
          </p>
        </article>
      </pu-card>
    </div>
    <div v-if="currentTemplate.value == 'template_two'">
      <pu-card theme="3" class="mb-3">
        <div class="w-full">
          <section>
            <table class="w-full text-xs text-center">
              <thead>
                <tr class="bg-tablergba40 text-three">
                  <td>Nível</td>
                  <td>Rollover equipe</td>
                  <td>Proporção</td>
                </tr>
              </thead>
              <tbody>
                <template v-for="(item, index) in indexListRef" :key="index">
                  <tr
                    class="border-t border-rgbawhite10 odd:bg-tablergba20 even:bg-tablergba40"
                  >
                    <td class="text-four">{{ item.level }}</td>
                    <td class="text-theme">{{ fn(item.bet_amount, 0) }}</td>
                    <td class="text-theme">{{ item.commission }}%</td>
                  </tr>
                </template>
                <tr v-if="!indexListRef.length">
                  <td colspan="3">
                    <pu-no-data></pu-no-data>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </pu-card>
      <pu-card theme="3" class="mb-3 pt-3 pb-8">
        <div class="w-full mb-4 flex items-center">
          <em
            class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-four"
          ></em>
          <h5 class="ma-w-[60%] px-2 text-sm text-center text-four">
            <span>Descrição da Atividade</span>
          </h5>
          <em
            class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-four"
          ></em>
        </div>

        <article
          class="ctx-article p-mb text-sm text-theme"
          v-html="agentContentRef"
          v-if="agentContentRef != ''"
        ></article>
        <article class="ctx-article p-mb text-sm text-theme" v-else>
          <p>1. O uso do bônus deve seguir as regras da plataforma.</p>
          <p>
            2. A empresa reserva-se o direito de interpretação final sobre esta
            atividade.
          </p>
        </article>
      </pu-card>
    </div>
    <div v-if="currentTemplate.value == 'template_three'">
      <pu-card theme="3" class="mb-3">
        <div class="w-full">
          <section>
            <table class="w-full text-xs text-center">
              <thead>
                <tr class="bg-tablergba40 text-themetext1">
                  <td>Nível</td>
                  <td>Rollover equipe</td>
                  <td>Proporção</td>
                </tr>
              </thead>
              <tbody>
                <template v-for="(item, index) in indexListRef" :key="index">
                  <tr
                    class="border-t border-rgbawhite10 odd:bg-tablergba20 even:bg-tablergba40"
                  >
                    <td class="text-themetext0">{{ item.level }}</td>
                    <td class="text-themetext1">
                      {{ fn(item.bet_amount, 0) }}
                    </td>
                    <td class="text-themetext1">{{ item.commission }}%</td>
                  </tr>
                </template>
                <tr v-if="!indexListRef.length">
                  <td colspan="3">
                    <pu-no-data></pu-no-data>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </pu-card>
      <pu-card theme="3" class="mb-3 pt-3 pb-8">
        <div class="w-full mb-4 flex items-center">
          <em
            class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-themetext2"
          ></em>
          <h5 class="ma-w-[60%] px-2 text-sm text-center text-themetext2">
            <span>Descrição da Atividade</span>
          </h5>
          <em
            class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-themetext2"
          ></em>
        </div>
        <article class="ctx-article p-mb text-sm text-themetext3">
          <p>1. O uso do bônus deve seguir as regras da plataforma.</p>
          <p>
            2. A empresa reserva-se o direito de interpretação final sobre esta
            atividade.
          </p>
        </article>
      </pu-card>
    </div>
    <div v-if="currentTemplate.value == 'template_four'">
      <pu-card theme="3" class="mb-3">
        <div class="w-full">
          <section>
            <table
              class="w-full text-xs text-center bg-tablebg rounded-lg overflow-hidden"
            >
              <thead class="bg-tablebg">
                <tr class="m4-text">
                  <td>nível</td>
                  <td>Rollover equipe</td>
                  <td>Proporção</td>
                </tr>
              </thead>
              <tbody>
                <template v-for="(item, index) in indexListRef" :key="index">
                  <tr class="odd:bg-tablebg2">
                    <td class="m4-text">{{ item.level }}</td>
                    <td class="text-themewhite">
                      {{ fn(item.bet_amount, 0) }}
                    </td>
                    <td class="text-themetext0">{{ item.commission }}%</td>
                  </tr>
                </template>
                <tr v-if="!indexListRef.length">
                  <td colspan="3">
                    <pu-no-data></pu-no-data>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </pu-card>
      <pu-card theme="3" class="mb-3 pt-3">
        <h5 class="px-2 text-l font-bold mb-3 text-start m4-text">
          <span>Descrição da Atividade:</span>
        </h5>
        <article
          class="p-mb text-sm text-themetext3"
          v-html="agentContentRef"
          v-if="agentContentRef != ''"
        ></article>
        <article class="p-mb text-sm text-themetext3" v-else>
          <p>1. O uso do bônus deve seguir as regras da plataforma.</p>
          <p>
            2. A empresa reserva-se o direito de interpretação final sobre esta
            atividade.
          </p>
        </article>
      </pu-card>
    </div>
    <div v-if="currentTemplate.value == 'template_five'">
      <pu-card theme="3" class="mb-3">
        <div class="w-full">
          <section>
            <table
              class="w-full text-xs text-center bg-tablebg rounded-lg overflow-hidden"
            >
              <thead class="bg-tablebg">
                <tr class="m4-text">
                  <td>nível</td>
                  <td>Rollover equipe</td>
                  <td>Proporção</td>
                </tr>
              </thead>
              <tbody>
                <template v-for="(item, index) in indexListRef" :key="index">
                  <tr class="odd:bg-tablebg2">
                    <td class="m4-text">{{ item.level }}</td>
                    <td class="text-themewhite">
                      {{ fn(item.bet_amount, 0) }}
                    </td>
                    <td class="text-themetext0">{{ item.commission }}%</td>
                  </tr>
                </template>
                <tr v-if="!indexListRef.length">
                  <td colspan="3">
                    <pu-no-data></pu-no-data>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </pu-card>
      <pu-card theme="3" class="mb-3 pt-3">
        <h5 class="px-2 text-l font-bold mb-3 text-start m4-text">
          <span>Descrição da Atividade:</span>
        </h5>
        <article
          class="p-mb text-sm text-themetext3"
          v-html="agentContentRef"
          v-if="agentContentRef != ''"
        ></article>
        <article class="p-mb text-sm text-themetext3" v-else>
          <p>1. O uso do bônus deve seguir as regras da plataforma.</p>
          <p>
            2. A empresa reserva-se o direito de interpretação final sobre esta
            atividade.
          </p>
        </article>
      </pu-card>
    </div>

    <em class="w-full h-[4.25rem] block"></em>
  </div>
</template>
<style scoped>
table tr td {
  padding: 0.625rem 0.25rem;
}
</style>
