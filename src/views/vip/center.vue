<script setup>
import { computed } from "vue";
import { t, fn } from "@/i18n";
import { vipModel } from "@/model/vip";
import { userModel } from "@/model/user";
import { useThemeImages } from "@/utils/themeimg";
import Panddingbottom from "@/components/public/Panddingbottom.vue";
const VipImg = useThemeImages().vip;
const MineImg = useThemeImages().mine;
const CommonImg = useThemeImages().common;
const { vipInfoRef, taskBonusFunc } = vipModel(true);

const { memberRef } = userModel();
const current_level = computed(() => {
  let level = 0;
  if (memberRef.value && memberRef.value.current_level) {
    level = memberRef.value.current_level;
  }
  return level;
});
const next_level = computed(() => {
  let item = {};
  // for(let i in vipInfoRef.value.config){
  //     if(vipInfoRef.value.config[i].vip==current_level.value){
  //         let index = parseInt(i)
  //         if(vipInfoRef.value.config[index+1]){
  //             item = vipInfoRef.value.config[index+1]
  //         }else {
  //             item = vipInfoRef.value.config[i]
  //         }
  //         break
  //     }
  // }
  if (vipInfoRef.value && vipInfoRef.value.config) {
    item = vipInfoRef.value.config[current_level.value + 1];
  }
  return item;
});
const curentji = computed(()=>{
    const level = memberRef.value?.current_level
    return (level == null || level <= 1) ? 1 : level
})
const amount_rate = computed(() => {
  let rate = 0;
  if (memberRef.value && memberRef.value.id) {
    if (current_level.value == next_level.value.vip) {
      rate = 100;
    } else {
      rate =
        (parseFloat(
          (memberRef.value &&
            memberRef.value.account &&
            memberRef.value.account.consume_money) ||
            0,
        ) /
          parseFloat(next_level.value && next_level.value.bet_amount)) *
        100;
    }
  } else {
    rate = 100;
  }
  return rate;
});
</script>

