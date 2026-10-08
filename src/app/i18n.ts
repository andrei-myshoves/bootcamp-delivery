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

                recipient: {
                    title: 'Получатель',
                    step: 'Шаг 2 из 7',
                    lastName: 'Фамилия',
                    firstName: 'Имя',
                    middleName: 'Отчество',
                    phone: 'Телефон',
                    lastNamePlaceholder: 'Иванов',
                    firstNamePlaceholder: 'Иван',
                    middleNamePlaceholder: 'Иванович',
                    phonePlaceholder: '+7',
                    back: 'Назад',
                    continue: 'Продолжить',
                    order: 'Ваш заказ',
                    deliveryType: 'Тип доставки',
                    notSelected: 'Не выбрано',
                    recipient: 'Получатель',
                    fillFields: 'Заполните поля',
                    fillLastName: 'Заполните фамилию',
                    fillFirstName: 'Заполните имя',
                    fillMiddleName: 'Заполните отчество',
                    fillPhone: 'Заполните телефон',
                    breadcrumbDeliveryType: 'Тип доставки',
                    breadcrumbRecipient: 'Получатель',
                    backAriaLabel: 'Назад',
                },
                sender: {
                    breadcrumbSender: 'Отправитель',
                    title: 'Отправитель',
                    step: 'Шаг 3 из 7',
                    sender: 'Отправитель',
                },
                trackParcel: {
                    title: 'Отследить посылку',
                    placeholder: 'Номер заказа',
                    find: 'Найти',
                },
                pickupAddress: {
                    breadcrumbPickup: 'Откуда забрать',
                    title: 'Откуда забрать',
                    step: 'Шаг 4 из 7',
                    street: 'Улица',
                    streetPlaceholder: '',
                    house: 'Дом',
                    housePlaceholder: '',
                    apartment: 'Квартира',
                    apartmentPlaceholder: '',
                    courierNote: 'Заметка для курьера',
                    courierNotePlaceholder: '',
                    fillStreet: 'Заполните улицу',
                    fillHouse: 'Заполните дом',
                    pickupAddress: 'Откуда забрать',
                },
                deliveryAddress: {
                    breadcrumbDelivery: 'Куда доставить',
                    title: 'Куда доставить',
                    step: 'Шаг 5 из 7',
                    courierNote: 'Заметка для курьера',
                    leaveAtDoor: 'Оставить заказ у двери',
                    deliveryAddress: 'Куда доставить',
                    note: 'Примечание',
                    fillStreet: 'Заполните улицу',
                    fillHouse: 'Заполните дом',
                    footerTitle: 'Куда доставить',
                    contactlessTitle: 'Бесконтактная доставка',
                    contactlessDescription:
                        'Курьер привозит заказ, оставляет его у двери и уходит, а вам приходит уведомление на телефон о том, что заказ доставлен',
                },
            },
        },
    },

    interpolation: {
        escapeValue: false,
    },
})

export default i18n
