<script setup>
import { computed, onMounted } from 'vue'
import { t,fn } from '@/i18n'
import { washcodeModel } from '@/model/activity'
import { useThemeImages } from '@/utils/themeimg'
import Panddingbottom from '@/components/public/Panddingbottom.vue'
const WashcodeImg = useThemeImages().washcode
const CommonImg = useThemeImages().common
const { washcodeInfoRef, washcodeCofigRef, sendamountRef, lastprizeRef, consumeMoneyRef, getRewardsBtnFunc } = washcodeModel()
// 上次领奖 lastprizeRef 本次可领取奖励 sendamountRef  总打码量 consumeMoneyRef

function backRate(num) {
    // 确保 washcodeCofigRef.value 是数组
    if (!Array.isArray(washcodeCofigRef.value)) {
        return 0
    }
    const sortedConfig = [...washcodeCofigRef.value].sort((a, b) =>
        parseInt(a.bet_num) - parseInt(b.bet_num)
    )


    for (let i = 0; i < sortedConfig.length; i++) {
        if (num < parseInt(sortedConfig[i].bet_num)) {
            // 返回当前级别的 back_rate 和下一级的 back_rate
            return {
                current: i > 0 ? sortedConfig[i - 1].back_rate : sortedConfig[0].back_rate,
                next: sortedConfig[i].back_rate,
                nextMoney: sortedConfig[i].bet_num
            }
        }
    }
    return {
        current: sortedConfig[sortedConfig.length - 1].back_rate,
        next: sortedConfig[sortedConfig.length - 1].back_rate,
        nextMoney: sortedConfig[sortedConfig.length - 1].bet_num
    }
}
function receberBtn() {
    if (sendamountRef.value < 0.01) {
        return
    }
    getRewardsBtnFunc()

}
</script>
<template>
    <pu-page :title="t('pageTitle.Rebatesite')" class="z-[999]" hideService>
        <img :src=WashcodeImg.img_washcodebg class="w-full h-auto"
            :class="currentTemplate.value == 'template_four' ? 'absolute left-0 ' : ''">
        <img :src="CommonImg.m4_null" alt="" v-if="currentTemplate.value == 'template_four'">
        <pu-card theme="3" v-if="currentTemplate.value == 'template_one' || currentTemplate.value == 'template_two'">
            <section class="w-full">
                <div class="w-full progressCard">
                    <div class="title">
                        <h1 class="mr-3">Aposta <span class="text-four">{{ Number(consumeMoneyRef) -
                            Number(lastprizeRef) > 0 ? (Number(consumeMoneyRef) -
                                Number(lastprizeRef)).toFixed(2):0}}</span></h1>
                        <h1 class="ml-3">Retorno <span
                                class="text-four">{{ backRate(Number(consumeMoneyRef)).current }}%</span></h1>
                    </div>
                    <div class="recebercard flex  items-center justify-between mt-4"
                        :class="currentTemplate.value == 'template_one' ? 'bg-three' : 'bg-rgbablack80'">
                        <div class="left ">
                            <img :src=WashcodeImg.icon_wcmoney class="w-[2.5rem] h-[2.5rem] mr-3" />
                            {{ currentUnit.value }} <h1 class="ml-3 text-four">{{ sendamountRef.toFixed(2) }}</h1>
                        </div>
                        <div v-if="currentTemplate.value == 'template_one'" class="btn "
                            :class="sendamountRef >= 0.01 ? 'ctx-theme__linear text-themewhite' : ' border border-rgbawhite50 text-rgbawhite50'"
                            @click="receberBtn()">
                            Receber
                        </div>
                        <div v-else class="btn "
                            :class="sendamountRef >= 0.01 ? ' m2-btn-ten  text-themewhite' : ' border border-rgbawhite50 text-rgbawhite50'"
                            @click="receberBtn()">
                            Receber
                        </div>
                    </div>
                    <div class="progress w-full mt-2">
                        <div class="text  flex justify-between align-center">
                            <span>Progresso da promoção</span>
                            <span>Próximo retorno <span
                                    class="text-four">{{ backRate(Number(consumeMoneyRef)).next }}%</span></span>
                        </div>
                        <dd class="w-full h-2  rounded-full overflow-hidden flex "
                            :class="currentTemplate.value == 'template_one' ? 'bg-three' : 'bg-rgbablack80'">

                            <em :style="`width: ${(consumeMoneyRef / backRate(Number(consumeMoneyRef)).nextMoney * 100).toFixed(2)}%`"
                                class="h-full m2-progresbar rounded-full flex justify-end overflow-hidden ">
                                <i class="w-2 h-2 bg-themewhite rounded-full"></i>
                            </em>
                        </dd>
                        <div class="text flex justify-between align-center">
                            <span>{{ consumeMoneyRef }}</span>
                            <span>{{ backRate(Number(consumeMoneyRef)).nextMoney }}</span>
                        </div>
                    </div>

                </div>
            </section>
        </pu-card>

        <pu-card theme="3" v-if="currentTemplate.value == 'template_three'">
            <section class="w-full">
                <div class="w-full progressCard">
                    <div class="title">
                        <h1 class="mr-3">{{ t('commCenter.Bet') }} <span class="text-themetext0">{{ Number(consumeMoneyRef) -
                            Number(lastprizeRef) > 0 ? (Number(consumeMoneyRef) -
                                Number(lastprizeRef)).toFixed(2):0}}</span></h1>
                        <h1 class="ml-3">{{ t("Return") }} <span
                                class="text-themetext0">{{ backRate(Number(consumeMoneyRef)).current }}%</span></h1>
                    </div>
                    <div class="recebercard flex  items-center justify-between mt-4 bg-default-bg">
                        <div class="left ">
                            <img :src=WashcodeImg.icon_wcmoney class="w-[2.5rem] h-[2.5rem] mr-3" />
                            {{ currentUnit.value }} <h1 class="ml-3 text-themetext0">{{ sendamountRef.toFixed(2) }}</h1>
                        </div>
                        <div class="btn " :class="sendamountRef >= 0.01 ? 'm3-theme-btn1' : 'm3-theme-btn3'"
                            @click="receberBtn()">
                            {{ t('Receive') }}
                        </div>
                    </div>
                    <div class="progress w-full mt-2">
                        <div class="text flex justify-between align-center !text-themetext1">
                            <span>{{ t('activityCenter.Promotionprogress') }}</span>
                            <span>{{ t('activityCenter.Nextreturn') }} <span
                                    class="text-themetext0">{{ backRate(Number(consumeMoneyRef)).next }}%</span></span>
                        </div>
                        <dd class="w-full h-2  rounded-full overflow-hidden flex bg-rgbablack80">

                            <em :style="`width: ${(consumeMoneyRef / backRate(Number(consumeMoneyRef)).nextMoney * 100).toFixed(2)}%`"
                                class="h-full m2-progresbar rounded-full flex justify-end overflow-hidden ">
                                <i class="w-2 h-2 bg-themewhite rounded-full"></i>
                            </em>
                        </dd>
                        <div class="text flex justify-between align-center">
                            <span>{{ consumeMoneyRef }}</span>
                            <span>{{ backRate(Number(consumeMoneyRef)).nextMoney }}</span>
                        </div>
                    </div>

                </div>
            </section>
        </pu-card>
        <pu-card theme="3" class="!mt-0" v-if="currentTemplate.value == 'template_four'">
            <section class="w-full">
                <div class="w-full progressCard !rounded-none !px-0" :style="{
                    backgroundImage: `url(${WashcodeImg.img_bg})`,
                    backgroundSize: '100% 100%',
                }">
                    <div class="flex align-center px-4 py-2">
                        <h1 class="mr-3">Aposta <span class="m4-text">{{ Number(consumeMoneyRef) -
                            Number(lastprizeRef) > 0 ? (Number(consumeMoneyRef) -
                                Number(lastprizeRef)).toFixed(2):0}}</span></h1>
                        <h1 class="ml-3">Retorno <span
                                class="text-themetext0">{{ backRate(Number(consumeMoneyRef)).current }}%</span></h1>
                    </div>
                    <!-- !bg-rgbablack30  -->
                    <div class="recebercard !rounded-none   flex  items-center justify-between ">
                        <div class="left m4-text ">
                            <img :src=WashcodeImg.icon_wcmoney class="w-[1.5rem] h-[1.5rem] mr-3" />
                            {{ currentUnit.value }} <h1 class="ml-3 text-themetext0 !text-[2rem]">{{ sendamountRef.toFixed(2) }}</h1>
                        </div>
                        <div class=" p-1  px-4 rounded-3xl font-bold text-[0.68rem]"
                            :class="sendamountRef >= 0.01 ? 'm4-nine-btn text-theme' : 'bg-tablebg text-white/20'"
                            @click="receberBtn()">
                            Receber
                        </div>
                    </div>
                    <div class="progress w-full mt-2 py-1 px-4">
                        <div class="text !m4-text flex justify-between align-center">
                            <span>Progresso da promoção</span>
                            <span>Próximo retorno <span
                                    class="text-themetext0">{{ backRate(Number(consumeMoneyRef)).next }}%</span></span>
                        </div>
                        <dd class="w-full h-2  rounded-full overflow-hidden flex bg-tablebg">
                            <em :style="`width:${(consumeMoneyRef / backRate(Number(consumeMoneyRef)).nextMoney * 100).toFixed(2)}%`"
                                class="h-full m4-ten-btn rounded-full flex justify-end overflow-hidden text-one">
                                <i class="w-2 h-2 bg-themewhite rounded-full"></i>
                            </em>
                        </dd>
                        <div class="text !m4-text flex justify-between align-center">
                            <span>{{ consumeMoneyRef }}</span>
                            <span>{{ backRate(Number(consumeMoneyRef)).nextMoney }}</span>
                        </div>
                    </div>

                </div>
            </section>
        </pu-card>
        <pu-card theme="2" v-if="currentTemplate.value == 'template_five'">
            <section class="w-full -mt-44">
                <div class="w-full progressCard !rounded-none !px-0 relative z-10 !pt-2" :style="{
                    backgroundImage: `url(${WashcodeImg.img_bg})`,
                    backgroundSize: '100% 100%',
                }">
                    <div class="flex align-center px-4">
                        <h1 class="mr-3">Aposta <span class="text-themetext0">{{ Number(consumeMoneyRef) -
                            Number(lastprizeRef) > 0 ? (Number(consumeMoneyRef) -
                                Number(lastprizeRef)).toFixed(2):0}}</span></h1>
                        <h1 class="ml-3">Retorno <span
                                class="text-themetext0">{{ backRate(Number(consumeMoneyRef)).current }}%</span></h1>
                    </div>
                    <!-- !bg-rgbablack30  -->
                    <div class="recebercard !rounded-none  flex  items-center justify-between !mt-2">
                        <div class="left text-themetext0">
                            <img :src=WashcodeImg.icon_wcmoney class="w-[1.5rem] h-[1.5rem] mr-3" />
                            {{ currentUnit.value }} <h1 class="ml-3  !text-[2rem]">{{ sendamountRef.toFixed(2) }}</h1>
                        </div>
                        <div class="py-1.5 px-4 rounded-3xl font-bold text-[0.68rem]"
                            :class="sendamountRef >= 0.01 ? 'm5-theme-btn1 text-themewhite' : 'bg-rgbablack30 text-themewhite'"
                            @click="receberBtn()">
                            Receber
                        </div>
                    </div>
                    <div class="progress w-full mt-2 py-1 px-4 text-themewhite">
                        <div class="text  flex justify-between align-center">
                            <span>Progresso da promoção</span>
                            <span>Próximo retorno <span
                                    class="text-themetext0">{{ backRate(Number(consumeMoneyRef)).next }}%</span></span>
                        </div>
                        <dd class="w-full h-1  rounded-full overflow-hidden flex bg-body-bg">
                            <em :style="`width:${(consumeMoneyRef / backRate(Number(consumeMoneyRef)).nextMoney * 100).toFixed(2)}%`"
                                class="h-full bg-themetext0 rounded-full flex justify-end overflow-hidden text-one">
                                <i class="w-2 h-2 bg-themewhite rounded-full"></i>
                            </em>
                        </dd>
                        <div class="text  flex justify-between align-center">
                            <span>{{ consumeMoneyRef }}</span>
                            <span>{{ backRate(Number(consumeMoneyRef)).nextMoney }}</span>
                        </div>
                    </div>

                </div>
            </section>
        </pu-card>

        <pu-card theme="3" class="pt-8" v-if="currentTemplate.value == 'template_one'">
            <!-- :src="currentTemplate.value =='template_one' ? WashcodeImg.img_title: CommonImg.bg_tableheader "  -->
            <img :src="WashcodeImg.img_title" v-if="currentTemplate.value == 'template_one'" />
            <div :style="{ backgroundImage: `url(${CommonImg.bg_tableheader})` }"
                style="background-size: 100% 100%;width: 100%;height: 100%;"
                class="text-center text-white text-sm font-bold py-2" v-else>
                Tabela de Referência de Rebate
            </div>
            <table class="w-full text-xs text-center text-rgbawhite50 table-fixed overflow-hidden">
                <thead>
                    <tr class="bg-tablergba40 text-themewhite ">

                        <td class="border-r-[0.05rem]  w-[4rem] border-body-bg" style="padding: 0.6rem 0;">Nível</td>
                        <td class="border-r-[0.05rem] border-body-bg " style="padding: 0.6rem 0;">Volume de transação
                        </td>
                        <td>Taxa de retorno</td>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="item, index in washcodeCofigRef" :key="index">
                        <tr class=" odd:bg-tablergba20 even:bg-tablergba10  border-body-bg">
                            <td class="text-one">{{ index + 1 }}</td>
                            <td>{{ fn(item.bet_num, 0) }}</td>
                            <td>{{ item.back_rate }}%</td>

                        </tr>
                    </template>
                    <tr v-if="!washcodeCofigRef">
                        <td colspan="5">
                            <pu-no-data></pu-no-data>
                        </td>
                    </tr>
                </tbody>
            </table>
        </pu-card>
        <pu-card theme="3" class="pt-8" v-if="currentTemplate.value == 'template_two'">
            <div :style="{ backgroundImage: `url(${CommonImg.bg_tableheader})` }"
                style="background-size: 100% 100%;width: 100%;height: 100%;"
                class="text-center text-white text-sm font-bold py-2">
                Tabela de Referência de Rebate
            </div>
            <table class="w-full text-xs text-center text-rgbawhite50 table-fixed overflow-hidden">
                <thead>
                    <tr class="bg-tablergba40 text-three ">

                        <td class="border-r-[0.05rem]  w-[4rem] border-tablebg" style="padding: 0.6rem 0;">Níve</td>
                        <td class="border-r-[0.05rem] border-tablebg" style="padding: 0.6rem 0;">Volume de transação
                        </td>
                        <td>Taxa de retorno</td>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="item, index in washcodeCofigRef" :key="index">
                        <tr class=" odd:bg-tablergba20 even:bg-tablergba10 border-tablebg text-theme">
                            <td>{{ index + 1 }}</td>
                            <td>{{ fn(item.bet_num, 0) }}</td>
                            <td class="text-four">{{ item.back_rate }}%</td>

                        </tr>
                    </template>
                    <tr v-if="!washcodeCofigRef">
                        <td colspan="5">
                            <pu-no-data></pu-no-data>
                        </td>
                    </tr>
                </tbody>
            </table>
        </pu-card>

        <pu-card theme="3" class="pt-8" v-if="currentTemplate.value == 'template_three'">
            <!-- :src="currentTemplate.value =='template_one' ? WashcodeImg.img_title: CommonImg.bg_tableheader "  -->

            <div :style="{ backgroundImage: `url(${CommonImg.bg_tableheader})` }"
                style="background-size: 100% 100%;width: 100%;height: 100%;"
                class="text-center text-white text-[0.72rem] font-bold py-2">
                {{ t('activityCenter.RebateReferenceTable') }}
            </div>
            <table class="w-full text-xs text-center text-rgbawhite50 table-fixed overflow-hidden">
                <thead>
                    <tr class="bg-tablergba40 text-themetext1">
                        <td class="border-r-[0.05rem]  w-[4rem] border-tablebg" style="padding: 0.6rem 0;">{{ t('userCenter.Level') }}</td>
                        <td class="border-r-[0.05rem] border-tablebg" style="padding: 0.6rem 0;">{{ t("activityCenter.Transactionvolume") }}
                        </td>
                        <td>{{ t('activityCenter.Returnrate') }}</td>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="item, index in washcodeCofigRef" :key="index">
                        <tr class=" odd:bg-tablergba20 even:bg-tablergba10 border-tablebg text-themetext2">
                            <td>{{ index + 1 }}</td>
                            <td>{{ fn(item.bet_num, 0) }}</td>
                            <td class="text-themetext0">{{ item.back_rate }}%</td>

                        </tr>
                    </template>
                    <tr v-if="!washcodeCofigRef">
                        <td colspan="5">
                            <pu-no-data></pu-no-data>
                        </td>
                    </tr>
                </tbody>
            </table>
        </pu-card>

        <pu-card theme="3"  v-if="currentTemplate.value == 'template_four'">

            <table class="w-full text-xs text-center   table-fixed overflow-hidden rounded-lg">
                <thead>
                    <tr class="bg-tablebg">
                        <td class="m4-text w-[4rem]">Nível</td>
                        <td class="m4-text">Volume de transação</td>
                        <td class="m4-text">Taxa de retorno</td>
                    </tr>
                </thead>
                <tbody class="bg-tablebg">
                    <template v-for="item, index in washcodeCofigRef" :key="index">
                        <tr class=" odd:bg-tablebg2  ">
                            <td>{{ index + 1 }}</td>
                            <td>{{ fn(item.bet_num, 0) }}</td>
                            <td class="text-themetext0">{{ item.back_rate }}%</td>

                        </tr>
                    </template>
                    <tr v-if="!washcodeCofigRef">
                        <td colspan="5">
                            <pu-no-data></pu-no-data>
                        </td>
                    </tr>
                </tbody>
            </table>
        </pu-card>
        <pu-card theme="3"  v-if="currentTemplate.value == 'template_five'">

            <table class="w-full text-xs text-center  table-fixed overflow-hidden rounded-lg">
                <thead>
                    <tr class="bg-tablebg1 text-themewhite">
                        <td class=" w-[4rem]">Nível</td>
                        <td >Volume de transação</td>
                        <td >Taxa de retorno</td>
                    </tr>
                </thead>
                <tbody class="bg-tablebg">
                    <template v-for="item, index in washcodeCofigRef" :key="index">
                        <tr class="odd:bg-tablebg2 even:bg-tablebg1 text-themetext3">
                            <td>{{ index + 1 }}</td>
                            <td>{{ fn(item.bet_num, 0) }}</td>
                            <td class="text-themetext0">{{ item.back_rate }}%</td>

                        </tr>
                    </template>
                    <tr v-if="!washcodeCofigRef">
                        <td colspan="5">
                            <pu-no-data></pu-no-data>
                        </td>
                    </tr>
                </tbody>
            </table>
        </pu-card>
        <pu-card theme="3" class="pt-8"
            v-if="currentTemplate.value == 'template_one' || currentTemplate.value == 'template_two'">
            <div class="w-full mb-4 flex items-center">
                <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent"
                    :class="currentTemplate.value == 'template_one' ? 'to-themewhite' : ' to-four'"></em>
                <h5 class="ma-w-[60%] px-2 text-sm  text-center"
                    :class="currentTemplate.value == 'template_one' ? ' text-themewhite' : ' text-four'">
                    <span>Descrição da Atividade</span>
                </h5>
                <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent "
                    :class="currentTemplate.value == 'template_one' ? ' to-themewhite' : ' to-four'"></em>
            </div>
            <div class="ctx-article p-mb text-sm "
                :class="currentTemplate.value == 'template_one' ? 'text-rgbawhite50' : ' text-theme'"
                v-html="washcodeInfoRef.code_wash_content" style="line-height: 1.5;">
            </div>
        </pu-card>

        <pu-card theme="3" class="pt-8" v-if="currentTemplate.value == 'template_three'">
            <div class="w-full mb-4 flex items-center">
                <em class="h-0.5 flex-1 bg-gradient-to-r from-transparent to-themetext2"></em>
                <h5 class="ma-w-[60%] px-2 text-sm  text-themetext2">
                    <span>{{ t('ActivityDescription')  }}</span>
                </h5>
                <em class="h-0.5 flex-1 bg-gradient-to-l from-transparent to-themetext2"></em>
            </div>
            <div class="ctx-article p-mb text-sm text-themetext3" v-html="washcodeInfoRef.code_wash_content"
                style="line-height: 1.5;">
            </div>
        </pu-card>
        <pu-card theme="3" class="pt-8" v-if="currentTemplate.value == 'template_four'">
            <h5 class=" px-2 text-l font-bold mb-3 text-start m4-text">
                <span>{{ t('ActivityDescription')  }}:</span>
            </h5>
            <div class="p-mb text-sm text-themetext4" v-html="washcodeInfoRef.code_wash_content"
                style="line-height: 1.5;">
            </div>
        </pu-card>
        <pu-card theme="3" class="pt-8" v-if="currentTemplate.value == 'template_five'">
            <h5 class=" px-2 text-l font-bold mb-3 text-start text-themewhite">
                <span>Descrição da Atividade:</span>
            </h5>
            <div class="p-mb text-sm text-themetext4" v-html="washcodeInfoRef.code_wash_content"
                style="line-height: 1.5;">
            </div>
        </pu-card>
        <Panddingbottom></Panddingbottom>

    </pu-page>
