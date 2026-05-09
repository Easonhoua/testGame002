<script setup>
import { ref,computed } from "vue";
import { t, fn } from "@/i18n";
import { playBtnAudioFunc } from "@/utils/core";
import ShareList from "@/components/pages/ShareList.vue";
import LogOut from "@/components/pages/LogOut.vue";
import useClipboard from "vue-clipboard3";
import { useThemeImages } from "@/utils/themeimg";
import Panddingbottom from "@/components/public/Panddingbottom.vue";
const CommonImg = useThemeImages().common;
const MineImg = useThemeImages().mine;
const { toClipboard } = useClipboard();
async function copyInviteCode(_val) {
  _val = "" + _val;
  await toClipboard(_val);
  showToast({
    message: "foi copiado",
    type: "success",
    wordBreak: "break-word",
  });
}

const nav_list = ref([
  { title: "Mensagem", path: "/article/message", icon: MineImg.icon_msg },
  { title: "Todas as Promoções", path: "/more", icon: MineImg.icon_more },
  {
    title: "Registro do Jogo",
    path: "/game/record",
    icon: MineImg.icon_record,
  },
  {title: 'Registros de depósito e saqueo', path: '/moneyRecords', icon: MineImg.icon_moneylist},
  { title: "Configuração", path: "/profile", icon: MineImg.icon_set },
  { title: "Contatar o Serviço", type: "service", icon: MineImg.icon_service },
  { title: "Sair", path: "", icon: MineImg.icon_exit },
]);

const curentji = computed(()=>{
    const level = memberRef.value?.current_level
    return (level == null || level <= 1) ? 1 : level
})

import { useMine } from "@/composables/useMine";
const {
  appIcon,
  amount_rate,
  memberRef,
  next_level,
  onclickNav,
  toRecharge,
  toWithdrawal,
} = useMine();
</script>

