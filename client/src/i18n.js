import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      additional_services: "Additional Services",
      title: "Hotel",
      welcome: "Hotel Name",
      city: "City Name",
      more: "Tell Me More",
      menu: "Menu",
      bookBtn: "Book Now",
      resTitle: "Reservations",
      newsTitle: "Our News",
      guestCount: "Guests",
      kidCount: "Children",
      checkIn: "Check In",
      checkOut: "Check Out",
      checkAvail: "Check Availability",
      exploreTitle: "Explore",
      servicesDesc: "Rooms, dining, entertainment and additional services",
      about: "About Our Hotel",
      roomsTitle: "Rooms",
      roomsDesc: "Rooms In Our Hotel",
      dining_entertainment: "Dining and Entertainment",
      restDesc: "Dining and entertainment options",
      extras: "Extras",
      extrasDesc: "Extras services in our hotel",
      contactTitle: "Contact Us",
      contactDesc: "Please send us a message and we will contact you",
      contactName: "Your Name ...",
      contactEmail: "Your Email ...",
      contactPhone: "Your Phone Number ...",
      contactMsg: "Your Message *",
      sendMsg: "Send Message",
      aboutTitle: "About Us",
      buttons: {
        bookNow: "Book now",
        goToRoomsBtn: "Explore rooms",
        goToDiningBtn: "Explore dining and entertainment",
        goToExtrasBtn: "Explore additional services"
      },
      rooms: {
        details: "Room details",
        roomHeader: "Rooms",
        type: "Room Type",
        area: "Area",
        sleeps: "Sleeps",
        price: "Price from",
        twinBeds: "Twin Beds",
        queenBeds: "Queen Beds",
        kingBeds: "King Beds",
        couches: "Couches",
        bathRoom: "Private Bathroom",
        shower: "Suite Bathroom",
        wifi: "Free WiFi",
        balcony: "Balcony",
        terrace: "Terrace",
        mtnView: "Mountain View",
        riverView: "River View",
        streetView: "Street View",
        tv: "TV",
        ac: "Air Conditioning"
      },
      misc: {
        from: "From"
      }       
    }
  },
  uk: {
    translation: {
      additional_services: "Додаткові Послуги",
      title: "Готель",
      welcome: "Поділь Плаза",
      city: "Місто",
      more: "Дізнатись Більше",
      menu: "Меню",
      bookBtn: "Резервувати",
      resTitle: "Резервації",
      newsTitle: "Наші Новини",
      guestCount: "Дорослих",
      kidCount: "Дітей",
      checkIn: "Заїзд",
      checkOut: "Виїзд",
      checkAvail: "Бронювати",
      exploreTitle: "Дізнатись Більше",
      servicesDesc: "Про готель, послуги і додаткові зручності",
      about: "Про нас",
      roomsTitle: "Кімнати",
      roomsDesc: "Кімнати в нашому готелю",
      dining_entertainment: "Ресторан",
      restDesc: "Меню на сніданок, обід, вечерю",
      extras: "Додаткові Послуги",
      extrasDesc: "Додаткові послуги готелю",
      contactTitle: "Напишіть Нам",
      contactDesc: "Відішліть нам повідомлення і ми відпишемо вам",
      contactName: "Ваше Ім'я ...",
      contactEmail: "Ваш Емайл ...",
      contactPhone: "Ваш Телефон ...",
      contactMsg: "Ваше Повідомлення...",
      sendMsg: "Відіслати",
      aboutTitle: "Про Нас",
      buttons: {
        bookNow: "Бронювати",
        goToRoomsBtn: "Переглянути кімнати",
        goToDiningBtn: "Переглянути ресторан і розваги",
        goToExtrasBtn: "Переглянути додаткові послуги"
      },
      rooms: {
        details: "Делалі кімнати",
        roomHeader: "Кімнати",
        type: "Номер",
        area: "Площа",
        sleeps: "Вміщає",
        price: "Ціна",
        twinBeds: "ліжко 'Twin'",
        queenBeds: "ліжко 'Beds'",
        kingBeds: "ліжко 'Beds'",
        couches: "Дивани",
        bathRoom: "Туалет і Душ",
        shower: "Ванна",
        wifi: "Інтернет",
        balcony: "Балкон",
        terrace: "Тераса",
        mtnView: "Вид на парк",
        riverView: "Вид на річку",
        streetView: "Вид на вулицю",
        tv: "ТВ",
        ac: "Кондиціонер"
      },
      misc: {
        from: "Від"
      }   
    }
  },
  ru: {
    translation: {
      additional_services: "Дополнительные Услуги",
      title: "Отель",
      welcome: "Плаза",
      city: "Город",
      more: "Дальше",
      menu: "Меню",
      bookBtn: "Резервации",
      resTitle: "Резервации",
      newsTitle: "Новости и промо",
      guestCount: "Взрослых",
      kidCount: "Детей",
      checkIn: "Заезд",
      checkOut: "Выезд",
      checkAvail: "Искать Номера",
      exploreTitle: "Узнать Больше",
      servicesDesc: "Про отель, услуги и дополнительние удобства",
      about: "Про Нас",
      roomsTitle: "Комнаты",
      roomsDesc: "Комнаты в нашем отеле",
      dining_entertainment: "Ресторан",
      restDesc: "Меню на завтрак, обед, ужын",
      extras: "Дополнительние Удобства",
      extrasDesc: "Дополнительние удобства в отеле",
      contactTitle: "Напишите Нам",
      contactDesc: "Отошлите нам ваш вопрос и мы обязательно свяжемся с вами",
      contactName: "Ваше Имя ...",
      contactEmail: "Ваш Емайл ...",
      contactPhone: "Ваш Телефон ...",
      contactMsg: "Ваш Вопрос ...",
      sendMsg: "Отправить",
      aboutTitle: "Про Нас",
      buttons: {
        bookNow: "Броневать",
        goToRoomsBtn: "Смотреть комнаты",
        goToDiningBtn: "Смотреть ресторан и развлечения",
        goToExtrasBtn: "Смотреть дополнительние услуги"
      },
      rooms: {
        details: "Детали комнаты",
        roomHeader: "Комнаты",
        type: "Номер",
        area: "Площадь",
        sleeps: "Взрослых",
        price: "Цена от",
        twinBeds: "кровать 'Twin'",
        queenBeds: "кровать 'Beds'",
        kingBeds: "кровать 'Beds'",
        couches: "Диванов",
        bathRoom: "Туалет и Душ",
        shower: "Ванная",
        wifi: "Интернет ",
        balcony: "Балкон",
        terrace: "Тераса",
        mtnView: "Вид на парк",
        riverView: "Вид на реку",
        streetView: "Вид на улицу",
        tv: "ТВ",
        ac: "Кондиционер"
      },
      misc: {
        from: "От"
      }     
    }
  }
};


i18n
  .use(initReactI18next) // passes i18n down to react-i18next  //
  .init({
    resources,
    lng: "en",

    // keySeparator: false, // we do not use keys in form messages.welcome //

    interpolation: {
      escapeValue: false // react already safe from xss //
    }
  });

  export default i18n;