</template>
<style scoped>
.progressCard {
    padding: 0.75rem;
    box-sizing: border-box;
    background: linear-gradient(180deg, var(--color-themecardlinear1) 0%, var(--color-themecardlinear2) 100%);
    border-radius: 1rem;

    .title {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .recebercard {
        padding: 0.5rem 1rem;
        box-sizing: border-box;
        border-radius: 1rem;

        .left {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            font-size: 0.68rem;

            h1 {
                font-size: 1.28rem;
                margin-left: 0.25rem;
            }
        }

        .btn {
            width: 6.5rem;
            height: 2.5rem;
            border-radius: 0.5rem;
            line-height: 2.5rem;
            text-align: center;
            font-size: 0.78rem;
        }

        .btnactive {
            border: none;
            background-image: linear-gradient(113deg, var(--color-three) 0%, var(--color-theme) 85%);
            box-shadow: inset 0 -2px 0 0 rgba(0, 0, 0, 0.15);
        }
    }

    .progress {
        .text {
            color: var(--color-rgbawhite80);
            font-size: 0.68rem;
            font-weight: 0;
        }
    }
}

table {
    border-spacing: 0.15rem;
    border-collapse: collapse;
}

table tr td {
    padding: 1rem;
    box-sizing: border-box;
}
</style>