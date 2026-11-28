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
                    stepRecipient: 'Кто получатель?',
                    stepSender: 'Кто отправитель?',
                    stepPickupAddress: 'Откуда забрать?',
                    stepDeliveryAddress: 'Куда доставить?',
                    stepDeliveryPayment: 'Кто оплачивает доставку?',
                    total: 'Итого:',
                    totalFrom: 'от {{price}}',
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
                    fillApartment: 'Заполните квартиру',
                    pickupAddress: 'Откуда забрать',
                },
                deliveryAddress: {
                    breadcrumbDelivery: 'Куда доставить',
                    title: 'Куда доставить',
                    step: 'Шаг 5 из 7',
                    leaveAtDoor: 'Оставить заказ у двери',
                    deliveryAddress: 'Куда доставить',
                    note: 'Примечание',
                    fillStreet: 'Заполните улицу',
                    fillHouse: 'Заполните дом',
                    fillApartment: 'Заполните квартиру',
                    contactlessTriggerLabel: 'Что такое бесконтактная доставка',
                    contactlessCloseLabel: 'Закрыть подсказку',
                    contactlessTitle: 'Бесконтактная доставка',
                    contactlessDescription:
                        'Курьер привозит заказ, оставляет его у двери и уходит, а вам приходит уведомление на телефон о том, что заказ доставлен',
                },
                deliveryPayment: {
                    breadcrumb: 'Оплата доставки',
                    title: 'Оплата доставки',
                    step: 'Шаг 6 из 7',
                    whoPays: 'Кто оплачивает доставку',
                    payerReceiver: 'Получатель',
                    payerSender: 'Отправитель',
                },
                checkout: {
                    breadcrumbAriaLabel: 'Шаги оформления заказа',
                },
                orderReview: {
                    breadcrumb: 'Проверка данных',
                    title: 'Проверка данных',
                    step: 'Шаг 7 из 7',
                    total: 'Итого:',
                    edit: 'Редактировать данные',
                    submitting: 'Отправка…',
                },
                orderSubmit: {
                    missingData: 'Не удалось отправить заявку: не хватает данных — {{fields}}',
                    rejected: 'Заявка не принята: {{reason}}',
                    rejectedWithoutReason: 'Заявка не принята. Проверьте данные и попробуйте ещё раз',
                    server: 'Сервер не смог создать заявку. Попробуйте ещё раз',
                    network: 'Нет связи с сервером. Проверьте подключение и попробуйте ещё раз',
                    fields: {
                        package: 'размер посылки (рассчитайте доставку на главной заново)',
                        deliveryOption: 'способ отправки',
                        fromCity: 'город отправления',
                        toCity: 'город назначения',
                        recipient: 'получатель',
                        sender: 'отправитель',
                        pickupAddress: 'адрес отправления',
                        deliveryAddress: 'адрес доставки',
                        payer: 'плательщик',
                    },
                },
                orderCreatedSuccess: {
                    title: 'Заявка отправлена',
                    description: 'Вы можете оплатить ваш заказ в разделе «Профиль»',
                    orderNumber: 'Номер заказа',
                    smsNote: 'Вся информация была продублирована в SMS',
                    status: 'Статус заявки',
                    viewStatus: 'Посмотреть статус',
                    home: 'На главную',
                    closeAriaLabel: 'Закрыть',
                },
            },
        },
    },

    interpolation: {
        escapeValue: false,
    },
})

export default i18n
