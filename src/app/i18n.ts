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

                calculator: {
                    title: 'Рассчитать доставку',
                    from: 'Город отправки',
                    where: 'Куда',
                    to: 'Город назначения',
                    size: 'Размер посылки',
                    selectCity: 'Выберите город',
                    selectSize: 'Выберите размер',
                    calculate: 'Рассчитать',
                },

                referralBanner: {
                    freeDelivery: 'Бесплатная доставка',
                    inviteFriend: 'за приведенного друга',
                    giftDelivery: '1+1=3',
                    thirdDelivery: '3-я доставка в подарок!',
                },
                trackParcel: {
                    title: 'Отследить посылку',
                    placeholder: 'Номер заказа',
                    find: 'Найти',
                },
            },
        },
    },

    interpolation: {
        escapeValue: false,
    },
})

export default i18n
