import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
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
      servicesTitle: "Services",
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
      rooms: {
        type: "Room Type",
        area: "Area",
        sleeps: "Sleeps",
        price: "Price",
        beds: "Beds",
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
      }    
    }
  },
  uk: {
    translation: {
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
      servicesTitle: "Сервіс Готелю",
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
      rooms: {
        type: "Номер",
        area: "Площа",
        sleeps: "Вміщає",
        price: "Ціна",
        beds: "Ліжка",
        couches: "Дивани",
        bathRoom: "Туалет і Душ",
        shower: "Ванна",
        wifi: "Інтернет",
        balcony: "Балкон",
        terrace: "Тераса",
        mtnView: "Вид на гори",
        riverView: "Вид на річку",
        streetView: "Вид на вулицю",
        tv: "ТВ",
        ac: "Кондиціонер"
      }    
    }
  },
  ru: {
    translation: {
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
      servicesTitle: "Сервис в Отеле",
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
      rooms: {
        type: "Номер",
        area: "Площадь",
        sleeps: "Человек",
        price: "Цена",
        beds: "Кроватей",
        couches: "Диванов",
        bathRoom: "Туалет и Душ",
        shower: "Ванная",
        wifi: "Интернет ",
        balcony: "Балкон",
        terrace: "Тераса",
        mtnView: "Вид на горы",
        riverView: "Вид на речку",
        streetView: "Вид на улицу",
        tv: "ТВ",
        ac: "Кондиционер"
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