<template>
  <pu-page title="VIP" class="z-[999]" hideService>
    <div v-if="currentTemplate.value == 'template_one'">
      <img
        :src="VipImg.img_vipbg"
        class="w-full h-auto absolute left-0 -top-7"
      />
      <div class="w-full h-[10.625rem] relative flex items-center">
        <div class="w-full flex justify-center items-center">
          <p
            class="text-[2.5rem] text-themewhite"
            style="text-shadow: 0 4px 0 #4a0000"
          >
            <span>{{ current_level }}</span>
          </p>
        </div>
      </div>
      <pu-card theme="3" class="relative">
        <section
          class="w-full p-px mb-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-100"
        >
          <div
            class="w-full rounded-xl bg-gradient-to-r from-themecardlinear1 to-themecardlinear2 overflow-hidden"
          >
            <dl class="p-4 flex items-center">
              <dt class="flex-1 overflow-hidden">
                <h6 class="text-base opacity-65">
                  <span>Pode receber bônus</span>
                </h6>
                <p class="text-3xl font-bold">{{ fn(vipInfoRef.bonus) }}</p>
              </dt>
              <dd class="pl-2 shrink-0">
                <button
                  @click="taskBonusFunc()"
                  :class="
                    parseFloat(vipInfoRef.bonus || 0) != 0 &&
                    vipInfoRef.can_be_collected
                      ? 'ctx-theme__linear rounded-xl'
                      : 'bg-rgbawhite10 border border-rgbawhite10'
                  "
                  class="h-11 px-3 !text-sm rounded-lg"
                >
                  <span
                    :class="
                      parseFloat(vipInfoRef.bonus || 0) == 0 &&
                      !vipInfoRef.can_be_collected
                        ? 'opacity-20'
                        : ''
                    "
                    >Receber</span
                  >
                </button>
              </dd>
            </dl>
            <div
              @click="$router.push('/vip/bonus')"
              class="px-4 py-2 bg-rgbablack15 cursor-pointer flex justify-between"
            >
              <p class="text-xs text-one">Registro de Envio de Bônus</p>
              <icon-chevron-right
                class="w-5 h-5 ml-2 text-four shrink-0"
              ></icon-chevron-right>
            </div>
          </div>
        </section>
        <section
          class="w-full p-px mb-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-100"
        >
          <div
            class="w-full rounded-xl bg-gradient-to-r from-themecardlinear1 to-themecardlinear2 overflow-hidden"
          >
            <div class="p-4">
              <dl class="w-full block">
                <dt class="w-full">
                  <span class="text-xs opacity-65"
                    >Volume acumulado de apostas:</span
                  >
                  <span class="text-base opacity-85 float-right">{{
                    fn(
                      memberRef &&
                        memberRef.account &&
                        memberRef.account.consume_money,
                    )
                  }}</span>
                  <i class="clear-both block"></i>
                </dt>
                <dd
                  class="w-full h-2 bg-rgbawhite30 rounded-full overflow-hidden flex"
                >
                  <em
                    :style="`width: ${amount_rate}%`"
                    class="h-full bg-one rounded-full flex justify-end overflow-hidden"
                  >
                    <i class="w-2 h-2 bg-themewhite rounded-full"></i>
                  </em>
                </dd>
                <dd class="w-full text-xs flex items-center justify-between">
                  <span class="opacity-45">0</span>
                  <span class="text-four"
                    >{{ next_level.bet_amount }}(VIP {{ next_level.vip }})</span
                  >
                </dd>
              </dl>
              <dl class="w-full p-2 mt-2 bg-rgbawhite10 block">
                <dt class="w-full">
                  <span class="text-xs opacity-65"
                    >Volume de apostas deste mês:</span
                  >
                  <span class="text-base opacity-85 float-right">{{
                    fn(
                      memberRef &&
                        memberRef.account &&
                        memberRef.account.consume_money,
                    )
                  }}</span>
                  <i class="clear-both block"></i>
                </dt>
                <dd
                  class="w-full h-2 bg-rgbawhite30 rounded-full overflow-hidden flex"
                >
                  <em
                    style="width: 100%"
                    class="h-full bg-one rounded-full flex justify-end overflow-hidden"
                  >
                    <i class="w-2 h-2 bg-themewhite rounded-full"></i>
                  </em>
                </dd>
                <dd class="w-full text-xs flex items-center justify-between">
                  <span class="opacity-45">0</span>
                  <span class="text-one">Manter a divisão: 0</span>
                </dd>
              </dl>
            </div>
          </div>
        </section>
      </pu-card>
      <pu-card theme="3" class="pt-8">
        <div class="w-full mb-4 flex items-center">
          <em
            class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-one"
          ></em>
          <h5 class="ma-w-[60%] px-2 text-sm text-one text-center">
            <span>Rendimentos VIP</span>
          </h5>
          <em
            class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-one"
          ></em>
        </div>
        <table
          class="w-full text-xs text-center text-rgbawhite50 rounded-lg table-fixed overflow-hidden"
        >
          <thead>
            <tr class="bg-rgbawhite10">
              <td>Nível</td>
              <td>Apostas</td>
              <td>Bônus<br />upgrade</td>
              <td>Bônus<br />semanal</td>
              <td>Bônus<br />mensal</td>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, index) in vipInfoRef.config" :key="index">
              <tr class="bg-rgbawhite10 border-t border-body-bg">
                <td class="text-one">VIP{{ item.vip }}</td>
                <td>{{ fn(item.bet_amount, 0) }}</td>
                <td>{{ fn(item.up_level_bonus, 0) }}</td>
                <td>{{ fn(item.week_bonus, 0) }}</td>
                <td>{{ fn(item.month_bonus, 0) }}</td>
              </tr>
            </template>
            <tr v-if="!vipInfoRef.config">
              <td colspan="5">
                <pu-no-data></pu-no-data>
              </td>
            </tr>
          </tbody>
        </table>
      </pu-card>
      <pu-card theme="3" class="pt-8">
        <div class="w-full mb-4 flex items-center">
          <em
            class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-one"
          ></em>
          <h5 class="ma-w-[60%] px-2 text-sm text-one text-center">
            <span>Descrição da Atividade</span>
          </h5>
          <em
            class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-one"
          ></em>
        </div>
        <article
          class="ctx-article text-sm text-rgbawhite50"
          v-html="vipInfoRef.content"
        ></article>
      </pu-card>
    </div>
    <div v-if="currentTemplate.value == 'template_two'">
      <img
        :src="VipImg.img_vipbg"
        class="w-full h-auto absolute left-0 -top-9"
      />
      <div class="w-full h-[10.625rem] relative flex items-center">
        <div class="w-full flex justify-center items-center mt-[4rem]">
          <p
            class="text-[3rem] text-four"
            style="text-shadow: 0 4px 0 #4a0000; font-weight: 600"
          >
            <span>{{ current_level }}</span>
          </p>
        </div>
      </div>
      <pu-card theme="3" class="relative mt-8">
        <section class="w-full p-px mb-3 rounded-xl">
          <div
            class="w-full rounded-xl"
            :style="{ backgroundImage: `url(${VipImg.img_itembg})` }"
            style="background-repeat: no-repeat; background-size: 100% 100%"
          >
            <dl class="p-4 flex items-center">
              <dt class="flex-1 overflow-hidden">
                <h6 class="text-base flex items-center">
                  <img :src="VipImg.icon_vip" class="w-6 h-6 mr-2" />
                  <span class="text-three">Pode receber bônus</span>
                </h6>
                <p class="text-3xl font-bold">{{ fn(vipInfoRef.bonus) }}</p>
              </dt>
              <dd class="pl-2 shrink-0">
                <button
                  @click="taskBonusFunc()"
                  :class="
                    parseFloat(vipInfoRef.bonus || 0) != 0 &&
                    vipInfoRef.can_be_collected
                      ? 'm2-btn-nine rounded-xl '
                      : 'm2-btn-nine-false'
                  "
                  class="h-9 px-4 !text-sm rounded-[2rem]"
                >
                  <span
                    :class="
                      parseFloat(vipInfoRef.bonus || 0) == 0 &&
                      !vipInfoRef.can_be_collected
                        ? 'text-three'
                        : 'text-white '
                    "
                    >Receber</span
                  >
                </button>
              </dd>
            </dl>
            <div
              @click="$router.push('/vip/bonus')"
              class="px-4 py-2 bg-black/15 cursor-pointer flex justify-between items-center"
            >
              <p class="text-xs text-four">Registro de Envio de Bônus</p>
              <icon-chevron-right
                class="w-5 h-5 ml-2 text-four shrink-0"
              ></icon-chevron-right>
            </div>
          </div>
        </section>
        <section class="w-full p-px mb-3">
          <div
            class="w-full rounded-xl"
            :style="{ backgroundImage: `url(${VipImg.img_itembg2})` }"
            style="background-repeat: no-repeat; background-size: 100% 100%"
          >
            <div class="p-4">
              <dl class="w-full block">
                <dt class="w-full">
                  <span class="text-xs">Volume acumulado de apostas:</span>
                  <span class="text-base float-right">{{
                    fn(
                      memberRef &&
                        memberRef.account &&
                        memberRef.account.consume_money,
                    )
                  }}</span>
                  <i class="clear-both block"></i>
                </dt>
                <dd
                  class="w-full h-2 bg-rgbablack80 rounded-full overflow-hidden flex"
                >
                  <em
                    :style="`width: ${amount_rate}%`"
                    class="h-full bg-four rounded-full flex justify-end overflow-hidden"
                  >
                    <i class="w-2 h-2 bg-themewhite rounded-full"></i>
                  </em>
                </dd>
                <dd class="w-full text-xs flex items-center justify-between">
                  <span>0</span>
                  <span class="text-four"
                    >{{ next_level.bet_amount }}(VIP {{ next_level.vip }})</span
                  >
                </dd>
              </dl>
              <dl class="w-full p-2 mt-2 bg-rgbablack30 block rounded-xl">
                <dt class="w-full">
                  <span class="text-xs">Volume de apostas deste mês:</span>
                  <span class="text-base float-right">{{
                    fn(
                      memberRef &&
                        memberRef.account &&
                        memberRef.account.consume_money,
                    )
                  }}</span>
                  <i class="clear-both block"></i>
                </dt>
                <dd
                  class="w-full h-2 bg-rgbablack80 rounded-full overflow-hidden flex"
                >
                  <em
                    style="width: 100%"
                    class="bg-four h-full rounded-full flex justify-end overflow-hidden"
                  >
                    <i class="w-2 h-2 bg-white rounded-full"></i>
                  </em>
                </dd>
                <dd class="w-full text-xs flex items-center justify-between">
                  <span>0</span>
                  <span class="text-four">Manter a divisão: 0</span>
                </dd>
              </dl>
            </div>
          </div>
        </section>
      </pu-card>
      <pu-card theme="3" class="pt-8 -mt-4">
        <div class="w-full mb-4 flex items-center">
          <em
            class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-four"
          ></em>
          <h5
            class="ma-w-[60%] px-2 text-sm text-four text-center"
            style="font-weight: 600"
          >
            <span>Rendimentos VIP</span>
          </h5>
          <em
            class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-four"
          ></em>
        </div>
        <table
          class="w-full text-xs text-center text-themefont rounded-lg table-fixed overflow-hidden"
        >
          <thead>
            <tr class="bg-tablergba40 text-textcolorsix">
              <td>Nível</td>
              <td>Apostas</td>
              <td>Bônus<br />upgrade</td>
              <td>Bônus<br />semanal</td>
              <td>Bônus<br />mensal</td>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, index) in vipInfoRef.config" :key="index">
              <tr class="odd:bg-tablergba10 even:bg-tablergba20 text-theme">
                <td class="text-four">VIP{{ item.vip }}</td>
                <td>{{ fn(item.bet_amount, 0) }}</td>
                <td>{{ fn(item.up_level_bonus, 0) }}</td>
                <td>{{ fn(item.week_bonus, 0) }}</td>
                <td>{{ fn(item.month_bonus, 0) }}</td>
              </tr>
            </template>
            <tr v-if="!vipInfoRef.config">
              <td colspan="5">
                <pu-no-data></pu-no-data>
              </td>
            </tr>
          </tbody>
        </table>
      </pu-card>
      <pu-card theme="3" class="pt-8">
        <div class="w-full mb-4 flex items-center">
          <em
            class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-four"
          ></em>
          <h5 class="ma-w-[60%] px-2 text-sm text-four text-center">
            <span>Descrição da Atividade</span>
          </h5>
          <em
            class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-four"
          ></em>
        </div>
        <article
          class="ctx-article text-sm text-theme"
          v-html="vipInfoRef.content"
        ></article>
      </pu-card>
    </div>
    <div v-if="currentTemplate.value == 'template_three'">
      <img
        :src="VipImg.img_vipbg"
        class="w-full h-auto absolute left-0 top-2"
      />
      <div class="w-full h-[10.625rem] relative flex items-center">
        <div class="w-full flex justify-center items-center mt-[4rem]">
          <p
            class="text-[3rem] text-themetext0"
            style="text-shadow: 0 4px 0 #4a0000; font-weight: 600"
          >
            <span>{{ current_level }}</span>
          </p>
        </div>
      </div>
      <pu-card theme="3" class="relative mt-8">
        <section class="w-full p-px mb-3 rounded-xl">
          <div
            class="w-full rounded-xl"
            :style="{ backgroundImage: `url(${VipImg.img_itembg})` }"
            style="background-repeat: no-repeat; background-size: 100% 100%"
          >
            <dl class="p-4 flex items-center">
              <dt class="flex-1 overflow-hidden">
                <h6 class="text-base flex items-center">
                  <img :src="VipImg.icon_vip" class="w-6 h-6 mr-2" />
                  <span class="text-themetext1">Pode receber bônus</span>
                </h6>
                <p class="text-3xl font-bold">{{ fn(vipInfoRef.bonus) }}</p>
              </dt>
              <dd class="pl-2 shrink-0">
                <button
                  @click="taskBonusFunc()"
                  :class="
                    parseFloat(vipInfoRef.bonus || 0) != 0 &&
                    vipInfoRef.can_be_collected
                      ? 'm3-theme-btn1 rounded-xl '
                      : 'm3-theme-btn3'
                  "
                  class="h-9 px-4 !text-sm rounded-[2rem]"
                >
                  <span>Receber</span>
                </button>
              </dd>
            </dl>
            <div
              @click="$router.push('/vip/bonus')"
              class="px-4 py-2 bg-black/15 cursor-pointer flex justify-between items-center"
            >
              <p class="text-xs text-themetext0">Registro de Envio de Bônus</p>
              <icon-chevron-right
                class="w-5 h-5 ml-2 text-themetext0 shrink-0"
              ></icon-chevron-right>
            </div>
          </div>
        </section>
        <section class="w-full p-px mb-3">
          <div
            class="w-full rounded-xl"
            :style="{ backgroundImage: `url(${VipImg.img_itembg})` }"
            style="background-repeat: no-repeat; background-size: 100% 100%"
          >
            <div class="p-4">
              <dl class="w-full block">
                <dt class="w-full">
                  <span class="text-xs text-themetext1"
                    >Volume acumulado de apostas:</span
                  >
                  <span class="text-base float-right">{{
                    fn(
                      memberRef &&
                        memberRef.account &&
                        memberRef.account.consume_money,
                    )
                  }}</span>
                  <i class="clear-both block"></i>
                </dt>
                <dd
                  class="w-full h-2 bg-default-bg rounded-full overflow-hidden flex"
                >
                  <em
                    :style="`width: ${amount_rate}%`"
                    class="h-full m3-progresbar rounded-full flex justify-end overflow-hidden"
                  >
                    <i class="w-2 h-2 bg-themewhite rounded-full"></i>
                  </em>
                </dd>
                <dd
                  class="w-full text-xs text-themetext0 flex items-center justify-between"
                >
                  <span>0</span>
                  <span
                    >{{ next_level.bet_amount }}(VIP {{ next_level.vip }})</span
                  >
                </dd>
              </dl>
              <dl class="w-full p-2 mt-2 bg-rgbablack30 block rounded-xl">
                <dt class="w-full">
                  <span class="text-xs text-themetext1"
                    >Volume de apostas deste mês:</span
                  >
                  <span class="text-base opacity-85 float-right">{{
                    fn(
                      memberRef &&
                        memberRef.account &&
                        memberRef.account.consume_money,
                    )
                  }}</span>
                  <i class="clear-both block"></i>
                </dt>
                <dd
                  class="w-full h-2 bg-default-bg rounded-full overflow-hidden flex"
                >
                  <em
                    style="width: 100%"
                    class="h-full m3-progresbar rounded-full flex justify-end overflow-hidden"
                  >
                    <i class="w-2 h-2 bg-white rounded-full"></i>
                  </em>
                </dd>
                <dd
                  class="w-full text-xs text-themetext0 flex items-center justify-between"
                >
                  <span>0</span>
                  <span>Manter a divisão: 0</span>
                </dd>
              </dl>
            </div>
          </div>
        </section>
      </pu-card>
      <pu-card theme="3" class="pt-8 -mt-4">
        <div class="w-full mb-4 flex items-center">
          <em
            class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-themetext0"
          ></em>
          <h5
            class="ma-w-[60%] px-2 text-sm text-themetext0 text-center"
            style="font-weight: 600"
          >
            <span>Rendimentos VIP</span>
          </h5>
          <em
            class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-themetext0"
          ></em>
        </div>
        <table
          class="w-full text-xs text-center text-themetext1 rounded-lg table-fixed overflow-hidden"
        >
          <thead>
            <tr class="bg-tablergba40 text-themetext1">
              <td>Nível</td>
              <td>Apostas</td>
              <td>Bônus<br />upgrade</td>
              <td>Bônus<br />semanal</td>
              <td>Bônus<br />mensal</td>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, index) in vipInfoRef.config" :key="index">
              <tr
                class="odd:bg-tablergba10 even:bg-tablergba40 text-themetext1"
              >
                <td class="text-themetext0">VIP{{ item.vip }}</td>
                <td>{{ fn(item.bet_amount, 0) }}</td>
                <td>{{ fn(item.up_level_bonus, 0) }}</td>
                <td>{{ fn(item.week_bonus, 0) }}</td>
                <td>{{ fn(item.month_bonus, 0) }}</td>
              </tr>
            </template>
            <tr v-if="!vipInfoRef.config">
              <td colspan="5">
                <pu-no-data></pu-no-data>
              </td>
            </tr>
          </tbody>
        </table>
      </pu-card>
      <pu-card theme="3" class="pt-8">
        <div class="w-full mb-4 flex items-center">
          <em
            class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-themetext2"
          ></em>
          <h5 class="ma-w-[60%] px-2 text-sm text-four text-themetext2">
            <span>Descrição da Atividade</span>
          </h5>
          <em
            class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-themetext2"
          ></em>
        </div>
        <article
          class="ctx-article text-sm text-themetext3"
          v-html="vipInfoRef.content"
        ></article>
      </pu-card>
    </div>
    <div v-if="currentTemplate.value == 'template_four'">
      <pu-card theme="3">
        <div
          :style="{
            backgroundImage: `url(${VipImg.img_vipbg})`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
          }"
          class="rounded-lg overflow-hidden mt-4 relative"
        >
          <div class="w-full flex items-center justify-between px-4 py-2">
            <div class="flex items-center justify-center">
              <img :src="VipImg.m4_icon1" class="w-[3rem] h-[3rem]" />
              <div class="flex flex-col items-center justify-center">
                <p>
                  <span class="text-xl m4-text font-bold"
                    >VIP.{{ current_level }}</span
                  >
                </p>
                <div
                  :style="{
                    backgroundImage: `url(${VipImg.m4_bg2})`,
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                  }"
                  class="w-[3.8rem] h-[1rem] text-[0.68rem] text-center text-theme"
                >
                  Meu Nível
                </div>
              </div>
            </div>
            <img
              :src="VipImg.m4_icon2"
              class="w-[5rem] h-[4rem] absolute right-2 top-4"
            />
          </div>
          <div class="w-full mt-2 bg-black/20 p-2">
            <dl class="w-full block p-2">
              <div class="flex w-full items-center">
                <img
                  :src="VipImg.m4_icon3"
                  class="w-[1.5rem] h-[1.5rem] mr-1"
                />
                <div class="w-full">
                  <dt class="w-full flex items-center justify-between">
                    <span class="text-xs m4-text"
                      >Volume acumulado de apostas:</span
                    >
                    <span class="text-xs text-themetext0 float-right font-bold"
                      >R$ {{ next_level.bet_amount
                      }}<span class="m4-text"> to </span> VIP.{{
                        next_level.vip
                      }}
                    </span>
                  </dt>
                  <dd
                    class="w-full h-2 rounded-full overflow-hidden flex bg-tablebg"
                  >
                    <em
                      :style="`width: ${amount_rate}%`"
                      class="h-full m4-ten-btn rounded-full flex justify-end overflow-hidden"
                    >
                      <i class="w-2 h-2 bg-white rounded-full"></i>
                    </em>
                  </dd>
                </div>
              </div>
            </dl>
            <dl class="w-full p-2 mt-2">
              <div class="flex w-full items-center">
                <img
                  :src="VipImg.m4_icon4"
                  class="w-[1.5rem] h-[1.5rem] mr-1"
                />
                <div class="w-full">
                  <dt class="w-full flex items-center justify-between">
                    <span class="text-xs m4-text"
                      >Volume de apostas deste mês:</span
                    >
                    <span class="text-xs text-themetext0 float-right"
                      >R$
                      {{
                        fn(
                          memberRef &&
                            memberRef.account &&
                            memberRef.account.consume_money,
                        )
                      }}
                    </span>
                  </dt>
                  <dd
                    class="w-full h-2 rounded-full overflow-hidden flex bg-tablebg"
                  >
                    <em
                      :style="`width: ${amount_rate}%`"
                      class="h-full m4-nine-btn rounded-full flex justify-end overflow-hidden"
                    >
                      <i class="w-2 h-2 bg-white rounded-full"></i>
                    </em>
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </pu-card>
      <!-- <img src="/imgs/vip/vip-bg.png" class="w-full h-auto absolute left-0 -top-9"> -->

      <pu-card theme="3" class="relative mt-8">
        <section class="w-full p-px mb-3 rounded-xl">
          <div class="w-full rounded-xl bg-tablebg">
            <dl class="p-4 flex items-center">
              <dt class="flex-1 overflow-hidden">
                <h6 class="m4-text">Pode receber bônus</h6>
                <div class="flex items-center">
                  <img :src="VipImg.icon_vip" class="w-6 h-6 mr-2" />
                  <p class="text-xl font-bold text-themetext0">
                    R${{ fn(vipInfoRef.bonus) }}
                  </p>
                </div>
              </dt>
              <dd class="pl-2 shrink-0">
                <button
                  @click="taskBonusFunc()"
                  :class="
                    parseFloat(vipInfoRef.bonus || 0) != 0 &&
                    vipInfoRef.can_be_collected
                      ? 'm4-nine-btn '
                      : 'bg-black/20 text-white/20'
                  "
                  class="h-9 px-4 !text-sm rounded-[2rem]"
                >
                  <span>Receber</span>
                </button>
              </dd>
            </dl>
            <div
              @click="$router.push('/vip/bonus')"
              class="px-4 py-2 bg-black/15 cursor-pointer flex justify-start items-center"
            >
              <p class="text-xs m4-text">Registro de Envio de Bônus</p>
              <img :src="VipImg.m4_icon5" class="w-4 h-4 ml-2" />
              <!-- <icon-chevron-right class="w-5 h-5 ml-2 text-[#25bfac] shrink-0"></icon-chevron-right> -->
            </div>
          </div>
        </section>
      </pu-card>
      <pu-card theme="3" class="pt-2">
        <h5 class="px-2 text-l font-bold mb-1 text-center m4-text">
          <span>Rendimentos VIP</span>
        </h5>
        <img :src="CommonImg.icon_line" alt="" />
        <table
          class="w-full text-xs text-center text-themefont rounded-lg bg-tablebg table-fixed overflow-hidden mt-4"
        >
          <thead>
            <tr class="bg-black/20 m4-text">
              <td>Nível</td>
              <td>Apostas</td>
              <td>Bônus<br />upgrade</td>
              <td>Bônus<br />semanal</td>
              <td>Bônus<br />mensal</td>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, index) in vipInfoRef.config" :key="index">
              <tr class="odd:bg-black/20 text-white">
                <td class="text-themetext0">VIP{{ item.vip }}</td>
                <td>{{ fn(item.bet_amount, 0) }}</td>
                <td>{{ fn(item.up_level_bonus, 0) }}</td>
                <td>{{ fn(item.week_bonus, 0) }}</td>
                <td>{{ fn(item.month_bonus, 0) }}</td>
              </tr>
            </template>
            <tr v-if="!vipInfoRef.config">
              <td colspan="5">
                <pu-no-data></pu-no-data>
              </td>
            </tr>
          </tbody>
        </table>
      </pu-card>
      <pu-card theme="3" class="pt-8">
        <h5 class="px-2 text-l font-bold mb-1 text-start m4-text">
          <span>Descrição da Atividade</span>
        </h5>
        <article
          class="text-sm text-themetext3 w-full max-w-[25rem]"
          v-html="vipInfoRef.content"
        ></article>
      </pu-card>
    </div>
    <div v-if="currentTemplate.value == 'template_five'">
      <pu-card theme="3">
        <div
          :style="{
            backgroundImage: `url(${VipImg.img_vipbg})`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
          }"
          class="rounded-lg overflow-hidden my-4 relative"
        >
          <div class="w-full flex items-center justify-between px-4 pt-5">
            <div class="flex items-center justify-center">
              <img :src="MineImg['icon_vip' + curentji]" class="w-[2rem] h-[2rem] mr-2" />
              <div class="flex flex-col items-center justify-center">
                <p>
                  <span class="text-xl font-bold">VIP {{ current_level }}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="w-full mt-2 px-4 py-6">
            <dl class="w-full block flex">
              <div class="w-4/5">
                <dt class="w-full flex items-center justify-between">
                  <span class="text-[0.625rem]"
                    >Volume acumulado de apostas:</span
                  >
                  <!-- <span class="text-base opacity-85 float-right">{{ fn(memberRef&&memberRef.account&&memberRef.account.consume_money)}}</span> -->
                  <span class="text-[0.625rem]"> R$ {{ next_level.bet_amount
                      }}<span > to </span> VIP.{{
                        next_level.vip
                      }} </span>
                  <!-- <i class="clear-both block"></i> -->
                </dt>
                <dd
                  class="w-full h-1 bg-themeblack rounded-full overflow-hidden flex"
                >
                  <em
                    :style="`width: ${amount_rate}%`"
                    class="h-full bg-themetext0 rounded-full flex justify-end overflow-hidden"
                  >
                    <i class="w-2 h-2 bg-themewhite rounded-full"></i>
                  </em>
                </dd>
              </div>

              <div class="flex items-center ml-3 relative">
                <img
                  :src="MineImg['icon_vip' + curentji]"
                  class="w-[1.25rem] h-[1.25rem] -mr-1 relative z-10"
                />
                <img
                  :src="MineImg['icon_vipkuang' + curentji]"
                  class="w-[2.125rem] h-[0.825rem]"
                />
                <p
                  class="absolute right-0.5 top-0.8 text-[0.625rem] text-themewhite"
                >
                  VIP {{ current_level }}
                </p>
              </div>
            </dl>
            <dl class="w-full mt-4 rounded-lg block flex items-center">
              <div class="flex items-center justify-center">
                <img
                  :src="MineImg.img_money"
                  class="w-[1.25rem] h-[1.25rem] mr-1 inline-block"
                />
              </div>
              <div class="flex-1 ml-2">
                <dt class="w-full flex items-center justify-between">
                  <span class="text-[0.625rem]"
                    >Volume de apostas deste mês:</span
                  >
                  <span class="text-[0.625rem] text-themetext0">{{
                    fn(
                      memberRef &&
                        memberRef.account &&
                        memberRef.account.consume_money,
                    )
                  }}</span>
                </dt>
                <dd class="w-full h-1 rounded-full overflow-hidden flex">
                  <em
                    style="width: 100%"
                    class="h-full bg-themetext0 rounded-full flex justify-end overflow-hidden"
                  >
                    <i class="w-2 h-2 bg-themewhite rounded-full"></i>
                  </em>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </pu-card>
      <!-- <img src="/imgs/vip/vip-bg.png" class="w-full h-auto absolute left-0 -top-9"> -->

      <pu-card theme="3" class="relative">
        <section class="w-full p-px mb-3 rounded-xl">
          <div class="w-full rounded-xl bg-gradient-to-r from-btnlinar3 to-btnlinar4">
            <dl class="p-4 flex items-center">
              <dt class="flex-1 overflow-hidden">
                <h6 class="text-themewhite">Pode receber bônus</h6>
                <div class="flex items-center">
                  <img :src="VipImg.icon_vip" class="w-6 h-6 mr-2" />
                  <p class="text-xl font-bold text-themetext0">
                    R${{ fn(vipInfoRef.bonus) }}
                  </p>
                </div>
              </dt>
              <dd class="pl-2 shrink-0">
                <button
                  @click="taskBonusFunc()"
                  :class="
                    parseFloat(vipInfoRef.bonus || 0) != 0 &&
                    vipInfoRef.can_be_collected
                      ? 'bg-gradient-to-r from-gold-500 to-gold-100'
                      : 'bg-rgbablack30 '
                  "
                  class="h-9 px-4 !text-sm rounded-[2rem]"
                >
                  <span>Receber</span>
                </button>
              </dd>
            </dl>
            <div
              @click="$router.push('/vip/bonus')"
              class="px-4 py-2 bg-black/15 cursor-pointer flex justify-start items-center"
            >
              <p class="text-xs text-themewhite">Registro de Envio de Bônus</p>
              <img :src="VipImg.m4_icon5" class="w-4 h-4 ml-2" />
              <!-- <icon-chevron-right class="w-5 h-5 ml-2 text-[#25bfac] shrink-0"></icon-chevron-right> -->
            </div>
          </div>
        </section>
      </pu-card>
      <pu-card theme="2" >
        <h5 class="px-2 text-l font-bold mb-1 text-center text-themetext1">
          <span>Rendimentos VIP</span>
        </h5>
        <img :src="CommonImg.icon_line"  class="w-full h-4" alt="" />
        <table
          class="w-full text-xs text-center text-themefont rounded-lg bg-tablebg1 table-fixed overflow-hidden mt-4"
        >
          <thead>
            <tr class=" text-white">
              <td>Nível</td>
              <td>Apostas</td>
              <td>Bônus<br />upgrade</td>
              <td>Bônus<br />semanal</td>
              <td>Bônus<br />mensal</td>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, index) in vipInfoRef.config" :key="index">
              <tr class="odd:bg-tablebg2 text-white">
                <td class="text-themetext0">VIP{{ item.vip }}</td>
                <td>{{ fn(item.bet_amount, 0) }}</td>
                <td>{{ fn(item.up_level_bonus, 0) }}</td>
                <td>{{ fn(item.week_bonus, 0) }}</td>
                <td>{{ fn(item.month_bonus, 0) }}</td>
              </tr>
            </template>
            <tr v-if="!vipInfoRef.config">
              <td colspan="5">
                <pu-no-data></pu-no-data>
              </td>
            </tr>
          </tbody>
        </table>
      </pu-card>
      <pu-card theme="3" >
        <h5 class="px-2 text-l font-bold mb-1 text-start text-themewhite">
          <span>Descrição da Atividade</span>
        </h5>
        <article
          class="text-sm text-themetext4 w-full max-w-[25rem]"
          v-html="vipInfoRef.content"
        ></article>
      </pu-card>
    </div>

    <Panddingbottom></Panddingbottom>
  </pu-page>
</template>
<style scoped>
table tr td {
  padding: 0.75rem 0.25rem;
  word-break: break-all;
}
</style>
