import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
    lng: 'ru',

    resources: {
        ru: {
            translation: {
                hello: 'Привет',
                header: {
                    exit: 'Выход',
                },

                footer: {
                    calculate: 'Расчёт',
                    history: 'История',
                    profile: 'Профиль',
                },

                errorBoundary: {
                    title: 'Что-то пошло не так',
                    description: 'Пожалуйста, обновите страницу и попробуйте снова.',
                },

                referralBanner: {
                    freeDelivery: 'Бесплатная доставка',
                    inviteFriend: 'за приведенного друга',
                    giftDelivery: '1+1=3',
                    thirdDelivery: '3-я доставка в подарок!',
                },
            },
        },
    },

    interpolation: {
        escapeValue: false,
    },
})

export default i18n