<template>
  <pu-page hideHeader>
    <template #other>
      <div class="w-full absolute left-0 top-0">
        <img :src="MineImg.img_minebg" class="w-full h-auto block" />
      </div>
    </template>
    <pu-card v-if="memberRef && memberRef.id" theme="3">
      <dl class="flex pt-4 w-full">
        <dt class="w-full flex items-center">
          <div class=" flex justify-center mr-2">
            <van-image
              :src="memberRef.head_portrait"
              width="3.25rem"
              height="3.25rem"
              radius="1rem"
              class="border border-rgbawhite30"
            >
              <template #loading>
                <img :src="appIcon" class="w-full h-full object-cover" />
              </template>
              <template #error>
                <img :src="appIcon" class="w-full h-full object-cover" />
              </template>
            </van-image>
          </div>
          <div>
            <h5 class="mt-1 text-sm font-bold">
              <span>{{ memberRef.username }}</span>
            </h5>
            <p
              class="mt-0.5 text-[0.725rem] flex items-center"
              @click.stop.prevent="copyInviteCode(memberRef.id)"
            >
              <span class="align-middle opacity-65 mr-1"
                >ID: {{ memberRef.id }}</span
              >
              <van-image
                :src="MineImg.icon_copy"
                class="inline-block w-3 h-3 ml-1"
              />
            </p>
          </div>
          <div class="mb-4">
            <div class="flex items-center ml-2 relative">
                <img
                  :src="MineImg['icon_vip' + curentji]"
                  class="w-[1.25rem] h-[1.25rem] -mr-1 relative z-10"
                />
                <img
                  :src="MineImg['icon_vipkuang' + curentji]"
                  class="w-[2.125rem] h-[0.825rem]"
                />
                <p
                  class="absolute right-1 top-1 text-[0.625rem] text-themewhite"
                >
                  VIP {{ memberRef&&memberRef.current_level }}
                </p>
              </div>
          </div>
        </dt>
      </dl>
      <dd
        class="w-full h-full flex overflow-hidden flex items-center mt-2 mb-4 rounded-lg pt-3 pb-2"
        :style="{
          backgroundImage: `url(${MineImg.top_bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
      >
        <!-- 余额 -->
        <div class="w-1/2 flex flex-col items-center justify-center">
          <span class="text-[0.625rem] text-themetext3 mb-1">Saldo&nbsp;</span>
          <b class="text-[0.825rem] text-one"
            ><span class="text-themetext0">R$&nbsp;</span>{{
              fn((memberRef.account && memberRef.account.user_money) || 0)
            }}</b
          >
        </div>
        <!-- 每日奖励 -->
        <div class="w-1/2 flex flex-col items-center justify-center">
          <span class="text-[0.625rem] text-themetext3 mb-1"
            >Total de bônus recebidos:&nbsp;</span
          >
          <b class="text-[0.825rem] text-one"
            ><span class="text-themetext0">R$&nbsp;</span>{{ fn(memberRef.give_amount || 0) }}</b
          >
        </div>
      </dd>
    </pu-card>
    <pu-card theme="3">
      <ol class="w-full !pt-1 text-xs flex gap-1 mb-6">
        <li class="w-1/2 pr-1">
          <div
            @click="toRecharge()"
            class="w-full h-10 px-1 unified-button bg-gradient-to-b from-inputcolor1 to-inputcolor2 rounded-lg flex items-center justify-center"
          >
            <img :src="MineImg.icon_pig" class="w-5 h-5 mr-1 shrink-0" />
            <span>Depósito</span>
          </div>
        </li>
        <li class="w-1/2 pl-1">
          <div
            @click="toWithdrawal()"
            class="w-full h-10 px-1 unified-button bg-gradient-to-b from-inputcolor1 to-inputcolor2 rounded-lg flex items-center justify-center"
          >
            <img :src="MineImg.icon_saque" class="w-5 h-5 mr-1 shrink-0" />
            <span>Saque</span>
          </div>
        </li>
      </ol>
    </pu-card>
    <pu-card theme="3">
      <div class="w-full relative flex flex-col">
        <img :src="MineImg.bg_vipcard" class="w-full h-auto block" />
        <router-link
          to="/vip"
          @click="playBtnAudioFunc()"
          class="flex items-center justify-center"
        >
          <img :src="MineImg.img_vipcard3" class="absolute right-0 top-0 z-10 w-[6.475rem] h-8 block" />
        </router-link>
        <div class="w-[11.25rem] h-0 z-10">
          <div class=" absolute left-4 top-2 flex items-center">
            <img
              :src="MineImg['icon_vip' + curentji]"
              class="w-[2.125rem] h-[2.125rem] mr-2 shrink-0"
            />
            <p class="text-themewhite">
              <span class="text-xl font-bold">VIP&nbsp;</span>
              <span class="text-xl font-bold">{{
                memberRef && memberRef.current_level
              }}</span>
            </p>
          </div>
          <div class="w-full absolute top-20 left-0 z-10 px-4">
            <dl class="w-full block flex">
              <div class="w-4/5">
                <dt class="w-full flex items-center justify-between">
                  <span class="text-[0.625rem]"
                    >Volume acumulado de apostas:</span
                  >
                  <!-- <span class="text-base opacity-85 float-right">{{ fn(memberRef&&memberRef.account&&memberRef.account.consume_money)}}</span> -->
                  <span class="text-[0.625rem]"> R$ {{next_level.bet_amount}} to VIP.{{next_level.vip}} </span>
                  
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
                  class="absolute right-1 top-0.8 text-[0.625rem] text-themewhite"
                >
                  VIP {{ memberRef&&memberRef.current_level }}
                </p>
              </div>
            </dl>
            <dl class="w-full mt-4 rounded-lg block flex items-center">
              <div class="flex items-center justify-center">
                <img
                  :src="MineImg.img_money"
                  class="w-[1.25rem] h-[1.25rem] mr-2 inline-block"
                />
              </div>
              <div class="flex-1">
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
                    <!-- <i class="w-2 h-2 bg-themewhite rounded-full"></i> -->
                  </em>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </pu-card>
    <pu-card theme="0" class="text-sm">
      <a
        href="javascript:;"
        @click="onclickNav(nav_list[5])"
        class="w-full py-3 pl-4 pr-2 unified-button bg-gradient-to-r from-thirsmodel1 to-thirsmodel2 rounded-lg flex items-center my-2"
      >
        <img
          :src="MineImg.icon_service"
          class="w-[1.375rem] h-[1.375rem] mr-2 shrink-0"
        />
        <p class="flex-1 overflow-hidden">
          <span class="text-[0.725rem]">Contatar o Serviço</span>
        </p>
        <icon-arrow-right
          size="2"
          class="w-6 h-6 opacity-45 shrink-0"
        ></icon-arrow-right>
      </a>
    </pu-card>
    <pu-card theme="0" class="mt-2 text-sm">
      <template v-for="(item, index) in nav_list" :key="index">
        <a
          href="javascript:;"
          @click="onclickNav(item)"
          class="w-full py-3 pl-4 pr-2 unified-button bg-gradient-to-r from-thirsmodel1 to-thirsmodel2 border-b border-thirsmodelboder last:border-none flex items-center first:rounded-t-lg"
          v-if="index !== 5 && index !== 6"
        >
          <img
            :src="item.icon"
            class="w-[1.375rem] h-[1.375rem] mr-2 shrink-0"
          />
          <p class="flex-1 overflow-hidden">
            <span class="opacity-65 text-[0.725rem]">{{ item.title }}</span>
          </p>
          <icon-arrow-right
            size="2"
            class="w-6 h-6 opacity-45 shrink-0"
          ></icon-arrow-right>
        </a>
        <log-out v-if="index === 6">
          <a
            href="javascript:;"
            class="w-full py-3 pl-4 pr-2 unified-button bg-gradient-to-r from-thirsmodel1 to-thirsmodel2 flex items-center rounded-b-lg"
          >
            <img
              :src="item.icon"
              class="w-[1.375rem] h-[1.375rem] mr-2 shrink-0"
            />
            <p class="flex-1 overflow-hidden">
              <span class="opacity-65 text-[0.725rem]">{{ item.title }}</span>
            </p>
            <icon-arrow-right
              size="2"
              class="w-6 h-6 opacity-45 shrink-0"
            ></icon-arrow-right>
          </a>
        </log-out>
      </template>
    </pu-card>

    <Panddingbottom></Panddingbottom>
  </pu-page>
</template>
